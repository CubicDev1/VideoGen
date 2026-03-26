# VidMotionAI — Color Theme & UI/UX Design Rules

> Reference this file in every conversation before writing any UI code.
> All tokens are defined as CSS custom properties in `app/globals.css`.

---

## 1. Brand Identity

| Property | Value |
|---|---|
| App Name | **VidMotionAI** |
| Tagline | *Generate. Motion. Captivate.* |
| Personality | Cinematic · Futuristic · High-energy · Premium |
| Target Audience | Content creators, marketers, social media influencers, video editors |

---

## 2. Color Palette

### Primary Palette — Deep Space Ink (Dark Theme Default)

| Token | CSS Var | Hex | Usage |
|---|---|---|---|
| Background Base | `--vm-bg` | `#05070f` | Page background |
| Background Surface | `--vm-surface` | `#0d111e` | Cards, panels, inputs |
| Background Elevated | `--vm-elevated` | `#131929` | Hover states, dropdowns |
| Background Subtle | `--vm-subtle` | `#1a2035` | Borders, dividers alt |
| Border | `--vm-border` | `#1e2843` | Default borders |
| Border Active | `--vm-border-active` | `#2e3f66` | Active/focus borders |

### Accent Palette — Neon Aurora

| Token | CSS Var | Hex | Usage |
|---|---|---|---|
| Accent Primary | `--vm-accent` | `#4f77ff` | CTA buttons, active states |
| Accent Glow | `--vm-accent-glow` | `rgba(79,119,255,0.35)` | Glow effects, shadows |
| Accent Gradient Start | `--vm-grad-start` | `#4f77ff` | Gradient from |
| Accent Gradient End | `--vm-grad-end` | `#a855f7` | Gradient to (purple aurora) |
| Accent Teal | `--vm-teal` | `#00d4aa` | Secondary accent, highlights |
| Accent Amber | `--vm-amber` | `#f59e0b` | Warnings, duration badges |

### Text Hierarchy

| Token | CSS Var | Hex | Usage |
|---|---|---|---|
| Text Primary | `--vm-text-primary` | `#f0f4ff` | Headlines, primary content |
| Text Secondary | `--vm-text-secondary` | `#8b9cc8` | Subtitles, descriptions |
| Text Muted | `--vm-text-muted` | `#4a567a` | Placeholders, disabled |
| Text Inverse | `--vm-text-inverse` | `#05070f` | Text on accent buttons |

### Semantic Colors

| Token | CSS Var | Hex | Usage |
|---|---|---|---|
| Success | `--vm-success` | `#00d4aa` | Done, completed states |
| Warning | `--vm-warning` | `#f59e0b` | Processing, pending |
| Error | `--vm-error` | `#ff4d6d` | Errors, destructive actions |
| Info | `--vm-info` | `#4f77ff` | Info tooltips, badges |

---

## 3. Typography

### Font Pairing

| Role | Font Family | Google Fonts Import |
|---|---|---|
| Display / Logo | **Syne** (Bold 700, ExtraBold 800) | `Syne:wght@700;800` |
| Heading | **DM Sans** (SemiBold 600, Bold 700) | `DM+Sans:wght@400;500;600;700` |
| Body | **DM Sans** (Regular 400, Medium 500) | Same as above |
| Mono / Code | **JetBrains Mono** | `JetBrains+Mono:wght@400;500` |

### Type Scale

| Level | Size | Weight | Line Height | Token |
|---|---|---|---|---|
| Display XL | 72px / 4.5rem | 800 | 1.05 | `.text-display-xl` |
| Display L | 56px / 3.5rem | 700 | 1.1 | `.text-display-l` |
| H1 | 40px / 2.5rem | 700 | 1.2 | `.text-h1` |
| H2 | 32px / 2rem | 600 | 1.25 | `.text-h2` |
| H3 | 24px / 1.5rem | 600 | 1.3 | `.text-h3` |
| Body L | 18px / 1.125rem | 400 | 1.7 | `.text-body-l` |
| Body | 16px / 1rem | 400 | 1.6 | `.text-body` |
| Small | 14px / 0.875rem | 400 | 1.5 | `.text-sm` |
| Micro | 12px / 0.75rem | 500 | 1.4 | `.text-micro` |

---

## 4. Spacing System

Base unit: **4px (0.25rem)**

| Token | Value | Usage |
|---|---|---|
| `--vm-space-1` | 4px | Micro gaps |
| `--vm-space-2` | 8px | Tight elements |
| `--vm-space-3` | 12px | Input padding |
| `--vm-space-4` | 16px | Standard component padding |
| `--vm-space-5` | 20px | Section internal |
| `--vm-space-6` | 24px | Cards |
| `--vm-space-8` | 32px | Large components |
| `--vm-space-10` | 40px | Section gaps |
| `--vm-space-16` | 64px | Section vertical padding |
| `--vm-space-24` | 96px | Hero padding |

---

## 5. Border Radius

| Token | Value | Usage |
|---|---|---|
| `--vm-radius-sm` | 6px | Small badges, chips |
| `--vm-radius-md` | 10px | Buttons, inputs |
| `--vm-radius-lg` | 14px | Cards, panels |
| `--vm-radius-xl` | 20px | Large cards, modals |
| `--vm-radius-2xl` | 28px | Hero input box |
| `--vm-radius-full` | 9999px | Pills, avatars |

---

## 6. Shadows & Glows

| Token | Value | Usage |
|---|---|---|
| `--vm-shadow-sm` | `0 1px 3px rgba(0,0,0,0.4)` | Subtle card lift |
| `--vm-shadow-md` | `0 4px 16px rgba(0,0,0,0.5)` | Modals, dropdowns |
| `--vm-shadow-lg` | `0 8px 40px rgba(0,0,0,0.6)` | Hero elements |
| `--vm-glow-accent` | `0 0 24px rgba(79,119,255,0.4)` | CTA glow |
| `--vm-glow-teal` | `0 0 20px rgba(0,212,170,0.3)` | Success glow |

---

## 7. Gradient Recipes

```css
/* Hero gradient background */
--vm-hero-gradient: radial-gradient(
  ellipse 80% 60% at 50% -10%,
  rgba(79,119,255,0.18) 0%,
  rgba(168,85,247,0.08) 50%,
  transparent 100%
);

/* Accent button gradient */
--vm-cta-gradient: linear-gradient(135deg, #4f77ff 0%, #a855f7 100%);

/* Card shimmer */
--vm-card-gradient: linear-gradient(
  135deg,
  rgba(79,119,255,0.05) 0%,
  rgba(168,85,247,0.03) 100%
);

/* Mesh noise overlay */
/* Use SVG noise or CSS grain-overlay pseudo-element for texture */
```

---

## 8. Animation & Motion

### Timing Functions

| Name | Value | Usage |
|---|---|---|
| Ease Out Expo | `cubic-bezier(0.19,1,0.22,1)` | Entries, reveals |
| Ease In Out | `cubic-bezier(0.4,0,0.2,1)` | State transitions |
| Spring | `cubic-bezier(0.34,1.56,0.64,1)` | Hover scale, bounce |

### Duration Scale

| Token | Duration | Usage |
|---|---|---|
| `--vm-dur-fast` | 120ms | Micro-interactions |
| `--vm-dur-normal` | 250ms | State changes |
| `--vm-dur-slow` | 400ms | Reveals, enters |
| `--vm-dur-xslow` | 700ms | Page-level animations |

### Key Animation Patterns
1. **Page Entry**: Staggered `translateY(24px) → 0` + `opacity 0→1` per section (delays: 0ms, 100ms, 200ms…)
2. **Hover Card**: `scale(1.02)` + `shadow-lg` + border brightens
3. **CTA Button**: Glow pulse on hover, slight scale up `1.03`
4. **Input Focus**: Border color transitions to accent, faint glow ring appears
5. **Skeleton**: Shimmer animation (`background-position` sweep)

---

## 9. Component Rules

### Header / Navbar
- Height: `64px` (desktop), `56px` (mobile)
- Background: `--vm-surface` with `backdrop-filter: blur(20px)`
- Border bottom: `1px solid --vm-border`
- Logo: Syne ExtraBold, gradient text clip `--vm-cta-gradient`
- Nav links: DM Sans Medium, `--vm-text-secondary`, hover → `--vm-text-primary`
- Active link: `--vm-text-primary` + bottom border accent indicator
- CTA "Get Started": Gradient button with glow on hover

### Hero Section
- Min height: `calc(100vh - 64px)`
- Background: `--vm-bg` + `--vm-hero-gradient` overlay
- Heading: Syne ExtraBold, gradient text (accent blue → purple)
- Subtitle: DM Sans Regular, `--vm-text-secondary`
- Grain overlay: css pseudo-element with SVG noise at 3% opacity

### Prompt Input Box
- Background: `--vm-surface`, border `--vm-border`, focus → `--vm-border-active` + glow
- Border radius: `--vm-radius-2xl` (28px outer), inner elements `--vm-radius-md`
- Textarea: min 3 rows, resize none
- Controls bar (bottom of input): Duration select + Ratio tabs + Send button
- Send button: `--vm-cta-gradient`, icon + text, glow on hover

### Project Cards (Gallery)
- Background: `--vm-surface` + `--vm-card-gradient`
- Border: `--vm-border`, hover → `--vm-border-active`
- Border radius: `--vm-radius-lg`
- Aspect ratio: Match the video ratio (16:9 or 9:16)
- Hover: scale `1.02`, shadow deepens, overlay gradient fades in
- Author avatar + name at bottom

### State Variants
- **Empty State**: centered icon + subtext, dashed border `--vm-border`
- **Loading Skeleton**: shimmer on `--vm-subtle` background
- **Error**: `--vm-error` border + icon

---

## 10. Responsive Breakpoints

| Name | Width | Notes |
|---|---|---|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra wide |

Mobile-first approach. Hero stacks vertically. Nav collapses to hamburger at `< md`.

---

## 11. Iconography

- **Library**: `lucide-react` (already a dep via shadcn setup)
- **Size**: 16px (small), 20px (default), 24px (large)
- **Stroke width**: 1.5 (default), 2 (emphasis)
- **Color**: Inherit from parent, never hardcoded

---

## 12. Accessibility Checklist

- [ ] All interactive elements have `aria-label` or visible text
- [ ] Color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- [ ] Focus rings visible and styled (3px ring, accent color)
- [ ] Keyboard navigation fully functional
- [ ] `prefers-reduced-motion` respected — disable transforms/transitions
- [ ] Semantic HTML (`nav`, `main`, `header`, `section`, `h1` only once per page)

---

*Last updated: 2026-03-26 | VidMotionAI Design System v1.0*
