# 🔧 Troubleshooting Guide

## Vanlige Problemer og Løsninger

### Problem: "Cannot find module './XXX.js'" eller siden mister struktur ved oppdatering

**Årsak:** Next.js webpack cache er blitt desynkronisert eller korrupt.

**Symptomer:**
- Siden laster ikke riktig
- Struktur går tapt
- Blank skjerm eller feilmeldinger
- Spesielt i Cursor's native browser

**Løsning:**
```bash
# Rask løsning:
rm -rf .next
npm run dev

# Eller bruk fix-scriptet:
npm run fix-cache
npm run dev

# Eller bruk clean dev command:
npm run dev:clean
```

**Hvorfor skjer dette?**
- Webpack cache (`.next` mappen) blir desynkronisert med faktiske filer
- Spesielt problematisk i Cursor's browser som har mindre robust caching
- Kan skje etter store endringer eller ved oppdatering

**Forebygging:**
- Bruk `npm run dev:clean` hvis du opplever problemer
- Ryd cache regelmessig hvis du gjør store endringer
- Sjekk browser console for errors

---

### Problem: Hydration errors eller mismatch mellom server og client

**Årsak:** Server-side rendering og client-side rendering er ikke synkronisert.

**Løsning:**
- Sjekk at alle komponenter som bruker `window` eller `document` har `useEffect` guards
- Bruk `suppressHydrationWarning` på html/body hvis nødvendig (allerede implementert)
- Sjekk at Zustand store initialiseres riktig

---

### Problem: Siden ser ut som den har mistet struktur

**Årsak:** 
1. Webpack cache-problem (se over)
2. JavaScript errors som stopper rendering
3. Missing data i store

**Løsning:**
1. Ryd cache (se over)
2. Sjekk browser console for JavaScript errors
3. Sjekk at `events` array ikke er tom
4. Sjekk at `currentEvent` ikke er undefined

**Debugging:**
```bash
# Sjekk for TypeScript errors
npm run lint

# Test build
npm run build

# Sjekk browser console (F12)
```

---

### Problem: Hot reload fungerer ikke

**Løsning:**
```bash
# Stopp serveren (Ctrl+C)
# Ryd cache
rm -rf .next
# Restart
npm run dev
```

---

### Problem: Komponenter renderes ikke

**Årsak:** 
- Missing null checks
- Undefined data
- Client-side only code kjører på server

**Løsning:**
- Sjekk at alle komponenter har defensive null checks
- Bruk `useEffect` for client-side only code
- Sjekk at data er lastet før rendering

---

## Best Practices for å Unngå Problemer

1. **Ryd cache regelmessig:**
   ```bash
   npm run dev:clean
   ```

2. **Sjekk console for errors:**
   - Åpne browser console (F12)
   - Se etter røde feilmeldinger

3. **Test oppdatering:**
   - Trykk F5 eller Cmd+R etter endringer
   - Sjekk at alt fungerer

4. **Bruk defensive programming:**
   - Null checks før bruk av data
   - Try-catch i kritiske funksjoner
   - Fallback states

5. **Commit ofte:**
   - Commit fungerende kode
   - Lettere å gå tilbake hvis noe går galt

---

## Hvis Alt Feiler

1. **Full reset:**
   ```bash
   rm -rf .next node_modules/.cache
   npm install
   npm run dev
   ```

2. **Sjekk Next.js versjon:**
   ```bash
   npm list next
   ```

3. **Oppdater dependencies:**
   ```bash
   npm update
   ```

---

**Husk:** Webpack cache-problemer er vanlige i Next.js development og er ikke en feil i koden din - det er bare cache som må ryddes!

