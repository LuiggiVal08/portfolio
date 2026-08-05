import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://luiggival08.github.io/portfolio/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const res = await page.evaluate(async () => {
  const svg = document.querySelector('#tree-svg');
  const feats = Array.from(svg.querySelectorAll(':scope > path.tree-branch-feature'));
  const info = feats.map(p => {
    const c = getComputedStyle(p);
    return { len: Math.round(p.getTotalLength()), dash: c.strokeDasharray, offset: c.strokeDashoffset, op: c.opacity, vis: c.visibility };
  }).slice(0, 3);
  const trunk = getComputedStyle(document.querySelector('.tree-trunk'));
  const g = document.querySelector('.tree-trunk circle, #tree-svg > circle');
  return { featInfo: info, trunkOffset: trunk.strokeDashoffset, trunkLen: Math.round(document.querySelector('.tree-trunk').getTotalLength()) };
});
console.log(JSON.stringify(res, null, 1));
await browser.close();
