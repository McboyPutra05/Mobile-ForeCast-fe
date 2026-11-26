---
name: Editorial Financial Minimalist
colors:
  surface: '#fff8f5'
  surface-dim: '#e0d8d5'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ee'
  surface-container: '#f4ece8'
  surface-container-high: '#eee7e3'
  surface-container-highest: '#e9e1dd'
  on-surface: '#1e1b19'
  on-surface-variant: '#45474c'
  inverse-surface: '#33302d'
  inverse-on-surface: '#f7efeb'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#2c694e'
  on-secondary: '#ffffff'
  secondary-container: '#aeeecb'
  on-secondary-container: '#316e52'
  tertiary: '#330002'
  on-tertiary: '#ffffff'
  tertiary-container: '#5a0007'
  on-tertiary-container: '#e66962'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#b1f0ce'
  secondary-fixed-dim: '#95d4b3'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#0e5138'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#852221'
  background: '#fff8f5'
  on-background: '#1e1b19'
  surface-variant: '#e9e1dd'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 26px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 26px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Work Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels the restrained authority and tactile elegance of premier financial broadsheets and high-end global intelligence journals (such as the *Financial Times* and *Monocle*). It treats the digital screen as physical rag paper: calm, deliberative, and unapologetically editorial.

### Emotional Disposition
- **Discerning & Authoritative:** Instills immediate trust through considered typographic scale and unhurried whitespace.
- **Physical & Bookish:** Evokes printed ink on archival broadsheet paper, reducing visual fatigue during deep quantitative and narrative consumption.
- **Quiet Modernism:** Replaces artificial depth and synthetic drop-shadows with structured hairline rules, delicate framing, and pristine typographic hierarchy.

### Target Audience
Global decision-makers, wealth custodians, macro strategists, and intellectually curious operators who require clear, high-density financial insight delivered with dignity rather than gamified distraction.

## Colors

The palette directly models traditional broadsheet printing. Pure white (#FFFFFF) is banished entirely from primary structural roles to eliminate glare and preserve an artisanal, paper-like warmth.

### Structural & Paper Canvas
- **Paper Canvas (`#FAF6F0`):** The primary canvas substrate across all screens. Represents warm archival vellum.
- **Surface Accent / Warm Sand (`#F2EBE1`):** Applied to secondary modules, sidebars, executive briefs, and input wells.
- **Hairline Border / Taupe (`#D6CFC2`):** Structural divider rules, data cell partitions, and container borders. Provides razor-sharp perimeter delineation without visual weight.

### Inks & Functional Tones
- **Charcoal Ink (`#1C1917`):** Primary text and definitive numeric data. Deep, carbon-rich neutral with soft warmth.
- **Muted Ink (`#57534E`):** Secondary metadata, column labels, time stamps, and disclaimers.
- **Editorial Navy (`#1E293B` - Primary):** Dominant thematic headers, active tab indicators, major navigation hubs, and primary buttons.
- **Forest Sage (`#2D6A4F` - Secondary):** Positive fiscal yields, market gains, confirmation badges, and stabilizing editorial accents.
- **Deep Burgundy (`#7F1D1D` - Tertiary):** Downward indicators, market volatility alerts, urgent corrections, and selective critical calls-to-action.

## Typography

Typography establishes the architectural discipline of this design system through three purposeful families:

1. **Headlines (`Newsreader`):** An authoritative, literary serif that conveys journalistic weight and classic intellect. It sits firmly on the baseline with open proportions designed for long-term screen reading.
2. **Body & Interface (`Work Sans`):** A modern, grotesque sans-serif with unpretentious clarity. Highly legible at dense text sizes, providing a calm counterpoint to the serif headers.
3. **Data & Technical Metadata (`JetBrains Mono`):** Monospaced numeric rendering for tabular ledger lines, tickers, basis point values, and system captions. Enforces strict horizontal alignment in numeric arrays.

### Typographic Rules
- Set section deck headers and quotes in *italic* variants of Newsreader.
- Always display financial data tables, dates, index figures, and tags in uppercase `JetBrains Mono` with generous tracking (`0.05em`).
- Maintain generous line heights on body paragraphs (`lineHeight: 24px` on `15px` font) to emulate print column legibility.

## Layout & Spacing

The layout is structured around an asymmetrical broadsheet grid that balances dense quantitative columns with expansive editorial margins.

### Layout Matrix
- **Desktop (≥ 1280px):** 12-column grid. Max content width of `1360px`. Canvas margins set to `2.5rem`, column gutters at `1.5rem`. Enables asymmetrical multi-column editorial spreads (e.g., an 8-column main analysis canvas paired with a 4-column financial docket).
- **Tablet (768px – 1279px):** 8-column grid with `1.5rem` outer margins and `1.25rem` gutters. Multi-column decks compress into clean split views.
- **Mobile (< 768px):** 4-column grid with `1rem` outer margins and `1rem` gutters. Stacks sidebars beneath primary editorial features while preserving horizontal scrolling overflow for dense tabular figures.

### Spacing Cadence
- **Vertical Hierarchy:** Use `space-xl` (`2.5rem`) between editorial chapters and major thematic clusters.
- **Component Breathing Room:** Internal card and container paddings strictly honor `space-md` (`1rem`) to `space-lg` (`1.5rem`), ensuring data feels neither cramped nor loose.

## Elevation & Depth

This system avoids floating cards, artificial blurred drop-shadows, and skeuomorphic gradients. Depth is established through print-inspired physical stratification:

### Spatial Mechanics
- **No Drop Shadows:** Elevation levels (`0px` blur, `0px` offset) are strictly flat. Depth via drop shadows is completely absent.
- **Tonal Stepping:** Elevation is communicated strictly through surface shifts. The background canvas sits at Warm Ivory (`#FAF6F0`), while resting panels, callouts, and data trays sit slightly raised in Warm Sand (`#F2EBE1`).
- **Hairline Partitioning:** Visual boundaries are created by 1px solid borders in Taupe (`#D6CFC2`). Overlapping modules rely on these crisp, ink-ruled lines rather than soft atmospheric blurs.
- **Translucent Overlays:** When modals or drawers require focus, backdrop overlays use a warm tint (`rgba(28, 25, 23, 0.4)`) with a subtle `blur(2px)` to simulate tracing paper laid over broadsheet columns.

## Shapes

The geometric framework is uncompromisingly sharp (`roundedness: 0`). 

### Principles
- **0px Corner Radius:** All containers, buttons, inputs, tags, and table cells possess clean 90-degree right angles.
- **Architectural Framing:** Mimics metal-type framing and trimmed paper edges. The lack of border radii creates a crisp, disciplined layout that maximizes screen real estate for dense financial data tables.
- **Interactive Affordance:** Focus and active states rely on line-weight shifts (e.g., stepping from a 1px Taupe rule to a 2px Editorial Navy rule) rather than shape morphing or pill-shaped rounding.

## Components

### Buttons
- **Primary:** Solid Editorial Navy (`#1E293B`) background, Paper Ivory (`#FAF6F0`) text, 0px border radius, uppercase `JetBrains Mono` at `label-md`. Hover state shifts background to Charcoal Ink (`#1C1917`).
- **Secondary / Ghost:** Transparent background with a 1px solid Taupe (`#D6CFC2`) hairline border, Charcoal Ink text. Hover transitions to Warm Sand (`#F2EBE1`) surface fill.
- **Critical / Danger:** Deep Burgundy (`#7F1D1D`) fill with Paper Ivory text, reserved strictly for destructive or terminal portfolio actions.

### Cards & Editorial Modules
- **Frame:** Solid Warm Ivory (`#FAF6F0`) or Warm Sand (`#F2EBE1`) fill wrapped in a 1px solid Taupe hairline border.
- **Header:** Features a top 2px accent rule in Editorial Navy, Forest Sage, or Deep Burgundy depending on section classification.
- **Composition:** Newsreader serif headline followed by a Work Sans summary and JetBrains Mono metric row separated by a hairline divider.

### Data Tables & Financial Ledgers
- **Cells:** Zero radius, enclosed by horizontal 1px Taupe hairline dividers (`#D6CFC2`). Vertical borders are omitted to let data scan cleanly across rows.
- **Header Row:** Set in JetBrains Mono uppercase, muted ink (`#57534E`), bottom-bordered with a 1.5px solid Charcoal Ink rule.
- **Numeric Alignment:** All numeric cells right-aligned, monospaced, with gains tinted in Forest Sage (`#2D6A4F`) and losses in Deep Burgundy (`#7F1D1D`).

### Input Fields & Controls
- **Text Inputs:** Sharp-edged boxes with Warm Sand (`#F2EBE1`) fill and a 1px Taupe border. On active focus, border shifts to 1.5px Editorial Navy (`#1E293B`) without outer glow rings.
- **Checkboxes & Radios:** Sharp square indicators (radios remain strictly square diamonds or boxed checks to honor the zero-radius rule). Selected states fill with Charcoal Ink containing an Ivory tick.

### Chips & Badges
- **Status Indicators:** Square-cut badges with a 1px border.
- **Positive Yield:** Transparent Forest Sage tint background (`rgba(45, 106, 79, 0.08)`), Forest Sage text (`#2D6A4F`), 1px Forest Sage border.
- **Negative Yield:** Transparent Deep Burgundy tint background (`rgba(127, 29, 29, 0.08)`), Deep Burgundy text (`#7F1D1D`), 1px Deep Burgundy border.
- **Neutral Topic:** Warm Sand background, Charcoal Ink text, 1px Taupe border.

### Editorial Callouts & Pull Quotes
- Spans full or half column widths, padded with `space-lg`, bounded by a prominent 3px left border in Charcoal Ink.
- Quote text rendered in Newsreader Italic (`headline-md`) with attribution in JetBrains Mono (`label-sm`).