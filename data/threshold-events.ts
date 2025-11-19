import { Event } from '@/types/game';

// ============================================================================
// THRESHOLD EVENTS - Special events når ressurser når 100
// ============================================================================
// Disse triggeres automatisk når en ressurs når 100
// De gir spilleren unike, absurde valg med høy risiko/reward
// ============================================================================

export const thresholdEvents: Event[] = [
  
  // ============================================================================
  // KLIENT = 100: "Lobbyist Messias"
  // ============================================================================
  {
    id: 'threshold_klient_100_intro',
    type: 'narrative',
    isThresholdEvent: true,
    triggerCondition: { resource: 'klient', threshold: 100, type: 'unlock' },
    character: 'Mystisk Klient',
    characterImage: '/placeholders/portrait-1.png',
    text: '🎩 KLIENT MASTERY! Du er nå LEGENDARISK blant klienter. En mystisk figur i dress og solbriller kontakter deg: "Vi representerer... interesser som foretrekker å forbli anonyme. Dine ferdigheter har ikke gått ubemerket. Vi har et... delikat oppdrag."',
  },
  {
    id: 'threshold_klient_100_choice',
    isThresholdEvent: true,
    character: 'Skygge-Klienten',
    characterImage: '/placeholders/portrait-1.png',
    text: 'Vi kan tilby deg ubegrensede ressurser. Alt du trenger å gjøre er å "påvirke" denne lille lovsaken om dataovervåking. Helt lovlig. Teknisk sett. Kanskje.',
    leftChoice: 'Takk, men nei takk',
    rightChoice: 'La oss snakke tall... 💰',
    consequences: {
      left: { klient: -30, omdømme: 25, tillit: -5 },
      right: { klient: 5, penger: 40, omdømme: -35, tillit: -15 }
    }
  },

  // ============================================================================
  // TILLIT = 100: "Politisk Insider"
  // ============================================================================
  {
    id: 'threshold_tillit_100_intro',
    type: 'narrative',
    isThresholdEvent: true,
    triggerCondition: { resource: 'tillit', threshold: 100, type: 'unlock' },
    character: 'Statsministeren',
    characterImage: '/placeholders/portrait-2.png',
    text: '👔 TILLIT MASTERY! Statsministeren inviterer deg personlig til PRIVAT middag på Inkognitogate 18. "Du er en av få jeg virkelig stoler på. Vi trenger... diskré rådgivning i en følsom sak."',
  },
  {
    id: 'threshold_tillit_100_choice',
    isThresholdEvent: true,
    character: 'Statsministeren',
    characterImage: '/placeholders/portrait-2.png',
    text: 'Mellom oss: Jeg vurderer å gå av. Men først må vi "ordne" noen ting i riksrevisjonen. Du vet hvordan systemet fungerer... Kan jeg stole på deg?',
    leftChoice: 'Dette er for langt, selv for meg',
    rightChoice: 'Jeg kjenner folk i riksrevisjonen',
    consequences: {
      left: { tillit: -40, omdømme: 20 },
      right: { tillit: 10, klient: 25, omdømme: -40, penger: 30 }
    }
  },

  // ============================================================================
  // PENGER = 100: "Finanspyramiden"
  // ============================================================================
  {
    id: 'threshold_penger_100_intro',
    type: 'narrative',
    isThresholdEvent: true,
    triggerCondition: { resource: 'penger', threshold: 100, type: 'unlock' },
    character: 'Krypto-Milliardær',
    characterImage: '/placeholders/portrait-3.png',
    text: '🚀 PENGER MASTERY! En excentrisk tech-milliardær sender deg DM på LinkedIn: "Bro, jeg så tallene dine. Sick gains! Vil du inn på noe som er DEFINITIVT ikke et pyramidespill? For real for real."',
  },
  {
    id: 'threshold_penger_100_choice',
    isThresholdEvent: true,
    character: 'Krypto-Bro',
    characterImage: '/placeholders/portrait-3.png',
    text: 'Vi launcher LobbyistCoin™. Du får 10% av tokens. Alt du må gjøre er å pitche det til Finanstilsynet som "desentralisert demokrati-teknologi". Diamond hands! 💎🙌',
    leftChoice: 'Dette er ÅPENBART svindel',
    rightChoice: 'To the moon! 🚀🌕',
    consequences: {
      left: { penger: -25, omdømme: 15 },
      right: { penger: 50, klient: -25, tillit: -35, omdømme: -50 }
    }
  },

  // ============================================================================
  // OMDØMME = 100: "Folkehelten"
  // ============================================================================
  {
    id: 'threshold_omdømme_100_intro',
    type: 'narrative',
    isThresholdEvent: true,
    triggerCondition: { resource: 'omdømme', threshold: 100, type: 'unlock' },
    character: 'NRK Dagsrevyen',
    characterImage: '/placeholders/portrait-4.png',
    text: '📺 OMDØMME MASTERY! "Lobbyisten som ble folkehelt!" Du er på forsiden av alle aviser. VG vil lage dokumentar. Men popularitet tiltrekker... interessante folk.',
  },
  {
    id: 'threshold_omdømme_100_choice',
    isThresholdEvent: true,
    character: 'Stortingsparti',
    characterImage: '/placeholders/portrait-5.png',
    text: 'Med din popularitet kan du VINNE stortingsvalg! Vi vil ha deg på førsteplass. Men da må du kutte alle bånd til lobbybransjen. Fullstendig. Offentlig. På direkten.',
    leftChoice: 'Bli politiker 🏛️',
    rightChoice: 'Forbli lobbyist 💼',
    consequences: {
      left: { omdømme: 15, klient: -80, penger: -40, tillit: 40 },
      right: { omdømme: -35, klient: 35, penger: 25 }
    }
  },

  // ============================================================================
  // BONUS: Combo Threshold Events
  // ============================================================================
  {
    id: 'threshold_combo_klient_penger',
    type: 'narrative',
    isThresholdEvent: true,
    character: 'Oligark',
    characterImage: '/placeholders/portrait-1.png',
    text: '🛩️ *Tung aksent* "My friend, you are very good at make money AND please clients. I have dacha in Monaco. We discuss... business opportunities, da?"',
  },
  {
    id: 'threshold_combo_klient_penger_choice',
    isThresholdEvent: true,
    character: 'Oligark',
    characterImage: '/placeholders/portrait-1.png',
    text: 'I need someone to help me with... how you say... "investment consultations" in Norwegian oil sector. Very legal. Very cool. Payment in Bitcoin.',
    leftChoice: '🚫 FBI has entered the chat',
    rightChoice: 'Da! Privyet! 🍾',
    consequences: {
      left: { klient: -15, omdømme: 10 },
      right: { klient: 10, penger: 60, tillit: -40, omdømme: -40 }
    }
  },

  {
    id: 'threshold_combo_tillit_omdømme',
    type: 'narrative',
    isThresholdEvent: true,
    character: 'Norsk Nobelpriskomité',
    characterImage: '/placeholders/portrait-2.png',
    text: '🏆 "Gratulerer! Du er nominert til Nobels Fredspris for "brobygging mellom næringsliv og politikk." Dette har aldri skjedd før...',
  },
  {
    id: 'threshold_combo_tillit_omdømme_choice',
    isThresholdEvent: true,
    character: 'Nobelpriskomité',
    characterImage: '/placeholders/portrait-2.png',
    text: 'Men vi må vite: Har du NOEN gang tatt moralsk tvilsomme oppdrag? Vær helt ærlig. Dette går ut på direkten på NRK.',
    leftChoice: 'Lyv som en politiker',
    rightChoice: 'Vær brutalt ærlig',
    consequences: {
      left: { tillit: -60, omdømme: 20 },
      right: { tillit: 20, omdømme: -50, klient: -30 }
    }
  },

  // ============================================================================
  // ULTIMATE: Alle ressurser > 75
  // ============================================================================
  {
    id: 'threshold_ultimate_balance',
    type: 'narrative',
    isThresholdEvent: true,
    character: '??? Illuminati ???',
    characterImage: '/placeholders/portrait-3.png',
    text: '🔺 Du har balansert det perfekt. Litt FOR perfekt. Vi har holdt øye med deg. Tid for det STORE spillet? Vi kontrollerer ikke verden, men... vi kjenner de som gjør det.',
  },
  {
    id: 'threshold_ultimate_balance_choice',
    isThresholdEvent: true,
    character: 'Den Indre Sirkelen',
    characterImage: '/placeholders/portrait-4.png',
    text: 'Møt oss ved statuen på Frognerparken. Midnatt. Kom alene. Fortell ingen. Du vet for mye til å avslå. Eller vet du...?',
    leftChoice: 'Absolutely NOT 🏃💨',
    rightChoice: 'Jeg kommer... 🕵️',
    consequences: {
      left: { klient: -20, tillit: -20, omdømme: 30 },
      right: { klient: 30, tillit: 30, penger: 50, omdømme: -60 }
    }
  },

];

