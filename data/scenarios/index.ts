import { Scenario } from '@/types/game';
import { introLobbyistScenario } from './intro-lobbyist';
import { boligpolitikkScenario } from './boligpolitikk';
import { klimapolitikkScenario } from './klimapolitikk';

// ============================================================================
// ALL SCENARIOS
// ============================================================================
// To add a new scenario:
// 1. Create a new file in this directory (e.g., helsepolitikk.ts)
// 2. Import it above
// 3. Add it to the allScenarios array below
// ============================================================================

export const allScenarios: Scenario[] = [
  introLobbyistScenario,
  boligpolitikkScenario,
  klimapolitikkScenario,
];

// Helper function to get scenario by ID
export function getScenarioById(id: string): Scenario | undefined {
  return allScenarios.find(scenario => scenario.id === id);
}

// Helper function to get all unlocked scenarios
export function getUnlockedScenarios(): Scenario[] {
  return allScenarios.filter(scenario => !scenario.locked);
}

// Default scenario
export const DEFAULT_SCENARIO_ID = 'intro-lobbyist';

