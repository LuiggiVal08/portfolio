import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://luiggival08.github.io/portfolio/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
for (let y = 0; y < 9200; y += 400) { await page.evaluate(ys => scrollTo(0, ys), y); await page.waitForTimeout(150); }
await page.waitForTimeout(2000);
const res = await page.evaluate(() => {
  const svg = document.querySelector('#tree-svg');
  const feats = Array.from(svg.querySelectorAll(':scope > path.tree-branch-feature'));
  const offs = feats.map(p => Math.round(parseFloat(getComputedStyle(p).strokeDashoffset)));
  const revealed = feats.filter(p => parseFloat(getComputedStyle(p).strokeDashoffset) === 0).length;
  const trunkOff = Math.round(parseFloat(getComputedStyle(document.querySelector('.tree-trunk')).strokeDashoffset));
  const caps = Array.from(svg.querySelectorAll(':scope > path.tree-branch:not(.tree-branch-feature)'));
  const capsRevealed = caps.filter(p => parseFloat(getComputedStyle(p).strokeDashoffset) === 0).length;
  return { totalFeat: feats.length, offsets: offs, revealed, trunkOff, capsTotal: caps.length, capsRevealed };
});
console.log(JSON.stringify(res, null, 1));
await browser.close();
