import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
for (const w of [1440, 1366, 1280]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto('http://localhost:4321/portfolio/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  for (let y = 0; y < 9200; y += 400) { await page.evaluate(ys => scrollTo(0, ys), y); await page.waitForTimeout(60); }
  await page.waitForTimeout(1000);
  const res = await page.evaluate(() => {
    const trunk = document.querySelector('.tree-trunk').getBoundingClientRect();
    const tx = trunk.left + trunk.width / 2;
    const feats = Array.from(document.querySelectorAll('#tree-svg > path.tree-branch-feature'));
    const jumps = [];
    feats.forEach(p => {
      const r = p.getBoundingClientRect();
      const crosses = r.left < tx && r.right > tx;
      if (crosses) jumps.push({ c: p.getAttribute('class'), x0: Math.round(r.left), x1: Math.round(r.right) });
    });
    // verificamos tacto: ninguna path deberia cruzar el trunk ni ir al lado opuesto
    const far = feats.filter(p => {
      const r = p.getBoundingClientRect();
      return r.left + r.width / 2 < tx - 250 || r.left + r.width / 2 > tx + 250;
    }).length;
    return { trunkX: Math.round(tx), featureTotal: feats.length, crossing: jumps.length, farAway: far };
  });
  console.log(w + 'px:', JSON.stringify(res));
  await page.close();
}
await browser.close();
