import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
await page.goto('http://localhost:4321/portfolio/', { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
for (let y = 0; y < 9200; y += 400) { await page.evaluate(ys => scrollTo(0, ys), y); await page.waitForTimeout(60); }
await page.waitForTimeout(1400);
const res = await page.evaluate(() => {
  const paths = Array.from(document.querySelectorAll('#tree-svg > path.tree-branch-feature:not(.tree-branch-feature-sub)'));
  // primer segmento: punto inicial (en trunk) a primer punto de la curva
  const trunk = document.querySelector('.tree-trunk');
  const tb = trunk.getBoundingClientRect();
  const tx = tb.left + tb.width / 2;
  const info = paths.map(p => {
    const d = p.getAttribute('d');
    const m = d.match(/M ([\d.]+) ([\d.]+) C ([\d.]+) ([\d.]+)/);
    return {
      startX: Number(m[1]), c1X: Number(m[3]),
      dir: Number(m[3]) > Number(m[1]) ? 'DER' : 'IZQ',
      movedTowardF1: Math.abs(Number(m[3]) - Number(m[1])) < 120 ? 'correcto/suave' : 'FUERTE',
    };
  });
  return info.slice(0, 3);
});
console.log(JSON.stringify(res, null, 1));
await browser.close();
