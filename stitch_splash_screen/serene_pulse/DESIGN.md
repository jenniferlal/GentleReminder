# Design System Strategy: The Serene Sanctuary

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Sanctuary"**
In a world of intrusive notifications and high-stress health management, this design system acts as a visual exhale. We are moving away from the "Medical Utility" aesthetic of the wireframes and toward a high-end editorial experience that feels like a premium wellness journal.

By utilizing **intentional asymmetry**, wide margins, and **tonal layering**, we eliminate the rigid, boxed-in feel of traditional health apps. We prioritize breathing room over information density, ensuring that every interaction feels like a "Gentle Reminder" rather than a command.

---

## 2. Colors
Our palette is rooted in the calming properties of nature—deep ocean blues and botanical teals balanced by mineral neutrals.

### The "No-Line" Rule
To achieve a premium, editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined through background color shifts or subtle tonal transitions. For example, a card should be distinguished from the background by moving from `surface` (#f7faf9) to `surface-container-low` (#f0f5f4), not by a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, heavy-weight paper.
*   **Base Layer:** `surface` (#f7faf9)
*   **Sectioning:** `surface-container` (#e9efee)
*   **Active Elements/Cards:** `surface-container-lowest` (#ffffff) to create a soft, natural lift.

### Glass & Gradient Rule
For floating elements like "Add Reminder" buttons or top navigation bars, use **Glassmorphism**. Apply `surface` at 80% opacity with a 20px backdrop-blur. 

### Signature Textures
Main CTAs should not be flat. Use a subtle linear gradient (Top-Left to Bottom-Right) transitioning from `primary` (#0960ac) to `primary-container` (#6aa8f9). This adds a "soul" to the interactive elements that flat hex codes cannot achieve.

---

## 3. Typography
We use a dual-font system to balance authority with approachability.

*   **Display & Headlines (Plus Jakarta Sans):** A modern, geometric sans-serif with a friendly personality. Use `display-lg` (3.5rem) for high-impact welcome screens and `headline-md` (1.75rem) for screen titles. The generous x-height ensures legibility even when users are under stress.
*   **Body & Titles (Manrope):** A highly functional, contemporary sans-serif. Manrope’s open counters make it perfect for long-form medical instructions or reminder details. Use `body-lg` (1rem) for primary content and `label-md` (0.75rem) for metadata.

**Editorial Tip:** Use "Asymmetric Tracking." For large headlines, set letter-spacing to `-0.02em` to feel tight and professional. For small labels, increase tracking to `+0.05em` to ensure every character breathes.

---

## 4. Elevation & Depth
We convey hierarchy through **Tonal Layering** rather than structural lines.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. The slight shift in brightness creates a sophisticated depth that feels architectural.
*   **Ambient Shadows:** If a "floating" effect is required (e.g., a modal), use an extra-diffused shadow: `box-shadow: 0 12px 32px rgba(44, 52, 52, 0.06)`. Note the use of `on-surface` (#2c3434) as the shadow tint rather than pure black.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` (#abb4b3) at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Buttons
*   **Primary:** Gradient (Primary to Primary-Container), Rounded `xl` (3rem), `on-primary` text.
*   **Secondary:** `secondary-container` (#7cf8dd) background with `on-secondary-container` (#005d4f) text.
*   **Tertiary:** No background. `primary` text with an underline only on hover/focus.

### Inputs & Form Fields
Transform the boxed inputs from the wireframes into "Soft Fields." Use `surface-container-high` (#e2eae9) as the background with `sm` (0.5rem) rounded corners. The label should sit in `label-md` style exactly `spacing-1` (0.35rem) above the field.

### Cards & Lists (No Dividers)
For list items (like the "Medicine Reminder List"), forbid the use of divider lines. Separate items using `spacing-3` (1rem) of vertical white space or by placing each item in its own `surface-container-lowest` card with a `md` (1.5rem) corner radius.

### Signature Component: The "Breathe" Progress Ring
For the Dashboard, replace the static boxes with a soft, glowing ring using a gradient of `secondary` to `secondary-fixed`. This tracks daily adherence with a pulsing, organic animation.

---

## 6. Do's and Don'ts

### Do:
*   **Use Roundedness Scale `xl`** for main containers to evoke a "friendly" and "safe" feel.
*   **Embrace Asymmetry.** Align headers to the left but allow some cards to bleed off-center or overlap slightly to break the "grid" feel.
*   **Prioritize Accessibility.** Ensure `primary` text on `surface` always hits a 4.5:1 contrast ratio.

### Don't:
*   **Don't use 1px dividers.** Ever. Use white space or tonal shifts.
*   **Don't use pure black (#000000).** Use `on-surface` (#2c3434) for all "black" text to keep the interface soft.
*   **Don't crowd the screen.** If the wireframe shows 10 items, consider a horizontal carousel or a "See All" editorial link to maintain a calming atmosphere.