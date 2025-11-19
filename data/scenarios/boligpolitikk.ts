import { Scenario } from '@/types/game';

export const boligpolitikkScenario: Scenario = {
  id: 'boligpolitikk',
  name: 'Boligpolitikk',
  description: 'Naviger i boligmarkedets komplekse dilemmaer. Husleietak eller byggesubsidier?',
  icon: '🏠',
  events: [
    {
      id: 'bolig_intro',
      type: 'narrative',
      character: 'Boligkrisen',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Oslo står midt i en boligkrise. Leieprisene skyter i været, førstegangskjøpere blir priset ut av markedet, og politiske spenninger øker. Du er engasjert for å navigere dette minefelte. Mål: Balanser mellom markedskrefter, sosial rettferdighet og økonomisk realisme.',
    },
    {
      id: 'bolig_001',
      act: 1,
      character: 'Boligaktivist',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Husleiene i Oslo er ute av kontroll! Vi krever husleietak på 12.000 kr/mnd. Vil dere støtte oss?',
      leftChoice: 'Støtt husleietak',
      rightChoice: 'Foreslå økt boligbygging',
      consequences: {
        left: { omdømme: 15, tillit: -10 },
        right: { tillit: 10, klient: -5 }
      },
      metadata: {
        choiceTags: {
          left: ['regulation', 'welfare', 'populist', 'public-appeal'],
          right: ['market', 'pragmatic', 'deregulation']
        }
      }
    },
    {
      id: 'bolig_002',
      act: 1,
      character: 'Eiendomsutvikler',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Reguleringene gjør det umulig å bygge lønnsomt. Vi trenger fritak fra krav om sosiale boliger.',
      leftChoice: 'Lobby for fritak',
      rightChoice: 'Avvis klientens krav',
      consequences: {
        left: { klient: 15, omdømme: -15 },
        right: { klient: -20, tillit: 10, omdømme: 10 }
      },
      metadata: {
        choiceTags: {
          left: ['market', 'deregulation', 'client-first', 'profit'],
          right: ['welfare', 'ethical', 'regulation']
        }
      }
    },
    {
      id: 'bolig_narrative',
      type: 'narrative',
      character: 'Økonomisk realitet',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Tallene begynner å bli tydelige: Hver beslutning har ringvirkninger langt utover det opplagte. Pristak høres bra ut, men kan få utleiere til å trekke seg fra markedet. Byggesubsidier hjelper, men koster penger. Ingenting er enkelt i boligpolitikk.',
    },
    {
      id: 'bolig_003',
      act: 1,
      character: 'Byråd for byutvikling',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Vi vurderer å åpne marka for utbygging. Det kan løse boligkrisen, men miljøorganisasjonene vil gå amok.',
      leftChoice: 'Støtt markaåpning',
      rightChoice: 'Forsvар marka',
      consequences: {
        left: { klient: 10, omdømme: -10, tillit: 5 },
        right: { omdømme: 15, klient: -10 }
      },
      metadata: {
        choiceTags: {
          left: ['market', 'deregulation', 'pragmatic', 'anti-establishment'],
          right: ['regulation', 'environmental', 'public-appeal']
        }
      }
    },
    {
      id: 'bolig_004',
      act: 1,
      character: 'Leieboerforening',
      characterImage: '/placeholders/portrait-4.png',
      text: 'Utleiere kan si opp leiekontrakter uten grunn. Vi trenger strengere beskyttelse av leietakere.',
      leftChoice: 'Støtt leietakervern',
      rightChoice: 'Forsvар utleiers rettigheter',
      consequences: {
        left: { omdømme: 10, klient: -15 },
        right: { klient: 15, omdømme: -10 }
      },
      metadata: {
        choiceTags: {
          left: ['regulation', 'welfare', 'public-appeal'],
          right: ['market', 'deregulation', 'client-first']
        }
      }
    },
    {
      id: 'bolig_005',
      act: 1,
      character: 'Finansdepartementet',
      characterImage: '/placeholders/portrait-5.png',
      text: 'Vi kan øke BSU-beløpet eller gi skattelette for førstegangskjøpere. Hva anbefaler dere?',
      leftChoice: 'Øk BSU-beløpet',
      rightChoice: 'Skattelette førstegangskjøp',
      consequences: {
        left: { omdømme: 10, penger: -5 },
        right: { tillit: 10, penger: 10 }
      },
      metadata: {
        choiceTags: {
          left: ['welfare', 'public-appeal', 'pragmatic'],
          right: ['market', 'pragmatic', 'procedural']
        }
      }
    }
  ]
};

