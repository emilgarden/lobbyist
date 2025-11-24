import { create } from 'zustand';
import { GameState, ResourceChange, Theme, ColorScheme, Event, Archetype, DelayedEffect } from '@/types/game';
import { allScenarios, getScenarioById, DEFAULT_SCENARIO_ID } from '@/data/scenarios';
import { DEFAULT_THEME } from '@/data/themes';
import { DEFAULT_COLOR_SCHEME } from '@/data/colorSchemes';
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
  
  // Color scheme management
  changeColorScheme: (scheme: ColorScheme) => void;
  
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

// ============================================================================
// CONDITIONAL EVENT LOGIC
// ============================================================================

/**
 * Check if a specific event choice was made
 */
function hasChosenEvent(choiceHistory: Array<{ eventId: string; choice: 'left' | 'right' }>, eventId: string, choice: 'left' | 'right'): boolean {
  return choiceHistory.some(ch => ch.eventId === eventId && ch.choice === choice);
}

/**
 * Evaluate if event conditions are met
 */
function evaluateEventConditions(event: Event, state: GameState): boolean {
  if (!event.metadata?.conditions) return true;
  
  const cond = event.metadata.conditions;
  
  // Check resources
  if (cond.resources) {
    for (const [key, range] of Object.entries(cond.resources)) {
      const resourceKey = key as 'klient' | 'tillit' | 'penger' | 'omdømme';
      const value = state.resources[resourceKey];
      
      if (range.min !== undefined && value < range.min) return false;
      if (range.max !== undefined && value > range.max) return false;
    }
  }
  
  // Check turn
  if (cond.turn) {
    if (cond.turn.min !== undefined && state.turn < cond.turn.min) return false;
    if (cond.turn.max !== undefined && state.turn > cond.turn.max) return false;
  }
  
  // Check previous events
  // Format: "eventId:left" or "eventId:right" to check specific choice
  // Or just "eventId" to check if event was played
  if (cond.previousEvents && cond.previousEvents.length > 0) {
    for (const eventSpec of cond.previousEvents) {
      if (eventSpec.includes(':')) {
        // Check specific choice: "eventId:left" or "eventId:right"
        const [eventId, requiredChoice] = eventSpec.split(':');
        const choiceMade = state.choiceHistory.find(ch => ch.eventId === eventId);
        if (!choiceMade || choiceMade.choice !== requiredChoice) {
          return false;
        }
      } else {
        // Just check if event was played
        const playedEventIds = state.choiceHistory.map(ch => ch.eventId);
        if (!playedEventIds.includes(eventSpec)) {
          return false;
        }
      }
    }
  }
  
  return true;
}

/**
 * Get conditional event variant based on state
 * For events with multiple variants (like Event 7 and Event 13)
 */
function getConditionalEventVariant(eventIdPrefix: string, variants: Event[], state: GameState): Event | null {
  // Find first variant that matches conditions
  for (const variant of variants) {
    if (evaluateEventConditions(variant, state)) {
      return variant;
    }
  }
  return null;
}

/**
 * Find event by ID in scenario events
 */
function findEventById(events: Event[], eventId: string): Event | undefined {
  return events.find(e => e.id === eventId);
}

/**
 * Process delayed consequences that are ready to trigger
 * Modified to process only ONE delayed consequence per nextEvent call
 * This gives players time to read each consequence before the next card
 */
function processDelayedConsequences(state: GameState, events: Event[]): { 
  newEvents: Event[]; 
  newResources: typeof state.resources; 
  remainingQueue: DelayedEffect[]; 
  resourceChanges: typeof state.activeResourceChanges;
  hasMore: boolean; // Indicates more delayed effects waiting
} {
  const ready = state.delayedQueue.filter(delayed => delayed.triggerAtTurn <= state.turn);
  const remaining = state.delayedQueue.filter(delayed => delayed.triggerAtTurn > state.turn);
  
  if (ready.length === 0) {
    return { 
      newEvents: events, 
      newResources: state.resources, 
      remainingQueue: remaining, 
      resourceChanges: {},
      hasMore: false
    };
  }
  
  // CHANGE: Only process ONE delayed consequence per nextEvent call
  // Sort by trigger turn, take the first one
  const sortedReady = [...ready].sort((a, b) => a.triggerAtTurn - b.triggerAtTurn);
  const toProcess = sortedReady[0];
  const stillWaiting = sortedReady.slice(1); // Rest wait for next turns
  
  console.log(`[processDelayedConsequences] Processing 1 of ${sortedReady.length} ready consequences. ${stillWaiting.length} will wait for next turn.`);
  
  let newEvents = [...events];
  let newResources = { ...state.resources };
  const resourceChanges: typeof state.activeResourceChanges = {};
  
  // Safety check: ensure currentEventIndex is valid
  const safeCurrentIndex = Math.max(0, Math.min(state.currentEventIndex, events.length - 1));
  
  // Create narrative event for delayed consequence
  const delayedEvent: Event = {
    id: `delayed_${toProcess.eventId}_${toProcess.choice}_${toProcess.triggerAtTurn}`,
    type: 'narrative',
    character: 'Konsekvens',
    characterImage: '/placeholders/portrait-1.png',
    text: toProcess.consequence.text,
  };
  
  // Insert delayed event after current event
  newEvents.splice(safeCurrentIndex + 1, 0, delayedEvent);
  
  // Apply resource changes and track for animation
  Object.keys(toProcess.consequence.resourceChange).forEach((key) => {
    const resourceKey = key as keyof typeof newResources;
    const changeValue = toProcess.consequence.resourceChange[resourceKey] || 0;
    const currentValue = newResources[resourceKey];
    
    // Track change if non-zero
    if (changeValue !== 0) {
      resourceChanges[resourceKey] = changeValue;
    }
    
    newResources[resourceKey] = Math.max(
      0,
      Math.min(100, currentValue + changeValue)
    );
  });
  
  return { 
    newEvents, 
    newResources, 
    remainingQueue: [...remaining, ...stillWaiting], // Combine remaining
    resourceChanges,
    hasMore: stillWaiting.length > 0
  };
}

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
  colorScheme: DEFAULT_COLOR_SCHEME,
  settingsOpen: false,
  thresholdEventsTriggered: [],
  specialEventPool: thresholdEvents,
  choiceHistory: [],
  unlockedArchetypes: [],
  pendingArchetype: undefined,
  delayedQueue: [],
  activeResourceChanges: {},
  isTransitioning: false,
  pendingChainEventId: undefined,

  // Actions
  applyConsequence: (change, choice, event) => {
    // Track resource changes for animation (before state update)
    const resourceChanges: Record<string, number> = {};
    Object.keys(change).forEach((key) => {
      const changeValue = change[key as keyof typeof change] || 0;
      if (changeValue !== 0) {
        resourceChanges[key] = changeValue;
      }
    });
    
    set((state) => {
      console.log(`[applyConsequence] Event: ${event.id}, choice: ${choice}, currentIndex: ${state.currentEventIndex}, turn: ${state.turn}`);
      
      const newResources = { ...state.resources };
      let newEvents = [...state.events];
      let newDelayedQueue = [...state.delayedQueue];
      
      // Apply immediate resource changes
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

      // Handle delayed consequences
      if (event.metadata?.delayed?.[choice]) {
        const delayed = event.metadata.delayed[choice];
        const triggerTurn = state.turn + 1 + delayed.turnsDelay;
        console.log(`[applyConsequence] Adding delayed consequence for ${event.id}, will trigger at turn ${triggerTurn}`);
        newDelayedQueue.push({
          eventId: event.id,
          choice,
          consequence: delayed,
          triggerAtTurn: triggerTurn
        });
      }

      // Handle event chains - don't insert here, just track for nextEvent
      let newPendingChainEventId = state.pendingChainEventId;
      if (event.metadata?.chains?.[choice]) {
        const chainEventId = event.metadata.chains[choice];
        console.log(`[applyConsequence] Queueing chain event ${chainEventId} for processing in nextEvent`);
        newPendingChainEventId = chainEventId;
      }

      return { 
        resources: newResources,
        turn: state.turn + 1,
        choiceHistory: newChoiceHistory,
        events: newEvents,
        delayedQueue: newDelayedQueue,
        activeResourceChanges: resourceChanges as any, // Set immediately when choice is made
        pendingChainEventId: newPendingChainEventId
      };
    });
    
    // Clear resource changes after animation duration (1.2 seconds)
    // Short duration gives dedicated players a glimpse to make calculated choices on replay
    setTimeout(() => {
      set({ activeResourceChanges: {} });
    }, 1200);
    
    get().checkGameOver();
    get().checkArchetypeUnlock();
  },

  nextEvent: () => {
    const state = get();
    
    // Prevent overlapping transitions
    if (state.isTransitioning) {
      console.warn('[nextEvent] Transition already in progress, skipping');
      return;
    }
    
    set({ isTransitioning: true });
    
    const { currentEventIndex, events, turn } = state;
    
    console.log(`[nextEvent] Called - turn: ${turn}, currentIndex: ${currentEventIndex}, events.length: ${events.length}`);
    
    // Step 1: Process delayed consequences first
    const { newEvents, newResources, remainingQueue, resourceChanges, hasMore } = processDelayedConsequences(state, events);
    
    if (hasMore) {
      console.log('[nextEvent] More delayed consequences waiting for next turn');
    }
    
    // Step 2: Process pending chain event
    let eventsWithChain = newEvents;
    if (state.pendingChainEventId) {
      const chainEvent = findEventById(newEvents, state.pendingChainEventId);
      if (chainEvent) {
        console.log(`[nextEvent] Processing pending chain event ${state.pendingChainEventId}`);
        // Insert after current event
        const insertIndex = Math.min(state.currentEventIndex + 1, newEvents.length);
        eventsWithChain = [...newEvents];
        eventsWithChain.splice(insertIndex, 0, chainEvent);
        console.log(`[nextEvent] Chain event inserted at index ${insertIndex}`);
      } else {
        console.warn(`[nextEvent] Pending chain event ${state.pendingChainEventId} not found in scenario!`);
      }
    }
    
    // Step 3: Update state with all changes
    const hasDelayedChanges = newEvents.length !== events.length || remainingQueue.length !== state.delayedQueue.length;
    const hasChainChanges = eventsWithChain.length !== newEvents.length;
    
    if (hasDelayedChanges || hasChainChanges || state.pendingChainEventId) {
      console.log(`[nextEvent] Updating state - delayed: ${hasDelayedChanges}, chain: ${hasChainChanges}, events: ${events.length} -> ${eventsWithChain.length}`);
      
      // Show resource change animations immediately if any
      if (Object.keys(resourceChanges).length > 0) {
        set({
          events: eventsWithChain,
          resources: newResources,
          delayedQueue: remainingQueue,
          activeResourceChanges: resourceChanges as any,
          pendingChainEventId: undefined // Clear after processing
        });
        
        // Clear resource changes after animation duration (1.2 seconds)
        // Short duration gives dedicated players a glimpse to make calculated choices on replay
        setTimeout(() => {
          set({ activeResourceChanges: {} });
        }, 1200);
      } else {
        set({
          events: eventsWithChain,
          resources: newResources,
          delayedQueue: remainingQueue,
          pendingChainEventId: undefined // Clear after processing
        });
      }
    }
    
    // Use updated state - get fresh state after any updates
    const updatedState = get();
    const updatedEvents = updatedState.events;
    const updatedCurrentIndex = updatedState.currentEventIndex;
    
    console.log(`[nextEvent] After updates - currentIndex: ${updatedCurrentIndex}, events.length: ${updatedEvents.length}`);
    
    // Safety check: ensure we have events
    if (!updatedEvents || updatedEvents.length === 0) {
      console.warn('[nextEvent] No events available');
      return;
    }
    
    // Safety check: ensure current index is valid
    if (updatedCurrentIndex < 0 || updatedCurrentIndex >= updatedEvents.length) {
      console.warn(`[nextEvent] Invalid currentEventIndex: ${updatedCurrentIndex}, events length: ${updatedEvents.length}`);
      set({ currentEventIndex: 0 });
      return;
    }
    
    // Find next event that matches conditions
    // Start from currentEventIndex + 1 (the immediate next event)
    let nextIndex = updatedCurrentIndex + 1;
    let attempts = 0;
    const maxAttempts = updatedEvents.length * 2; // Prevent infinite loop, allow for more attempts
    
    console.log(`[nextEvent] Starting search from index ${nextIndex}`);
    
    // First pass: try to find an event that matches conditions
    while (nextIndex < updatedEvents.length && attempts < maxAttempts) {
      const nextEvent = updatedEvents[nextIndex];
      
      // Safety check: ensure event exists
      if (!nextEvent) {
        console.log(`[nextEvent] Event at index ${nextIndex} is undefined, skipping`);
        nextIndex++;
        attempts++;
        continue;
      }
      
      console.log(`[nextEvent] Checking event at index ${nextIndex}: ${nextEvent.id}, type: ${nextEvent.type}`);
      
      // If event has no conditions, or conditions are met, use it
      const conditionsMet = evaluateEventConditions(nextEvent, updatedState);
      console.log(`[nextEvent] Event ${nextEvent.id} conditions met: ${conditionsMet}`);
      
      if (conditionsMet) {
        console.log(`[nextEvent] Found valid event at index ${nextIndex}: ${nextEvent.id}`);
        set({ currentEventIndex: nextIndex, isTransitioning: false });
        return;
      }
      
      // Log why event was skipped
      if (nextEvent.metadata?.conditions) {
        console.log(`[nextEvent] Event ${nextEvent.id} skipped due to unmet conditions:`, nextEvent.metadata.conditions);
      }
      
      // Otherwise, skip to next event
      nextIndex++;
      attempts++;
    }
    
    // Log if we couldn't find any valid event
    if (attempts >= maxAttempts) {
      console.error('[nextEvent] No valid events found after max attempts');
      console.log(`[nextEvent] Searched ${attempts} events but found no valid event. Current index: ${updatedCurrentIndex}, events length: ${updatedEvents.length}`);
      console.log(`[nextEvent] Events around current index:`, {
        current: updatedEvents[updatedCurrentIndex]?.id,
        next: updatedEvents[updatedCurrentIndex + 1]?.id,
        next2: updatedEvents[updatedCurrentIndex + 2]?.id,
        next3: updatedEvents[updatedCurrentIndex + 3]?.id
      });
      
      // Strategy 1: Try to find ANY event without conditions
      console.log('[nextEvent] Strategy 1: Looking for unconditional events...');
      for (let i = updatedCurrentIndex + 1; i < updatedEvents.length; i++) {
        const evt = updatedEvents[i];
        if (!evt.metadata?.conditions) {
          console.log('[nextEvent] Found unconditional event as fallback:', evt.id);
          set({ currentEventIndex: i, isTransitioning: false });
          return;
        }
      }
      
      // Strategy 2: If we're near the end, trigger game ending
      if (updatedCurrentIndex >= updatedEvents.length - 3) {
        console.log('[nextEvent] Strategy 2: Near end of events, triggering game over');
        set({ 
          gameOver: true, 
          gameOverReason: 'Du har fullført scenarioet!',
          isTransitioning: false
        });
        return;
      }
      
      // Strategy 3: Last resort - loop back
      console.warn('[nextEvent] Strategy 3: Last resort - looping back to start');
      set({ currentEventIndex: 0, isTransitioning: false });
      return;
    }
    
    // If we've reached the end, loop back or end scenario
    if (nextIndex >= updatedEvents.length) {
      console.warn(`[nextEvent] Reached end of events (index ${nextIndex}), looping back`);
      // For now, loop back (Phase 2+ will have proper ending)
      set({ currentEventIndex: 0, isTransitioning: false });
      return;
    }
    
    // This should not be reached if logic above is correct
    console.warn('[nextEvent] Unexpected fallthrough, resetting to start');
    set({ currentEventIndex: 0, isTransitioning: false });
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
      // Clear active resource changes
      set({ activeResourceChanges: {} });
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
        delayedQueue: [],
        activeResourceChanges: {},
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
        delayedQueue: [],
        activeResourceChanges: {},
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
        delayedQueue: [],
        activeResourceChanges: {},
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
        delayedQueue: [],
      });
    }
  },

  // NEW: Change theme
  changeTheme: (theme: Theme) => {
    set({ theme });
  },

  // NEW: Change color scheme
  changeColorScheme: (scheme: ColorScheme) => {
    set({ colorScheme: scheme });
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

