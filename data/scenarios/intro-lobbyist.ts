import { Scenario } from '@/types/game';

export const introLobbyistScenario: Scenario = {
  id: 'intro-lobbyist',
  name: 'Intro: Lobbybransjen',
  description: 'Dine første dager som lobbyist. Lær å navigere mellom klienter, politikere og media.',
  icon: '💼',
  events: [
    {
      id: 'intro_welcome',
      type: 'narrative',
      character: 'Velkommen',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Du har nettopp startet som lobbyist i et av Oslos mest prestisjefylte lobbyfirmaer. Din jobb er å balansere mellom klientenes interesser, politikernes tillit, firmaets økonomi og ditt offentlige omdømme. Mål: Overlev så lenge som mulig uten at noen ressurs når 0 eller 100.',
    },
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
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'profit'],
          right: ['ethical', 'transparency', 'pragmatic']
        }
      }
    },
    {
      id: 'feedback_001',
      type: 'narrative',
      character: 'Refleksjon',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Første oppdrag gjennomført. Du merker allerede spenningen mellom å tilfredsstille klienten og opprettholde integriteten din. I lobbybransjen er det sjelden enkle svar.',
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
      },
      metadata: {
        choiceTags: {
          left: ['ethical', 'transparency', 'insider'],
          right: ['client-first', 'manipulation']
        }
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
      },
      metadata: {
        choiceTags: {
          left: ['transparency', 'ethical', 'public-appeal'],
          right: ['manipulation', 'client-first', 'media']
        }
      }
    },
    {
      id: 'narrative_midpoint',
      type: 'narrative',
      character: 'Utfordringer',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Media har begynt å stille spørsmål. Hver beslutning du tar får konsekvenser som ripplet utover. Du må tenke strategisk - ikke bare på hva som er riktig akkurat nå, men hva som er bærekraftig på lang sikt.',
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
      },
      metadata: {
        choiceTags: {
          left: ['pragmatic', 'regulation', 'fairness'],
          right: ['client-first', 'aggressive', 'anti-establishment']
        }
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
      },
      metadata: {
        choiceTags: {
          left: ['ethical', 'transparency', 'courage'],
          right: ['client-first', 'complicity']
        }
      }
    },
    {
      id: 'outro_intro',
      type: 'narrative',
      character: 'Refleksjon',
      characterImage: '/placeholders/portrait-5.png',
      text: 'Første runde fullført. Du begynner å forstå kompleksiteten i dette spillet. Hver avgjørelse har en kostnad. Spørsmålet er: hvor lenge kan du balansere disse kreftene? Spillet fortsetter nå i loop - se hvor lenge du kan overleve!',
    }
  ]
};

