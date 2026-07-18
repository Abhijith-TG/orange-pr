# Orange PR — Website

A modern, fully responsive marketing website for **Orange PR**, a public relations agency. Built with vanilla HTML, CSS (compiled from SCSS), and JavaScript — no frameworks.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | SCSS → compiled to CSS via `sass --watch` |
| Scripting | Vanilla JavaScript (ES6+) |
| Dev tooling | Node.js + npm scripts |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm

### Install dependencies

```bash
npm install
```

### Start the SCSS watcher

```bash
npm run sass
```

This watches `scss/style.scss` and compiles to `css/style.css` automatically on every save.

---

## Project Structure

```
Orange PR/
│
├── index.html                  # Single-page entry point
│
├── assets/
│   ├── fonts/                  # Local font files
│   ├── icons/                  # UI icons (PNG/SVG)
│   └── images/                 # Photos and media assets
│
├── css/
│   └── style.css               # Compiled CSS output (do not edit directly)
│
├── scss/
│   ├── style.scss              # Main entrypoint — imports all partials
│   │
│   ├── abstracts/              # No CSS output — variables & helpers only
│   │   ├── _variables.scss     # Design tokens (colors, fonts, spacing, breakpoints)
│   │   └── _mixins.scss        # fluid(), fluid-font(), respond(), flex-* mixins
│   │
│   ├── base/                   # Global resets and typography
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   └── _base.scss          # Body, .container
│   │
│   ├── components/             # Self-contained UI components
│   │   ├── _buttons.scss
│   │   ├── _cards.scss
│   │   ├── _slider.scss        # Hero fullscreen slider
│   │   ├── _about.scss
│   │   ├── _services.scss      # Accordion-style gallery cards
│   │   ├── _why.scss
│   │   ├── _testimonials.scss  # Image collage + quote slider
│   │   ├── _contact.scss
│   │   ├── _newsletter.scss
│   │   └── _toast.scss
│   │
│   ├── layout/                 # Global structural elements
│   │   ├── _header.scss
│   │   ├── _navigation.scss
│   │   └── _footer.scss
│   │
│   └── pages/
│       └── _home.scss          # Page-level section padding overrides
│
└── js/
    ├── slider.js               # Hero slide transitions & dot/arrow controls
    ├── services.js             # Services gallery active-card logic
    ├── testimonials.js         # Testimonials quote slider
    ├── counter.js              # Animated stat counter on scroll
    ├── header.js               # Mobile nav toggle
    ├── contact.js              # Contact form validation & submission
    └── main.js                 # Shared utilities / init
```

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Fullscreen background slider with animated headline, description, and video card |
| **About** | Split grid with image, stats counter row, and brand text |
| **Services** | Accordion-style expanding card gallery |
| **Why Us** | Three feature cards with hover scale effect |
| **Testimonials** | Masonry image collage with paginated quote slider |
| **Contact** | Split-background form with client-side validation |
| **Newsletter** | Email subscription strip |
| **Footer** | Brand info, navigation links, social icons |

---

## Fluid Scaling

All sizes scale proportionally from the **1920px Figma artboard** using the `fluid()` SCSS function:

```scss
// Usage
width: m.fluid(520);        // scales 260px → 520px
font-size: m.fluid-font(64, 32px);  // clamps between 32px and 64px
```

Breakpoints are defined in `_variables.scss`:

| Token | Value |
|---|---|
| `$bp-sm` | 576px |
| `$bp-md` | 768px |
| `$bp-lg` | 992px |
| `$bp-xl` | 1200px |

---

## Scripts Reference

```bash
npm run sass    # Watch and compile SCSS → CSS
```