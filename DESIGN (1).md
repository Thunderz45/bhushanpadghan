---
name: Monolith Liquid
colors:
  surface: '#151311'
  surface-dim: '#151311'
  surface-bright: '#3b3936'
  surface-container-lowest: '#100e0c'
  surface-container-low: '#1d1b19'
  surface-container: '#211f1d'
  surface-container-high: '#2c2927'
  surface-container-highest: '#373432'
  on-surface: '#e8e1dd'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e8e1dd'
  inverse-on-surface: '#33302e'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c9c6c5'
  primary: '#c9c6c5'
  on-primary: '#313030'
  primary-container: '#0a0a0a'
  on-primary-container: '#7b7979'
  inverse-primary: '#5f5e5e'
  secondary: '#c8c6c2'
  on-secondary: '#30312e'
  secondary-container: '#494946'
  on-secondary-container: '#bab8b4'
  tertiary: '#cac6c3'
  on-tertiary: '#32302f'
  tertiary-container: '#0b0a09'
  on-tertiary-container: '#7c7977'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e4e2dd'
  secondary-fixed-dim: '#c8c6c2'
  on-secondary-fixed: '#1b1c19'
  on-secondary-fixed-variant: '#474744'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1d1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#151311'
  on-background: '#e8e1dd'
  surface-variant: '#373432'
  muted-gray: '#6B6B6B'
  pure-white: '#FFFFFF'
  deep-black: '#000000'
typography:
  display-xl:
    fontFamily: Hanken Grotesk
    fontSize: 120px
    fontWeight: '800'
    lineHeight: 110px
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 60px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  accent-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
spacing:
  unit: 8px
  margin-safe: 4vw
  gutter: 24px
  stack-sm: 16px
  stack-md: 48px
  stack-lg: 96px
  stack-xl: 160px
---

## Brand & Style

This design system is engineered for high-end digital portfolios where the interface acts as a silent, sophisticated gallery for high-fidelity work. The aesthetic is rooted in **Minimalism** with a **Futuristic Art-Tech** edge, utilizing a stark, monochromatic palette to ensure that imagery and motion are the primary conveyors of brand value.

The core philosophy is "Liquid Precision." While the structural elements remain sharp and architectural (0px radius), the behavior of the interface is fluid, organic, and reactive. The target audience is the luxury design and technology sector, requiring a UI that feels both authoritative and avant-garde. The emotional response should be one of quiet confidence, technical mastery, and seamless flow.

## Colors

The palette is strictly monochromatic to maximize contrast and maintain a premium, archival feel. 

- **Primary (#0A0A0A):** The foundational ink. It provides a deep, non-distracting background that allows media to pop.
- **Secondary (#F2F0EB):** An "Off-White" or "Bone" used for primary text and significant UI elements, reducing eye strain compared to pure white while maintaining high legibility.
- **Neutral (#161412):** Used for subtle surface layering and structural components that need to sit slightly above the primary background.
- **Muted Gray (#6B6B6B):** Reserved for secondary information, meta-data, and inactive states.

High contrast is the primary tool for hierarchy. Interactive elements should transition between bone and deep black, avoiding mid-tones where possible to maintain the stark, "liquid" aesthetic.

## Typography

The typographic system creates a tension between the aggressive, sharp-edged Grotesque headlines and the technical, utilitarian feel of monospaced accents.

- **Headlines:** Use **Hanken Grotesk**. It should be set with tight tracking and leading for a massive, architectural presence. Display sizes should leverage the "liquid" theme through staggered scroll reveals.
- **Body:** **Inter** is used for its exceptional legibility at small sizes, ensuring that project descriptions and long-form content remain clear.
- **Accents:** **JetBrains Mono** (applied to the `accent-mono` role) is used for technical data, labels, and navigation. This adds a "tech-art" layer to the portfolio, suggesting precision and craftsmanship.

Spacing between typographic elements should be generous, allowing each block of text to breathe within the dark void of the layout.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** with an emphasis on "negative space as a luxury." Content is anchored to a 12-column grid on desktop, but margins are defined by viewport widths (`4vw`) to ensure the design feels expansive on all screen sizes.

**Key Layout Principles:**
- **Vertical Rhythm:** Large gaps (stack-xl) between project sections to create a sense of discovery and pacing.
- **Mobile Adaptivity:** On mobile, the 12-column grid collapses to 4 columns. Headlines scale aggressively to maintain the "stark" impact.
- **Liquid Scroll:** Elements should not simply pop into view; they should use "staggered" entry animations where text lines slide up and containers expand vertically with a soft cubic-bezier easing (`0.22, 1, 0.36, 1`).

## Elevation & Depth

This design system eschews traditional shadows in favor of **Tonal Layers** and **High-Contrast Outlines**. Depth is communicated through the physical stacking of elements and the use of transparency.

- **Surfaces:** All containers use `#161412` for subtle separation or `#0A0A0A` with a `#F2F0EB` 1px border.
- **Interactivity:** On hover, elements may utilize a "glass" effect (backdrop-blur) if they overlap media, but generally, depth is indicated by shifting background colors from black to bone.
- **Imagery:** Media should appear as if "floating" in the void. Use heavy black vignettes or soft gradients on images to bleed them into the background, reinforcing the liquid aesthetic.

## Shapes

The shape language is strictly **Sharp (0px roundedness)**. This creates a brutalist, architectural frame that contrasts with the fluid motion of the UI.

Every button, input field, card, and image container must have perfectly square corners. This reinforces the "Monolith" concept—a stable, rigid structure containing liquid, flowing content.

## Components

### Buttons
Primary buttons are solid `#F2F0EB` with `#0A0A0A` text. On hover, they invert colors or expand a "liquid" fill from the center. Secondary buttons are outlined (1px) with no fill. All buttons use `accent-mono` for text labels.

### Cards
Portfolio cards are borderless by default. The image fills the container. On hover, a subtle scale-up effect (1.02x) occurs, and meta-data (using `accent-mono`) slides in from the bottom.

### Inputs
Text inputs are simple bottom-border lines. When focused, the line expands from the center and the label floats upward using a smooth transition.

### Navigation
The navigation should be a fixed, minimal bar. Links use `accent-mono`. Hovering over a link triggers a strike-through or a subtle underline that "flows" from left to right.

### Custom Motion: Liquid Scroll
Implement a smooth-scrollbar or inertial scrolling effect. When the user scrolls, containers should subtly "skew" or stretch, creating a sense of physical viscosity. Images should use a parallax effect where the media moves slower than the container frame.