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

# Design QA — کارت‌های مستقل مشتریان و ورودی نام فارسی

- source visual truth path: `/var/folders/lw/tpzd48f130b_k1znvj6z9t700000gn/T/TemporaryItems/NSIRD_screencaptureui_z34wSG/Screenshot 1405-06-07 at 12.12.55.png`
- normalized source: `customers-source-content.png`
- implementation screenshot: `customers-tablet-after.png`
- mobile screenshot: `customers-mobile-after.png`
- desktop screenshot: `customers-desktop-after.png`
- combined comparison: `customers-qa-comparison.png`
- viewport: `812 × 821` CSS px for the source/implementation comparison; mobile verification at `390 px` width; desktop resilience at `1366 px` width
- pixels and density normalization: source app content was cropped from the supplied `2880 × 1800` screenshot, then normalized from `1625 × 1642` px to `812 × 821` px; implementation comparison is `812 × 821` px at browser density 1
- state: Customers list with three existing customer records; the source has one populated purchase total while the isolated local test data has zero totals

## Full-view comparison evidence

The combined comparison preserves the page header, add-customer action, RTL hierarchy, floating three-item navigation, white canvas, purple accent, radii, and overall vertical rhythm. The requested structural change is visible: the former shared list surface is replaced by one independent, tappable card per customer. At the supplied PWA width the cards use a two-column grid; at the narrow mobile breakpoint they collapse to one column.

## Focused region comparison evidence

- Customer identity: every card includes a consistent customer icon tile, Persian name, Persian-digit mobile number, and a clear affordance to open the file.
- Customer metrics: purchase total and order count remain tied to the same live customer/order data; outstanding balance appears only when non-zero.
- Form behavior: the new and edit forms share the same Persian/Arabic-only name sanitizer and validation message. English characters and digits are removed while Persian and Arabic keyboard variants are retained.

## Required fidelity surfaces

- Fonts and typography: Vazirmatn remains the sole project typeface; card name, phone, label, and metric weights preserve the existing CRM hierarchy.
- Spacing and layout rhythm: independent 16–18 px radius cards, consistent internal padding, 9–12 px gaps, and responsive one/two/three-column tracks align with the established card system.
- Colors and visual tokens: existing white surfaces, purple-soft icon tile, muted labels, line token, and orange balance chip are reused without introducing a new palette.
- Image quality and asset fidelity: no new raster imagery is needed; the existing project `users` and `chevron` icon components are reused consistently.
- Copy and content: names remain unchanged; phone strings preserve the leading zero while rendering all digits in Persian; form guidance explicitly asks for a Persian or Arabic keyboard.
- Accessibility and interaction: each customer card is a semantic button with a descriptive label and focus ring; cards open the customer dashboard; the add and edit forms reject invalid Latin names.

## Comparison history

1. Source finding [P1]: all customers were grouped into one large list card, so individual records did not read as separate touch targets. Fix: replaced the shared list with responsive independent customer cards. Post-fix evidence: `customers-tablet-after.png` and `customers-mobile-after.png`.
2. Source finding [P1]: mobile numbers were displayed with Latin digits. Fix: added a display-only Persian digit formatter that preserves stored normalized numbers and leading zeros. Post-fix evidence: all three numbers in `customers-tablet-after.png` and customer dashboard interaction output.
3. Source finding [P1]: customer names accepted Latin input. Fix: added composition-safe input sanitizing and save-time validation to both create and edit forms. Post-fix evidence: browser interaction returned a blank value for Latin letters and preserved `سارا محمدي` from an Arabic keyboard layout.

## Primary interactions tested

- all three customer cards render and open the correct customer dashboard
- displayed mobile number in both the card list and dashboard uses Persian digits
- Latin name input is removed immediately
- Persian and Arabic keyboard characters are accepted
- new and edit forms share the same save-time validation
- mobile, supplied PWA width, and desktop layouts render without console errors
- JavaScript syntax, helper cases, and `git diff --check` passed

## Follow-up polish

- [P3] The supplied live screenshot includes a non-zero purchase total for one customer; the isolated local browser profile uses the default zero-order dataset, so only the content value differs, not the layout or data binding.

final result: passed

---

# Design QA — کارت‌های مستقل سفارش در PWA

- source visual truth path: `orders-table-source.png`
- implementation screenshot: `orders-mobile-card-qa.png`
- viewport: `812 × 814` CSS px
- state: یک سفارش ثبت‌شده، پرداخت تسویه، تحویل حضوری

## Full-view and focused comparison evidence

نمای قبلی یک جدول هشت‌ستونه بود که در عرض PWA به اسکرول افقی نیاز داشت. نمای جدید هر سفارش را به یک کارت مستقل تمام‌عرض تبدیل می‌کند و اطلاعات اصلی مشتری، تاریخ، برند، مبلغ، شماره سفارش، پرداخت و تحویل را بدون اسکرول افقی نشان می‌دهد.

## Required fidelity surfaces

- فونت، رنگ‌ها، شعاع گوشه‌ها و status pillها از توکن‌های موجود v2.5 استفاده می‌کنند.
- نسخه دسکتاپ همان جدول کامل را نگه می‌دارد و کارت‌ها فقط زیر breakpoint موبایل نمایش داده می‌شوند.
- هر کارت یک کنترل واحد و قابل لمس است؛ انتخاب کارت همان پنل «جزئیات سفارش» موجود را باز می‌کند.
- عرض سند و viewport هر دو `812px` اندازه‌گیری شدند؛ overflow افقی وجود ندارد.

## Primary interactions tested

- ثبت یک فروش واقعی از مسیر انتخاب کالا، سبد، تأیید نهایی و ذخیره سفارش
- نمایش کارت سفارش بلافاصله پس از ثبت
- لمس کارت و بازشدن پنل «جزئیات سفارش»
- بررسی JavaScript syntax و `git diff --check`

final result: passed

---

# Design QA — Empty message notification state

- source visual truth path: `/var/folders/lw/tpzd48f130b_k1znvj6z9t700000gn/T/TemporaryItems/NSIRD_screencaptureui_hhmz8P/Screenshot 1405-06-06 at 10.23.23.png`
- normalized source: `notification-source-normalized.png`
- implementation screenshot: `notification-empty-state-final.png`
- combined comparison: `notification-comparison.png`
- viewport: 812 × 814 CSS px; compared header crop 812 × 139 px
- pixels: source 1624 × 278 normalized to 812 × 139; implementation 812 × 139
- state: Today page, zero unread messages

## Full-view and focused comparison evidence

The combined comparison shows the same header, date, title, bell icon, spacing, and visual hierarchy before and after the correction. The only visible change is the removal of the misleading count above the bell. A separate focused crop was not needed because the complete comparison is already a focused header region and the count is legible at 1:1 size.

## Required fidelity surfaces

- Fonts and typography: unchanged Vazirmatn family, weight, size, line height, and Persian number treatment.
- Spacing and layout rhythm: the bell remains in the same slot; hiding the badge causes no shift or reflow.
- Colors and visual tokens: the existing purple bell treatment remains unchanged; no empty-state notification color is rendered.
- Image quality and asset fidelity: the established bell icon is preserved with no replacement or degradation.
- Copy and content: the empty state exposes the accessible label «پیام خوانده‌نشده‌ای ندارید» and the tap feedback uses the same wording.

## Comparison history

1. User-reported finding [P1]: the Today header displayed «۲» even when the Messages section had no unread message. Root cause: the badge combined unread messages with pending-payment count. Fix: derive both mobile and desktop message badges exclusively from `unreadMessageCount()`, hide and clear the element when zero, and remove seeded sample messages from an empty installation. Post-fix evidence: `notification-empty-state-final.png` and `notification-comparison.png`.

## Primary interactions tested

- zero unread messages: mobile badge hidden and empty
- zero unread messages: desktop Messages badge hidden and empty
- bell accessible label: «پیام خوانده‌نشده‌ای ندارید»
- tapping the bell with zero unread messages keeps the Today route and shows the correct empty-state feedback
- browser console checked with no errors or warnings
- JavaScript syntax and `git diff --check` passed

final result: passed

---

# Design QA — Unified Vazirmatn typography system

- source visual truth path: `home-v32-reference-match.png`
- implementation screenshot path: `typography-mobile-final.png`
- combined comparison evidence: `typography-comparison.png`
- viewport: `390 × 844` CSS px at density 1
- pixels: source `390 × 1472`; implementation `390 × 844`; combined board `1200 × 1802`
- normalization: both source and implementation are displayed at the same 390 px content width; the focused above-the-fold region is compared because the source contains a longer historical dashboard state.
- state: Today dashboard, both brands, no sheet or toast open

## Full-view and focused comparison evidence

The combined board confirms that the implementation preserves the established Vazirmatn-led RTL hierarchy, white/lilac surfaces, purple actions, centered financial KPI, brand switch, semantic status colors, and compact three-action navigation. The focused above-the-fold region is sufficient for this typography-only change because no layout, asset, or information-architecture redesign was requested.

## Required fidelity surfaces

- Fonts and typography: Vazirmatn Variable is the sole primary family; body is 14 px, mobile captions and navigation labels have a 12 px floor, KPI is 32 px on mobile, and Persian letter spacing is zero. Runtime inspection confirms the loaded family is Vazirmatn.
- Spacing and layout rhythm: the existing card dimensions, grid tracks, radii, shadows, and section rhythm are unchanged; all seven tested mobile routes report zero horizontal overflow.
- Colors and visual tokens: no color, gradient, opacity, border, or elevation token was changed.
- Image quality and asset fidelity: existing icons and product/profile assets are untouched; no new or replacement imagery was introduced.
- Copy and content: all application copy and live CRM values are unchanged.
- Accessibility: all visible direct text on Today, Sale, Orders, Customers, Products, Inventory, and Finance is at least 12 px on the 390 px mobile viewport.

## Comparison history

1. [P2] The code contained more than thirty hard-coded text sizes, including visible 8–11.5 px labels, and mixed legacy Estedad/Vazirmatn declarations. Fix: added a centralized type-token scale, made Vazirmatn the sole primary family, removed negative Persian tracking, and mapped interface roles to 12/13/14/16/18/22/32 px mobile sizes.
2. [P2] First runtime pass found sub-12 px labels in Sale filters, Product selectors, Inventory picker, and Finance explanatory text. Fix: added explicit semantic-selector mappings to the 12 px caption token. Post-fix evidence: all seven routes report minimum visible direct text of 12 px and zero horizontal overflow.
3. Post-fix pass: desktop body renders Vazirmatn at 14 px with zero horizontal overflow; brand selection works, the primary New Sale CTA remains enabled, and the browser console has no errors or warnings.

## Primary interactions tested

- brand selector updates its active state
- New Sale primary CTA remains enabled
- Today, Sale, Orders, Customers, Products, Inventory, and Finance render without horizontal overflow
- JavaScript syntax check passes
- browser console checked with no errors or warnings

final result: passed

---

# Design QA — تناسب آیکون و عنوان مزون

- source visual truth path: `qc-mezon-proportion-reference.png`
- implementation screenshot path: `qc-mezon-proportion-mobile.png`
- focused implementation evidence: `qc-mezon-proportion-focus.png`
- combined comparison evidence: `qc-mezon-proportion-comparison.png`
- viewport: `390 × 844` CSS px at browser density 1
- pixels: source thumbnail `318 × 318`; implementation full view `390 × 844`; focused crop `150 × 144`
- normalization: the focused implementation crop is displayed at approximately 2× in the comparison board so the 74 px navigation orb can be judged against the larger reference orb.
- state: Today/مزون active, bottom navigation visible, no sheet or toast open

## Full-view comparison evidence

The browser-rendered mobile screen keeps the fixed three-item navigation, the centered raised orb, and the established white/lilac geometry. The icon artwork, circle sizes, nav position, and neighboring Menu/Orders actions are unchanged.

## Focused region comparison evidence

The combined board shows the approved storefront icon form beside the implemented PWA component. The title is visibly larger, the empty vertical area between icon and title is removed, and the icon/title group is centered inside the inner white orb.

## Required fidelity surfaces

- Fonts and typography: Vazirmatn is retained; `مزون` is 12 px, weight 750, line-height 1.2, and remains legible at the mobile viewport.
- Spacing and layout rhythm: icon-to-label gap is 6 px; the former 54 px wrapper is reduced to the icon's 31 px height so the group has no artificial internal gap.
- Colors and visual tokens: existing purple, pale-lilac halo, white orb, border, and shadow tokens are unchanged.
- Image quality and asset fidelity: the established storefront icon remains the same vector from the product icon system; its 31 px size and stroke treatment are unchanged.
- Copy and content: the exact label `مزون` is retained.

## Comparison history

1. [P2] The label was visually undersized and the 54 px icon wrapper created excessive separation below the storefront. Fix: increased the label from 10 px to 12 px, set the wrapper height to 31 px, and established a deliberate 6 px gap. Post-fix evidence: `qc-mezon-proportion-focus.png` and `qc-mezon-proportion-comparison.png`.
2. Post-fix pass: no actionable P0/P1/P2 mismatch remains; icon appearance and overall navigation silhouette were preserved as requested.

## Primary interactions tested

- Orders navigates to `#/orders`.
- Mezon returns to `#/today`.
- browser console checked with no errors.
- measured icon: `31 × 31` px; measured label: 12 px; measured gap: 6 px.

final result: passed
## Home v31 — unified live dashboard

Reference: `exec-51aa2069-9bdd-4c12-b596-50aa774dad55.png`
Prototype: `home-v31-final.png`
Side-by-side evidence: `qc-home-v31-comparison.png`

- The sales total and new-order count now share one card and are not repeated in the chart header.
- The chart uses a smooth cubic path and derives its points from filtered order dates and totals.
- Brand scope updates sales, orders, inventory, finance/fulfillment counts, and tasks together.
- Profile add/change/delete is available from the greeting avatar and persists through the same local data layer.
- Quick access links route to Orders, Finance, Inventory, and Fulfillment; Today tasks remain last.
- Mobile verification at 390×844: document width equals viewport width, all four quick-access icons remain rendered after brand switching, and the fixed navigation bottom remains 830 px before and after scrolling.
- Week/month selection and brand scope persist after leaving Home and returning from Orders.
- Console: no errors or warnings.

Remaining P3: with an empty sales database the line is intentionally flat; it becomes curved as real sales arrive.

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

---

# Design QA — صفحه مزون تأییدشده v2.5

- مرجع تأییدشده: `/Users/mac/.codex/generated_images/01a016d7-5330-7902-a478-fde4d0c64819/exec-fcad45d2-cc8f-4c15-a51c-fa95db7653f5.png`
- خروجی موبایل: `design-qa-mobile-final.png`
- خروجی دسکتاپ: `design-qa-desktop-final.png`
- اندازه تست موبایل: `423 × 926`
- اندازه تست دسکتاپ: `1280 × 800`

## موارد بررسی‌شده

- هدر، خوشامدگویی، انتخاب برند، کارت فروش و کارت‌های وضعیت با مرجع تطبیق داده شدند.
- نوار موبایل سه‌تایی است و دقیقاً ۱۶ پیکسل از کف فاصله دارد.
- نوار هنگام اسکرول ثابت می‌ماند و فوکوس لمسی کادر اضافه ایجاد نمی‌کند.
- منوی همبرگری با «مشتریان» و «فروش جدید» در ابتدای فهرست باز می‌شود؛ «فرصت‌های فروش (به‌زودی)» مشخص است.
- تغییر برند آیکون‌های وضعیت را حذف نمی‌کند.
- مسیر سفارش‌ها و بازگشت به مزون کار می‌کند.
- نمای دسکتاپ بدون اسکرول افقی و بدون اثر جانبی باقی مانده است.
- خطای JavaScript و خطای کنسول مشاهده نشد.

final result: passed

---

# Design QA — Centered Today header

- source visual truth path: `/var/folders/lw/tpzd48f130b_k1znvj6z9t700000gn/T/TemporaryItems/NSIRD_screencaptureui_2gOhKN/Screenshot 1405-06-06 at 10.46.57.png`
- normalized source: `today-header-offcenter-source.png`
- implementation screenshot: `today-header-narrow-fix.png`
- combined comparison: `today-header-center-comparison.png`
- viewport: 812 × 814 CSS px; compared header crop 812 × 91 px
- pixels: source 1614 × 182 normalized to 812 × 91; implementation 812 × 91
- state: Today page, Friday, zero unread messages

## Full-view and focused comparison evidence

The header crop is itself the focused region. The original flex layout and physical placement of the date and bell controls are preserved. Only the central title block is independently anchored to the horizontal center.

## Required fidelity surfaces

- Fonts and typography: Vazirmatn hierarchy, weight, size, and line height are unchanged.
- Spacing and layout rhythm: header controls keep their original edge positions while the title and weekday share the exact 406 px horizontal center.
- Colors and visual tokens: existing white glass surface and purple icon/date tokens are unchanged.
- Image quality and asset fidelity: calendar and bell icons are preserved without substitution.
- Copy and content: «امروز» and «جمعه» remain unchanged and now share one center axis.

## Comparison history

1. User-reported finding [P2]: «جمعه» appeared off-center because the date control was wider than the bell control inside a `space-between` flex header. Initial fix used a symmetric grid, but it unnecessarily changed the whole header layout.
2. User feedback [P1]: the grid fix changed more than requested. Fix: restored the original RTL flex layout and icon positions; applied absolute centering only to the existing title/weekday group. Post-fix evidence: `today-header-narrow-fix.png` and `today-header-center-comparison.png`.

## Primary checks

- header geometric center: 406 px
- title center: 406 px
- weekday center: 406 px
- measured center delta: 0 px
- browser console checked with no errors or warnings
- JavaScript syntax and `git diff --check` passed

final result: passed
