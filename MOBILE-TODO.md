# VocabForm — Mobile Optimization Todo

Target: phones (~320–430px) and small tablets. Viewport meta is already set in `index.html`.

Test with Chrome DevTools (iPhone SE, iPhone 14, Pixel 7) and one real device before calling done.

---

## P0 — Must fix (broken or hard to use on mobile)

### Header & navigation (`Layout.tsx`)
- [ ] Stack header on small screens: logo on top row, nav + Add button on second row (or hamburger menu)
- [ ] Shorten or hide “+ Add questions” label on xs — icon-only `+` with `aria-label`
- [ ] Ensure nav links have min **44×44px** tap targets
- [ ] Add `safe-area-inset` padding for notched phones (`pt-[env(safe-area-inset-top)]`, horizontal insets)

### Question cards (`QuestionListItem.tsx`)
- [ ] Switch from side-by-side to **stacked layout** below `sm`: question + options full width, then scores, then vote buttons
- [ ] Make Like / Dislike **full-width** (or 50/50 grid) on mobile — easier thumb reach
- [ ] Move score row above buttons; keep emoji counts readable at `text-sm`

### Leaderboard (`LeaderboardTable.tsx`)
- [ ] Replace wide `<table>` on mobile with **card layout** (`md:table`, cards below `md`)
- [ ] Each card: rank, question + options, category badge, likes / dislikes / net in a row
- [ ] Optional: collapsible “Show answers” per card when toggle is on
- [ ] Prevent horizontal page scroll (`overflow-x-hidden` on main if needed)

### Category & round tabs (`CategoryTabs.tsx`)
- [ ] Use **horizontal scroll** (`overflow-x-auto`, `flex-nowrap`, `-mx-4 px-4`) instead of wrapping 7 long labels
- [ ] Short mobile labels optional: “GK”, “Pop Culture” → “Pop”, “Conversation” → “Conv.”
- [ ] Round tabs: keep 3 pills but allow horizontal scroll on very narrow screens

---

## P1 — UX polish

### Choosing page (`ChoosingPage.tsx`)
- [ ] Reduce vertical padding on mobile (`py-6` vs `py-8`)
- [ ] Make **How it works** collapsible on mobile (default collapsed after first visit, or accordion)
- [ ] Progress bar label: truncate long “General Knowledge · Round 1 · Easy” with `truncate` or shorter copy

### Leaderboard page (`LeaderboardPage.tsx`)
- [ ] Stack toolbar: title row, then Show answers + Refresh on second row
- [ ] Larger tap target on “Show answers” checkbox + label

### Add Questions modal (`AddQuestionsModal.tsx`, `Modal.tsx`)
- [ ] Full-width modal on mobile (`max-w-lg` → `mx-0 rounded-t-2xl` bottom sheet style optional)
- [ ] Stack Cancel / Add buttons full-width on xs (`flex-col-reverse sm:flex-row`)
- [ ] Lock body scroll when modal open (prevent background scroll)

### Touch & interaction
- [ ] Audit all buttons: min height **44px**, adequate spacing between adjacent taps
- [ ] Disable double-tap zoom issues on buttons (`touch-action: manipulation` on interactive elements)
- [ ] Toast position: bottom-center on mobile, clear of home indicator

---

## P2 — Visual & performance

### Typography & spacing
- [ ] Slightly reduce heading sizes on xs (`text-xl` header title, `text-lg` section titles)
- [ ] Card padding `p-4 sm:p-5` on question rows
- [ ] Option list text: ensure long MC strings wrap (`break-words`)

### Motion & accessibility
- [ ] Respect `prefers-reduced-motion` — disable card stagger / layout animations
- [ ] Ensure focus rings visible when navigating with external keyboard on tablet

### Meta & PWA (optional)
- [ ] Add `theme-color` meta for mobile browser chrome
- [ ] Add apple-touch-icon
- [ ] Optional: “Add to Home Screen” manifest for teacher kiosks

---

## P3 — QA checklist (run before ship)

- [ ] No horizontal scroll on Choosing or Leaderboard at 320px width
- [ ] Vote flow works one-handed (buttons reachable without scrolling past options)
- [ ] Long questions + 4 MC options readable without zoom
- [ ] Sticky header doesn’t cover content when scrolling
- [ ] Modal usable on small screen with keyboard open (textarea)
- [ ] Leaderboard with 20 rows per round scrolls smoothly (consider `layout={false}` on mobile if janky)
- [ ] Test on iOS Safari + Android Chrome

---

## Suggested implementation order

1. `QuestionListItem` stacked layout + full-width votes  
2. `LeaderboardTable` mobile cards  
3. `Layout` header responsive  
4. `CategoryTabs` horizontal scroll  
5. Collapsible HowItWorks + page toolbars  
6. Modal + touch polish  
7. QA pass on real devices  

---

## Files to touch

| File | Changes |
|------|---------|
| `src/components/Layout.tsx` | Responsive header, safe areas |
| `src/components/QuestionListItem.tsx` | Stack layout, full-width buttons |
| `src/components/LeaderboardTable.tsx` | Card view `< md` |
| `src/components/CategoryTabs.tsx` | Horizontal scroll tabs |
| `src/components/HowItWorks.tsx` | Collapsible on mobile |
| `src/pages/ChoosingPage.tsx` | Spacing, progress label |
| `src/pages/LeaderboardPage.tsx` | Toolbar stack |
| `src/components/AddQuestionsModal.tsx` | Button stack |
| `src/components/Modal.tsx` | Mobile sheet sizing |
| `src/index.css` | Safe area, touch-action, reduced motion |
