import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/portfolio/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const res = await page.evaluate(() => {
  const trunk = document.querySelector('.tree-trunk').getBoundingClientRect();
  const branches = Array.from(document.querySelectorAll('#tree-svg > path.tree-branch')).map(p => {
    const r = p.getBoundingClientRect();
    return { x0: Math.round(r.left), x1: Math.round(r.right), y0: Math.round(r.top), y1: Math.round(r.bottom) };
  });
  const hdr = Array.from(document.querySelectorAll('[data-tree-anchor]')).find(el => el.textContent.includes('En el laboratorio')).getBoundingClientRect();
  const nearHeader = branches.filter(b => b.y0 >= hdr.top - 10 && b.y1 <= hdr.bottom + 10);
  return { trunkX: Math.round(trunk.left), header: { x0: Math.round(hdr.left), x1: Math.round(hdr.right) }, nearHeader };
});
console.log(JSON.stringify(res, null, 1));
await browser.close();
