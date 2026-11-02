# Modern Islamic Wedding Invitation Refactor & Performance Optimization Plan

**Target Aesthetic**: Inspired by `mymawaddah.com/i/amatxaefy` — refined Islamic wedding invitation, graceful typography, ample whitespace, subtle organic botanical sage & dusty rose accents, soft champagne gold foil, and deep charcoal readability.
**Guiding Principles**: `karpathy-guidelines` (simplicity first, surgical edits, avoid over-engineering) & `ai-coding-powerpack` (clean contracts, verified steps).

---

## Task Decomposition

### Task 1: Fix Hydration Sequencing, CLS & Welcome Screen (Issue #1)
- **Problem**: When loading, `EnvelopeModal` returns `null` on SSR due to `mounted` state check. The entire invitation body renders and flashes before the modal suddenly appears after client hydration.
- **Files**:
  - `components/EnvelopeModal.tsx`
  - `app/page.tsx`
  - `app/layout.tsx`
- **Changes**:
  1. Make the welcome overlay the default server-rendered state (`isOpen = false` rendered directly in SSR HTML, no `if (!mounted) return null`).
  2. Implement body scroll locking while the invitation is unopened (`overflow-hidden` on `body` or a top-level wrapper class).
  3. When the user taps "Buka Jemputan":
     - Trigger audio start event.
     - Animate modal opening (fade & scale).
     - Once opened, unmount modal elements from DOM to free GPU/CPU memory completely.
     - Unlock body scroll.
  4. Ensure critical Google fonts (`Playfair_Display`, `Plus_Jakarta_Sans`, `Amiri`) have `display: "swap"` and zero layout shifts.

### Task 2: Eliminate Battery Drain & High GPU/CPU Heat (Issue #2)
- **Problem**: Infinite animation loops (`animate-sunbeam`, `animate-garden-drift`, `animate-pollen-float`) with large blurred radial gradients (`blur-[110px]`, `blur-[140px]`) and SVG filters (`feGaussianBlur`) re-rasterize layers continuously, heating mobile CPUs and draining batteries.
- **Files**:
  - `components/art/BotanicalBackground.tsx`
  - `app/globals.css`
  - `components/art/BismillahHeader.tsx`
  - `components/ScrollReveal.tsx`
  - `components/AudioPlayer.tsx`
- **Changes**:
  1. Remove continuous `@keyframes sunbeamPulse` (`animate-sunbeam`) from massive blurred background divs. Use static, performant CSS radial gradients with warm ivory/cream tones (`#FAF7F2`, `#FDFBF7`) without infinite repaint loops.
  2. Remove continuous falling petal animations from `BotanicalBackground.tsx`.
  3. In `BismillahHeader.tsx`, remove redundant SVG `<feGaussianBlur>` filters; use crisp SVG line-art and clean CSS text-shadows.
  4. In `ScrollReveal.tsx`, remove permanent `will-change-[transform,opacity]` once elements intersect to release GPU compositing memory.
  5. In `AudioPlayer.tsx`, listen to `visibilitychange` to suspend UI visualizer pulses when the browser tab is hidden or minimized.

### Task 3: Redesign Visual Aesthetic & Color Palette (Issues #3, #4, #5)
- **Aesthetic**: Shift from monotone pink to balanced, elegant Mawaddah botanical palette:
  - Base: Warm Ivory / Cream (`#FAF7F2` / `#FDFBF7`)
  - Accent / Floral: Dusty Rose / Muted Blush (`#D4A5A5` / `#C88A8A`)
  - Contrast / Botanical: Sage Green / Olive (`#7D8B74` / `#556B2F`)
  - Accent Foil: Soft Champagne Gold (`#D4AF37` / `#C5A059`)
  - Typography: Deep Charcoal (`#2D3748` / `#1A202C`)
- **Files**:
  - `tailwind.config.ts`
  - `app/globals.css`
  - `components/SectionHeader.tsx`
  - `components/art/FloralSectionDivider.tsx`
  - `components/art/FloralGardenGate.tsx`
  - `components/art/BotanicalCornerFlourish.tsx`
  - `components/Hero.tsx`
  - `components/BrideGroom.tsx`
  - `components/EventInfo.tsx`
  - `components/LocationSection.tsx`
  - `components/RsvpSection.tsx`
  - `components/GuestbookSection.tsx`
  - `components/FloatingActionDock.tsx`
- **Changes**:
  1. Update Tailwind theme tokens (`cream`, `sage`, `rose`, `gold`, `charcoal`).
  2. Replace busy code-drawn clutter with refined, minimal botanical accents (delicate olive/sage sprigs and subtle champagne gold flourishes strictly along borders/corners with ample whitespace).
  3. Simplify the welcome gate and monograms: clean serif initials ("I & A" in Cormorant / Playfair Display) framed by minimalist botanical arches.
  4. Ensure all buttons, badges, and cards adhere to the new cohesive palette with WCAG AAA readability (deep charcoal `#2D3748` on ivory `#FAF7F2`).

### Task 4: Audio Lazy-Loading & Guestbook Client-Side Caching (Issue #7)
- **Problem**: `<audio preload="auto">` starts fetching 2.8MB on initial page render before user consent. Guestbook refetches wishes on every navigation without caching.
- **Files**:
  - `components/AudioPlayer.tsx`
  - `components/GuestbookSection.tsx`
  - `app/api/wishes/route.ts`
- **Changes**:
  1. In `AudioPlayer.tsx`, do not load `<audio>` with a `src` or `preload` until the user taps "Buka Jemputan" (lazy loading).
  2. In `app/api/wishes/route.ts`, return `Cache-Control: public, s-maxage=60, stale-while-revalidate=120`.
  3. In `GuestbookSection.tsx`, implement client-side caching with 60-second stale time (`sessionStorage` + in-memory cache) so switching tabs or returning to the section avoids redundant network calls.

### Task 5: Cloudflare Pages Deployment Configuration (Issue #6)
- **Goal**: Provide the exact Next.js configuration and Cloudflare Pages setup.
- **Files**:
  - `wrangler.toml` (create)
  - `package.json` (add Cloudflare build script)
  - `app/api/**/route.ts` (ensure Edge runtime compatibility `export const runtime = 'edge'`)
- **Documentation**:
  - Exact Cloudflare Pages build command, build output directory (`.vercel/output/static` or `.next`), environment variables, and GitHub repo connection guide.

---

## Verification & Review
1. `npm run build`: Verify clean compilation with 0 errors.
2. Hydration check: Verify initial SSR HTML contains the welcome gate overlay and no main page flash.
3. Performance check: Verify all infinite blurred animations are eliminated, CPU usage is idle at <2%.
4. Visual review: Verify color tokens, contrast ratios, and clean typography matching Mawaddah reference.
