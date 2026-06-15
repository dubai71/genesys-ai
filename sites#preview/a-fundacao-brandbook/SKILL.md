---
name: a-fundacao-brandbook
description: Create, update, or restyle the "a Fundacao" brand book HTML artifact for the Brazilian AI school, including logo system, color palette changes, typography, modular graphics, and required social/course applications. Use when the user asks to recreate the brand book, generate a preview, adjust the palette, change expert names/social handles, or produce a similar editorial/brutalist AI education identity from this template.
---

# a Fundacao Brand Book

Use this skill to create or update the single-file interactive brand guidelines artifact for **a Fundacao**, a Brazilian AI school with an editorial, technical, sober, lightly brutalist identity.

## Source Artifact

- Main editable artifact: `index.html` in this skill/project folder.
- Keep the deliverable as one self-contained HTML file with internal CSS and inline SVG.
- Do not add external images. Google Fonts `@import` is allowed.
- If serving a preview, start a static server in this folder and give the user the local URL only.

## Brand Direction

Preserve this positioning unless the user explicitly changes it:

- Name: `a Fundacao`, with the `a` treated as part of the signature.
- Category: Brazilian AI school.
- Personality: sober, intellectual, confident, editorial, technical, lightly brutalist.
- Avoid generic AI visuals: no robots, brains, circuit boards, neon cyberpunk, glitch type, rainbow gradients, purple-blue-pink tech gradients, or emoji.
- Desired feel: Kinfolk meets Wired with Brazilian density; a brand that could live in a Vila Madalena bookstore and a serious technical classroom.

## Palette Workflow

When the user asks to change colors, edit only the color tokens first:

```css
:root {
  --black: #0A0A0A;
  --ink: #15120F;
  --bone: #F5F0E8;
  --paper: #E7DED1;
  --stone: #8B8378;
  --signal: #B7FF2A;
  --rust: #A64222;
}
```

Use at most 5 core brand colors in the visible palette section. Keep `--black` and `--bone` highly contrasted unless the user requests a new mode. If introducing a new accent, replace `--signal` or `--rust` consistently across:

- logo accent and monogram blocks
- social post/story highlights
- palette swatches
- metadata/kicker accents
- certificate/app icon variants

After changing colors, search for hardcoded old HEX values and update intentional instances. Common hardcoded values in SVGs and inline swatches include:

- `#0A0A0A`
- `#15120F`
- `#F5F0E8`
- `#B7FF2A`
- `#A64222`

Keep the design from becoming one-note: use neutrals as the dominant base, one strong accent sparingly, and one warm/earth counter-accent if useful.

## Editable Identity Fields

When the user asks to personalize names or social links, update these repeated text values:

- Expert/founder name: currently `Arthur`
- Instagram/brand handle: currently `@afundacao.ai`
- Email: currently `arthur@afundacao.ai`
- LinkedIn: currently `linkedin.com/company/afundacao-ai`
- Location: currently `Sao Paulo / Brasil`

Search the whole `index.html` before editing so repeated applications stay consistent.

## Required Sections

Preserve the navigable chapter structure:

1. Rationale criativo
2. Logo system
3. Color palette
4. Typography
5. Auxiliary graphic system
6. Applications

Required rendered applications:

- Business card, front and back
- LinkedIn cover, 1584:396 proportion
- Instagram square post, 1:1
- Instagram story, 9:16
- Completion certificate, A4 horizontal proportion
- Opening lesson slide, 16:9
- Favicon/app icon
- Email signature
- T-shirt/merch mockup

## Visual Rules

- Render all logo/symbol marks as inline SVG or CSS/type, never as image files.
- Keep typography editorial: display serif, neutral sans body, mono technical details.
- Keep cards sharp or minimally rounded; this artifact currently uses no rounded card style.
- Maintain whitespace, dense hierarchy, and quiet contrast.
- Use grid patterns as structural references, not decorative gradients.
- Do not add explanatory UI text inside the artifact unless it belongs to the brand guide content.

## Implementation Steps

1. Open `index.html` and identify the current token/text values.
2. Make the smallest focused edits needed for the user request.
3. If changing palette, update root variables, inline SVG fills, swatches, and application examples.
4. Check for prohibited visual language and old hardcoded colors with `rg`.
5. Serve or validate the HTML if the user asks for a preview.
6. In the final response, give the preview URL or file path, and mention only the important edits.

## Preview Command

From this folder, serve with any static server. Example:

```powershell
npx --yes http-server . -p 4182 -c-1
```

Then verify:

```powershell
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4182/ | Select-Object StatusCode
```
