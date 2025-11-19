import { Archetype } from '@/types/game';
import { boligpolitikkArchetypes } from './boligpolitikk';

/**
 * ARCHETYPE REGISTRY
 * All available archetypes across all scenarios
 */

export const allArchetypes: Archetype[] = [
  ...boligpolitikkArchetypes,
  // Add more scenario archetypes here in the future:
  // ...klimapolitikkArchetypes,
  // ...helsepolitikkArchetypes,
];

/**
 * Get archetype by ID
 */
export function getArchetypeById(id: string): Archetype | undefined {
  return allArchetypes.find(a => a.id === id);
}

