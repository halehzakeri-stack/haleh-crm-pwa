# Login implementation status

The selected light and dark login design is implemented in `login.html`. Entry points: desktop sidebar, mobile menu, and `index.html#/login`. The existing operational workspace is deliberately NOT protected by this frontend screen.

## Working now

- Local Vazirmatn font, Persian/RTL copy, phone display in Persian digits.
- Exactly 11 mobile digits beginning with 09; Persian and Arabic keyboard digits accepted without truncating invalid extra input.
- Password visibility, keyboard submission, field errors, persisted light/dark theme shared with workspace, return navigation.
- Local raster storefront hero assets and bundled Feather icons.
- Separate offline cache documents for login and workspace.

## Current temporary authentication

The login form is connected to Supabase Auth. The owner signs in with the phone number shown in the form and its password; the phone number is mapped privately to the owner account because SMS login is not configured. A validated administrator session is saved only when “remember me” is selected. The public client contains only Supabase's publishable key, never a privileged key.

SMS recovery and one-time codes remain unavailable until an SMS provider is configured.

The current CRM workspace is still stored locally in the browser. Authentication controls ordinary access to the PWA, but cloud-backed CRM data with server-enforced RLS is the next step before sharing the application with additional staff.

The owner requested publication to the existing GitHub Pages PWA. Publication includes this frontend only; it does not activate authentication or secure the existing workspace.

## Asset sources

Storefront backgrounds: built-in ImageGen, generated separately from the selected light/dark mocks, no text or UI baked into art. `assets/login-hero-light.png` and `assets/login-hero-dark.png` (1420×1108).

Icons: Feather 4.29.2, MIT, https://github.com/feathericons/feather. Local library and license in `assets/vendor/`.

## Tests

`node --test tests/login.test.mjs tests/login-sw.test.mjs`
