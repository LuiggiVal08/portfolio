import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/portfolio/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
for (let y = 0; y < 9200; y += 400) { await page.evaluate(ys => scrollTo(0, ys), y); await page.waitForTimeout(60); }
await page.waitForTimeout(1200);
const res = await page.evaluate(() => {
  const svg = document.querySelector('#tree-svg');
  const feats = Array.from(svg.querySelectorAll(':scope > path.tree-branch-feature'));
  const featsByY = feats.map(p => {
    const r = p.getBoundingClientRect();
    return { y0: Math.round(r.top + scrollY), y1: Math.round(r.bottom + scrollY), x: Math.round(r.left + r.width / 2) };
  }).sort((a, b) => a.y0 - b.y0);
  const revealed = feats.filter(p => parseFloat(getComputedStyle(p).strokeDashoffset) === 0).length;
  const commits = svg.querySelectorAll(':scope > circle.tree-commit-feature').length;
  return { totalFeat: feats.length, revealed, featCommits: commits, featsByY: featsByY.slice(0, 4) };
});
console.log(JSON.stringify(res, null, 1));
await browser.close();
