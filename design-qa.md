# Design QA — Category-first sale screen

- source visual truth path: `/Users/mac/.codex/generated_images/01a016d7-5330-7902-a478-fde4d0c64819/exec-23e30be8-4b9a-4a09-ba87-bd34fec26059.png`
- normalized source: `design-reference-normalized.png`
- implementation screenshot: `design-implementation-mobile.png`
- desktop screenshot: `design-implementation-desktop.png`
- combined comparison: `design-comparison.png`
- header-spacing verification: `header-spacing-today.png`, `header-spacing-sale.png`
- hierarchical back verification: `sale-back-to-categories.png`
- latest mobile Today verification: `qc-today-mobile.png`
- latest mobile product-list verification: `qc-products-mobile.png`
- latest category-grid verification: `qc-sale-mobile.png`
- latest focused source/implementation comparison: `qc-category-comparison.png`
- product quick-create verification: `qc-product-quick-create.png`
- state: HALIN sale landing, no query, all filters, category landing visible
- viewport: 512 × 768 CSS px for the mobile comparison; 1280 × 720 CSS px for desktop resilience
- density normalization: source 1024 × 1536 px was downsampled to 512 × 768 px; implementation capture is 512 × 768 px at browser density 1
- latest viewport: 393 × 852 CSS px at browser density 1; focused user source is 650 × 578 px and the implementation captures are 393 × 852 px

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
6. User-reported finding [P1]: mobile content inherited both body top padding and main top padding, creating a large empty band below the floating header. Fix: removed the duplicate body offset and retained one 94 px content origin. Post-fix evidence: `qc-today-mobile.png`; measured header bottom is 84 px, page top is 94 px, and greeting top is 131 px.
7. User-reported finding [P2]: category dividers were interrupted by the selected tile and differed between cells. Fix: moved dividers from individual tile borders to a continuous grid background and removed competing per-tile borders. Post-fix evidence: `qc-category-comparison.png` and `qc-sale-mobile.png`.
8. User-reported finding [P2]: the management icon carried a visible pale square from the raster background. Fix: blended the icon asset against the sale canvas while preserving the supplied icon artwork. Post-fix evidence: `qc-sale-mobile.png`.
9. User-reported finding [P2]: stock quantity/status text added unnecessary density to the mobile buying cards. Fix: removed the availability row from the sale catalog and collapsed its grid track. Post-fix evidence: `qc-products-mobile.png`.
10. User-requested workflow improvement [P2]: defining a missing category or color required leaving the product form. Fix: added compact inline “ساخت دسته‌بندی” and “ساخت رنگ” cards; each expands in place, saves the reference value, and immediately selects it without clearing product-form data. Post-fix evidence: `qc-product-quick-create.png`.

## Primary interactions tested

- selecting Jeans opens the filtered product list and exposes “همه دسته‌بندی‌ها”
- returning restores the category landing
- sequential search typing keeps the input focused and filters results
- management opens the warehouse category manager
- Today, Sale category landing, and product-list states render at 393 × 852 without header overlap
- category grid shows continuous vertical and horizontal dividers
- product-list stock status is hidden while product selection remains operational
- category and color quick-create panels open in place and preserve entered product fields
- browser console checked with no errors

## Follow-up polish

- [P3] Product counts intentionally reflect live inventory, so they differ from the concept mock.
- [P3] Desktop retains the existing CRM side navigation and checkout because those are product requirements not represented in the mobile reference.

final result: passed

---

# Design QA — Corrected mezon navigation v24

- source visual truth: `/Users/mac/Downloads/exec-faad11d5-00f0-4e21-bd35-c588bca5e89f.png`
- rendered implementation: `qc-nav-v24-full.png`
- normalized combined comparison: `qc-nav-v24-comparison.png`
- source pixels: 1800 × 900; focused source crop: 1800 × 450
- implementation viewport: 390 × 600 CSS px at density 1; focused implementation crop: 390 × 120
- state: Today dashboard, all brands, navigation closed

## Findings and comparison history

1. [P1] v23 made the center circle 72 px and lifted it too far above the bar, materially changing the approved silhouette. Fix: reduced the orb to 48 px and placed it only 8 px above the 64 px pill surface.
2. [P1] v23 looked like a floating circle over a mostly straight bar. Fix: moved the 32 px radial cutout center 14 px inside the bar so the white surface now wraps around the orb as the broad U-shaped notch shown in the reference.
3. [P2] Side actions were too visually weak. Fix: increased side icons to 27 px and labels to 11 px while preserving muted gray and purple active tokens.
4. [P2] The original navigation used a tighter horizontal inset and softer pill geometry. Fix: set 18 px mobile insets, 36 px end radii, and matched the soft border/shadow treatment.

## Fidelity surfaces

- Typography: Vazirmatn retained; labels use the same hierarchy and RTL flow as the reference.
- Spacing/layout: three equal tracks, centered orb, Orders on the left and Menu on the right; zero horizontal overflow at 390 px.
- Colors/tokens: white surface, pale violet halo, purple active action, and muted gray secondary actions match the reference direction.
- Icons: existing product icon system retained; storefront, menu, and bag remain sharp and functional.
- Copy: exact visible labels are `سفارش‌ها`, `مزون`, and `منو`.

## Interactions tested

- Menu opens and begins with Customers then New Sale.
- Orders navigates to the Orders screen.
- Mezon returns to Today.
- Active states update after each navigation action.

final result: passed

---

# Design QA — Three-item mezon navigation v23

- source visual truth: `/Users/mac/.codex/generated_images/01a016d7-5330-7902-a478-fde4d0c64819/exec-faad11d5-00f0-4e21-bd35-c588bca5e89f.png`
- implementation evidence: `qc-nav-v23.png`
- viewport: 390 × 650 CSS px inside the in-app browser QA harness
- state: Today dashboard, all brands

## Findings and fixes

1. [P1] The deployed center action looked like a circle sitting on a straight bar, while the approved design used a real concave notch. Fix: the navigation surface now has a 44 px radial cutout and the 72 px mezon orb is elevated into that cutout.
2. [P2] The `مزون` label appeared inside the circle. Fix: the label now sits on the navigation body below the orb, matching the approved hierarchy.
3. [P2] The three actions needed operational verification after the structural CSS change. Fix: hamburger opens the complete mezon menu; Orders navigates to `#/orders`; Mezon returns to `#/today`; active states update correctly.

## Fidelity and regression checks

- RTL order is Menu, Mezon, Orders with the primary action centered.
- The established purple/lilac token, Vazirmatn typography, white glass surface, shadows, and icon set are preserved.
- The mobile document has no horizontal overflow.
- Hamburger contents retain Customers first, New Sale second, and Sales Opportunities marked `به‌زودی` and disabled.
- Service-worker cache was advanced so installed PWAs receive the corrected navigation.

final result: passed

## Mobile brand-switch placement QC — v26

- Source visual truth: `/var/folders/lw/tpzd48f130b_k1znvj6z9t700000gn/T/TemporaryItems/NSIRD_screencaptureui_zoIT9D/Screenshot 1405-05-31 at 18.45.33.png`.
- Implementation screenshot: `qc-brand-switch-mobile-v26.png`.
- Viewport: 390 × 844 CSS px; Today dashboard, aggregated-brand state.
- Finding [P2]: the brand selector and its `نمایش اطلاعات` caption appeared below the greeting, creating an oversized and visually disconnected welcome region.
- Fix: on mobile only, the selector now occupies a full-width row immediately below the header; the redundant caption is hidden and the greeting follows with a 14 px rhythm.
- Post-fix evidence: selector width 350 px inside a 358 px content row, selector above greeting, no horizontal overflow.
- Desktop regression check: at 1280 × 720 the selector stays beside the greeting and its caption remains visible.
- Typography, tokens, icon assets, card styling, and surrounding dashboard content are unchanged.
- Console: no errors or warnings.

final result: passed

## Time-aware greeting copy QC — v24

- Source visual truth: `/var/folders/lw/tpzd48f130b_k1znvj6z9t700000gn/T/TemporaryItems/NSIRD_screencaptureui_APrgx4/Screenshot 1405-05-31 at 17.26.46.png` (574 × 186 px focused greeting crop).
- Implementation evidence: `qc-greeting-v24.png` (812 × 814 px browser-rendered viewport, focused greeting in the same Today state).
- State: Today dashboard, aggregated brands, night period.
- Full-view evidence: hierarchy, RTL alignment, spacing, Vazirmatn typography, moon icon, lilac token, and surrounding dashboard layout remain unchanged.
- Focused comparison: the separate `شب` label is replaced by the requested complete phrase while keeping the icon and baseline alignment intact.
- Copy assertions: daytime → `هاله عزیزم شبت بخیر`; nighttime → `هاله عزیزم روزت بخیر`.
- Responsive check: 390 × 844 CSS viewport, no horizontal overflow.
- Console: no errors or warnings.

final result: passed

## Today header and status-icon regression QC — v22

- Calendar header order is explicitly date first and calendar icon second in RTL at both 390 px and 812 px.
- The greeting explicitly displays the current period (`روز` or `شب`) beside `هاله عزیزم`, with the matching sun/moon icon.
- All visible status cards render their real package, card, users, and task icons; SVG visibility, stroke color, and non-zero dimensions were asserted in-browser.
- Screenshots: `qc-today-390-v22.png` and `qc-today-812-v22.png`.
- Horizontal overflow: none at 390 px and 812 px.

final result: passed

---

# Design QA — Today intermediate breakpoint

- source evidence: `audit-today-mid-before.png`
- implementation evidence: `audit-today-mid-after.png`
- viewport: 812 × 844 CSS px at density 1; regression check at 390 × 844 CSS px
- state: Today, both brands, evening moon state

## Findings and comparison history

1. [P1] The Persian date wrapped below the calendar and escaped the floating header because the mobile header activates at 860 px while the contextual-date layout activated only at 760 px. Fix: aligned the date-control breakpoint with the 860 px header breakpoint, reserved a 102 px single-line control, and centered icon and text.
2. [P2] The moon icon was separated from the greeting because its inline flex treatment was missing between 761 and 860 px. Fix: applied the 24 px semantic icon tile and 7 px inline gap across the full mobile/tablet range.
3. [P2] The greeting and brand selector had unstable intrinsic widths at the intermediate breakpoint. Fix: constrained the greeting minimum and selector width without changing the established two-column composition.

## Required fidelity surfaces

- Typography: Vazirmatn hierarchy and RTL text flow retained.
- Spacing: header controls, greeting, and brand selector align without wrapping or overlap.
- Color: existing purple/lilac and semantic moon tokens retained.
- Assets: established icon system retained; no placeholder assets introduced.
- Copy: date, weekday, greeting, and brand labels remain unchanged.
- Responsiveness: document width equals viewport at both 812 px and 390 px.
- Runtime: browser console has no errors.

final result: passed

---

# Design QA — Inventory brand sheet

- source visual truth path: `/var/folders/lw/tpzd48f130b_k1znvj6z9t700000gn/T/TemporaryItems/NSIRD_screencaptureui_4ihY8M/Screenshot 1405-05-31 at 15.05.45.png`
- implementation screenshot: `inventory-brand-sheet.png`
- viewport: 390 × 844 CSS px at density 1
- state: Inventory, «هاله سجادی» selected

## Evidence and required fidelity surfaces

- Layout: one compact brand card replaces a permanently expanded three-option control; mobile management buttons remain hidden to preserve density.
- Typography and color: Vazirmatn, purple active text, pale-lilac selector surface, and existing card tokens remain consistent with the product UI.
- Copy: the three sheet choices are «هالین»، «هاله سجادی» and «هر دو برند».
- Behavior: selecting «هاله سجادی» updates the mobile subtitle, all four metrics, inventory table, movement list, and stock-receipt product options.
- Responsiveness: document width equals the 390 px viewport; no horizontal overflow.
- Runtime: browser console checked with no errors.

## Comparison history

1. User-reported finding [P1]: Inventory was implicitly fixed to HALIN and offered no path to the Haleh Sajjadi warehouse. Fix: added a compact selector that opens the existing draggable bottom sheet and scopes the complete inventory workspace.
2. User-requested refinement [P2]: a visible three-way segmented control would make the screen busy. Fix: options stay hidden until the compact «انبار فعال» card is tapped.

final result: passed

---

# Design QA — Contextual Today header

- source visual truth paths: `/var/folders/lw/tpzd48f130b_k1znvj6z9t700000gn/T/TemporaryItems/NSIRD_screencaptureui_idQmxc/Screenshot 1405-05-31 at 13.37.38.png`, `/var/folders/lw/tpzd48f130b_k1znvj6z9t700000gn/T/TemporaryItems/NSIRD_screencaptureui_YVAlbh/Screenshot 1405-05-31 at 13.38.46.png`, `/var/folders/lw/tpzd48f130b_k1znvj6z9t700000gn/T/TemporaryItems/NSIRD_screencaptureui_OzxJTP/Screenshot 1405-05-31 at 13.39.07.png`
- implementation screenshot: `today-header-contextual.png`
- viewport: 390 × 844 CSS px at density 1
- pixels: greeting source crop 674 × 196 px; implementation 390 × 844 px
- state: Today page, Saturday, no actionable notification, daytime icon

## Full-view and focused comparison evidence

The rendered PWA preserves the compact floating header and Today hierarchy. The focused greeting comparison confirms the existing Vazirmatn hierarchy is retained while the contextual icon sits inline with the greeting. The calendar now includes the real Persian date, and the unrelated red badge is absent when there is no actionable item.

## Required fidelity surfaces

- Fonts and typography: Vazirmatn remains the sole UI font; greeting weight and weekday/date hierarchy remain consistent.
- Spacing and layout rhythm: the date and calendar share one 92 px control; greeting icon uses a compact 24 px tile with no horizontal overflow.
- Colors and visual tokens: sun uses the established soft semantic treatment; notification count uses soft purple instead of red.
- Image quality and asset fidelity: the new time-of-day marks reuse the app's existing vector icon system and stroke language; no placeholder asset is present.
- Copy and content: date is generated from the Persian calendar; notification count is generated from actionable CRM data rather than a hardcoded number.

## Comparison history

1. User-reported finding [P2]: the greeting lacked a time-of-day cue. Fix: added sun from 06:00–15:59 and moon outside that interval, inline with «روز بخیر هاله عزیزم». Post-fix evidence: `today-header-contextual.png`.
2. User-reported finding [P2]: the red badge displayed an unrelated hardcoded 3. Fix: removed the hardcoded value, calculate actionable notifications, hide zero, and use the existing soft-purple token. Post-fix evidence: `today-header-contextual.png`.
3. User-reported finding [P2]: the calendar icon gave no date context. Fix: added localized Persian day and month next to the icon. Post-fix evidence: `today-header-contextual.png`.

## Primary checks

- sun state verified at the current daytime hour
- Persian date rendered as «۳۱ مرداد» from the device date
- zero notification badge hidden and accessible label changed to «اعلانی ندارید»
- document scroll width equals the 390 px viewport
- browser console checked with no errors

final result: passed

---

# Design QA — Today brand filter and inter-brand finance

- source visual truth path: `/Users/mac/.codex/generated_images/01a016d7-5330-7902-a478-fde4d0c64819/exec-ca4163a5-df82-44c6-84e2-bf266f2a0951.png`
- normalized source: `design-reference-finance-normalized.png`
- implementation screenshot: `finance-today-mobile.png`
- finance implementation screenshot: `finance-interbrand-mobile.png`
- desktop resilience screenshot: `finance-today-desktop.png`
- combined comparison: `design-finance-comparison.png`
- viewport: 390 × 844 CSS px at density 1 for PWA; 1365 × 900 CSS px for desktop
- pixels: source 862 × 1825 normalized to 390 × 969; implementation 390 × 969; finance capture 390 × 1124
- state: Today page, «همه برندها» selected, empty sales data, settled inter-brand account

## Full-view comparison evidence

The implementation retains the selected mockup's floating header, weekday, personalized greeting, quiet three-way brand selector, single sales hero, horizontally scrollable status cards, compact priorities, and floating bottom navigation. The added inter-brand summary is a deliberately restrained operational row between the hero and status cards.

## Focused region comparison evidence

- Header and greeting: matching RTL hierarchy, Persian weekday, white/lilac glass surface, and purple line icons.
- Brand selector: exact three states — همه برندها، هالین، هاله سجادی — with one soft-purple active segment.
- Mobile density: no chart or recent-orders panel; status cards scroll horizontally and the page has no horizontal overflow.
- Financial affordance: the inter-brand balance uses the existing status-pill, border, radius, and spacing tokens rather than introducing a new visual system.

## Required fidelity surfaces

- Fonts and typography: Vazirmatn remains the only UI font; Persian joining, weights, line height, and RTL alignment are consistent.
- Spacing and layout rhythm: 16 px mobile content inset, compact 12–14 px section rhythm, existing card radii, and persistent navigation clearance are preserved.
- Colors and visual tokens: existing purple, pale lilac, green, orange, blue, border, and shadow tokens are reused.
- Image quality and asset fidelity: no new raster illustration was required; established icon assets and the existing icon system are retained.
- Copy and content: greeting, weekday, brand names, financial direction, settlement limit, and aggregate-sales explanation are explicit and Persian.

## Comparison history

1. Initial implementation finding [P1]: intrinsic grid width caused 484 px horizontal overflow in a 390 px viewport. Fix: constrained Today grid children and scrolling status row to the available inline size. Post-fix evidence: `finance-today-mobile.png`; measured document width equals viewport width at 390 px.
2. Product requirement [P2]: the visual reference did not include an inter-brand financial summary. Fix: added one low-emphasis row only for «همه برندها», linking to Finance without increasing KPI-card density.
3. Financial integrity finding [P1]: a settlement could be entered in the wrong direction or exceed the outstanding balance. Fix: preselect the current debtor/creditor, reject reversed direction, and cap settlement at the current balance.

## Primary interactions tested

- switching from «همه برندها» to «هالین» updates the active segment and dashboard scope immediately
- Persian and English numeric input both normalize to 5,000,000
- a 5,000,000 shared expense followed by 2,000,000 settlement produces a 3,000,000 balance
- shared-expense form opens with distinct payer and beneficiary brands
- aggregate sales are calculated only from orders; inter-brand entries remain in a separate ledger
- PWA and desktop views have no horizontal overflow
- browser console checked with no errors or warnings

## Follow-up polish

- [P3] The empty-data implementation is naturally shorter than the populated visual mockup; live tasks and sales expand the same components without changing hierarchy.

final result: passed
