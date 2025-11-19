import { Scenario } from '@/types/game';

export const klimapolitikkScenario: Scenario = {
  id: 'klimapolitikk',
  name: 'Klimapolitikk',
  description: 'Balanser mellom grønn omstilling og økonomisk realisme.',
  icon: '🌍',
  locked: true,  // Example: This could be paid content
  price: 49,
  events: [
    {
      id: 'klima_001',
      act: 1,
      character: 'Klimaaktivist',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Vi må stoppe all oljeleting umiddelbart! Fremtiden står på spill.',
      leftChoice: 'Støtt øyeblikkelig stopp',
      rightChoice: 'Gradvis utfasing',
      consequences: {
        left: { omdømme: 15, klient: -20, penger: -10 },
        right: { tillit: 10, omdømme: -5 }
      }
    },
    {
      id: 'klima_002',
      act: 1,
      character: 'Oljeindustri CEO',
      characterImage: '/placeholders/portrait-2.png',
      text: '100.000 arbeidsplasser står på spill. Vi trenger subsidier til å omstille oss.',
      leftChoice: 'Lobby for subsidier',
      rightChoice: 'La markedet bestemme',
      consequences: {
        left: { klient: 15, penger: 10, omdømme: -15 },
        right: { klient: -15, tillit: 5, omdømme: 10 }
      }
    },
    {
      id: 'klima_003',
      act: 1,
      character: 'Energiminister',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Skal vi satse på vindkraft eller atomkraft? Begge har sterke motstandere.',
      leftChoice: 'Vindkraft',
      rightChoice: 'Atomkraft',
      consequences: {
        left: { omdømme: 10, penger: -10 },
        right: { tillit: 10, omdømme: -10 }
      }
    },
    {
      id: 'klima_004',
      act: 1,
      character: 'Bilindustri',
      characterImage: '/placeholders/portrait-4.png',
      text: 'Forbudet mot bensin/diesel i 2025 er urealistisk. Vi trenger utsettelse.',
      leftChoice: 'Støtt utsettelse',
      rightChoice: 'Hold fristen',
      consequences: {
        left: { klient: 15, omdømme: -15 },
        right: { omdømme: 15, klient: -15 }
      }
    },
    {
      id: 'klima_005',
      act: 1,
      character: 'EU-kommisjonær',
      characterImage: '/placeholders/portrait-5.png',
      text: 'Norge må bidra mer til EUs klimafond. 10 milliarder kroner årlig.',
      leftChoice: 'Aksepter kravet',
      rightChoice: 'Forhandle ned',
      consequences: {
        left: { tillit: 15, penger: -15 },
        right: { tillit: -10, penger: 5 }
      }
    }
  ]
};

