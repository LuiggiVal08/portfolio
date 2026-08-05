import { chromium } from 'playwright-core';
import fs from 'node:fs';
import zlib from 'node:zlib';
function loadPng(path) {
  const b = fs.readFileSync(path);
  let o = 8; const chunks = [];
  while (o < b.length) { const len = b.readUInt32BE(o); const type = b.toString('ascii', o + 4, o + 8); chunks.push({ type, data: b.subarray(o + 8, o + 8 + len) }); o += 12 + len; }
  const ihdr = chunks.find(c => c.type === 'IHDR').data;
  const w = ihdr.readUInt32BE(0), h = ihdr.readUInt32BE(4);
  const ct = ihdr[9];
  const bpp = { 2: 3, 6: 4 }[ct];
  const raw = zlib.inflateSync(Buffer.concat(chunks.filter(c => c.type === 'IDAT').map(c => c.data)));
  const stride = w * bpp;
  const out = Buffer.alloc(h * stride);
  const paeth = (a, b, c) => { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); return pa <= pb && pa <= pc ? a : pb <= pc ? b : c; };
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)];
    const line = out.subarray(y * stride, (y + 1) * stride);
    const src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? line[x - bpp] : 0;
      const bt = y > 0 ? prev[x] : 0;
      const c = x >= bpp && y > 0 ? prev[x - bpp] : 0;
      let v = src[x];
      if (f === 1) v += a; else if (f === 2) v += bt; else if (f === 3) v += (a + bt) >> 1; else if (f === 4) v += paeth(a, bt, c);
      line[x] = v & 0xff;
    }
    prev = line;
  }
  return { w, h, bpp, data: out };
}
const browser = await chromium.launch({ headless: true });
const w = 1440;
const page = await browser.newPage({ viewport: { width: w, height: 900 } });
await page.goto('https://luiggival08.github.io/portfolio/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.evaluate(() => {
  const a = document.getElementById('argos');
  window.scrollTo(0, a.getBoundingClientRect().top + window.scrollY - 150);
});
await page.waitForFunction(() => {
  const a = document.getElementById('argos').getBoundingClientRect(); return a.top > 200 && a.top < 650;
});
await page.waitForTimeout(2500);
const meta = await page.evaluate(() => {
  const feats = Array.from(document.querySelectorAll('#tree-svg > path.tree-branch-feature'));
  const r = feats[0].getBoundingClientRect();
  return { x0: Math.round(r.left), x1: Math.round(r.right), y0: Math.round(r.top), y1: Math.round(r.bottom) };
});
await page.screenshot({ path: '/tmp/opencode/livex.png' });
await browser.close();
console.log('main feature rect:', JSON.stringify(meta));
const im = loadPng('/tmp/opencode/livex.png');
const S = im.w * im.bpp;
function px(x, y) { const i = y * S + x * im.bpp; return [im.data[i], im.data[i + 1], im.data[i + 2]]; }
for (let y = 200; y <= 880; y += 40) {
  const p = px(675, y);
  console.log('y' + y, p.join(','));
}