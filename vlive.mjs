import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://luiggival08.github.io/portfolio/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
const res = await page.evaluate(() => {
  const trunk = document.querySelector('.tree-trunk').getBoundingClientRect();
  const svg = document.querySelector('#tree-svg');
  const style = svg ? getComputedStyle(svg) : null;
  const branchCount = svg ? svg.querySelectorAll(':scope > path.tree-branch-feature').length : -1;
  const commits = svg ? svg.querySelectorAll(':scope > circle.tree-commit').length : -1;
  const caps = svg ? svg.querySelectorAll(':scope > path.tree-branch').length : -1;
  const anchors = Array.from(document.querySelectorAll('[data-tree-anchor]')).map(el => {
    const r = el.getBoundingClientRect();
    return { tag: el.tagName, id: el.id || '', cls: (el.className.baseVal || el.className || '').toString().slice(0, 40), top: Math.round(r.top + scrollY), h: Math.round(r.height), left: Math.round(r.left), right: Math.round(r.right) };
  });
  return { trunkX: Math.round(trunk.left), trunkH: Math.round(trunk.height), svgDisplay: style && style.display, branchFeature: branchCount, commits, capsuleBranches: caps, anchors };
});
console.log(JSON.stringify(res, null, 1));
await browser.close();
