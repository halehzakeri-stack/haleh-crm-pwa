# Login implementation status

The selected light and dark login design is implemented in `login.html`. Entry points: desktop sidebar, mobile menu, and `index.html#/login`.

## Working now

- Local Vazirmatn font, Persian/RTL copy, phone display in Persian digits.
- Exactly 11 mobile digits beginning with 09; Persian and Arabic keyboard digits accepted without truncating invalid extra input.
- Password visibility, keyboard submission, field errors, persisted light/dark theme shared with workspace, return navigation.
- Local raster storefront hero assets and bundled Feather icons.
- Separate offline cache documents for login, workspace, and user management.
- User management: administrators can set every role; managers can manage non-admin accounts. Available roles are manager, user, seller, accounting, and inventory.

## Current temporary authentication

The login form is connected to Supabase Auth. Account phone numbers are mapped privately to internal email identities because SMS login is not configured. A validated session is saved only when “remember me” is selected. The public client contains only Supabase's publishable key, never a privileged key.

Roles are stored in Supabase `app_metadata` and checked by the server-side `crm-admin-users` Edge Function. The app uses role-based navigation for the current workspace: seller, accounting, and inventory users see only their assigned operational sections; managers have access to all CRM sections and can manage non-admin accounts, while only an administrator can assign or change the admin role.

SMS recovery and one-time codes remain unavailable until an SMS provider is configured.

The current CRM workspace is still stored locally in the browser. Authentication and role-based navigation control ordinary PWA access, but cloud-backed CRM data with server-enforced RLS is the next step before sharing sensitive business data with additional staff.

The owner requested publication to the existing GitHub Pages PWA. Publication includes this frontend only; it does not activate authentication or secure the existing workspace.

## Asset sources

Storefront backgrounds: built-in ImageGen, generated separately from the selected light/dark mocks, no text or UI baked into art. `assets/login-hero-light.png` and `assets/login-hero-dark.png` (1420×1108).

Icons: Feather 4.29.2, MIT, https://github.com/feathericons/feather. Local library and license in `assets/vendor/`.

## Tests

`node --test tests/login.test.mjs tests/login-sw.test.mjs`
