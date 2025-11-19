# 🎭 Archetype System

## Konsept

Archetype-systemet gjør at spilleren kan unlocke spesielle "spillestiler" basert på valgmønstrene deres. I stedet for å bare fokusere på ressurser, tracker systemet **hvordan** du spiller, ikke bare **hva** du oppnår.

Når du konsekvent tar visse typer valg (f.eks. markedsorienterte valg, etiske valg, populistiske valg), vil systemet gjenkjenne din spillestil og unlocke en **Archetype** - en karakter som matcher din approach til spillet.

---

## Hvordan Det Fungerer

### 1. **Choice Tags**

Hvert valg i spillet er tagget med tags som beskriver valgets natur:

```typescript
{
  id: 'bolig_001',
  text: 'Husleiene i Oslo er ute av kontroll! Vi krever husleietak...',
  leftChoice: 'Støtt husleietak',
  rightChoice: 'Foreslå økt boligbygging',
  metadata: {
    choiceTags: {
      left: ['regulation', 'welfare', 'populist', 'public-appeal'],
      right: ['market', 'pragmatic', 'deregulation']
    }
  }
}
```

### 2. **Choice Tracking**

Når du tar et valg, lagres både valget og dets tags i `choiceHistory`:

```typescript
choiceHistory: [
  { eventId: 'bolig_001', choice: 'left', tags: ['regulation', 'welfare'], turn: 1 },
  { eventId: 'bolig_002', choice: 'right', tags: ['market', 'deregulation'], turn: 2 },
  // ...
]
```

### 3. **Archetype Conditions**

Hver archetype har unlock-conditions:

```typescript
{
  id: 'markedsliberalist',
  name: 'Markedsliberalisten',
  unlockConditions: {
    resources: {
      klient: { min: 70 },
      penger: { min: 60 },
      omdømme: { max: 50 }
    },
    choicePattern: [
      { tag: 'market', count: 3 },        // Valgt 'market' minst 3 ganger
      { tag: 'deregulation', count: 2 }   // Valgt 'deregulation' minst 2 ganger
    ],
    minTurn: 5  // Må ha spilt minst 5 runder
  }
}
```

### 4. **Archetype Unlock**

Etter hvert valg, sjekker systemet om du oppfyller conditions for noen archetype. Hvis ja:

1. **Pause spillet** med en vakker modal
2. **Vis archetype** med navn, ikon, beskrivelse
3. **Notify spilleren** om at nye special events er tilgjengelige
4. **Continue spillet** med den nye archetypens events i pool

---

## Eksempel: Markedsliberalisten

### Scenario

Du spiller Boligpolitikk-scenarioet og tar følgende valg:

1. **Event 1**: Velger "Foreslå økt boligbygging" → `['market', 'pragmatic', 'deregulation']`
2. **Event 2**: Velger "Lobby for fritak" → `['market', 'deregulation', 'client-first', 'profit']`
3. **Event 3**: Velger "Støtt markaåpning" → `['market', 'deregulation', 'pragmatic']`

### Resources

- Klient: 75
- Penger: 62
- Omdømme: 45
- Tillit: 55

### Result

Etter valg #3:
- `market` count: 3 ✅
- `deregulation` count: 3 ✅ (kun trengte 2)
- Resources: ✅
- Turn: 6 ✅ (over minimum 5)

→ **UNLOCK: Markedsliberalisten** 🎉

### Special Events

Du møter nå **Anders Lange-Junior**, en eiendomsutvikler som inviterer deg til en eksklusiv middag:

```
"Jeg har sett hvordan du opererer. Du forstår at Staten er problemet, 
ikke løsningen. Vi trenger folk som deg i kjernen av reformbevegelsen."

VALG:
← "Staten har en rolle å spille"
→ "Fortell meg mer om 'reformbevegelsen'..."
```

---

## Archetypes per Scenario

### Boligpolitikk

1. **📈 Markedsliberalisten**
   - High client satisfaction, high profit, low reputation
   - Tags: `market`, `deregulation`, `profit`
   - Character: Anders Lange-Junior (Eiendomsutvikler)

2. **⚖️ Sosialdemokraten**
   - Balanced resources, high trust and reputation
   - Tags: `welfare`, `regulation`, `pragmatic`
   - Character: Gro Harlem Brodersen (Tidligere Statsminister)

3. **📢 Populisten**
   - Very high reputation, low trust with politicians
   - Tags: `public-appeal`, `anti-establishment`, `media`
   - Character: Carl I. Hagen-sen (Mediegründer)

4. **🏛️ Byråkraten**
   - Very high trust, moderate all stats
   - Tags: `pragmatic`, `procedural`, `insider`
   - Character: Departementsdirektør Hansen

---

## Available Choice Tags

### Ideology
- `market` - Pro-markedsløsninger
- `regulation` - Pro-regulering
- `welfare` - Velferdsfokus
- `deregulation` - Anti-regulering

### Style
- `pragmatic` - Balansert, praktisk
- `ethical` - Etisk, transparent
- `populist` - Folkelig appell
- `anti-establishment` - Mot eliten

### Motivation
- `client-first` - Klient-fokus
- `profit` - Profittmotiv
- `public-appeal` - Publikumsappell
- `transparency` - Åpenhet

### Method
- `manipulation` - Spin, påvirkning
- `procedural` - Byråkratisk, korrekt
- `aggressive` - Konfronterende
- `collaboration` - Samarbeidsorientert

---

## Adding New Archetypes

### Step 1: Define the Archetype

Create a new file in `data/archetypes/[scenario].ts`:

```typescript
import { Archetype, Event } from '@/types/game';

const myArchetypeEvents: Event[] = [
  {
    id: 'archetype_myarchetype_intro',
    type: 'narrative',
    character: 'Special Character',
    characterImage: '/placeholders/portrait-special.png',
    text: 'Introduction text...'
  },
  {
    id: 'archetype_myarchetype_choice',
    character: 'Special Character',
    characterImage: '/placeholders/portrait-special.png',
    text: 'Choice text...',
    leftChoice: 'Option A',
    rightChoice: 'Option B',
    consequences: { /* ... */ }
  }
];

export const myArchetype: Archetype = {
  id: 'myarchetype',
  name: 'Min Archetype',
  description: 'Beskrivelse',
  icon: '🎯',
  unlockConditions: {
    resources: {
      klient: { min: 60 }
    },
    choicePattern: [
      { tag: 'mytag', count: 3 }
    ],
    minTurn: 4
  },
  specialEvents: myArchetypeEvents
};
```

### Step 2: Add to Registry

Update `data/archetypes/index.ts`:

```typescript
import { myArchetype } from './myscenario';

export const allArchetypes: Archetype[] = [
  ...boligpolitikkArchetypes,
  myArchetype
];
```

### Step 3: Tag Your Events

Add `choiceTags` to relevant events:

```typescript
{
  id: 'event_x',
  // ... other properties
  metadata: {
    choiceTags: {
      left: ['mytag', 'othertag'],
      right: ['differenttag']
    }
  }
}
```

---

## Best Practices

### 1. **Meaningful Tags**

Tags should reflect the **nature** of the choice, not just its consequences:

❌ Bad: `'gives-money'`, `'loses-reputation'`  
✅ Good: `'market'`, `'ethical'`, `'populist'`

### 2. **Consistent Tagging**

Use the same tags across events for consistency:

```typescript
// Event 1
leftChoice: 'Støtt husleietak',
tags: ['regulation', 'welfare']

// Event 2  
leftChoice: 'Støtt leietakervern',
tags: ['regulation', 'welfare']  // Same pattern!
```

### 3. **Balanced Requirements**

Don't make archetypes too easy or too hard to unlock:

- **Too easy**: `{ tag: 'market', count: 1 }` + no resource requirements
- **Too hard**: `{ tag: 'market', count: 10 }` + very specific resource ranges
- **Just right**: `{ tag: 'market', count: 3 }` + reasonable resource ranges

### 4. **Multiple Paths**

Create archetypes for different playstyles:
- Ethical player
- Profit-driven player
- Populist player
- Balanced player

---

## Future Enhancements

### Phase 1 (Current)
✅ Basic archetype system  
✅ Choice tracking  
✅ Unlock modal  
✅ Special events per archetype  

### Phase 2 (Future)
- [ ] Archetype "levels" (unlock variations)
- [ ] Archetype conflicts (can't be both X and Y)
- [ ] Hidden archetypes (easter eggs)
- [ ] Archetype-specific endings

### Phase 3 (Advanced)
- [ ] Meta-progression (unlock archetypes across scenarios)
- [ ] Archetype gallery (view all unlocked)
- [ ] Achievements tied to archetypes
- [ ] Shared archetype pool across scenarios

---

## Technical Details

### File Structure

```
data/
├── archetypes/
│   ├── index.ts              # Registry of all archetypes
│   ├── boligpolitikk.ts      # Boligpolitikk archetypes
│   └── klimapolitikk.ts      # (future)
├── scenarios/
│   └── *.ts                  # Events with choiceTags
└── threshold-events.ts       # Separate system

lib/
└── archetypeChecker.ts       # Logic for checking conditions

store/
└── gameStore.ts              # State management

components/
└── ArchetypeUnlock.tsx       # UI for archetype unlock
```

### State Management

```typescript
// Zustand store
{
  choiceHistory: ChoiceRecord[];     // All choices made
  unlockedArchetypes: ArchetypeId[]; // All unlocked IDs
  pendingArchetype?: Archetype;      // Waiting to be shown
}
```

### Checking Logic

```typescript
// After each choice:
1. applyConsequence(change, choice, event)
2. Track choice + tags in choiceHistory
3. checkArchetypeUnlock()
4. If matched:
   - Set pendingArchetype
   - Show modal
   - Add to unlockedArchetypes
```

---

## Summary

Archetype-systemet gjør spillet **replayable** og **personlig**:

- ✨ Belønner konsekvent spillestil
- 🎭 Låser opp unikt innhold basert på dine valg
- 📖 Forteller en historie om hvem du er som lobbyist
- 🎮 Gir grunner til å spille flere ganger

**Spill som markedsliberalist, sosialdemokrat, populist eller byråkrat - valget er ditt!**

