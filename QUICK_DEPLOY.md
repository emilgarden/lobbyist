# ⚡ Quick Deploy Guide

## 3 Enkle Steg til Live

### Steg 1: Commit og Push til GitHub

```bash
cd /Users/oleemil/lobbyist

# Legg til alle filer
git add .

# Commit
git commit -m "Initial commit: Lobbyist game with archetype system"

# Hvis du ikke har remote ennå:
# git remote add origin https://github.com/DITT_BRUKERNAVN/lobbyist.git
# git branch -M main

# Push
git push -u origin main
```

### Steg 2: Deploy til Vercel

1. Gå til [vercel.com](https://vercel.com) og logg inn med GitHub
2. Klikk **"Add New Project"**
3. Velg `lobbyist` repository
4. Klikk **"Deploy"** (Vercel detekterer Next.js automatisk)
5. Vent 1-2 minutter

### Steg 3: Test på Mobil

1. Åpne Vercel URL-en på mobilen
2. Test swipe-funksjonalitet
3. Test alle scenarioer

**Ferdig! 🎉**

---

## Fremtidige Endringer

Etter første deployment:

```bash
# Gjør endringer
git add .
git commit -m "Add new scenario"
git push origin main

# Vercel deployer automatisk!
```

---

## Troubleshooting

**Git feiler?**
- Sjekk at du er logget inn: `gh auth status`
- Eller bruk HTTPS URL i stedet for SSH

**Vercel build feiler?**
- Test lokalt først: `npm run build`
- Sjekk at alle dependencies er i `package.json`

**Debug-komponent vises på live?**
- Den skal automatisk skjules (sjekker hostname)
- Hvis ikke, sjekk `components/ArchetypeDebug.tsx`

