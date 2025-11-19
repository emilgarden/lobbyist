# ✅ Pre-Deployment Checklist

## Hva er gjort

- ✅ `.gitignore` opprettet og konfigurert
- ✅ `README.md` oppdatert med deployment-info
- ✅ `DEPLOYMENT.md` guide opprettet
- ✅ `QUICK_DEPLOY.md` quick-start guide opprettet
- ✅ Metadata oppdatert i `app/layout.tsx` (SEO)
- ✅ Debug-komponent sjekker hostname (skjules i produksjon)
- ✅ Produksjonsbuild testet og fungerer

## Neste steg (gjør dette nå)

### 1. Commit alle endringer

```bash
cd /Users/oleemil/lobbyist
git add .
git commit -m "Initial commit: Lobbyist game with archetype system"
```

### 2. Opprett GitHub Repository

**Hvis du har GitHub CLI:**
```bash
gh repo create lobbyist --public --source=. --remote=origin --push
```

**Eller via GitHub Web:**
1. Gå til [github.com/new](https://github.com/new)
2. Repository name: `lobbyist`
3. Public/Private (velg selv)
4. Ikke legg til README, .gitignore eller license
5. Klikk "Create repository"
6. Deretter:
```bash
git remote add origin https://github.com/DITT_BRUKERNAVN/lobbyist.git
git branch -M main
git push -u origin main
```

### 3. Deploy til Vercel

1. Gå til [vercel.com](https://vercel.com)
2. Logg inn med GitHub
3. Klikk "Add New Project"
4. Velg `lobbyist` repo
5. Klikk "Deploy"
6. Vent 1-2 minutter
7. Du får URL: `lobbyist.vercel.app`

### 4. Test på Mobil

- Åpne Vercel URL-en på mobilen
- Test swipe-funksjonalitet
- Test alle scenarioer
- Test archetype unlock

---

## Verifisering

### Build fungerer?
```bash
npm run build
# Skal gi: ✓ Compiled successfully
```

### Debug-komponent skjules i produksjon?
- ✅ Sjekker `hostname !== 'localhost'`
- ✅ Skjules automatisk på Vercel

### Alle filer committet?
```bash
git status
# Skal vise: "nothing to commit, working tree clean"
```

---

## Fremtidige endringer

Etter første deployment, alle fremtidige endringer deployes automatisk:

```bash
git add .
git commit -m "Add new scenario"
git push origin main
# Vercel deployer automatisk!
```

---

## Hjelp

- Se [DEPLOYMENT.md](./DEPLOYMENT.md) for detaljert guide
- Se [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for quick-start
- Se [README.md](./README.md) for prosjektoversikt

---

**Alt er klart! 🚀**

