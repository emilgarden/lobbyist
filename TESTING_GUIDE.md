# 🧪 Testing Guide - Archetype System

## Quick Test Checklist

### ✅ Pre-Test Setup
1. Start dev server: `npm run dev`
2. Open browser console (F12)
3. Navigate to http://localhost:3000
4. Open Settings → Select "Boligpolitikk" scenario

### ✅ Test 1: Markedsliberalisten Unlock

**Goal:** Unlock Markedsliberalisten by choosing market-oriented choices

**Steps:**
1. Start Boligpolitikk scenario
2. **Always choose RIGHT choices** (market-oriented):
   - Event 1: "Foreslå økt boligbygging" ✅
   - Event 2: "Lobby for fritak" ✅
   - Event 3: "Støtt markaåpning" ✅
   - Event 4: "Forsvар utleiers rettigheter" ✅
   - Event 5: "Skattelette førstegangskjøp" ✅

3. **Watch Debug Panel** (bottom left):
   - Should show progress towards Markedsliberalisten
   - Check that "market" tag count increases
   - Check that "deregulation" tag count increases

4. **Watch Console:**
   - Should see detailed progress logs after each choice
   - Look for: `🎭 Archetype Progress Check`
   - Check resource values vs requirements

5. **Expected Result:**
   - After ~5 choices, archetype modal should appear
   - Modal shows "Markedsliberalisten" unlocked
   - Special events (Anders Lange-Junior) should appear in event queue

**Requirements:**
- Klient ≥ 70
- Penger ≥ 60
- Omdømme ≤ 50
- "market" tag chosen ≥ 3 times
- "deregulation" tag chosen ≥ 2 times
- Turn ≥ 5

---

### ✅ Test 2: Sosialdemokraten Unlock

**Goal:** Unlock Sosialdemokraten by choosing welfare/regulation choices

**Steps:**
1. Reset game
2. **Always choose LEFT choices** (welfare-oriented):
   - Event 1: "Støtt husleietak" ✅
   - Event 2: "Avvis klientens krav" ✅
   - Event 3: "Forsvар marka" ✅
   - Event 4: "Støtt leietakervern" ✅
   - Event 5: "Øk BSU-beløpet" ✅

3. **Expected Result:**
   - After ~5 choices, archetype modal should appear
   - Modal shows "Sosialdemokraten" unlocked
   - Special events (Gro Harlem Brodersen) should appear

**Requirements:**
- Tillit ≥ 70
- Omdømme ≥ 60
- Klient between 30-70
- "welfare" tag chosen ≥ 3 times
- "regulation" tag chosen ≥ 2 times
- "pragmatic" tag chosen ≥ 2 times
- Turn ≥ 5

---

### ✅ Test 3: Populisten Unlock

**Goal:** Unlock Populisten by focusing on public appeal

**Steps:**
1. Reset game
2. Choose choices that boost omdømme but reduce tillit
3. Focus on "public-appeal" and "anti-establishment" tags

**Expected Result:**
- Omdømme ≥ 80
- Tillit ≤ 40
- "public-appeal" tag chosen ≥ 3 times
- "anti-establishment" tag chosen ≥ 2 times
- Turn ≥ 4

---

### ✅ Test 4: Byråkraten Unlock

**Goal:** Unlock Byråkraten by being pragmatic and procedural

**Steps:**
1. Reset game
2. Choose balanced, procedural choices
3. Focus on "pragmatic" and "procedural" tags

**Expected Result:**
- Tillit ≥ 75
- Klient between 40-70
- Omdømme between 40-70
- "pragmatic" tag chosen ≥ 4 times
- "procedural" tag chosen ≥ 2 times
- Turn ≥ 6

---

## 🐛 Common Issues & Debugging

### Issue: Archetype doesn't unlock

**Check:**
1. Open browser console
2. Look for `🎭 Archetype Progress Check` logs
3. Verify each requirement:
   - ✅ Min Turn met?
   - ✅ Resources in range?
   - ✅ Tag counts sufficient?

**Fix:**
- Adjust your choices to match requirements
- Check debug panel for real-time progress

---

### Issue: Modal doesn't appear

**Check:**
1. Is `pendingArchetype` set in store?
2. Check console for errors
3. Verify `ArchetypeUnlock` component is rendered

**Fix:**
- Check browser console for errors
- Verify component is imported in `app/page.tsx`

---

### Issue: Special events don't appear

**Check:**
1. Are archetype special events defined?
2. Check `archetype.specialEvents` array
3. Verify events are inserted into event queue

**Fix:**
- Check `data/archetypes/boligpolitikk.ts`
- Verify special events are properly defined

---

### Issue: Debug panel not showing

**Check:**
1. Is `NODE_ENV === 'development'`?
2. Are there any unlocked archetypes?
3. Check component render conditions

**Fix:**
- Debug panel only shows in development mode
- Make sure you're running `npm run dev`, not `npm run build`

---

## 📊 Debug Panel Guide

The debug panel (bottom left) shows:

1. **Current State:**
   - Turn number
   - Total choices made

2. **For Each Archetype:**
   - ✅/⏳ Status indicator
   - Turn requirement progress
   - Resource requirements (with current values)
   - Tag requirements (with current counts)

3. **Unlocked Section:**
   - List of all unlocked archetypes

---

## 🎯 Testing Tips

1. **Use Debug Panel:**
   - Keep it open while playing
   - Watch progress update in real-time
   - Use it to guide your choices

2. **Check Console:**
   - Detailed logs after each choice
   - Shows exact progress for each archetype
   - Helps identify which requirement is missing

3. **Test Edge Cases:**
   - What happens if you unlock multiple archetypes?
   - What happens if you reset mid-game?
   - What happens if you switch scenarios?

4. **Test Special Events:**
   - After unlock, verify special events appear
   - Check that they're in correct order
   - Verify they have correct content

---

## ✅ Success Criteria

A successful test should show:

1. ✅ Debug panel displays correctly
2. ✅ Console logs show detailed progress
3. ✅ Archetype unlocks when conditions met
4. ✅ Modal appears with correct information
5. ✅ Special events appear in event queue
6. ✅ Game continues normally after unlock
7. ✅ Unlocked archetypes persist after reset

---

## 🚀 Next Steps After Testing

If all tests pass:
- ✅ System is working correctly
- ✅ Ready for content creation
- ✅ Can add more archetypes

If tests fail:
- Check console for errors
- Verify requirements are achievable
- Adjust unlock conditions if needed
- Report bugs with console logs

