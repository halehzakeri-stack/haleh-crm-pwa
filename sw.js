const CACHE = 'haleh-crm-v84-shared-catalog';
const BASE_URL = new URL('./', self.registration.scope);
const INDEX_URL = new URL('index.html', BASE_URL).href;
const APP_SHELL = [
  '',
  'index.html',
  'login.html',
  'login.css',
  'login.js',
  'login-core.mjs',
  'users.html',
  'users.js',
  'assets/login-hero-light.png',
  'assets/login-hero-dark.png',
  'assets/vendor/feather-4.29.2.min.js',
  'manifest.webmanifest',
  'release.json',
  'pwa-update.js',
  'vazirmatn.woff2',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-192.png',
  'icon-maskable-512.png',
  'apple-touch-icon.png',
  'assets/category-icons/jeans.png',
  'assets/category-icons/casual.png',
  'assets/category-icons/coat.png',
  'assets/category-icons/shirt.png',
  'assets/category-icons/suit.png',
  'assets/category-icons/accessory.png',
  'assets/category-icons/search.png',
  'assets/category-icons/manage.png',
  'assets/vendor/zxing-browser-0.2.1.min.js?v=0.2.1'
].map(path => new URL(path, BASE_URL).href);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.allSettled(APP_SHELL.map(asset => cache.add(asset))))
  );
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    const documentUrl = url.pathname.endsWith('/login.html')
      ? new URL('login.html', BASE_URL).href
      : url.pathname.endsWith('/users.html')
        ? new URL('users.html', BASE_URL).href
        : INDEX_URL;
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(documentUrl, copy));
          return response;
        })
        .catch(() => caches.match(documentUrl))
    );
    return;
  }

  // Authentication code must never be held back by an older offline shell.
  if (['/login.js','/login-core.mjs','/login.css','/users.js'].some(path => url.pathname.endsWith(path))) {
    event.respondWith(fetch(event.request).then(response => {
      if (response && response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match(event.request)));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
      }
      return response;
    }))
  );
});
