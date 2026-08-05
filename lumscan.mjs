import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://luiggival08.github.io/portfolio/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
// measure luminance along the trunk at many y positions — but need page scrolled; instead sample via canvas composite
const res = await page.evaluate(async () => {
  const body = document.body;
  const docSH = document.documentElement.scrollHeight;
  // composite the whole page
  const sc = 0.5;
  const cv = document.createElement('canvas');
  cv.width = Math.floor(innerWidth * sc);
  cv.height = Math.floor(doc * sc);
  const ctx = cv.getContext('2d');
  // html2canvas style: we can't serialize DOM, so instead sample via screenshots per viewport.
  return { docSH: doc };
});
console.log(JSON.stringify(res));
await browser.close();
