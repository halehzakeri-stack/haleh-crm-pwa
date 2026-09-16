# Design QA — Sale UI gap fixes v45

## Source of visual truth

- Audit board: https://www.figma.com/design/EV7T9IGc6zYoBSq9eMdUrg
- Before captures: `qa-audit-sale-ui-gap-2026-08-30/01-sale-landing.png` through `04-category-products.png`
- Before viewport: 395 × 814 px

## Implementation under test

- Local URL: `http://127.0.0.1:8767/?qa=sale-ui-gap-v45#/sale`
- After viewport: 390 × 844 px
- After captures: `qa-audit-sale-ui-gap-2026-08-30/after-01-sale-landing.png` through `after-05-last-product-safe-area.png`
- Normalization: screenshots compared in equal-height 814 px frames using `object-fit: contain` in `sale-ui-gap-v45-comparison.html`.

## State coverage

- Category landing with no selected category
- Empty/zero-product category states
- Category management sheet
- Reorder selection and destination state
- Product list with visible color names
- Last product scrolled above the fixed bottom navigation

## Findings and fixes

1. P0 — Fixed bottom navigation overlapped the lower product cards. Added mobile safe-area padding to the sale page and product list. Measured final gap between the last product and the navigation: 150.8 px.
2. P1 — Categories with zero products looked actionable but gave weak feedback. Added explicit `بدون کالا` labels and muted styling.
3. P1 — Category management lacked a clear exit. Added a visible `بستن` control while preserving pull-down and backdrop dismissal.
4. P1 — Reorder selection was ambiguous. Added strong selected styling, destination hints, `aria-pressed`, and 44 × 44 px drag handles.
5. P2 — Product color dots were hard to interpret. Replaced them with compact named color chips.
6. P2 — Odd category counts ended with an unexplained blank tile. Kept the requested ellipsis concept and clarified it as `جای دسته‌بندی بعدی`.
7. P3 — A vertical divider between the two category columns was visually inconsistent with the open card treatment. Removed the vertical divider while preserving the horizontal row separators.

## Visual surfaces reviewed

- Typography: Persian hierarchy and weights remain consistent with Vazirmatn.
- Spacing: bottom safe area and sheet header spacing corrected; no clipped final action.
- Color: existing purple system preserved; selected and empty states now use consistent purple/neutral tokens.
- Image fidelity: product images remain uncropped and use existing assets.
- Copy: labels are concise and Persian; no internal/technical text exposed.

## Interaction verification

- Open/close category management: passed
- Select source and destination to reorder: passed; first two categories swapped and persisted locally
- Open a category and render seven products: passed
- Bottom navigation remains fixed while the last card and its action remain fully visible: passed
- Browser console warnings/errors: none

## Comparison history

- Pass 1: identified bottom-nav overlap, weak empty states, unclear reorder state, and unlabeled color dots.
- Pass 2: implemented fixes and captured all required states.
- Pass 3: measured last-card clearance, verified persistence, and checked console output.
- Pass 4: compared `qa-divider-source.png` with `qa-audit-sale-ui-gap-2026-08-30/after-06-divider-focused.png` in `divider-removal-comparison.png`; the vertical divider is gone, row rhythm is preserved, and the browser console remains clean.

## Independent category cards — approved implementation v48

- Source visual truth: `qa-audit-sale-ui-gap-2026-08-30/selected-independent-category-cards-preview.png` (1419 × 1108 px; component-focused generated preview approved by the user).
- Browser-rendered implementation: `qa-audit-sale-ui-gap-2026-08-30/independent-cards-approved-state-390.png` (390 × 1050 px at a 390 × 844 CSS viewport, device scale factor 1).
- Focused implementation region: `qa-audit-sale-ui-gap-2026-08-30/independent-cards-approved-focus-390.png` (390 × 410 px).
- Same-input comparison: `qa-audit-sale-ui-gap-2026-08-30/independent-category-cards-comparison.png`.
- State: five stored categories in the user-approved order, no active filter, sale landing visible.
- Density normalization: the reference is a magnified component crop; the implementation was inspected at the real PWA width. Structural proportions were compared in the side-by-side board rather than treating the reference crop as a full-page viewport.

### Fidelity surfaces

- Fonts and typography: existing Vazirmatn hierarchy, optical weights, RTL alignment, line height, and compact count labels are preserved.
- Spacing and layout rhythm: two equal tracks, 10 px mobile gap, independent 18 px card radii, no internal dividers, and the fifth card spans the complete 366 px content width.
- Colors and tokens: existing white surfaces, subtle purple-neutral strokes, shadows, and zero-inventory muted state are preserved.
- Image quality and assets: the existing category icon assets remain sharp, correctly scaled, and uncropped.
- Copy and content: category names and inventory counts match the approved reference state; the placeholder copy and ellipsis are completely removed.

### Comparison history

- Pass 1: the previous implementation used a shared grid surface with separator lines and an artificial placeholder for odd counts.
- Fix: removed placeholder rendering, replaced the shared surface with independent cards, and added odd-last-child full-width behavior.
- Pass 2: browser verification at 390 × 844 confirmed five independent cards, no placeholder, 1 px card borders, 18 px radii, and a 366 px full-width final card. Selection and return interactions passed.
- Pass 3: verification at 756 × 650 confirmed the responsive two-column structure remains stable. Browser console errors and warnings: none.

### Remaining findings

- No actionable P0, P1, or P2 mismatch remains. The larger apparent text/card scale in the source comes from its component-only crop and is acceptable in the real full-page PWA context.

final result: passed

---

# Design QA — Mobile dark-mode fixes v69

## Source visual truth

- Tasks source: `qa-audit-mobile-dark-v69/08-tasks-dark.png`, 390 × 844 px.
- Inventory source: `qa-audit-mobile-dark-v69/07-inventory-dark.png`, 390 × 844 px.
- New Sale source: `qa-audit-mobile-dark-v69/05-sale-dark.png`, 390 × 844 px.
- User-approved scope: correct the three highest-impact dark-mode gaps without changing layout, content, routes, or data.

## Implementation under test

- Local URL: `http://127.0.0.1:8789/?qa=mobile-dark-fixes-v69-final#/tasks`.
- Tasks capture: `qa-audit-mobile-dark-v69-fix/01-tasks-after.jpg`, 390 × 844 px.
- Inventory capture: `qa-audit-mobile-dark-v69-fix/02-inventory-after.jpg`, 390 × 844 px.
- New Sale capture: `qa-audit-mobile-dark-v69-fix/03-sale-after.jpg`, 390 × 844 px.
- Same-input comparison: `qa-audit-mobile-dark-v69-fix/04-side-by-side.jpg`.
- Viewport: 390 × 844 CSS px at device scale factor 1.
- State: dark theme, empty operational dataset.
- Focused comparison was not required because the affected cards and controls remain clearly legible at the full mobile viewport.

## Findings and comparison history

### Pass 1 — blocked

- P1: Tasks summary cards kept a white background while their primary text used the dark-theme near-white token, making the values effectively unreadable.
- P1: Inventory barcode scan and empty-state reset controls retained light-theme backgrounds or browser-default grey treatment, creating poor contrast and an inconsistent state.
- P1: New Sale management and scan actions retained light-theme color treatment and looked detached from the surrounding dark surface.

### Fixes made

- Mapped task summary cards and task filters to the existing dark surface, border, text, muted, and active-purple tokens.
- Mapped inventory scan and empty-state reset actions to the dark purple-soft surface with the accessible dark-theme purple foreground.
- Mapped the New Sale management and scan actions to the same dark-theme action treatment.
- Scoped all corrections to mobile dark mode at 860 px and below.

### Pass 2 — passed

- Tasks summary background is `rgb(24, 26, 34)`, primary text is `rgb(243, 244, 247)`, and supporting text is `rgb(184, 187, 197)`.
- Inventory scan and reset actions use `rgb(43, 37, 66)` with `rgb(165, 140, 255)` foreground.
- New Sale scan and management actions use the same purple-soft and purple dark-theme tokens.
- No horizontal page overflow or console errors were found on the three corrected routes.
- The partially revealed final task-filter chip remains an intentional horizontal-scroll affordance and is not a regression.
- No actionable P0, P1, or P2 issue remains in the approved scope.

## Required fidelity surfaces

- Fonts and typography: Vazirmatn, Persian shaping, sizes, weights, wrapping, and hierarchy are unchanged.
- Spacing and layout rhythm: card sizes, toolbar tracks, section gaps, navigation, and persistent bottom controls are unchanged.
- Colors and visual tokens: corrected controls now use the existing dark-theme surface, line, text, muted, purple, and purple-soft tokens.
- Image quality and assets: icons and all existing image assets remain unchanged and crisp.
- Copy and content: all Persian labels and empty-state copy remain unchanged.

## Interaction and implementation checks

- Tasks, Inventory, and New Sale mobile dark-mode render: passed.
- Horizontal page overflow: none at 390 × 844.
- Browser console errors: none.
- Inline scripts, service worker syntax, and repository whitespace: passed.

final result: passed

---

# Design QA — Today status heading gap v67

## Source visual truth

- User-reported focused screen: `qa-audit-status-heading-gap-v67/00-before.png`, 1906 × 428 px.
- State: light theme, desktop Today dashboard, empty operational dataset.

## Implementation under test

- Local URL: `http://127.0.0.1:8767/?qa=status-heading-gap-v67#/today`.
- Desktop capture: `qa-audit-status-heading-gap-v67/01-desktop-after.png`, 1440 × 900 CSS px at device scale factor 1.
- Focused desktop crop: `qa-audit-status-heading-gap-v67/01-desktop-focus.png`, 950 × 220 px.
- Mobile capture: `qa-audit-status-heading-gap-v67/02-mobile-after.png`, 390 × 844 CSS px at device scale factor 1.
- Same-input focused comparison: `qa-audit-status-heading-gap-v67/03-side-by-side.png`.

## Findings and comparison history

### Pass 1 — blocked

- P2: the «وضعیت امروز» heading had no reliable vertical separation from the unified status card because the section gap was declared without a layout mode that applies `gap`.

### Fixes made

- Made the status section an explicit grid so its spacing token is consistently applied.
- Set a 16 px desktop gap and a 12 px mobile gap while preserving the approved typography, cards, icons, colors, and interactions.

### Pass 2 — passed

- Browser geometry confirms 16 px visible separation on desktop and 12 px on mobile.
- The section remains within the 390 px mobile viewport with no horizontal overflow.
- No actionable P0, P1, or P2 issue remains in the corrected region.

## Required fidelity surfaces

- Fonts and typography: unchanged from the passed v66 scale; Persian shaping, weights, sizes, and line heights remain consistent.
- Spacing and layout rhythm: heading-to-card separation now follows the intended section rhythm at both breakpoints.
- Colors and tokens: unchanged.
- Image quality and assets: existing icon assets remain unchanged and crisp; no replacement asset was introduced.
- Copy and content: all Persian labels remain unchanged.

## Interaction and implementation checks

- Desktop and mobile browser render: passed.
- Status-card behavior: unchanged.
- Inline scripts, service worker syntax, and repository whitespace: passed.

final result: passed

---

# Design QA — Unified Today status strip v65

## Source visual truth

- Selected visual: `qa-audit-today-status-v65/00-selected-option-2.png`.
- Source pixels: 1927 × 816 px.
- Approved direction: one restrained white status surface with three equal RTL columns, subtle dividers, semantic icon tints, clear zero values, and quiet secondary labels.

## Implementation under test

- Local URL: `http://127.0.0.1:8767/?qa=today-status-v65-final#/today`.
- Desktop capture: `qa-audit-today-status-v65/02-desktop-final.png` at a 1440 × 900 CSS viewport and device scale factor 1.
- Mobile capture: `qa-audit-today-status-v65/04-mobile-final.png` at a 390 × 844 CSS viewport and device scale factor 1.
- Focused implementation region: `qa-audit-today-status-v65/05-desktop-focus.png`, 930 × 186 px.
- Same-input comparison: `qa-audit-today-status-v65/06-side-by-side.png`, 1873 × 900 px.
- State: light theme, all brands, operational empty dataset, all three Today metrics equal to zero.
- Density normalization: the generated source is a component concept with generous surrounding whitespace; the implementation focus is shown at its real in-app desktop width beside it. The comparison judges the component hierarchy and proportions rather than treating the source canvas as a complete app viewport.

## Findings and comparison history

### Pass 1 — blocked

- P2: the first mobile interpretation stacked all three metrics vertically, made the dashboard unnecessarily tall, and brought the persistent bottom navigation over the third row.
- P2: the first desktop implementation placed the metric value beside the label, reproducing the detached black-dot feeling the redesign was intended to remove.

### Fixes made

- Kept all three metrics inside one unified rounded surface and retained subtle semantic icon colors and column dividers.
- Rebuilt each desktop metric hierarchy as label, prominent value, then muted supporting status, matching the selected option.
- Changed the mobile layout to a compact three-column unified strip so all metrics remain visible without added scrolling or navigation overlap.
- Preserved the existing icon library, Persian font system, RTL order, dark-mode tokens, focus styles, and functional navigation targets.

### Pass 2 — passed

- Post-fix desktop evidence: `qa-audit-today-status-v65/02-desktop-final.png` and `qa-audit-today-status-v65/05-desktop-focus.png`.
- Post-fix mobile evidence: `qa-audit-today-status-v65/04-mobile-final.png`.
- Side-by-side evidence: `qa-audit-today-status-v65/06-side-by-side.png`.
- No actionable P0, P1, or P2 mismatch remains.

## Required fidelity surfaces

- Fonts and typography: the current Persian font stack, RTL alignment, optical weights, compact labels, and prominent tabular metric values are consistent with the selected direction and the rest of the product.
- Spacing and layout rhythm: three equal tracks, 1 px dividers, 22 px desktop radius, restrained elevation, aligned icon/copy groups, and the compact mobile treatment preserve a clean executive rhythm.
- Colors and tokens: white surface, neutral stroke, purple/orange/green icon tints, dark primary copy, muted secondary copy, and dark-mode overrides all use existing project tokens.
- Image quality and assets: no raster placeholder, CSS drawing, emoji, or fabricated asset was added; the existing application icon library is reused at crisp responsive sizes.
- Copy and content: Persian labels and status messages match the current product vocabulary; no internal or technical copy is exposed.

## Primary interactions tested

- Customer status card routes to the customer workspace: passed.
- Payment status card routes to the finance workspace: passed.
- Responsive rendering at 1440 × 900 and 390 × 844: passed.
- Persistent mobile navigation remains visible and does not cover the status strip: passed.
- Repository whitespace check: passed.

## Follow-up polish

- P3: the generated concept includes a small decorative purple title mark. It was intentionally omitted so the section remains consistent with the app's existing heading language and does not introduce a one-off decorative asset.

final result: passed

# Inventory redesign v60 — approved product-centered cards

## Visual comparison

- Approved reference: `Screenshot 1405-06-10 at 20.16.43.png`.
- Final implementation: `qa-audit-inventory-2026-09-01/08-inventory-v60-final.png`.
- Normalized reference: `qa-audit-inventory-2026-09-01/09-inventory-reference-normalized.png`.
- Side-by-side evidence: `qa-audit-inventory-2026-09-01/10-inventory-v60-side-by-side.png`.
- Result: the mobile hierarchy, toolbar order, stock-status filters, grouped product surface, expanded variant grid, action row, Persian typography, and persistent bottom navigation match the approved direction. Live catalog data and existing product photography are intentionally preserved.

## Functional checks

- Product search by code (`H333`) and clearing the query: passed.
- `کم‌موجود` filter: passed with one matching product in the current dataset.
- `ناموجود` filter: passed with two matching products in the current dataset.
- Product expansion/collapse without reordering the list: passed.
- Brand picker: passed.
- Barcode scanner entry state: passed.
- Stock receipt starts unselected and blocks an empty submission with an inline Persian error: passed.
- Manual stock adjustment starts unselected and blocks an empty submission with an inline Persian error: passed.
- Stock-movement history opens with product variants and an empty-state message when no movements exist: passed.
- No inventory quantity was mutated during QA.
- Browser console warnings/errors: none.
- JavaScript syntax and repository whitespace checks: passed.

## Follow-up polish

- P3: the implementation uses the live blue-jeans catalog image for `H333` instead of the beige reference photo, preserving real product data rather than replacing it with a mock asset.
- P3: app-shell touch targets remain consistent with the rest of the PWA and are slightly larger than the normalized reference in a few places.

final result: passed

---

# Design QA — Approved wide product detail v59

## Source visual truth

- Approved demo: `qa-audit-products-2026-08-31/products-detail-wide-demo-v59.jpg`.
- Demo viewport: 395 × 814 px at device scale factor 1.
- Approved state: brand `هالین`, product `شلوار واید لگ ۳۳۳` selected, detail drawer open over the product catalog.

## Implementation under test

- Local URL: `http://127.0.0.1:8767/?qa=products-detail-wide-v59-final#/products`.
- Final capture: `qa-audit-products-2026-08-31/products-detail-wide-v59-final.jpg`.
- Same-input comparison: `qa-audit-products-2026-08-31/products-detail-wide-v59-comparison.jpg`.
- CSS viewport and screenshot: 395 × 814 px, device scale factor 1.
- A focused-region comparison was not required because the complete detail drawer and its relationship to the catalog and bottom navigation are readable at 1:1 in the full mobile viewport.

## Findings and fixes

- P2: the v58 detail drawer felt visually cramped for the product image, facts, and primary actions.
- Fix: increased the drawer's horizontal and vertical breathing room, widened the image column, enlarged the product preview, strengthened the title and fact hierarchy, and increased action height while preserving bottom-navigation clearance.
- The final implementation matches the approved demo in the same product, scroll, selection, and drawer state.
- No actionable P0, P1, or P2 mismatch remains.

## Required fidelity surfaces

- Typography: Persian RTL hierarchy remains consistent with the application while the product title and facts gain appropriate emphasis.
- Spacing: wider image/facts separation, calmer drawer padding, and balanced action spacing match the approved demo.
- Colors and surfaces: existing neutral drawer, purple primary action, borders, semantic stock color, and persistent navigation are unchanged.
- Assets and content: the existing H333 product image and live product data are reused without placeholder or fabricated content.

## Primary interactions tested

- Open H333 product detail: passed.
- Open inventory history from the widened drawer: passed.
- Open product edit form from the widened drawer: passed.
- Browser console errors/warnings after final render: none.
- JavaScript syntax and repository diff whitespace checks: passed.

final result: passed

---

# Design QA — Products redesign v58

## Source visual truth

- Selected concept: `/Users/mac/.codex/generated_images/01a016d7-5330-7902-a478-fde4d0c64819/exec-a9cb5ba3-f7a3-4b9b-b580-7971962d3855.png`
- Source pixels: 873 × 1801 px.
- Normalized source: `qa-audit-products-2026-08-31/products-reference-normalized.png`, resized to 395 × 814 px to match the PWA viewport aspect and density used for QA.

## Implementation under test

- Local URL: `http://127.0.0.1:8767/?qa=products-redesign-v58-final6#/products`
- CSS viewport and screenshot: 395 × 814 px, device scale factor 1.
- Main page capture: `qa-audit-products-2026-08-31/19-products-v58-final-page.jpg`.
- Selected-product state: `qa-audit-products-2026-08-31/17-products-v58-detail-final.jpg`.
- Full-view same-input comparison: `qa-audit-products-2026-08-31/products-v58-side-by-side-final.jpg`.
- State: brand `هالین`, category `همه`, product `شلوار فلر ۲۵۸` selected, detail drawer open.
- Focused-region comparison was not required: the normalized mobile views are shown at a readable 1:1 395 px width and the product grid, drawer, actions, facts, and persistent navigation are all legible in the full-view board.

## Findings and comparison history

### Pass 1 — blocked

- P1: the prior products page was data-heavy and lacked a strong visual catalog, selection state, and operational detail surface.
- P1: inventory filtering, product search, barcode entry, editing, and stock receipt were not available from one coherent workspace.
- P2: the first detail drawer stacked image, facts, and actions vertically, making it substantially taller than the approved reference and hiding too much of the catalog.
- P2: the product order followed the page RTL flow, placing the first selected product on the opposite side from the approved visual.
- P2: a duplicated scan affordance appeared inside the search field as well as in the dedicated barcode button.

### Fixes made

- Rebuilt the workspace as an image-led two-column catalog with search, stock filter, barcode action, new-product action, live category tabs, selected state, price, color, and inventory status.
- Added functional detail, edit, inventory overview, and stock-receipt flows without creating a new route.
- Reworked the detail drawer into the reference composition: product image on the left, identity/facts/actions on the right, and the persistent navigation visible below it.
- Reduced the drawer height, preserved readable Persian hierarchy, removed the duplicate scan affordance, and aligned the first product to the reference's left column while keeping every card internally RTL.
- Kept live categories and product records as the source of truth; the tabs therefore reflect available data instead of hard-coded mock labels.

### Pass 2 — passed

- Post-fix evidence: `qa-audit-products-2026-08-31/17-products-v58-detail-final.jpg` and `qa-audit-products-2026-08-31/products-v58-side-by-side-final.jpg`.
- No actionable P0, P1, or P2 difference remains.

## Required fidelity surfaces

- Fonts and typography: existing project Persian font stack, RTL alignment, hierarchy, weights, line height, and compact metadata are preserved; action labels no longer wrap.
- Spacing and layout rhythm: two equal catalog tracks, compact toolbar and tabs, selected-card stroke, detail drawer proportions, safe area, and bottom-navigation clearance match the approved direction.
- Colors and tokens: project purple, neutral surfaces, semantic green/orange stock states, subtle borders, and selected-state contrast are consistent.
- Image quality and assets: existing product images are reused, object-fit is preserved, and no placeholder, CSS drawing, emoji, or fabricated product asset was introduced.
- Copy and content: all visible app text is Persian, concise, operational, and derived from the current product data.

## Primary interactions tested

- Search by code (`H147`) and clear search: passed.
- Category tab selection (`جین`): passed.
- Low-stock filter (`کم‌موجود`) and reset: passed.
- Open product details and selected state: passed.
- Open edit form without mutating saved data: passed.
- Open inventory overview and stock-receipt form without saving a receipt: passed.
- Browser console errors/warnings after the final render: none.
- JavaScript syntax and repository diff whitespace checks: passed.

## Follow-up polish

- P3: the existing app shell header and navigation retain slightly larger touch targets than the concept image so the redesign remains consistent with the rest of the PWA.
- P3: category tab count varies with live data and can be shorter than the concept's four-tab example.

final result: passed

---

# Design QA — Today typography scale v66

## Source visual truth

- User-reported screen: `qa-audit-today-typography-v66/00-user-report.png`, 2880 × 1800 px.
- Normalized app-only crop: `qa-audit-today-typography-v66/00-user-report-app-normalized.png`, 1614 × 1050 px.
- Focused reported status region: `qa-audit-today-typography-v66/04-status-before-focus-normalized.png`, normalized to 930 × 185 px.

## Implementation under test

- Local URL: `http://127.0.0.1:8767/?qa=today-type-v66-final#/today`.
- Desktop capture: `qa-audit-today-typography-v66/01-desktop-after.png`, 1614 × 1050 CSS px at device scale factor 1.
- Mobile capture: `qa-audit-today-typography-v66/02-mobile-after.png`, 390 × 844 CSS px at device scale factor 1.
- Focused after region: `qa-audit-today-typography-v66/05-status-after-focus.png`, 930 × 185 px.
- Same-input full comparison: `qa-audit-today-typography-v66/03-side-by-side.png`.
- Same-input focused comparison: `qa-audit-today-typography-v66/06-focus-side-by-side.png`.
- State: light theme, all brands, operational empty dataset.

## Findings and comparison history

### Pass 1 — blocked

- P2: the status section title at 22 px was too close to the 24 px page and greeting titles, weakening hierarchy.
- P2: 18 px card labels were visually dominant while the Persian zero metrics at 27 px had a much smaller ink box and read like detached dots.
- P2: the 13 px secondary labels were too close to the 14 px supporting copy elsewhere, flattening the card hierarchy.

### Fixes made

- Rebalanced the desktop scale to 20 px section title, 16 px card labels, 32 px metric values, and 12 px secondary copy.
- Preserved the existing 24 / 36 px page-to-display relationship so the hero remains the primary data surface.
- Rebalanced mobile cards to 18 px section title, 12 px labels, 23 px values, and 9.5 px supporting copy without increasing card height.
- Kept Persian numerals, Vazirmatn, RTL alignment, icon sizes, and the unified card layout unchanged.

### Pass 2 — passed

- The heading, label, metric, and support tiers now follow a clear 20 / 16 / 32 / 12 desktop relationship.
- The mobile strip keeps all three metrics readable above the persistent navigation.
- No actionable P0, P1, or P2 issue remains in the corrected Today typography surface.

## Required fidelity surfaces

- Fonts and typography: Vazirmatn, RTL shaping, Persian digits, weights, line heights, and the four-level hierarchy were checked at both target viewports.
- Spacing and layout rhythm: the type changes fit the existing cards without wrapping, clipping, or changing the approved unified layout.
- Colors and tokens: all existing text, semantic icon, and muted-copy colors are preserved.
- Image quality and assets: existing icon assets remain unchanged and crisp; no replacement or placeholder was introduced.
- Copy and content: all current Persian labels remain unchanged.

## Interaction and implementation checks

- Desktop and mobile render: passed.
- Status-card navigation behavior: unchanged from the passed v65 interaction checks.
- Inline scripts and service worker syntax: passed.
- Repository whitespace check: passed.

final result: passed

---

# Design QA — Today ink palette v68

## Source visual truth

- Approved prior Today screen: `qa-audit-status-heading-gap-v67/01-desktop-after.png`, 1165 × 814 px.
- User-approved direction: replace pure black primary copy with a warmer charcoal carrying a subtle purple undertone; preserve semantic, purple, and muted colors.

## Implementation under test

- Local URL: `http://127.0.0.1:8767/?qa=today-ink-v68#/today`.
- Desktop capture: `qa-audit-today-ink-v68/01-desktop-after.png`, 1165 × 814 px from a 1440 × 900 CSS viewport at device scale factor 1.
- Mobile capture: `qa-audit-today-ink-v68/02-mobile-after.png`, 390 × 844 CSS px at device scale factor 1.
- Same-input full comparison: `qa-audit-today-ink-v68/03-side-by-side.png`.
- State: Today route, light theme, all brands, empty operational dataset.
- Focused comparison was not required because the color change is consistently applied to the clearly legible primary text visible across the full-view board.

## Findings and comparison history

### Pass 1 — blocked

- P2: primary text used several near-black values, including `#121216` and `#18191d`, which felt visually harsher than the app's purple-neutral design language.

### Fixes made

- Applied `#24212d` to Today-page titles, greeting, hero amount, status labels and values, interbrand heading, priority headings, and visible task titles.
- Applied `#34303e` to inactive brand-switch labels.
- Scoped the palette to the light-theme Today route so semantic green, active purple, muted copy, other routes, and night mode remain unchanged.

### Pass 2 — passed

- Desktop and mobile captures preserve the approved hierarchy, spacing, and layout without overflow.
- Computed primary text color is `rgb(36, 33, 45)`; secondary status copy remains `rgb(154, 156, 167)`.
- Real night-mode interaction confirms its primary text remains `rgb(243, 244, 247)`.
- No actionable P0, P1, or P2 issue remains.

## Required fidelity surfaces

- Fonts and typography: family, weights, sizes, line heights, wrapping, and Persian shaping are unchanged.
- Spacing and layout rhythm: unchanged; no new clipping or horizontal overflow at 1440 × 900 or 390 × 844.
- Colors and tokens: the new purple-charcoal ink harmonizes with the brand palette while semantic and muted colors retain their original meaning.
- Image quality and assets: icons and all existing assets remain unchanged.
- Copy and content: all Persian text remains unchanged.

## Interaction and implementation checks

- Desktop and mobile render: passed.
- Night-mode toggle and dark text treatment: passed.
- Inline scripts, service worker syntax, and repository whitespace: passed.

final result: passed

---

# Design QA — Mezon orb cleanup v70

## Source visual truth

- User-reported focused capture: `qa-audit-mezon-orb-v70/00-before.png`, 300 × 246 px.
- Target: remove the black rectangular layer behind the storefront icon while preserving the circular dark-mode orb, purple halo, icon, label, and bottom navigation.

## Implementation under test

- Local URL: `http://127.0.0.1:8789/?qa=mezon-orb-v70-final#/today`.
- Full implementation capture: `qa-audit-mezon-orb-v70/01-after-full.jpg`, 390 × 844 px.
- Focused implementation capture: `qa-audit-mezon-orb-v70/02-after-focus.jpg`, 308 × 246 px.
- Same-input comparison: `qa-audit-mezon-orb-v70/03-side-by-side.jpg`.
- State: Today route, mobile dark theme, empty operational dataset.

## Findings and comparison history

### Pass 1 — blocked

- P2: `.mezon-orb` inherited the dark surface background, producing a 74 × 31 px black rectangle behind the storefront icon inside the circular active navigation control.

### Fix made

- Set the dark-mode `.mezon-orb` background and border to transparent while leaving the circular `::before` and `::after` layers unchanged.

### Pass 2 — passed

- The rectangular layer is no longer visible in the focused comparison.
- The orb and button backgrounds compute to transparent; the circular surface remains `rgb(24, 26, 34)` and the purple halo remains `rgb(33, 29, 50)`.
- No horizontal overflow or browser console errors were found at 390 × 844.
- No actionable P0, P1, or P2 issue remains in the approved scope.

## Required fidelity surfaces

- Fonts and typography: icon label typography and Persian shaping remain unchanged.
- Spacing and layout rhythm: navigation dimensions, orb position, circle size, and safe-area spacing remain unchanged.
- Colors and visual tokens: the unwanted rectangular surface was removed; approved dark surface and purple halo tokens remain intact.
- Image quality and assets: the existing storefront icon remains unchanged and crisp.
- Copy and content: the «مزون» label and all navigation copy remain unchanged.

## Interaction and implementation checks

- Active Today navigation state: passed.
- Mobile dark-mode rendering: passed.
- Inline scripts, service worker syntax, repository whitespace, and browser console: passed.

final result: passed
