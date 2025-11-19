# 🚀 Deployment Guide

## GitHub Setup

### 1. Initialiser Git (hvis ikke allerede gjort)

```bash
cd /Users/oleemil/lobbyist
git init
```

### 2. Legg til alle filer

```bash
git add .
git commit -m "Initial commit: Lobbyist game with archetype system"
```

### 3. Opprett GitHub Repository

**Alternativ A: Via GitHub CLI**
```bash
gh repo create lobbyist --public --source=. --remote=origin --push
```

**Alternativ B: Via GitHub Web**
1. Gå til [github.com/new](https://github.com/new)
2. Repository name: `lobbyist`
3. Description: "Political satire card game"
4. Public/Private (velg selv)
5. Ikke legg til README, .gitignore eller license (vi har dem allerede)
6. Klikk "Create repository"

### 4. Push til GitHub

```bash
# Hvis du opprettet repo via web:
git remote add origin https://github.com/DITT_BRUKERNAVN/lobbyist.git
git branch -M main
git push -u origin main
```

---

## Vercel Deployment

### Steg 1: Opprett Vercel-konto

1. Gå til [vercel.com](https://vercel.com)
2. Klikk "Sign Up"
3. Velg "Continue with GitHub"
4. Autoriser Vercel til å aksessere GitHub repos

### Steg 2: Deploy Prosjekt

1. Klikk "Add New Project" i Vercel dashboard
2. Velg `lobbyist` repository
3. Vercel detekterer automatisk Next.js
4. **Project Settings:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto)
   - Output Directory: `.next` (auto)
5. Klikk "Deploy"
6. Vent 1-2 minutter

### Steg 3: Få din URL

Etter deployment får du en URL som:
- `lobbyist.vercel.app` (default)
- Eller `lobbyist-DITT-BRUKERNAVN.vercel.app`

Du kan også sette custom domain senere.

---

## Auto-Deployment

Vercel deployer automatisk ved hver push til `main` branch:

```bash
# Gjør endringer
git add .
git commit -m "Update scenario"
git push origin main

# Vercel deployer automatisk!
```

---

## Testing på Mobil

### 1. Åpne URL på mobil

Åpne Vercel URL-en direkte i mobilens nettleser.

### 2. Test Funksjonalitet

- ✅ Swipe kort (venstre/høyre)
- ✅ Ressurser oppdateres
- ✅ Settings-meny fungerer
- ✅ Scenario-switching fungerer
- ✅ Archetype unlock fungerer
- ✅ Responsive design

### 3. Debug-komponenten

Debug-komponenten vises **kun** på `localhost`. I produksjon skjules den automatisk.

---

## Troubleshooting

### Build feiler på Vercel

**Problem:** Build feiler med TypeScript errors
**Løsning:**
```bash
# Test lokalt først
npm run build

# Hvis det feiler, fiks errors først
npm run lint
```

### Debug-komponent vises i produksjon

**Problem:** Debug-komponent vises på live site
**Løsning:** Sjekk at `ArchetypeDebug.tsx` sjekker `hostname`:
```typescript
if (window.location.hostname !== 'localhost' && 
    window.location.hostname !== '127.0.0.1') {
  return null;
}
```

### Bilder vises ikke

**Problem:** Placeholder-bilder vises ikke
**Løsning:** Sjekk at bilder er i `/public/placeholders/` og at paths er korrekte.

---

## Environment Variables (hvis nødvendig senere)

Hvis du trenger environment variables:

1. Gå til Vercel Dashboard → Project → Settings → Environment Variables
2. Legg til variabler
3. Redeploy

---

## Custom Domain (valgfritt)

1. Gå til Vercel Dashboard → Project → Settings → Domains
2. Legg til ditt domene
3. Følg DNS-instruksjonene

---

## Performance Tips

- ✅ Bilder er allerede optimert (Next.js Image)
- ✅ Fonts er optimert (next/font)
- ✅ Static generation brukes der det er mulig
- ✅ Code splitting skjer automatisk

---

## Neste Steg

Etter deployment:

1. ✅ Test på mobil
2. ✅ Del URL med venner
3. ✅ Fortsett med scenario-utvikling
4. ✅ Push endringer → Auto-deploy

---

**Happy deploying! 🚀**

