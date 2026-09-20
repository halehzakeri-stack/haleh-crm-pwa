import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const text = async name => readFile(resolve(root, name), 'utf8');
const required = ['index.html', 'login.html', 'users.html', 'sw.js', 'pwa-update.js', 'release.json'];
for (const name of required) await access(resolve(root, name));

const [serviceWorker, release, index, login, users] = await Promise.all([
  text('sw.js'), text('release.json'), text('index.html'), text('login.html'), text('users.html')
]);
const releaseInfo = JSON.parse(release);
const cache = serviceWorker.match(/const CACHE = '([^']+)'/u)?.[1];
if (!releaseInfo.version || !releaseInfo.cache || !cache) throw new Error('مشخصات نسخه یا کش کامل نیست.');
if (releaseInfo.cache !== cache) throw new Error('نسخهٔ release.json با کش سرویس‌ورکر یکی نیست.');
if (serviceWorker.includes('.then(() => self.skipWaiting())') || !serviceWorker.includes("event.data?.type === 'SKIP_WAITING'")) throw new Error('فعال‌سازی نسخه باید فقط با تأیید کاربر انجام شود.');
for (const [name, html] of [['index.html', index], ['login.html', login], ['users.html', users]]) {
  if (!html.includes('pwa-update.js')) throw new Error(`${name} به اعلان به‌روزرسانی متصل نیست.`);
}
console.log(`Release gate passed: ${releaseInfo.version}`);
