# Login implementation status

The selected light and dark login design is implemented in `login.html`. Entry points: desktop sidebar, mobile menu, and `index.html#/login`. The existing operational workspace is deliberately NOT protected by this frontend screen.

## Working now

- Local Vazirmatn font, Persian/RTL copy, phone display in Persian digits.
- Exactly 11 mobile digits beginning with 09; Persian and Arabic keyboard digits accepted without truncating invalid extra input.
- Password visibility, keyboard submission, field errors, persisted light/dark theme shared with workspace, return navigation.
- Local raster storefront hero assets and bundled Feather icons.
- Separate offline cache documents for login and workspace.

## Required before real authentication

No identity provider, account store, server, SMS provider or existing account configuration is present. Login, recovery and OTP display an explicit unavailable message and do not send or persist credentials. Remember-me is a form preference only; it does not currently create a session.

Choose an authentication service and authorized users with the owner. Provision accounts through that service, then implement secure session management, server-enforced data access, expiry/logout, recovery and rate limits. Do not gate localStorage data with a hardcoded frontend password or call it secure authentication. Publishing this screen alone does not secure the existing CRM data.

The owner requested publication to the existing GitHub Pages PWA. Publication includes this frontend only; it does not activate authentication or secure the existing workspace.

## Asset sources

Storefront backgrounds: built-in ImageGen, generated separately from the selected light/dark mocks, no text or UI baked into art. `assets/login-hero-light.png` and `assets/login-hero-dark.png` (1420×1108).

Icons: Feather 4.29.2, MIT, https://github.com/feathericons/feather. Local library and license in `assets/vendor/`.

## Tests

`node --test tests/login.test.mjs tests/login-sw.test.mjs`
