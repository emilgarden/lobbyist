import { Archetype } from '@/types/game';
// import { boligpolitikkArchetypes } from './boligpolitikk';

/**
 * ARCHETYPE REGISTRY
 * All available archetypes across all scenarios
 * 
 * Currently empty - NAV scenario doesn't use archetypes yet
 * Add NAV-specific archetypes here when implemented
 */

export const allArchetypes: Archetype[] = [
  // ...boligpolitikkArchetypes, // Removed - not relevant for NAV scenario
  // Add NAV archetypes here in the future:
  // ...navArchetypes,
];

/**
 * Get archetype by ID
 */
export function getArchetypeById(id: string): Archetype | undefined {
  return allArchetypes.find(a => a.id === id);
}

