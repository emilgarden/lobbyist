# Lobbyist Game - Infrastructure Guide

## Overview

Dette er en modulær infrastruktur for å enkelt legge til nytt innhold (scenarioer, events) og endre tema/stil på spillet.

## Arkitektur

### 🎭 Scenario System

Scenarioer er separate filer som inneholder events. Dette gjør det enkelt å:
- Legge til nytt innhold
- Organisere events tematisk
- Potensielt selge tilgang til premium-scenarioer

**Lokasjon:** `/data/scenarios/`

#### Hvordan legge til nytt scenario:

1. **Lag en ny fil** i `/data/scenarios/`, f.eks. `helsepolitikk.ts`

```typescript
import { Scenario } from '@/types/game';

export const helsepolitikkScenario: Scenario = {
  id: 'helsepolitikk',
  name: 'Helsepolitikk',
  description: 'Naviger i helsevesenets utfordringer og dilemmaer.',
  icon: '🏥',
  locked: false,  // Sett til true for å låse (premium content)
  price: 49,      // Pris hvis låst
  events: [
    {
      id: 'helse_001',
      character: 'Helseminister',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Vi må kutte i helsebudsjettet...',
      leftChoice: 'Kutt sykehuskøer',
      rightChoice: 'Behold ventetider',
      consequences: {
        left: { klient: 10, omdømme: -15 },
        right: { tillit: 10, klient: -10 }
      }
    },
    // Legg til flere events her...
  ]
};
```

2. **Importer i** `/data/scenarios/index.ts`

```typescript
import { helsepolitikkScenario } from './helsepolitikk';

export const allScenarios: Scenario[] = [
  introLobbyistScenario,
  boligpolitikkScenario,
  klimapolitikkScenario,
  helsepolitikkScenario,  // ← Legg til her
];
```

**Ferdig!** Scenariet vises automatisk i settings-menyen.

### 🎨 Theme System

Temaer kontrollerer bakgrunnsfargen på spillet.

**Lokasjon:** `/data/themes.ts`

#### Hvordan legge til nytt tema:

1. **Oppdater type** i `/types/game.ts`:

```typescript
export type Theme = 'blue' | 'red' | 'green' | 'purple' | 'neutral' | 'orange';
```

2. **Legg til tema** i `/data/themes.ts`:

```typescript
export const themes: Record<Theme, ThemeConfig> = {
  // ... eksisterende temaer
  orange: {
    id: 'orange',
    name: 'Oransje',
    gradient: 'bg-gradient-to-br from-orange-900 to-orange-700'
  }
};
```

**Ferdig!** Temaet vises automatisk i settings.

### 🎮 State Management (Zustand)

All spilltilstand håndteres i `/store/gameStore.ts`.

**Viktige actions:**
- `changeScenario(scenarioId)` - Bytter scenario og resetter spillet
- `changeTheme(theme)` - Endrer bakgrunnstema
- `toggleSettings()` - Åpner/lukker settings-menyen
- `applyConsequence(change)` - Oppdaterer ressurser etter et valg
- `resetGame()` - Starter spillet på nytt med samme scenario

### 📦 Component Structure

```
components/
├── SwipeCard.tsx          # Hovedkortet med swipe-funksjonalitet
├── ResourceBar.tsx        # Enkelt ressurs-meter
├── ResourceDisplay.tsx    # Alle 4 ressurser + runde-teller
├── GameOver.tsx           # Game over-skjerm
├── Settings.tsx           # Fullskjerm innstillingsmeny
└── SettingsButton.tsx     # Tannhjul-ikon for å åpne settings
```

## Filstruktur

```
lobbyristen/
├── app/
│   ├── page.tsx           # Hovedside - integrasjon av komponenter
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styling
├── components/            # UI-komponenter
├── store/
│   └── gameStore.ts       # Zustand state management
├── types/
│   └── game.ts            # TypeScript interfaces
├── data/
│   ├── scenarios/         # 🎯 Legg til nye scenarioer her!
│   │   ├── intro-lobbyist.ts
│   │   ├── boligpolitikk.ts
│   │   ├── klimapolitikk.ts
│   │   └── index.ts       # Registrer nye scenarioer her
│   └── themes.ts          # Tema-konfigurasjon
└── public/
    └── placeholders/      # Portrait-bilder
```

## Quick Start: Legge til innhold

### 1. Nytt Scenario (5 minutter)

```bash
# Kopier et eksisterende scenario
cp data/scenarios/boligpolitikk.ts data/scenarios/DITT_SCENARIO.ts

# Rediger filen:
# - Endre id, name, description, icon
# - Skriv nye events med character, text, choices, consequences

# Registrer i index.ts:
# - Import scenariet
# - Legg det til i allScenarios array
```

### 2. Nye Events i eksisterende scenario (2 minutter)

Åpne en scenario-fil og legg til nytt event-objekt i `events` array:

**Choice Event:**
```typescript
{
  id: 'unique_id_here',
  character: 'Karakter Navn',
  characterImage: '/placeholders/portrait-1.png',
  text: 'Event-beskrivelse her...',
  leftChoice: 'Venstre valg',
  rightChoice: 'Høyre valg',
  consequences: {
    left: { klient: 10, tillit: -5 },
    right: { omdømme: 15, penger: -10 }
  }
}
```

**Narrative Event:**
```typescript
{
  id: 'unique_narrative',
  type: 'narrative',
  character: 'Forteller',
  characterImage: '/placeholders/portrait-1.png',
  text: 'En informativ tekst som gir kontekst, feedback eller introduserer neste fase...'
}
```

### 3. Nytt Tema (1 minutt)

Legg til i `/data/themes.ts`:

```typescript
theme_id: {
  id: 'theme_id',
  name: 'Visningsnavn',
  gradient: 'bg-gradient-to-br from-color-900 to-color-700'
}
```

## 🎮 NEW: Threshold Event System

**Når en ressurs når 100, i stedet for game over, triggeres special events!**

Dette belønner spillere for å maxe ressurser og gir:
- 🎭 Absurde, satiriske karakterer (Oligarker, Krypto-Bros, Illuminati)
- 💎 Ekstreme valg med høy risk/reward
- 🏆 Achievements som vises på game over

**Eksempel:**
```
Klient når 100 → "Mystisk Skygge-Klient" kontakter deg
                → Ekstrem valg om dataovervåking
                → Fortsett spill med nye dynamikker
```

Se [THRESHOLD_SYSTEM.md](./THRESHOLD_SYSTEM.md) for full dokumentasjon.

---

## Event Types

Det finnes to typer events:

### 1. Choice Events (standard)
Normale kort hvor spilleren må velge mellom venstre og høyre valg ved å swipe.

```typescript
{
  id: 'event_001',
  type: 'choice',  // Optional - default hvis utelatt
  character: 'Politiker',
  characterImage: '/placeholders/portrait-1.png',
  text: 'Hva skal vi gjøre?',
  leftChoice: 'Alternativ A',
  rightChoice: 'Alternativ B',
  consequences: {
    left: { klient: 10, tillit: -5 },
    right: { omdømme: 15, penger: -10 }
  }
}
```

### 2. Narrative Events (storytelling)
Kort uten valg - kun informasjon eller feedback. Spilleren klikker "Fortsett →" knapp.

```typescript
{
  id: 'intro_welcome',
  type: 'narrative',
  character: 'Velkommen',
  characterImage: '/placeholders/portrait-1.png',
  text: 'Dette er en intro-tekst som forklarer situasjonen...',
  // Ingen leftChoice, rightChoice eller consequences
}
```

**Bruk narrative events til:**
- 📖 **Introduksjoner** - Forklare scenarioets mål og setting
- 💭 **Refleksjoner** - Gi feedback på spillerens valg
- 📊 **Story beats** - Bygge historien mellom valgene
- ⚠️ **Advarsler** - Informere om konsekvenser av tidligere valg

**Visuelle forskjeller:**
- Blå bakgrunn på portrett (vs grå for choice events)
- Blå ramme på tekstboks
- "Fortsett →" knapp (vs swipe-alternativer)
- Ingen swipe-funksjonalitet

## Event Consequences

Hver consequence kan endre 0-4 ressurser:

```typescript
consequences: {
  left: {
    klient: 10,      // +10 klient-tilfredshet
    tillit: -5,      // -5 politisk tillit
    penger: 0,       // Ingen endring (kan utelates)
    omdømme: -15     // -15 offentlig omdømme
  },
  right: { ... }
}
```

**Ressurser:**
- `klient` 💼 - Klienttilfredshet
- `tillit` 🤝 - Tillit hos politikere
- `penger` 💰 - Økonomi/budsjett
- `omdømme` 📰 - Offentlig omdømme

**Range:** 0-100
- **Game over** hvis noen ressurs når 0 eller 100

## Tips & Best Practices

### Event Design

1. **Balanserte valg** - Begge valg bør ha både fordeler og ulemper
2. **Dilemmaer** - Lag interessante avveininger (f.eks. klient vs omdømme)
3. **Variasjon** - Bland enkle og komplekse avgjørelser
4. **Storytelling** - La events bygge på hverandre tematisk
5. **Narrative events** - Bruk 1 intro + 1-2 refleksjoner per 5-6 choice events
6. **Feedback** - Gi kontekst og konsekvenser gjennom narrative kort

### Scenario Design

1. **5-7 choice events + 2-3 narrative events** per scenario er et godt utgangspunkt
2. **Struktur** - Start med intro (narrative) → 2-3 choices → midpoint feedback (narrative) → 2-3 choices → outro (narrative)
3. **Progresjon** - Start enkelt, øk kompleksiteten
4. **Tema** - Hold deg til ett politikkområde per scenario
5. **Testing** - Test at det er mulig å fullføre uten game over

### Resource Balancing

Start med små endringer (±5) og øk gradvis:
- **Små endringer:** ±5
- **Medium endringer:** ±10-15
- **Store endringer:** ±20+

## Future Extensions

Infrastrukturen støtter allerede (men bruker ikke ennå):

- **Delayed consequences** - Effekter som skjer flere runder senere
- **Event chains** - Events som trigger andre events
- **Conditions** - Events som kun vises under visse betingelser
- **Hidden metrics** - Skjulte score som vises ved game over
- **Acts** - Flertrinnsprogresjon gjennom spillet

Se `/types/game.ts` for komplette type-definisjoner.

## Testing

```bash
npm run dev
# Åpne http://localhost:3000

# Test:
# 1. Swipe kort (venstre/høyre)
# 2. Åpne settings (⚙️ øverst til høyre)
# 3. Bytt tema
# 4. Bytt scenario
# 5. Spill til game over
# 6. Restart
```

## Advanced Systems

### 🎭 Archetype System

Archetype-systemet lar spilleren unlocke spesielle "spillestiler" basert på valgmønstrene deres. Dette er et avansert system som belønner konsekvent spillestil og gir replayability.

**For fullstendig dokumentasjon, se [ARCHETYPE_SYSTEM.md](./ARCHETYPE_SYSTEM.md)**

**Quick Start:**
1. Tag valg med `choiceTags` i event metadata
2. Opprett archetype-definisjon i `data/archetypes/`
3. Legg til i archetype registry
4. Spilleren unlocker automatisk når conditions er oppfylt

**Eksempel:**
```typescript
{
  id: 'bolig_001',
  metadata: {
    choiceTags: {
      left: ['regulation', 'welfare'],
      right: ['market', 'deregulation']
    }
  }
}
```

### 🏆 Threshold Event System

Når en ressurs når 100, får spilleren spesielle "threshold events" istedenfor game over. Dette belønner ekstrem fokus på én ressurs.

**For fullstendig dokumentasjon, se [THRESHOLD_SYSTEM.md](./THRESHOLD_SYSTEM.md)**

---

## Troubleshooting

**Scenario vises ikke:**
- Sjekk at du har importert og lagt til i `allScenarios` array
- Sjekk at `locked: false` (eller utelat feltet)

**Tema virker ikke:**
- Sjekk at Tailwind har gradient-klassene (f.eks. `from-blue-900`)
- Restart dev server hvis du la til nye farger

**Portrait mangler:**
- Legg bilder i `/public/placeholders/`
- Refererer til dem som `/placeholders/filnavn.png`

**Archetype unlocker ikke:**
- Sjekk at events har `choiceTags` i metadata
- Sjekk at unlock conditions matcher spillerens valg og ressurser
- Se console for debug info

---

**Lykke til med å lage innhold! 🎮**

