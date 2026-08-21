# WhatFlow - UI/UX Design Specification (`design.md`)

## 1. Overview

The **WhatFlow** web application utilizes a striking **Neo-brutalist** (or retro-web) design language. This aesthetic is characterized by high contrast, thick black borders, hard block shadows (zero blur), vibrant accent colors against muted backgrounds, and bold typography. It emphasizes clarity, unpretentious UI elements, and a playful yet professional tone suitable for a modern B2B SaaS tool.

---

## 2. Global Design Tokens

### 2.1. Color Palette

The color system relies on stark contrasts. Borders and shadows are strictly black, while containers use muted backgrounds to allow vibrant CTAs (Call to Actions) to pop.

* **Backgrounds:**
* `Global Background`: Off-white/Cream (`#FDFBF7` approx.)
* `Dark Section Background`: Deep Slate/Black (`#0F172A` approx.)
* `Card Background Primary`: Light Mint Green (`#D1F5D3` approx.)
* `Card Background Secondary`: White (`#FFFFFF`)


* **Accents & Interactions:**
* `Primary Accent (Brand Green)`: `#00D261` (Used for primary buttons, prominent text, success states)
* `Secondary Accent (Blue)`: `#2563EB` (Used for informative tags, setup guides)
* `Warning/Pending (Yellow)`: `#FFC107` (Used for badges, pending states)
* `Danger/Cancel (Red)`: `#FF4B4B` (Used for cancel buttons, error states)


* **Strokes & Typography:**
* `Primary Text / Borders`: Solid Black (`#000000` or `#111111`)
* `Inverted Text`: Solid White (`#FFFFFF`)



### 2.2. Typography

The typographic hierarchy relies heavily on uppercase, heavy-weight sans-serif fonts for headings, and highly legible geometric sans-serifs for body copy.

* **Font Families:**
* *Primary (Headings)*: Inter Black, Roboto Black, or Archivo Black (Geometric, ultra-bold).
* *Secondary (Body/UI)*: Inter Regular/Medium.


* **Special Text Treatments:**
* **Outlined Text (Stroke):** A signature element of this design. Key heading words are rendered with a transparent fill and a thick black, green, or blue stroke (e.g., `-webkit-text-stroke: 2px #111111; color: transparent;`). Seen extensively across all files.
* **Casing:** All H1, H2, and Button text are strictly `UPPERCASE`.



### 2.3. Borders and Shadows

The defining characteristic of the UI components.

* **Borders:** Uniform `2px` to `3px` solid black borders on almost all interactive elements, cards, and input fields.
* **Block Shadows:** Hard shadows with no blur.
* *Standard Shadow:* `box-shadow: 4px 4px 0px 0px #000000;`
* *Hover State Shadow:* Often translates the element `-2px` on the X/Y axis and increases the shadow to `6px 6px` to simulate a physical press/lift.

### 2.4. Iconography & Strict No-Emoji Policy

* **No Emojis Rule:** Standard platform emojis (such as 💡, ⚠️, 🚨, 📈, ✍️, 📝, 📡, 🔗, 📦, ⏱, 👋) are **strictly forbidden** throughout the entire application UI and marketing copy.
* **SVG Icon Standards:** Always use clean, monoline SVG stroke icons (stroke width `1.5px` to `2.5px`, stroke linecap/join `round`) or branded monochrome SVG glyphs.
* **Text & Status Badges:** Status indicators, categories, and labels must be expressed with uppercase neo-pill tags or bold typographic labels rather than decorative emoji characters.

---

## 3. Component Library

### 3.1. Buttons

Buttons are heavily stylized to look like physical, tactile blocks.

* **Primary CTA (Install App, Install WhatFlow):**
* Background: Brand Green
* Text: Black, Bold, Uppercase
* Border: 2px solid Black
* Shadow: 4px 4px Black block shadow


* **Secondary/Ghost CTA (View Setup Guide, View Pricing):**
* Background: White or Light Blue
* Text: Secondary Blue or Black, Bold, Uppercase
* Border: 2px solid Black
* Shadow: 4px 4px Black block shadow


* **Action Buttons (Confirm/Cancel - seen in mockups):**
* *Confirm*: Green background, White text, Black border/shadow.
* *Cancel*: White background, Red text, Black border/shadow.



### 3.2. Badges & Tags

Used to denote status, features, or integrations.

* **Pill Tags:** Fully rounded corners (`border-radius: 999px`), 2px black border, solid white or lightly tinted backgrounds. Text is uppercase and bold.
* *Examples:* "AUTOMATIC", "SHOPIFY SYNC", "OFFICIAL META API".


* **Block Tags:** Rectangular tags often attached to the top edge of a larger card.
* *Examples:* "ONE-TAP RESPONSE" (Yellow), "FEATURE — ORDER CONFIRMATION" (Dark Green).



### 3.3. Form Elements (Inputs & Dropdowns)

* **Inputs (e.g., Pricing Calculator):**
* Container: White background, 2px solid black border.
* Label: Small, bold, uppercase text above the input.
* Interaction: On focus, the border likely thickens or the box shadow shifts.



---

## 4. Section & Layout Analysis

### 4.1. Order Confirmation Feature Layout

**Reference File:** `1786491800546.png`

* **Left Column (Copy):** Large H1 ("KNOW WHICH ORDERS ARE REAL.") with "REAL." rendered in outlined green text. Above the H1 are two pill tags. Below is sub-copy and dual CTAs.
* **Right Column (Visual):** A stacked card component. The background card is dark teal. Inset is a white card containing a stylized WhatsApp chat mockup. The mockup features a user message, a Shopify order snippet (image, details, price), and two prominent action buttons (Confirm/Cancel).
* **Footer Strip:** An informational strip showing "ONE TAP. THREE CLEAR OUTCOMES." with three status pills (Confirmation Pending, Order Confirmed, Order Cancelled).

### 4.2. Pricing Calculator Layout

**Reference Files:** `1786491793711.png` and `1786491799422.png` (Identical frames)

* **Left Column (Copy):** H1 ("PRICING THAT SCALES WITH EVERY ORDER.") with "EVERY ORDER." outlined in green. Pill tags for "PAY FOR YOUR USAGE" and "ALL FEATURES INCLUDED".
* **Right Column (Interactive Tool):** A large, split-panel card with a prominent "CALCULATE YOUR MONTHLY COST" header badge.
* *Left half (Input):* White background with input fields for "Monthly Orders" (1,000), "Messages Per Order" (2), and a dropdown for "Message Type". Includes a black "CALCULATE →" button.
* *Right half (Output):* Light mint green background. Displays large typography for "ESTIMATED MESSAGES" (2,000) and a recommended plan badge ("STARTER").



### 4.3. Shopify Events Integration Layout

**Reference File:** `1786491796190.png`

* **Left Column (Copy):** H1 ("TURN SHOPIFY EVENTS INTO WHATSAPP CONVERSATIONS.") with "INTO" outlined in green and "WHATSAPP CONVERSATIONS." solid black.
* **Right Column (Visual):** A dark teal background card displaying a complex UI mockup. It shows a mobile phone frame (WhatsApp interface) side-by-side with a Shopify order receipt card.
* **Bottom Marquee:** A dark section with a scrolling/static ticker displaying features ("ORDER CONFIRMATION ∞ ABANDONED CHECKOUT ∞").

### 4.4. Official API Connection Layout

**Reference File:** `1786491797615.png`

* **Left Column (Copy):** H1 ("THE OFFICIAL WAY TO AUTOMATE WHATSAPP.") with "OFFICIAL" outlined in blue and "WHATSAPP." outlined in green.
* **Right Column (Visual):** A workflow illustration inside a card. It displays a Shopify order card connected by a bold black arrow to a WhatsApp "Order confirmed" chat bubble, visually demonstrating the data flow.
* **Lower Section:** Introduction of a dark section (`#0F172A`) with massive typography: "BUILT FOR RELIABILITY." with "RELIABILITY." outlined in bright green.

---

## 5. Development Guidelines (CSS/Implementation Notes)

To replicate this specific aesthetic in code, engineers should utilize the following CSS paradigms:

```css
/* Base brutalist container/button style */
.neo-box {
  background-color: var(--bg-color);
  border: 2px solid #000000;
  box-shadow: 4px 4px 0px 0px #000000;
  border-radius: 8px; /* Slight rounding softens the brutalism */
  transition: all 0.15s ease-in-out;
}

/* Button Hover State */
.neo-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px #000000;
}

/* Button Active/Click State */
.neo-button:active {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0px 0px #000000;
}

/* Outlined Text Typography */
.text-outline-green {
  color: transparent;
  -webkit-text-stroke: 2px var(--brand-green);
}

```