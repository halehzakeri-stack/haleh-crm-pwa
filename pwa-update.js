const RELEASE_URL = new URL('./release.json', import.meta.url).href;
let registration;
let activationRequested = false;

function showUpdate(release) {
  if (document.getElementById('pwa-update-notice')) return;
  const notice = document.createElement('aside');
  notice.id = 'pwa-update-notice';
  notice.setAttribute('role', 'status');
  notice.innerHTML = `<strong>نسخهٔ جدید آماده است</strong><span>${release?.label || 'برای دریافت به‌روزرسانی، برنامه را تازه کنید.'}</span><button type="button" id="pwa-update-now">به‌روزرسانی</button><button type="button" id="pwa-update-later" aria-label="بعداً">بعداً</button>`;
  const style = document.createElement('style');
  style.textContent = `#pwa-update-notice{position:fixed;z-index:9999;left:max(14px,env(safe-area-inset-left));right:max(14px,env(safe-area-inset-right));bottom:calc(14px + env(safe-area-inset-bottom));margin:auto;width:min(520px,calc(100% - 28px));display:grid;grid-template-columns:1fr auto auto;gap:8px 10px;align-items:center;padding:13px 14px;border:1px solid color-mix(in srgb,var(--purple,#6044ce) 30%,#fff);border-radius:16px;background:color-mix(in srgb,var(--surface,#fff) 94%,#eee8ff);color:var(--text,#202126);box-shadow:0 16px 45px rgba(17,18,27,.22);font-family:Vazirmatn,-apple-system,BlinkMacSystemFont,Segoe UI,Tahoma,sans-serif;direction:rtl}#pwa-update-notice strong{font-size:14px}#pwa-update-notice span{grid-column:1;font-size:11px;color:var(--sub,#6f717b)}#pwa-update-notice button{min-height:37px;border:0;border-radius:10px;padding:0 11px;font:inherit;font-size:12px;font-weight:700;cursor:pointer}#pwa-update-now{grid-column:2;grid-row:1/3;background:var(--purple,#6044ce);color:#fff}#pwa-update-later{grid-column:3;grid-row:1/3;background:transparent;color:var(--sub,#6f717b);padding:0 4px!important}@media(max-width:420px){#pwa-update-notice{grid-template-columns:1fr auto}#pwa-update-later{display:none}}`;
  document.head.append(style);
  document.body.append(notice);
  notice.querySelector('#pwa-update-later').onclick = () => notice.remove();
  notice.querySelector('#pwa-update-now').onclick = () => {
    activationRequested = true;
    const waiting = registration?.waiting;
    if (waiting) waiting.postMessage({ type: 'SKIP_WAITING' });
  };
}

async function releaseInfo() {
  try {
    const response = await fetch(RELEASE_URL, { cache: 'no-store' });
    return response.ok ? response.json() : null;
  } catch { return null; }
}

async function checkForUpdate() {
  if (!registration) return;
  await registration.update().catch(() => {});
  if (registration.waiting) showUpdate(await releaseInfo());
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (activationRequested) window.location.reload();
  });
  window.addEventListener('load', async () => {
    registration = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
    registration.addEventListener('updatefound', () => {
      const installing = registration.installing;
      if (!installing) return;
      installing.addEventListener('statechange', async () => {
        if (installing.state === 'installed' && navigator.serviceWorker.controller) showUpdate(await releaseInfo());
      });
    });
    checkForUpdate();
    window.setInterval(checkForUpdate, 30 * 60 * 1000);
  });
  window.addEventListener('online', checkForUpdate);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') checkForUpdate(); });
}
