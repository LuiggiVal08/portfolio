import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://luiggival08.github.io/portfolio/', { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  for (let y = 0; y <= document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
});
await page.waitForTimeout(2000);
const arg = await page.locator('article[data-tree-anchor]').first().boundingBox();
if (arg) {
  const strip = await page.screenshot({ clip: { x: Math.floor(arg.x)-420, y: Math.floor(arg.y), width: 500, height: Math.floor(arg.height) } });
  // count cyan-ish pixels (r<120, g>150, b>150)
}
// simpler: sample pixels along a horizontal line at mid-article
const mid = arg.y + arg.height/2;
const res = await page.evaluate((mid) => {
  const svg = document.getElementById('tree-svg');
  const lines = ['XL','L','trunk','R','XR'];
  return samples; }, mid).catch(()=>null);
console.log('argos y=', arg.y, 'h=', arg.height);
await browser.close();
