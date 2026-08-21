# Design QA — Category-first sale screen

- source visual truth path: `/Users/mac/.codex/generated_images/01a016d7-5330-7902-a478-fde4d0c64819/exec-23e30be8-4b9a-4a09-ba87-bd34fec26059.png`
- normalized source: `design-reference-normalized.png`
- implementation screenshot: `design-implementation-mobile.png`
- desktop screenshot: `design-implementation-desktop.png`
- combined comparison: `design-comparison.png`
- header-spacing verification: `header-spacing-today.png`, `header-spacing-sale.png`
- hierarchical back verification: `sale-back-to-categories.png`
- state: HALIN sale landing, no query, all filters, category landing visible
- viewport: 512 × 768 CSS px for the mobile comparison; 1280 × 720 CSS px for desktop resilience
- density normalization: source 1024 × 1536 px was downsampled to 512 × 768 px; implementation capture is 512 × 768 px at browser density 1

## Full-view comparison evidence

The combined comparison shows the same information order and overall composition: floating header, search, three filters, category heading and management action, a two-column grouped category surface, six semantic colored category icons, selected Jeans state, and floating bottom navigation. The live implementation preserves the existing checkout on desktop and hides it on the mobile category landing.

## Focused region comparison evidence

- Header/search/filter region: matching translucent white surfaces, purple accent, rounded geometry, RTL order, Vazirmatn typography, and compact three-column filters.
- Category grid: matching two-column/three-row grouping, real raster icon assets extracted from the selected visual, separators, selected Jeans surface, labels, counts, and RTL chevrons.
- Navigation: matching five destinations, translucent floating surface, and purple active sale state.

## Required fidelity surfaces

- Fonts and typography: Vazirmatn is enforced for HTML, controls, and inputs. Hierarchy, weights, RTL alignment, and line height are consistent with the selected visual.
- Spacing and layout rhythm: header-to-search spacing, filter gaps, heading spacing, category row rhythm, radii, and bottom navigation placement match after iteration.
- Colors and visual tokens: near-white/lilac canvas, translucent white surfaces, purple active states, soft semantic icon tiles, and low-contrast dividers map to the reference.
- Image quality and asset fidelity: category, search, and management icons are raster crops from the selected visual; no placeholder imagery is used for these assets.
- Copy and content: app copy is coherent and matches the selected flow. Product counts remain live data rather than copied mock values.
- Responsiveness: no horizontal overflow at 512 px or 1280 px. The mobile layout hides checkout; desktop keeps the operational checkout alongside the category surface.
- Accessibility: semantic buttons, labels, alt handling, visible focus states, practical tap targets, reduced-motion support, and RTL direction are retained.

## Comparison history

1. Initial implementation finding [P2]: excessive space between the floating header and search changed above-the-fold density. Fix: reduced mobile sale top padding from 104 px to 44 px. Post-fix evidence: `design-implementation-mobile.png` and `design-comparison.png`.
2. Initial implementation finding [P2]: the reference showed Jeans as the visually preferred category, while the implementation had no featured state. Fix: added the selected lilac surface and purple label/chevron to the first category. Post-fix evidence: `design-implementation-mobile.png` and `design-comparison.png`.
3. Initial implementation finding [P2]: management used a generic gear instead of the reference slider icon. Fix: extracted and used the exact management icon from the selected visual. Post-fix evidence: `design-implementation-mobile.png`.
4. User-reported finding [P1]: the fixed floating header overlapped the first content block on Today and Sale. Fix: moved the shared mobile content origin below the 74 px header plus its top inset, and normalized page-level top padding. Post-fix evidence: `header-spacing-today.png` and `header-spacing-sale.png`; measured Sale gap is 37 px and overlap is 0 px, while Today page top is 107 px below the header bottom at 84 px.
5. User-reported finding [P1]: the Sale header back button jumped from a category product list directly to Today. Fix: added hierarchical back handling so an active query/category/color/size is cleared first and the category landing is restored; only the next back action leaves Sale. Post-fix evidence: `sale-back-to-categories.png`, with the route remaining `#/sale`, category landing visible, and product view hidden.

## Primary interactions tested

- selecting Jeans opens the filtered product list and exposes “همه دسته‌بندی‌ها”
- returning restores the category landing
- sequential search typing keeps the input focused and filters results
- management opens the warehouse category manager
- browser console checked with no errors

## Follow-up polish

- [P3] Product counts intentionally reflect live inventory, so they differ from the concept mock.
- [P3] Desktop retains the existing CRM side navigation and checkout because those are product requirements not represented in the mobile reference.

final result: passed
