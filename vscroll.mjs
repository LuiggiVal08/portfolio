import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://luiggival08.github.io/portfolio/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
// scroll por Todo el doc despacio para disparar las animaciones
for (let y = 0; y < 9000; y += 300) {
  await page.evaluate(ys => scrollTo(0, ys), y);
  await page.waitForTimeout(120);
}
await page.waitForTimeout(1500);
const res = await page.evaluate(() => {
  const svg = document.querySelector('#tree-svg');
  const feats = Array.from(svg.querySelectorAll(':scope > path.tree-branch-feature'));
  const revealed = feats.map(p => {
    const c = getComputedStyle(p);
    return p.getTotalLength() - parseFloat(c.strokeDashoffset) > 1 && parseFloat(c.strokeDashoffset) !== 0;
  });
  const offsets = feats.slice(0,6).map(p => parseFloat(getComputedStyle(p).strokeDashoffset));
  const trunk = document.querySelector('.tree-trunk');
  const trunkReveal = trunk.getTotalLength() - parseFloat(getComputedStyle(trunk).strokeDashoffset);
  const allFeat = feats.filter(p => getComputedStyle(p).strokeDashoffset !== '0px').length;
  return { totalFeat: feats.length, revealedCount: revealed.filter(Boolean).length, allHiddenCross: feats.length === allFeat, trunkReveal};
});
console.log(JSON.stringify(res, null, 1));
await browser.close();
