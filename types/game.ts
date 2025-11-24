// ============================================================================
// INFRASTRUCTURE: Scenarios & Themes
// ============================================================================

export interface Scenario {
  id: string;
  name: string;
  description: string;
  events: Event[];
  locked?: boolean;          // For future paid content
  price?: number;            // For future monetization
  icon?: string;             // Emoji or icon
}

export type Theme = 'blue' | 'red' | 'green' | 'purple' | 'neutral';

export interface ThemeConfig {
  id: Theme;
  name: string;
  gradient: string;         // Tailwind gradient classes
}

export type ColorScheme = 'venstre' | 'arbeiderpartiet' | 'hoyre' | 'noytral';

export interface ColorSchemeConfig {
  id: ColorScheme;
  name: string;
  description: string;
  background: string;  // Solid background color (WCAG compliant)
  progress: {
    low: string;        // Solid color for 0-25%
    medium: string;     // Solid color for 26-50%
    high: string;       // Solid color for 51-75%
    veryHigh: string;  // Solid color for 76-100%
  };
  glow: {
    low: string;
    medium: string;
    high: string;
    veryHigh: string;
  };
}

// ============================================================================
// PHASE 1: Core Types (implement now)
// ============================================================================

export interface ResourceChange {
  klient?: number;      // Client satisfaction
  tillit?: number;      // Trust with politicians
  penger?: number;      // Money/budget
  omdømme?: number;     // Public reputation
}

export type EventType = 'choice' | 'narrative';

export type ArchetypeId = 
  | 'idealist'
  | 'pragmatiker'
  | 'opportunist'
  | 'maktspiller'
  | 'populist'
  | 'merkantilist'
  | 'sosialdemokrat'
  | 'markedsliberalist'
  | 'byrakrat'
  | 'klimaaktivist'
  | 'teknologi-optimist';

export interface ChoiceTag {
  left: string[];
  right: string[];
}

export interface ThresholdTrigger {
  resource: 'klient' | 'tillit' | 'penger' | 'omdømme';
  threshold: 100 | 0;
  type: 'unlock' | 'warning';  // unlock = bonus event, warning = near game over
}

export interface ArchetypeUnlockCondition {
  resources?: {
    klient?: { min?: number; max?: number };
    tillit?: { min?: number; max?: number };
    penger?: { min?: number; max?: number };
    omdømme?: { min?: number; max?: number };
  };
  choicePattern?: {
    tag: string;
    count: number;
  }[];
  minTurn?: number;
}

export interface Archetype {
  id: ArchetypeId;
  name: string;
  description: string;
  icon: string;
  unlockConditions: ArchetypeUnlockCondition;
  specialEvents: Event[];
}

export interface ChoiceRecord {
  eventId: string;
  choice: 'left' | 'right';
  tags: string[];
  turn: number;
}

export interface Event {
  id: string;
  type?: EventType;               // 'choice' (default) or 'narrative' (story-only)
  act?: number;                   // Optional: 1, 2, 3, 4 (for progression)
  character: string;              // NPC name
  characterImage: string;         // Path to portrait
  text: string;                   // Event description
  
  // For 'choice' events (default):
  leftChoice?: string;            // Left swipe option text
  rightChoice?: string;           // Right swipe option text
  
  // Simple immediate consequences (Phase 1)
  consequences?: {
    left: ResourceChange;
    right: ResourceChange;
  };
  
  // Threshold event system
  isThresholdEvent?: boolean;     // Special event triggered at extremes
  triggerCondition?: ThresholdTrigger;
  
  // Extended features (Phase 2+) - optional!
  metadata?: EventMetadata;
}

export interface GameState {
  resources: {
    klient: number;
    tillit: number;
    penger: number;
    omdømme: number;
  };
  currentEventIndex: number;
  events: Event[];
  gameOver: boolean;
  gameOverReason?: string;
  turn: number;                   // Track game progression
  currentScenarioId: string;      // Active scenario
  theme: Theme;                   // Active theme
  colorScheme: ColorScheme;       // WCAG-compliant color scheme
  settingsOpen: boolean;          // Settings overlay state
  
  // Threshold event system
  thresholdEventsTriggered: string[];  // Track which thresholds reached
  specialEventPool: Event[];           // Pool of special threshold events
  
  // Archetype system
  choiceHistory: ChoiceRecord[];       // Track all choices made
  unlockedArchetypes: ArchetypeId[];   // Track unlocked archetypes
  pendingArchetype?: Archetype;        // Archetype waiting to be shown to player
  
  // Delayed consequences system
  delayedQueue: DelayedEffect[];       // Queue of delayed consequences waiting to trigger
  
  // Resource change animations
  activeResourceChanges: {
    klient?: number;
    tillit?: number;
    penger?: number;
    omdømme?: number;
  };
  
  // Transition guard
  isTransitioning: boolean;
  
  // Pending chain event to be processed in nextEvent
  pendingChainEventId?: string;
  pendingChainConsequence?: Event; // Consequence card for chain event
}

// ============================================================================
// PHASE 2+: Extended Types (structure now, implement later)
// ============================================================================

export interface EventMetadata {
  delayed?: {
    left?: DelayedConsequence;
    right?: DelayedConsequence;
  };
  chains?: {
    left?: string;              // Next event ID to trigger
    right?: string;
  };
  conditions?: Condition;        // When should this event appear?
  tags?: string[];               // For filtering/searching
  reflectionPrompt?: string;     // Mid-game introspection text
  choiceTags?: ChoiceTag;        // Tags for left/right choices (archetype system)
  isChainEvent?: boolean;        // Marked when event is inserted as a chain
}

export interface DelayedConsequence {
  turnsDelay: number;            // Trigger after X cards
  text: string;                  // What happened
  resourceChange: ResourceChange;
  hiddenMetrics?: HiddenMetricChange;
}

export interface HiddenMetricChange {
  velferd?: number;              // Real welfare impact
  ærlighet?: number;             // Intellectual honesty
  robusthet?: number;            // Systemic robustness
}

export interface Condition {
  resources?: Record<string, { min?: number; max?: number }>;
  turn?: { min?: number; max?: number };
  previousEvents?: string[];     // Required event choices
  act?: number;                  // Which act of the game
}

export interface DelayedEffect {
  eventId: string;               // Which event triggered this
  choice: 'left' | 'right';
  consequence: DelayedConsequence;
  triggerAtTurn: number;
}

// ============================================================================
// PHASE 3+: Advanced State (future)
// ============================================================================

export interface ExtendedGameState extends GameState {
  hiddenMetrics: {
    velferd: number;
    ærlighet: number;
    robusthet: number;
  };
  delayedQueue: DelayedEffect[];
  eventHistory: EventChoice[];
  unlockedCharacters: string[];
  act: number;
}

export interface EventChoice {
  eventId: string;
  choice: 'left' | 'right';
  turn: number;
}

