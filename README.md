# Lobbyist - Political Satire Card Game

En politisk satire-basert kort-swipe-spill inspirert av Reigns, hvor du navigerer moralske dilemmaer som lobbyist.

🎮 **[Play Now](https://lobbyist.vercel.app)** (Vercel deployment)

## 🎯 Hva er dette?

Et kort-swipe-spill hvor du spiller som lobbyist og må balansere mellom klientenes interesser, politikernes tillit, firmaets økonomi og ditt offentlige omdømme. Hver beslutning har konsekvenser, og din spillestil unlocker spesielle karakterer og events.

## 🎮 Gameplay

- **Swipe kort** venstre/høyre for å ta beslutninger
- **Balanser 4 ressurser**: Klient 💼, Tillit 🤝, Penger 💰, Omdømme 📰
- **Overlev** så lenge som mulig uten at ressurser når 0 eller 100
- **Utforsk** ulike politiske scenarioer

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animasjoner)
- **Zustand** (state management)

## 📚 Legg til innhold

Se [INFRASTRUCTURE.md](./INFRASTRUCTURE.md) for komplett guide til å:
- Legge til nye scenarioer
- Lage nye events
- Endre temaer
- Utvide funksjonalitet

### Rask oversikt:

**Nytt scenario:**
1. Lag fil i `/data/scenarios/ditt-scenario.ts`
2. Importer i `/data/scenarios/index.ts`
3. Legg til i `allScenarios` array

**Nye events:**
Rediger eksisterende scenario-fil og legg til i `events` array.

## 🎨 Features

### ✅ Implementert
- ✅ Swipe-mekanikk med Framer Motion
- ✅ 4 ressurs-meters med sanntidsoppdatering
- ✅ Modulært scenario-system
- ✅ Tema-velger (5 farger)
- ✅ Settings-meny med fullskjerm overlay
- ✅ Game over-skjerm med statistikk
- ✅ Responsivt design (mobile-first)
- ✅ Support for låste/betalte scenarioer
- ✅ **Archetype System** - Unlock spillestiler basert på valg-mønstre
- ✅ **Threshold Events** - Spesielle events ved ekstreme ressurser (100)
- ✅ **Narrative Events** - Storytelling mellom valg

### 🔮 Planlagt (Phase 2+)
- ⏳ Delayed consequences (effekter flere runder senere)
- 🔗 Event chains (events som trigger hverandre)
- 📊 Hidden metrics (skjulte score)
- 🎯 Conditional events (kun vises under visse forhold)
- 💾 Save/load system
- 🎵 Lyd og musikk

## 📁 Prosjektstruktur

```
├── app/                    # Next.js app router
├── components/             # React-komponenter
├── data/
│   ├── scenarios/         # Event-scenarioer (legg til her!)
│   └── themes.ts          # Tema-konfigurasjon
├── store/
│   └── gameStore.ts       # Zustand state
├── types/
│   └── game.ts            # TypeScript types
└── public/
    └── placeholders/      # Bilder
```

## 🎯 Scenarioer

- **Intro: Lobbybransjen** 💼 - Dine første dager som lobbyist
- **Boligpolitikk** 🏠 - Husleietak vs byggesubsidier
- **Klimapolitikk** 🌍 - Grønn omstilling vs økonomisk realisme (🔒 låst)

## 🎨 Temaer

- Blå (Standard)
- Rød
- Grønn
- Lilla
- Nøytral

Åpne settings (⚙️) for å bytte tema og scenario.

## 🧪 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Deployment

Prosjektet er deployet via **Vercel**:

1. Push til GitHub
2. Import repo i Vercel
3. Auto-deploy ved hver push til main branch

**Live URL:** [lobbyist.vercel.app](https://lobbyist.vercel.app)

### Lokal utvikling

Debug-komponenten vises kun på `localhost`. I produksjon skjules den automatisk.

## 📚 Dokumentasjon

- **[INFRASTRUCTURE.md](./INFRASTRUCTURE.md)** - Guide til å legge til scenarioer og events
- **[ARCHETYPE_SYSTEM.md](./ARCHETYPE_SYSTEM.md)** - Dokumentasjon av archetype-systemet
- **[THRESHOLD_SYSTEM.md](./THRESHOLD_SYSTEM.md)** - Dokumentasjon av threshold events
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Guide for testing av archetype-systemet

## 📝 Lisens

Dette er et hobby-prosjekt for læring og satire.

---

**Laget med ❤️ og litt for mye kaffe ☕**
