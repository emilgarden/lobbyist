import { Archetype, Event } from '@/types/game';

/**
 * BOLIGPOLITIKK ARCHETYPES
 * These unlock based on player choices in the housing policy scenario
 */

// ============================================================================
// ARCHETYPE 1: MARKEDSLIBERALISTEN
// High client satisfaction, high profit, low reputation
// ============================================================================

const markedsliberalistEvents: Event[] = [
  {
    id: 'archetype_markedsliberalist_intro',
    type: 'narrative',
    character: 'Anders Lange-Junior',
    characterImage: '/placeholders/portrait-special-1.png',
    text: '📈 Du får en eksklusiv invitasjon til middag på Aker Brygge. En velkledd mann i 50-årene strekker ut hånden: "Jeg har sett hvordan du opererer. Du forstår at Staten er problemet, ikke løsningen. Velkommen til den virkelige reformbevegelsen."'
  },
  {
    id: 'archetype_markedsliberalist_choice',
    character: 'Anders Lange-Junior',
    characterImage: '/placeholders/portrait-special-1.png',
    text: '"Vi planlegger å starte en thinktank - Institusjon for Frihet. Med din erfaring og våre ressurser kan vi påvirke politikken fundamentalt. Ingen statlige subsidier, bare ren markedslogikk."',
    leftChoice: 'Staten har en rolle å spille',
    rightChoice: 'Fortell meg mer...',
    consequences: {
      left: { klient: -15, tillit: 10, omdømme: 10 },
      right: { klient: 20, penger: 35, omdømme: -15, tillit: -5 }
    },
    metadata: {
      choiceTags: {
        left: ['regulation', 'pragmatic'],
        right: ['market', 'deregulation', 'libertarian']
      }
    }
  }
];

export const markedsliberalist: Archetype = {
  id: 'markedsliberalist',
  name: 'Markedsliberalisten',
  description: 'Du tror på markedets usynlige hånd',
  icon: '📈',
  unlockConditions: {
    resources: {
      klient: { min: 70 },
      penger: { min: 60 },
      omdømme: { max: 50 }
    },
    choicePattern: [
      { tag: 'market', count: 3 },
      { tag: 'deregulation', count: 2 }
    ],
    minTurn: 5
  },
  specialEvents: markedsliberalistEvents
};

// ============================================================================
// ARCHETYPE 2: SOSIALDEMOKRATEN
// Balanced resources, high trust and reputation
// ============================================================================

const sosialdemokratEvents: Event[] = [
  {
    id: 'archetype_sosialdemokrat_intro',
    type: 'narrative',
    character: 'Gro Harlem Brodersen',
    characterImage: '/placeholders/portrait-special-2.png',
    text: '⚖️ En invitasjon til Hurdalssjøen. Den tidligere statsministeren møter deg ved dørene: "Det er sjeldent å se noen som forstår at makt må balanseres med ansvar. Jeg vil at du skal møte noen i partiledelsen."'
  },
  {
    id: 'archetype_sosialdemokrat_choice',
    character: 'Gro Harlem Brodersen',
    characterImage: '/placeholders/portrait-special-2.png',
    text: '"Vi trenger folk som deg inne i systemet. Ikke som konsulent, men som rådgiver med reell innflytelse. Du kan være med å forme den nye sosialdemokratiske kursen."',
    leftChoice: 'Jeg foretrekker uavhengighet',
    rightChoice: 'Hvilke konkrete saker?',
    consequences: {
      left: { klient: 10, tillit: -10, omdømme: 10 },
      right: { tillit: 20, omdømme: 15, penger: -5, klient: -10 }
    },
    metadata: {
      choiceTags: {
        left: ['independence', 'pragmatic'],
        right: ['collaboration', 'welfare', 'regulation']
      }
    }
  }
];

export const sosialdemokrat: Archetype = {
  id: 'sosialdemokrat',
  name: 'Sosialdemokraten',
  description: 'Balanse mellom marked og velferd',
  icon: '⚖️',
  unlockConditions: {
    resources: {
      tillit: { min: 70 },
      omdømme: { min: 60 },
      klient: { min: 30, max: 70 }
    },
    choicePattern: [
      { tag: 'welfare', count: 3 },
      { tag: 'regulation', count: 2 },
      { tag: 'pragmatic', count: 2 }
    ],
    minTurn: 5
  },
  specialEvents: sosialdemokratEvents
};

// ============================================================================
// ARCHETYPE 3: POPULISTEN
// Very high reputation, but low trust with politicians
// ============================================================================

const populistEvents: Event[] = [
  {
    id: 'archetype_populist_intro',
    type: 'narrative',
    character: 'Carl I. Hagen-sen',
    characterImage: '/placeholders/portrait-special-3.png',
    text: '📢 "Du er blitt en FOLKEHELT!" proklamerer overskriften i det nyoppstartede nettmediet. Grunnleggeren ringer deg: "Folk elsker deg fordi du snakker SANT. Ikke det politikere vil høre, men hva FOLKET trenger å høre."'
  },
  {
    id: 'archetype_populist_choice',
    character: 'Carl I. Hagen-sen',
    characterImage: '/placeholders/portrait-special-3.png',
    text: '"Bli med som fast kommentator. Vi når 500k nordmenn hver uke. Du kan si det politikerne ikke tør. Ingen redaktører, ingen sensur, bare SANNHETEN."',
    leftChoice: 'For risikabelt for mitt omdømme',
    rightChoice: 'Jeg vil ha redaksjonell kontroll',
    consequences: {
      left: { omdømme: -10, tillit: 10, klient: 5 },
      right: { omdømme: 20, tillit: -20, penger: 20, klient: -5 }
    },
    metadata: {
      choiceTags: {
        left: ['caution', 'professional'],
        right: ['populist', 'media', 'anti-establishment']
      }
    }
  }
];

export const populist: Archetype = {
  id: 'populist',
  name: 'Populisten',
  description: 'Folkets stemme mot eliten',
  icon: '📢',
  unlockConditions: {
    resources: {
      omdømme: { min: 80 },
      tillit: { max: 40 }
    },
    choicePattern: [
      { tag: 'public-appeal', count: 3 },
      { tag: 'anti-establishment', count: 2 }
    ],
    minTurn: 4
  },
  specialEvents: populistEvents
};

// ============================================================================
// ARCHETYPE 4: BYRÅKRATEN
// Very high trust, moderate all stats, pragmatic choices
// ============================================================================

const byrakratEvents: Event[] = [
  {
    id: 'archetype_byrakrat_intro',
    type: 'narrative',
    character: 'Departementsdirektør Hansen',
    characterImage: '/placeholders/portrait-special-4.png',
    text: '🏛️ Et diskret møte på Stortinget. Departementsdirektøren: "Du har en unik egenskap - du forstår systemet. Ikke som en outsider som kritiserer, men som en insider som vet hvordan ting faktisk fungerer."'
  },
  {
    id: 'archetype_byrakrat_choice',
    character: 'Departementsdirektør Hansen',
    characterImage: '/placeholders/portrait-special-4.png',
    text: '"Vi trenger noen som kan navigere mellom politikk og administrasjon. Spesialrådgiver, direkte under statsråden. Innflytelse uten synlighet."',
    leftChoice: 'Jeg foretrekker synlighet',
    rightChoice: 'Hvilke saker er prioritert?',
    consequences: {
      left: { omdømme: 10, tillit: -5, klient: 5 },
      right: { tillit: 25, penger: 25, omdømme: -10, klient: -5 }
    },
    metadata: {
      choiceTags: {
        left: ['visibility', 'independence'],
        right: ['bureaucratic', 'insider', 'pragmatic']
      }
    }
  }
];

export const byrakrat: Archetype = {
  id: 'byrakrat',
  name: 'Byråkraten',
  description: 'Systemets mester',
  icon: '🏛️',
  unlockConditions: {
    resources: {
      tillit: { min: 75 },
      klient: { min: 40, max: 70 },
      omdømme: { min: 40, max: 70 }
    },
    choicePattern: [
      { tag: 'pragmatic', count: 4 },
      { tag: 'procedural', count: 2 }
    ],
    minTurn: 6
  },
  specialEvents: byrakratEvents
};

// Export all boligpolitikk archetypes
export const boligpolitikkArchetypes = [
  markedsliberalist,
  sosialdemokrat,
  populist,
  byrakrat
];

