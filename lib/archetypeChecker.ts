import { GameState, Archetype, ArchetypeUnlockCondition } from '@/types/game';
import { allArchetypes } from '@/data/archetypes';

/**
 * DEBUG: Check progress towards each archetype
 */
export interface ArchetypeProgress {
  archetypeId: string;
  archetypeName: string;
  progress: {
    minTurn: { met: boolean; current: number; required: number | undefined };
    resources: { met: boolean; details: Record<string, { met: boolean; current: number; min?: number; max?: number }> };
    choicePattern: { met: boolean; details: Array<{ tag: string; current: number; required: number; met: boolean }> };
  };
  allMet: boolean;
}

export function getArchetypeProgress(state: GameState): ArchetypeProgress[] {
  return allArchetypes
    .filter(a => !state.unlockedArchetypes.includes(a.id))
    .map(archetype => {
      const conditions = archetype.unlockConditions;
      
      // Check minTurn
      const minTurnMet = !conditions.minTurn || state.turn >= conditions.minTurn;
      
      // Check resources
      const resourceDetails: Record<string, { met: boolean; current: number; min?: number; max?: number }> = {};
      let resourcesMet = true;
      
      if (conditions.resources) {
        for (const [resourceKey, range] of Object.entries(conditions.resources)) {
          const key = resourceKey as 'klient' | 'tillit' | 'penger' | 'omdømme';
          const value = state.resources[key];
          const met = (range.min === undefined || value >= range.min) && 
                      (range.max === undefined || value <= range.max);
          
          resourceDetails[key] = {
            met,
            current: value,
            min: range.min,
            max: range.max
          };
          
          if (!met) resourcesMet = false;
        }
      } else {
        resourcesMet = true; // No resource requirements
      }
      
      // Check choice patterns
      const choicePatternDetails = (conditions.choicePattern || []).map(pattern => {
        const count = state.choiceHistory.filter(
          ch => ch.tags.includes(pattern.tag)
        ).length;
        return {
          tag: pattern.tag,
          current: count,
          required: pattern.count,
          met: count >= pattern.count
        };
      });
      const choicePatternMet = choicePatternDetails.every(d => d.met);
      
      const allMet = minTurnMet && resourcesMet && choicePatternMet;
      
      return {
        archetypeId: archetype.id,
        archetypeName: archetype.name,
        progress: {
          minTurn: {
            met: minTurnMet,
            current: state.turn,
            required: conditions.minTurn
          },
          resources: {
            met: resourcesMet,
            details: resourceDetails
          },
          choicePattern: {
            met: choicePatternMet,
            details: choicePatternDetails
          }
        },
        allMet
      };
    });
}

/**
 * Check if player has unlocked a new archetype
 * Returns the archetype if unlocked, null otherwise
 */
export function checkArchetypeUnlock(state: GameState): Archetype | null {
  // Only check archetypes if there are any available
  if (allArchetypes.length === 0) {
    return null;
  }
  
  for (const archetype of allArchetypes) {
    // Skip if already unlocked
    if (state.unlockedArchetypes.includes(archetype.id)) {
      continue;
    }
    
    // Check if conditions are met
    if (meetsConditions(state, archetype.unlockConditions)) {
      console.log(`🎉 ARCHETYPE UNLOCKED: ${archetype.name}!`);
      return archetype;
    }
  }
  
  return null;
}

/**
 * Check if game state meets archetype unlock conditions
 */
function meetsConditions(
  state: GameState, 
  conditions: ArchetypeUnlockCondition
): boolean {
  // Check minimum turn requirement
  if (conditions.minTurn && state.turn < conditions.minTurn) {
    return false;
  }
  
  // Check resource conditions
  if (conditions.resources) {
    for (const [resourceKey, range] of Object.entries(conditions.resources)) {
      const key = resourceKey as 'klient' | 'tillit' | 'penger' | 'omdømme';
      const value = state.resources[key];
      
      if (range.min !== undefined && value < range.min) {
        return false;
      }
      if (range.max !== undefined && value > range.max) {
        return false;
      }
    }
  }
  
  // Check choice pattern conditions
  if (conditions.choicePattern) {
    for (const pattern of conditions.choicePattern) {
      const count = state.choiceHistory.filter(
        ch => ch.tags.includes(pattern.tag)
      ).length;
      
      if (count < pattern.count) {
        return false;
      }
    }
  }
  
  return true;
}

