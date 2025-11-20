import { create } from 'zustand';
import { GameState, ResourceChange, Theme, Event, Archetype } from '@/types/game';
import { allScenarios, getScenarioById, DEFAULT_SCENARIO_ID } from '@/data/scenarios';
import { DEFAULT_THEME } from '@/data/themes';
import { thresholdEvents } from '@/data/threshold-events';
import { checkArchetypeUnlock } from '@/lib/archetypeChecker';

// ============================================================================
// GAME STORE with Scenario & Theme Support
// ============================================================================

interface GameStore extends GameState {
  // Actions
  applyConsequence: (change: ResourceChange, choice: 'left' | 'right', event: Event) => void;
  nextEvent: () => void;
  checkGameOver: () => void;
  resetGame: () => void;
  
  // Scenario management
  changeScenario: (scenarioId: string) => void;
  
  // Theme management
  changeTheme: (theme: Theme) => void;
  
  // Settings management
  toggleSettings: () => void;
  
  // Archetype management
  checkArchetypeUnlock: () => void;
  dismissArchetype: () => void;
}

// Helper to safely get initial events
const getInitialEvents = (): Event[] => {
  try {
    const scenario = getScenarioById(DEFAULT_SCENARIO_ID);
    return scenario?.events || [];
  } catch (error) {
    console.error('Error loading initial scenario:', error);
    return [];
  }
};

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  resources: {
    klient: 50,
    tillit: 50,
    penger: 50,
    omdømme: 50,
  },
  currentEventIndex: 0,
  events: getInitialEvents(),
  gameOver: false,
  gameOverReason: undefined,
  turn: 0,
  currentScenarioId: DEFAULT_SCENARIO_ID,
  theme: DEFAULT_THEME,
  settingsOpen: false,
  thresholdEventsTriggered: [],
  specialEventPool: thresholdEvents,
  choiceHistory: [],
  unlockedArchetypes: [],
  pendingArchetype: undefined,

  // Actions
  applyConsequence: (change, choice, event) => {
    set((state) => {
      const newResources = { ...state.resources };
      
      Object.keys(change).forEach((key) => {
        const resourceKey = key as keyof typeof newResources;
        const currentValue = newResources[resourceKey];
        const changeValue = change[resourceKey] || 0;
        
        // Clamp between 0 and 100
        newResources[resourceKey] = Math.max(
          0,
          Math.min(100, currentValue + changeValue)
        );
      });

      // Track choice history for archetype system
      const tags = event.metadata?.choiceTags?.[choice] || [];
      const newChoiceHistory = [...state.choiceHistory, {
        eventId: event.id,
        choice,
        tags,
        turn: state.turn + 1
      }];

      return { 
        resources: newResources,
        turn: state.turn + 1,
        choiceHistory: newChoiceHistory
      };
    });
    
    get().checkGameOver();
    get().checkArchetypeUnlock();
  },

  nextEvent: () => {
    const { currentEventIndex, events } = get();
    
    if (currentEventIndex < events.length - 1) {
      set({ currentEventIndex: currentEventIndex + 1 });
    } else {
      // Loop back for now (Phase 2+ will have proper ending)
      set({ currentEventIndex: 0 });
    }
  },

  checkGameOver: () => {
    const { resources, thresholdEventsTriggered, specialEventPool, events, currentEventIndex } = get();
    
    // Check each resource
    Object.entries(resources).forEach(([key, value]) => {
      const resourceKey = key as 'klient' | 'tillit' | 'penger' | 'omdømme';
      
      if (value <= 0) {
        // Game over at 0
        set({ 
          gameOver: true, 
          gameOverReason: `${key.toUpperCase()} nådde 0. Du tapte.`
        });
      } else if (value >= 100 && !thresholdEventsTriggered.includes(resourceKey)) {
        // Trigger threshold event at 100!
        const thresholdIntro = specialEventPool.find(
          e => e.triggerCondition?.resource === resourceKey && 
               e.triggerCondition?.threshold === 100 &&
               e.type === 'narrative'
        );
        
        const thresholdChoice = specialEventPool.find(
          e => e.id === thresholdIntro?.id.replace('_intro', '_choice')
        );
        
        if (thresholdIntro && thresholdChoice) {
          // Insert threshold events after current event
          const newEvents = [...events];
          newEvents.splice(currentEventIndex + 1, 0, thresholdIntro, thresholdChoice);
          
        set({ 
            events: newEvents,
            thresholdEventsTriggered: [...thresholdEventsTriggered, resourceKey]
        });
        }
      }
    });
  },

  resetGame: () => {
    try {
      const { currentScenarioId } = get();
      const scenario = getScenarioById(currentScenarioId);
      
      // Ensure events is always an array
      const events = Array.isArray(scenario?.events) && scenario.events.length > 0 
        ? scenario.events 
        : getInitialEvents();
      
      set({
        resources: { klient: 50, tillit: 50, penger: 50, omdømme: 50 },
        currentEventIndex: 0,
        events,
        gameOver: false,
        gameOverReason: undefined,
        turn: 0,
        thresholdEventsTriggered: [],
        choiceHistory: [],
        unlockedArchetypes: [],
        pendingArchetype: undefined,
      });
    } catch (error) {
      console.error('Error resetting game:', error);
      // Fallback to safe initial state
    set({
        resources: { klient: 50, tillit: 50, penger: 50, omdømme: 50 },
        currentEventIndex: 0,
        events: getInitialEvents(),
        gameOver: false,
        gameOverReason: undefined,
        turn: 0,
        thresholdEventsTriggered: [],
        choiceHistory: [],
        unlockedArchetypes: [],
        pendingArchetype: undefined,
      });
    }
  },

  // NEW: Change scenario (resets game)
  changeScenario: (scenarioId: string) => {
    try {
      const scenario = getScenarioById(scenarioId);
      
      if (!scenario) {
        console.error(`Scenario ${scenarioId} not found`);
        return;
      }
      
      if (scenario.locked) {
        console.log(`Scenario ${scenarioId} is locked`);
        // TODO: Show purchase modal in future
        return;
      }
      
      // Ensure events is always an array
      const events = Array.isArray(scenario.events) && scenario.events.length > 0 
        ? scenario.events 
        : getInitialEvents();
      
      set({
        currentScenarioId: scenarioId,
        events,
        resources: { klient: 50, tillit: 50, penger: 50, omdømme: 50 },
        currentEventIndex: 0,
        gameOver: false,
        gameOverReason: undefined,
        turn: 0,
        settingsOpen: false,
        thresholdEventsTriggered: [],
        choiceHistory: [],
        unlockedArchetypes: [],
        pendingArchetype: undefined,
      });
    } catch (error) {
      console.error('Error changing scenario:', error);
      // Fallback to default scenario
      set({
        currentScenarioId: DEFAULT_SCENARIO_ID,
        events: getInitialEvents(),
      resources: { klient: 50, tillit: 50, penger: 50, omdømme: 50 },
      currentEventIndex: 0,
      gameOver: false,
      gameOverReason: undefined,
      turn: 0,
        thresholdEventsTriggered: [],
        choiceHistory: [],
        unlockedArchetypes: [],
        pendingArchetype: undefined,
        settingsOpen: false,
      });
    }
  },

  // NEW: Change theme
  changeTheme: (theme: Theme) => {
    set({ theme });
  },

  // NEW: Toggle settings overlay
  toggleSettings: () => {
    set((state) => ({ settingsOpen: !state.settingsOpen }));
  },

  // NEW: Check for archetype unlock
  checkArchetypeUnlock: () => {
    const state = get();
    const archetype = checkArchetypeUnlock(state);
    
    if (archetype && !state.unlockedArchetypes.includes(archetype.id)) {
      // Give player a small boost when unlocking archetype
      // This prevents immediate game over after unlock
      const boost = {
        klient: 5,
        tillit: 5,
        penger: 5,
        omdømme: 5
      };
      
      const boostedResources = {
        klient: Math.min(100, state.resources.klient + boost.klient),
        tillit: Math.min(100, state.resources.tillit + boost.tillit),
        penger: Math.min(100, state.resources.penger + boost.penger),
        omdømme: Math.min(100, state.resources.omdømme + boost.omdømme)
      };
      
      // Insert archetype special events into the event queue
      const newEvents = [...state.events];
      
      // Insert special events after current event
      // This ensures player sees them immediately after current choice
      if (archetype.specialEvents.length > 0) {
        newEvents.splice(state.currentEventIndex + 1, 0, ...archetype.specialEvents);
      }
      
      // Unlock this archetype!
      set({
        pendingArchetype: archetype,
        unlockedArchetypes: [...state.unlockedArchetypes, archetype.id],
        events: newEvents,
        resources: boostedResources
      });
    }
  },

  // NEW: Dismiss archetype modal
  dismissArchetype: () => {
    set({ pendingArchetype: undefined });
  },
}));
