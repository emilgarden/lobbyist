# Character Arcs - NAV Scenario

This document maps the complete story arcs for the 4 main characters across all 3 acts, including branching outcomes based on player choices.

---

## 🎯 Character Arc Structure

Each character appears 3-4 times throughout the game:
- **Act 1**: Introduction and first decision (low stakes: ±5-10)
- **Act 2**: Follow-up showing consequences (moderate stakes: ±10-20)
- **Act 3**: Resolution/climax (high stakes: ±15-30)

---

## 👤 Kristian, 24 år (Sosial angst, folkehøyskole)

### Act 1: Event 2 - Første møte (Turn ~4-5)
**Situation**: Kristian trenger AAP for folkehøyskole, men oppfyller ikke 50%-regelen for medisinsk nedsatt arbeidsevne.

**Choices:**
- **Left (Strekk reglene)**: Klient +8, Omdømme -5, Tillit -5, Penger -3
  - *Delayed (12 turns)*: Kontrollenheten oppdager regelbrudd → Klient +10, Omdømme -15, Tillit -10
  
- **Right (Følg reglene)**: Omdømme +5, Tillit +5, Klient -8, Penger +3
  - *Delayed (12 turns)*: Kristian blir sykmeldt med depresjon → Klient -15, Tillit -15, Omdømme +5

**Tags**: `rule-bender` vs `rule-follower`, `client-first` vs `system-loyal`

---

### Act 1: Event 6 - Oppfølging (Turn ~8-10)
**Situation**: Kristian ber om støttebrev til folkehøyskole-søknad.

**Choices:**
- **Left (Skriv støttebrev)**: Klient +8, Tillit +5, Omdømme -5
  - *Delayed (11 turns)*: Han får plass, men ledelsen stiller spørsmål → Klient +10, Tillit +10, Omdømme -10
  
- **Right (Avslå)**: Omdømme +3, Klient -8, Tillit -3
  - *Delayed (11 turns)*: Han får ikke plass, hadde trengt støttebrevet → Klient -12, Tillit -8

**Tags**: `client-first` vs `procedural`

---

### Act 2: Event 12/13 - Variant basert på Event 2 valg (Turn ~20-24)

#### Variant A - Hvis valgte LEFT i Event 2 (ga AAP)
**Event**: Kontrollenheten konfronterer deg om regelbrudd.

**Choices:**
- **Left (Forsvar valget)**: Tillit +15, Omdømme -18, Klient +5
- **Right (Aksepter kritikken)**: Omdømme +10, Tillit -10, Klient -5

**Tags**: `courage` vs `resigned`

---

#### Variant B - Hvis valgte RIGHT i Event 2 (avslo AAP)
**Event**: Kristian kommer tilbake, sykmeldt med depresjon.

**Choices:**
- **Left (Erkjenn systemfeil)**: Tillit +15, Klient +10, Omdømme -10
- **Right (Forsvar reglene)**: Omdømme +5, Tillit -15, Klient -10

**Tags**: `ethical` vs `system-loyal`

---

### Act 3: Event 23 - Tredje møte (Turn ~32-36)
**Situation**: Kristian har fullført folkehøyskole, usikker på veien videre.

**Choices:**
- **Left (Ekstra oppfølging)**: Klient +15, Tillit +10, Penger -15, Omdømme -10
- **Right (Standard tiltak)**: Omdømme +10, Penger +5, Klient -15, Tillit -10

**Tags**: `client-first` vs `procedural`

---

## 👤 Mohammed, 45 år (Ryggskade, deltidsarbeid)

### Act 1: Event 3 - Første møte (Turn ~5-6)
**Situation**: Mohammed trenger arbeidstreningstiltak, dyrt vs billig.

**Choices:**
- **Left (Dyrt tiltak)**: Klient +8, Tillit +5, Penger -10, Omdømme -3
  - *Delayed (10 turns)*: Budsjett strammere → Penger -12, Omdømme -8
  
- **Right (Billig tiltak)**: Penger +5, Omdømme +3, Klient -8, Tillit -3
  - *Delayed (10 turns)*: Tiltaket fungerte ikke → Klient -12, Tillit -8

**Tags**: `budget-breaker` vs `penny-pincher`

---

### Act 1: Event 7 - Oppfølging (Turn ~10-12)
**Situation**: Mohammed trenger forlengelse av tiltak.

**Choices:**
- **Left (Forleng)**: Klient +8, Tillit +5, Penger -10, Omdømme -5
  - *Delayed (13 turns)*: Han får jobb takket være deg → Klient +20, Tillit +15, Penger -10, Omdømme +5
  
- **Right (Avslå)**: Penger +5, Omdømme +3, Klient -8, Tillit -5
  - *Delayed (13 turns)*: Han får ikke jobb, trengte mer tid → Klient -15, Tillit -15, Penger +5

**Tags**: `client-first` vs `system-loyal`

---

### Act 2: Event 14 - Mohammed i krise (Turn ~22-26)
**Situation**: Mohammed trenger akutt hjelp, ellers stopp av ytelse.

**Choices:**
- **Left (Gi tiltak)**: Klient +18, Tillit +10, Penger -20, Omdømme -15
  - *Chain*: Budsjettkrise → må kutte eller be om midler
  
- **Right (Støtt stopp)**: Penger +15, Omdømme +10, Klient -20, Tillit -18
  - *Chain*: Mohammed sliter, strategien fungerer ikke

**Tags**: `budget-breaker` vs `penny-pincher`

---

### Act 2: Event 19 - Tredje møte (Turn ~28-30)
**Situation**: Mohammed har deltidsarbeid, arbeidsgiver vil ha 100%.

**Choices:**
- **Left (Hjelp forhandle)**: Klient +18, Tillit +15, Penger -10, Omdømme -5
  - *Delayed (5 turns)*: Får tilpasset arbeidsplass → Klient +15, Tillit +15, Omdømme +5
  
- **Right (Henvise til tiltak)**: Omdømme +10, Penger +5, Klient -15, Tillit -10
  - *Delayed (5 turns)*: Mistet jobbtilbud → Klient -15, Tillit -12

**Tags**: `client-first` vs `procedural`

---

### Act 3: Event 26 - Fjerde møte (Turn ~36-38)
**Situation**: Mohammed har deltidsjobb i 6 mnd, trenger bedre lønn.

**Choices:**
- **Left (Aktiv hjelp)**: Klient +15, Tillit +10, Penger -10, Omdømme -5
- **Right (Standard kurs)**: Omdømme +10, Penger +5, Klient -15, Tillit -10

**Tags**: `client-first` vs `procedural`

---

## 👤 Mira, 31 år (Alenemor, barnets behov)

### Act 1: Event 5 - Første møte (Turn ~7-8)
**Situation**: Datteren trenger tannregulering (35.000kr), ikke dekket av sosialhjelp.

**Choices:**
- **Left (Godkjenn)**: Klient +10, Tillit +5, Omdømme -8, Penger -10
  - *Chain*: Andre brukere ber også om ekstra hjelp
  
- **Right (Avslå)**: Omdømme +5, Penger +3, Klient -10, Tillit -5
  - *Chain*: Mira kommer tilbake, situasjonen forverres

**Tags**: `rule-bender` vs `rule-follower`

---

### Act 1: Event 5 Chain A - Hvis godkjente (Turn ~8-9)
**Situation**: Andre brukere ber om samme behandling.

**Choices:**
- **Left (Gi alle lik behandling)**: Klient +8, Penger -10, Omdømme -5, Tillit +3
- **Right (Forklar unikhet)**: Omdømme +5, Tillit +5, Klient -5, Penger -3

**Tags**: `fairness` vs `pragmatic`

---

### Act 1: Event 5 Chain B - Hvis avslo (Turn ~8-9)
**Situation**: Mira kommer tilbake, datteren gråter hver kveld.

**Choices:**
- **Left (Finn løsning)**: Klient +8, Tillit +8, Omdømme -5, Penger -8
- **Right (Hold reglene)**: Omdømme +3, Penger +3, Klient -8, Tillit -8

**Tags**: `client-first` vs `resigned`

---

### Act 2: Event 21 - Oppfølging (Turn ~28-30)
**Situation**: Datteren trenger nå psykologhjelp, ikke dekket.

**Choices:**
- **Left (Finn løsning)**: Klient +18, Tillit +15, Penger -18, Omdømme -15
- **Right (Forklar ikke dekket)**: Omdømme +10, Penger +5, Klient -20, Tillit -18

**Tags**: `client-first` vs `rule-follower`

---

### Act 3: Event 25 - Tredje møte (Turn ~34-36)
**Situation**: Takk for tannregulering, men trenger fortsatt psykologhjelp.

**Choices:**
- **Left (Hjelp videre)**: Klient +20, Tillit +15, Penger -20, Omdømme -15
- **Right (Henvise videre)**: Omdømme +10, Penger +5, Klient -20, Tillit -15

**Tags**: `client-first` vs `procedural`

---

### Act 3: Event 28 - Desperasjon (Turn ~40-42, KLIMAKS)
**Situation**: Siste valg før outro. Datteren mobbes fortsatt.

**Choices:**
- **Left (Finn måte)**: Klient +25, Tillit +15, Omdømme -25, Penger -30
- **Right (Følg reglene)**: Omdømme +15, Penger +10, Klient -30, Tillit -20

**Tags**: `rule-bender` vs `rule-follower`, `courage` vs `resigned`

---

## 👤 Linda, 38 år (Tidligere rusavhengig, fagbrev)

### Act 1: Event 9 - Første møte (Turn ~12-14)
**Situation**: Linda vil ha fagbrev, tidligere misligholdt sjanser.

**Choices:**
- **Left (Gi sjanse)**: Klient +10, Tillit +8, Penger -10, Omdømme -5
  - *Delayed (12 turns)*: Hun er clean i 4 mnd, takknemlig → Klient +15, Tillit +15
  
- **Right (Avslå)**: Omdømme +5, Penger +5, Klient -10, Tillit -8
  - *Delayed (12 turns)*: Hun har falt tilbake i rus, fortapt → Klient -18, Tillit -18

**Tags**: `client-first` vs `resigned`

---

### Act 1: Event 10 - Oppfølging (Turn ~14-16)
**Situation**: Linda trenger barnehageplass for å kombinere skole og barn.

**Choices:**
- **Left (Hjelp aktivt)**: Klient +8, Tillit +8, Penger -8, Omdømme -5
  - *Delayed (15 turns)*: Hun fullfører år 1 → Klient +15, Tillit +15, Omdømme -5
  
- **Right (Henvise)**: Omdømme +3, Penger +3, Klient -8, Tillit -5
  - *Delayed (15 turns)*: Hun dropper ut → Klient -20, Tillit -20, Penger +10

**Tags**: `client-first` vs `procedural`

---

### Act 3: Event 22 - Tredje møte (Turn ~32-34)
**Situation**: Linda trenger praksisplass for å fortsette fagbrev.

**Choices:**
- **Left (Hjelp aktivt)**: Klient +20, Tillit +15, Penger -15, Omdømme -10
  - *Delayed (2 turns)*: Hun får praksisplass → Klient +20, Tillit +20, Omdømme -5
  
- **Right (Standard rutiner)**: Omdømme +10, Penger +5, Klient -20, Tillit -15

**Tags**: `client-first` vs `procedural`

---

## 🎭 Character Arc Patterns

### Recurring Themes Across Characters:

1. **Rule-Following Path**:
   - Act 1: Appears safe, maintains omdømme
   - Act 2: Delayed consequences show system failures
   - Act 3: Characters return worse off

2. **Client-First Path**:
   - Act 1: Small immediate costs
   - Act 2: System pushback, but clients improve
   - Act 3: Characters show gratitude, but resource strain

3. **Key Insight**: Both paths have costs, but the narrative reveals that the system itself creates impossible choices.

---

## 🔄 Replayability Through Character Outcomes

Players can replay to see:
- **Kristian**: Does he get to folkehøyskole without becoming sicker first?
- **Mohammed**: Does he find sustainable work within his limitations?
- **Mira**: Does her daughter get the help she needs?
- **Linda**: Does she break the cycle of dependency?

Each character's outcome depends on cumulative choices across multiple encounters, creating 3-4 distinct storylines per character.

---

## 📊 Character Encounter Timeline

```
Turn 1-3:   Welcome + Tutorial
Turn 4-5:   Kristian (Event 2)
Turn 5-6:   Mohammed (Event 3)
Turn 7-8:   Leder (Event 4)
Turn 8-9:   Mira (Event 5) + Chain
Turn 10-11: Kristian (Event 6)
Turn 12-13: Mohammed (Event 7)
Turn 13-14: Nye regler (Event 8)
Turn 14-15: Refleksjon (conditional)
Turn 15-16: Linda (Event 9)
Turn 16-17: Linda (Event 10)

[REVELATION MOMENT - Turn 17-18]

Turn 18-20: Budsjettkrise (Event 11)
Turn 20-22: Kristian Variant A/B (Event 12/13)
Turn 22-24: Mohammed krise (Event 14) + Chain
Turn 24-26: Conditional events (rule-follower/client-first)
Turn 26-28: Systemkrise narrative
Turn 28-30: Mohammed (Event 19)
Turn 30-31: Ledelsens press (Event 20)
Turn 31-32: Mira (Event 21)

[ACT 3 BEGINS - Turn 32+]

Turn 32-34: Det umulige valget (Event 17) + Chain
Turn 34-36: Linda (Event 22)
Turn 36-38: Kristian (Event 23)
Turn 38-39: Systemkollaps (Event 24)
Turn 39-40: Mira (Event 25)
Turn 40-41: Mohammed (Event 26)
Turn 41-42: Ledelsens siste krav (Event 27)
Turn 42-43: Mira desperasjon (Event 28) - KLIMAKS
Turn 44+:    Outro (4 variants based on resources)
```

---

## ✅ Character Arc Completeness Checklist

- ✅ **Kristian**: 4 encounters (Act 1 x2, Act 2 x1, Act 3 x1)
- ✅ **Mohammed**: 5 encounters (Act 1 x2, Act 2 x2, Act 3 x1)
- ✅ **Mira**: 4 encounters (Act 1 x2, Act 2 x1, Act 3 x2)
- ✅ **Linda**: 3 encounters (Act 1 x2, Act 3 x1)
- ✅ All characters have delayed consequences showing long-term impact
- ✅ All characters have branching paths based on player choices
- ✅ Character arcs span all 3 acts with escalating stakes

