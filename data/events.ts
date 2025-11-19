import { Event } from '@/types/game';

// ============================================================================
// PHASE 1: Simple events (no metadata)
// ============================================================================

export const initialEvents: Event[] = [
  {
    id: 'event_001',
    act: 1,
    character: 'Senior Partner',
    characterImage: '/placeholders/portrait-1.png',
    text: 'Velkommen til lobbybransjen. Første oppdrag: energiselskap vil ha subsidier til "grønn omstilling".',
    leftChoice: 'Støtt søknaden',
    rightChoice: 'Krev dokumentasjon',
    consequences: {
      left: { klient: 15, penger: 10, omdømme: -5 },
      right: { klient: -5, tillit: 10, omdømme: 5 }
    }
  },
  {
    id: 'event_002',
    act: 1,
    character: 'Stortingsrepresentant',
    characterImage: '/placeholders/portrait-2.png',
    text: 'Jeg kan påvirke komiteen, men jeg trenger "research" på konsekvensene.',
    leftChoice: 'Send ærlig rapport',
    rightChoice: 'Betalte eksperter',
    consequences: {
      left: { tillit: 15, klient: -10 },
      right: { klient: 15, penger: -10, omdømme: -5 }
    }
  },
  {
    id: 'event_003',
    act: 1,
    character: 'Medierådgiver',
    characterImage: '/placeholders/portrait-3.png',
    text: 'VG vil skrive kritisk sak om klienten din. Vi kan "påvirke" vinklingen.',
    leftChoice: 'Transparent respons',
    rightChoice: 'Spin & damage control',
    consequences: {
      left: { omdømme: 10, klient: -5 },
      right: { omdømme: -10, klient: 10, penger: -5 }
    }
  },
  {
    id: 'event_004',
    act: 1,
    character: 'Konkurranseutsatt CEO',
    characterImage: '/placeholders/portrait-4.png',
    text: 'Konkurrenten vår får ufortjente fordeler. Kan du "fikse" dette?',
    leftChoice: 'Lobby for like vilkår',
    rightChoice: 'Spill hardere spill',
    consequences: {
      left: { tillit: 10, penger: -5 },
      right: { klient: 15, tillit: -15, omdømme: -10 }
    }
  },
  {
    id: 'event_005',
    act: 1,
    character: 'Junior Lobbyist',
    characterImage: '/placeholders/portrait-5.png',
    text: 'Jeg oppdaget at klienten vår lyver i sine tall. Hva gjør vi?',
    leftChoice: 'Konfronter klienten',
    rightChoice: 'Ignorer det',
    consequences: {
      left: { klient: -20, tillit: 15, omdømme: 10 },
      right: { klient: 5, tillit: -10, omdømme: -15 }
    }
  }
];

