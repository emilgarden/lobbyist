# 🎮 Threshold Event System

## Oversikt

Når en ressurs når **100**, i stedet for game over, triggeres et **special threshold event**!

Dette belønner spillere for å maxe ut ressurser og gir tilgang til:
- 🎭 Absurde, satiriske karakterer
- 💎 Unike, ekstreme valg med høy risk/reward
- 🏆 Achievements som vises på game over-skjermen

## Hvordan Det Fungerer

### 1. Spilleren når 100 i en ressurs
```
Klient: 100 → "Lobbyist Messias" unlocked!
Tillit: 100 → "Politisk Insider" unlocked!
Penger: 100 → "Finanspyramiden" unlocked!
Omdømme: 100 → "Folkehelten" unlocked!
```

### 2. System injiserer 2 nye events
- **Narrative event** (introduksjon til mystisk karakter)
- **Choice event** (ekstremt valg med store konsekvenser)

### 3. Spilleren fortsetter
- Kan fortsette å spille med ny dynamikk
- Samme ressurs kan ikke trigge threshold igjen (tracked)
- Achievements vises på game over-skjermen

## Implementerte Threshold Events

### 💼 KLIENT = 100: "Lobbyist Messias"
**Karakter:** Mystisk Skygge-Klient  
**Valg:** Påvirke dataovervåkings-lovverk  
**Konsekvenser:**
- Avslå: -30 klient, +25 omdømme, -5 tillit
- Aksepter: +5 klient, +40 penger, -35 omdømme, -15 tillit

### 🤝 TILLIT = 100: "Politisk Insider"
**Karakter:** Statsministeren (privat middag!)  
**Valg:** Hjelpe med riksrevisjonen  
**Konsekvenser:**
- Avslå: -40 tillit, +20 omdømme
- Aksepter: +10 tillit, +25 klient, -40 omdømme, +30 penger

### 💰 PENGER = 100: "Finanspyramiden"
**Karakter:** Krypto-Milliardær  
**Valg:** Launch LobbyistCoin™  
**Konsekvenser:**
- Avslå: -25 penger, +15 omdømme
- Aksepter: +50 penger, -25 klient, -35 tillit, -50 omdømme

### 📰 OMDØMME = 100: "Folkehelten"
**Karakter:** Stortingsparti  
**Valg:** Bli politiker vs forbli lobbyist  
**Konsekvenser:**
- Politiker: +15 omdømme, -80 klient, -40 penger, +40 tillit
- Lobbyist: -35 omdømme, +35 klient, +25 penger

### 🎪 BONUS: Combo Events
**Flere kommer:** Illuminati, Oligarker, Nobelpriskomité, etc.

## Teknisk Implementasjon

### Filer Modifisert:
1. **`types/game.ts`** - Nye typer for ThresholdTrigger og tracking
2. **`store/gameStore.ts`** - Logikk for å injecte events ved 100
3. **`data/threshold-events.ts`** - 16+ special events (NYE!)
4. **`components/GameOver.tsx`** - Viser achievements

### Hvordan Legge Til Nye Threshold Events:

```typescript
// I /data/threshold-events.ts
{
  id: 'threshold_[resource]_100_intro',
  type: 'narrative',
  isThresholdEvent: true,
  triggerCondition: { 
    resource: 'klient', // eller tillit, penger, omdømme
    threshold: 100, 
    type: 'unlock' 
  },
  character: 'Karakter Navn',
  characterImage: '/placeholders/portrait-X.png',
  text: 'Introduksjonstekst når threshold nås...',
},
{
  id: 'threshold_[resource]_100_choice',
  isThresholdEvent: true,
  character: 'Samme Karakter',
  characterImage: '/placeholders/portrait-X.png',
  text: 'Valg-beskrivelse...',
  leftChoice: 'Alternativ A',
  rightChoice: 'Alternativ B',
  consequences: {
    left: { /* store endringer */ },
    right: { /* store endringer */ }
  }
}
```

## Testing

### Manuell Testing:
1. Start spill
2. Gjør valg som gir +klient til du når 100
3. Se threshold event triggeres automatisk
4. Fullført game over, se achievement badge

### Debug Tips:
```typescript
// Midlertidig: Sett initial resources høyt for testing
resources: {
  klient: 95,  // Nær threshold
  tillit: 50,
  penger: 50,
  omdømme: 50,
}
```

## Game Design Filosofi

**Før threshold-systemet:**
- 100 = game over (straff)
- Spillere unngår å maxe ressurser

**Etter threshold-systemet:**
- 100 = special content (belønning)
- Spillere ØNSKER å maxe ressurser
- Høyere replayability
- Mer interessante valg

## Fremtidige Utvidelser

### Combo Thresholds:
```typescript
// Trigger når FLERE ressurser er høye samtidig
if (klient > 75 && penger > 75) {
  // Oligark event
}
if (tillit > 75 && omdømme > 75) {
  // Nobelpris event
}
if (ALL > 75) {
  // Illuminati event
}
```

### Secret Endings:
```typescript
if (thresholdEventsTriggered.length === 4) {
  // Special ending: "Du mestret spillet"
}
```

### Warning Thresholds (Near 0):
```typescript
triggerCondition: { 
  resource: 'klient', 
  threshold: 0,  // Ved 10 eller lavere
  type: 'warning' 
}
// "Siste sjanse"-events
```

## Balansering

Threshold events skal:
- ✅ Ha STORE konsekvenser (±30-50 per ressurs)
- ✅ Være morsomt/satirisk
- ✅ Gjøre at spillere må velge hva de prioriterer
- ✅ Potensielt føre til game over raskt (høy risk/reward)

## Achievements System

Game over-skjermen viser:
```
🏆 Threshold Events Unlocked!

💼 Lobbyist Messias
🤝 Politisk Insider

Du nådde 100 i 2 ressurser og låste opp special events!
```

---

**Status:** ✅ Fully Implemented  
**Test:** http://localhost:3000

