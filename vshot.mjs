import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://luiggival08.github.io/portfolio/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
// scroll para activar animaciones
for (let y = 0; y < 9200; y += 500) { await page.evaluate(ys => scrollTo(0, ys), y); await page.waitForTimeout(120); }
await page.waitForTimeout(2500);
// Zona: encabezado productos (y=1028) hasta ultimo producto (~5460)
await page.evaluate(() => scrollTo(0, 600));
await page.waitForTimeout(1200);
await page.screenshot({ path: '/tmp/opencode/zoneA.png' });
await page.evaluate(() => scrollTo(0, 2800));
await page.waitForTimeout(1200);
await page.screenshot({ path: '/tmp/opencode/zoneB.png' });
await page.evaluate(() => scrollTo(0, 5300));
await page.waitForTimeout(1200);
await page.screenshot({ path: '/tmp/opencode/zoneC.png' });
await browser.close();
console.log('ok');
