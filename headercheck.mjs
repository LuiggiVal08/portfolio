import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://luiggival08.github.io/portfolio/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const res = await page.evaluate(() => {
  const hdr = Array.from(document.querySelectorAll('[data-tree-anchor]')).find(el => el.textContent.includes('En el laboratorio'));
  const h = hdr ? hdr.getBoundingClientRect() : null;
  const trunk = document.querySelector('.tree-trunk').getBoundingClientRect();
  const branches = Array.from(document.querySelectorAll('#tree-svg > path.tree-branch')).map(p => {
    const r = p.getBoundingClientRect();
    return { x0: Math.round(r.left), x1: Math.round(r.right), y0: Math.round(r.top), y1: Math.round(r.bottom) };
  });
  const near = branches.filter(b => b.y0 < 3000);
  return {
    header: h ? { x: Math.round(h.left), y: Math.round(h.top), w: Math.round(h.width), hgt: Math.round(h.height) } : null,
    trunkX: Math.round(trunk.left),
    near: near.slice(0, 12),
  };
});
console.log(JSON.stringify(res, null, 1));
await browser.close();
