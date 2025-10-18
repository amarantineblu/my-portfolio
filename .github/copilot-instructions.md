This repository is a small static personal portfolio (single-page) built with plain HTML and CSS.

Quick orientation
- Entry point: `index.html` (single-page layout inside a `<main>` with `.container` and `.hero`).
- Styling: `style.css` contains all styles, fonts, responsive rules, and animations.
- Assets: images and fonts are under `assets/` (fonts in `assets/fonts/*`, images in `assets/images/*`).

Why this structure
- The project is intentionally minimal: no build step, no package manager, and no JavaScript. Changes should be lightweight and avoid adding heavy toolchains unless requested.
- Fonts are declared with `@font-face` in `style.css` and use local paths like `/assets/fonts/...`. Be careful when editing paths — use existing `assets/` layout.

Patterns and conventions for edits
- Keep markup semantic and minimal. `index.html` uses a single `.container` with `.hero-text`, `.poster-image`, and `.glass-text`. Preserve these class names when adding features to avoid breaking CSS selectors.
- All visual changes should be made in `style.css`. This file includes global variables under `:root` (e.g., `--poppins-regular`, `--suse-extra-bold`) — reuse them instead of hardcoding fonts.
- Responsive behavior is achieved with media queries at 400px and 768px; add new responsive tweaks alongside existing queries.
- Animations use the `changeTextSize` keyframe. Reuse or extend it rather than creating many global keyframes.

Files to reference when implementing changes
- `index.html` — where to add/remove content and classes.
- `style.css` — where to adjust layout, fonts, colors, assets, and animations.
- `assets/fonts/` and `assets/images/` — add new font files or images here and reference them using the same path structure.

Safe edits and rules for AI agents
- Do not introduce a build system (npm, webpack, etc.) without explicit human approval.
- When adding images or fonts, place them under `assets/` and update `@font-face` or `<img>`/background-url paths accordingly.
- Preserve existing class names and CSS variables. If a new variable is needed, add it to `:root` with a clear name and fallback.
- Keep file paths absolute from the project root (e.g., `/assets/images/...`) to match existing imports in `style.css`.

Examples from this repo
- To add a new hero line, edit `index.html` inside `.hero .hero-text` and style it in `style.css` near the other `.hero-text` rules.
- To use a new font, copy the TTF to `assets/fonts/YourFont/` and add an `@font-face` in `style.css` similar to existing declarations.

Developer workflows
- No build/test commands exist. Preview by opening `index.html` in a browser.
- For changes to fonts/images, clear browser cache or use a hard refresh to see updates.

When to ask the repo owner
- Before adding JavaScript or introducing a build pipeline.
- If filenames or organization of `assets/` should change (e.g., moving fonts to a CDN).

If additional context is needed, open `index.html` and `style.css` first — they contain the project’s entire structure.

Feedback request
- Tell me which parts are unclear or if you want the instructions to include any preferred coding style or color choices.
