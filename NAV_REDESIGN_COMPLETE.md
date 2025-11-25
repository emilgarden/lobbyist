# NAV Scenario - Komplett Redesign Fullført

## ✅ Implementert

### Act 1: Byråkratisk Introduksjon (Event 1-16)
**Mål**: Introdusere karakterene gjennom administrative situasjoner med lav emosjonell vekt.

#### Struktur
- **Event 1-3**: Velkommen, Tutorial, Intro (uendret)
- **Event 4-6**: Kristian (3 kort) - Aktivitetsplikt, jobbsøkingslogg, kursvalg
- **Event 7-9**: Mohammed (3 kort) - Ergonomisk utstyr, tiltaksbytte, reisegodtgjørelse
- **Event 10-12**: Mira (3 kort) - Transportstøtte, møtetid, dokumentasjonshjelp
- **Event 13-15**: Linda (3 kort) - Oppfølgingsfrekvens, søknadshjelp, referansebrev
- **Event 16**: System-narrativ "Fire uker senere"

#### Konsekvenser (±2-6 range)
- **Byråkratisk fokus**: Frister, møtetider, budsjettsporsmål
- **Nøytralt språk**: Observasjoner, ikke emosjonelle påstander
- **Balansert**: Begge valg er forsvarlige

#### Delayed Consequences (4 stk)
1. **Kristian 3** (Event 6): Hvis standard stort kurs → melder seg av etter dag 2 (delay 10)
2. **Mohammed 3** (Event 9): Hvis standard buss → slutter på tiltak (delay 11)
3. **Mira 3** (Event 12): Hvis henviser til veiledning → feil utfylt, ikke barnebidrag (delay 12)
4. **Linda 3** (Event 15): Hvis ikke referansebrev → fikk ikke leilighet (delay 13)

### Act 2: Eskalering (Event 17-25)
**Mål**: Introdusere større dilemmaer med delayed consequences fra Act 1.

#### Struktur
- **Event 17**: Revelation moment "To måneder senere"
- **Event 18**: Kristian AAP dilemma (±10-15 range)
- **Event 19**: Mohammed tiltakskrise (±12-18 range)
- **Event 20**: Mira barnas behov / tannregulering (±18-20 range) ← Hovedvalg
- **Event 21**: Linda fagbrev-sjanse (±15-18 range)
- **Event 22**: System budsjettkrise (±20 range)

#### Språk
- **Nøytralt beskrivende**: "Han ser sliten ut" i stedet for "Han er deprimert"
- **Observasjoner**: "Datteren kommer ikke på skolen lenger" i stedet for emosjonell appell
- **Faktabasert**: Konkrete tall og situasjoner

### Act 3: Krise og Konklusjon (Event 26-34)
**Mål**: High-stakes situations og multiple endings.

#### Struktur
- **Event 26**: Act 3 intro "Seks måneder senere"
- **Event 27**: Kristian oppfølging (±15-18 range)
- **Event 28**: Mohammed arbeid vs uførhet (±12-20 range)
- **Event 29**: Mira desperate situasjon (±25-30 range) - KLIMAKS
- **Event 30**: Linda konklusjon (±18-20 range)
- **Event 31**: Systemkollaps narrative
- **Event 32-35**: 4 ending variants

#### Endings (Conditional)
1. **Utbrenthet**: Hvis tillit < 20
2. **Oppsigelse**: Hvis omdømme < 20
3. **Resignasjon**: Hvis klient < 25
4. **Forståelse**: Hvis alle > 20

---

## 🔢 Balanseverifikasjon

### "Følg Systemet" Path (Right Choices, Act 1)

```
Event 4:  +5 omdømme, +2 penger, -2 klient, +2 tillit
Event 5:  +4 omdømme, +2 penger, -2 klient, +2 tillit
Event 6:  +5 omdømme, +3 penger, -3 klient, +2 tillit
Event 7:  +5 omdømme, +3 penger, -3 klient, +2 tillit
Event 8:  +6 omdømme, +4 penger, -4 klient, +3 tillit
Event 9:  +5 omdømme, +3 penger, -3 klient, +2 tillit
Event 10: +5 omdømme, +2 penger, -3 klient, +2 tillit
Event 11: +4 omdømme, +2 penger, -2 klient, +2 tillit
Event 12: +5 omdømme, +2 penger, -3 klient, +2 tillit
Event 13: +7 omdømme, +4 penger, -4 klient, +3 tillit
Event 14: +5 omdømme, +3 penger, -3 klient, +2 tillit
Event 15: +5 omdømme, +2 penger, -3 klient, +2 tillit

Akkumulert etter Act 1:
Klient:  50 - 35 = 15 ✅ (akkurat over game over threshold)
Tillit:  50 + 26 = 76 ✅
Penger:  50 + 32 = 82 ✅
Omdømme: 50 + 61 = 100 ✅ (capped)
```

**RESULTAT**: Spillbart! Ingen game over i runde 7 eller senere i Act 1.

---

## ✅ Bugs Fikset

### 1. Mira Continuity Bug
**Problem**: Event 25 refererte til at "datteren har fått tannregulering" selv om spilleren kan ha avslo.

**Løsning**: Fjernet problematisk event. I ny struktur:
- Act 2 Event 20: Tannregulerings-valget skjer
- Delayed consequences viser utfall for begge valg
- Act 3 Event 29: Refererer generelt til "barnas situasjon" uten å anta tidligere valg

### 2. Balanse-Problem
**Problem**: Spilleren tapte i runde 7 ved å følge systemet.

**Løsning**: 
- Reduserte negative klient-konsekvenser fra -5/-8 til -2/-4 i Act 1
- Verifisert at "følg systemet" gir klient = 15 etter Act 1
- Alle ressurser holder seg over game over threshold (15)

### 3. Emosjonell Tone
**Problem**: For emosjonelt intense situasjoner i Act 1.

**Løsning**:
- Act 1: Byråkratiske situasjoner (frister, møtetider, budsjett)
- Act 2: Større dilemmaer, men nøytralt språk (observasjoner)
- Act 3: Intense situasjoner, men faktabasert beskrivelse

---

## 📊 Spillopplevelse

### Act 1 (Event 1-16): Introduksjon
- **Tone**: Administrativ, byråkratisk
- **Stakes**: Lave (±2-6)
- **Opplevelse**: "Dette er en vanlig jobb"
- **Varighet**: ~15-20 minutter

### Act 2 (Event 17-25): Eskalering
- **Tone**: Økende press, dilemmaer
- **Stakes**: Moderate til høye (±10-20)
- **Opplevelse**: "Små valg får større konsekvenser"
- **Varighet**: ~20-25 minutter

### Act 3 (Event 26-35): Krise
- **Tone**: Intense situasjoner, systemkritikk
- **Stakes**: Høye (±15-30)
- **Opplevelse**: "Systemet selv er problemet"
- **Varighet**: ~15-20 minutter

**Total spilltid**: ~50-65 minutter

---

## 🎯 Replayability

### Første Gjennomspill
- Spiller "følger systemet" → ser at det ikke fungerer godt nok
- Delayed consequences viser langsiktige problemer
- Ending reflekterer spillerens tilnærming

### Andre Gjennomspill
- Prøver "hjelp klientene"-strategi → ser andre konsekvenser
- Budsjettet sprekker, men klientene har det bedre
- Forskjellig ending

### Tredje+ Gjennomspill
- Optimaliserer for spesifikk ending
- Utforsker alle character branches
- Master balansen mellom ressurser

---

## 🎭 Karakterer

### Kristian (24 år)
- **Act 1**: 3 byråkratiske events (fritak, frister, kurs)
- **Act 2**: AAP-dilemma
- **Act 3**: Oppfølging
- **Temaer**: Sosial angst, systemets rigiditet, preventiv hjelp

### Mohammed (45 år)
- **Act 1**: 3 praktiske events (utstyr, tiltak, transport)
- **Act 2**: Tiltakskrise
- **Act 3**: Arbeid vs uførhet
- **Temaer**: Fysiske begrensninger, arbeidsmarkedets krav, varig hjelp

### Mira (31 år)
- **Act 1**: 3 administrative events (transport, møtetid, dokumenter)
- **Act 2**: Barnas behov (tannregulering)
- **Act 3**: Desperate situasjon
- **Temaer**: Barnefattigdom, regelverkets grenser, barnevern

### Linda (38 år)
- **Act 1**: 3 støtte events (frekvens, søknader, referanse)
- **Act 2**: Fagbrev-sjanse
- **Act 3**: Konklusjon
- **Temaer**: Rehabilitering, tillit, andre sjanser

---

## 🛠️ Tekniske Detaljer

### Fil Endret
- `data/scenarios/nav-kap1-innsiden.ts`: Komplett omskriving

### Features Brukt
- ✅ Delayed consequences (4 i Act 1, flere i Act 2)
- ✅ Conditional events (endings basert på resources)
- ✅ Choice tags (for archetype system)
- ✅ Act system (1, 2, 3)
- ✅ Resource management (balanced progression)

### Ingen Endringer Nødvendig
- `types/game.ts`: Støtter alt
- `store/gameStore.ts`: Fungerer som det skal
- `lib/archetypeChecker.ts`: Kompatibel

---

## ✨ Resultat

Spilleren opplever nå:
1. **Act 1**: Trygg introduksjon til karakterene gjennom byråkrati
2. **Act 2**: Økende forståelse av systemets begrensninger
3. **Act 3**: Erkjennelse av at systemet selv er problemet

**Nøkkelbeskjed**: Det er ikke saksbehandlerens feil. Det er ikke brukerens feil. Det er systemstrukturen som skaper umulige valg.

---

## 📋 Testing Recommendations

### 1. Balanse Test
- [ ] Spill "følg systemet" hele veien
- [ ] Verifiser ingen game over før Act 3
- [ ] Sjekk at alle ressurser > 15 etter Act 1

### 2. Narrative Test
- [ ] Verifiser ingen continuity errors
- [ ] Sjekk at delayed consequences triggerer riktig
- [ ] Test at alle 4 endings er tilgjengelige

### 3. Language Test
- [ ] Bekreft at språket er nøytralt beskrivende
- [ ] Sjekk at observasjoner ikke blir emosjonell manipulasjon
- [ ] Verifiser at spilleren kan trekke egne konklusjoner

---

**Status**: ✅ KOMPLETT OG KLAR FOR TESTING

