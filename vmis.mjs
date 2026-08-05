import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://luiggival08.github.io/portfolio/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
const res = await page.evaluate(() => {
  const anchors = Array.from(document.querySelectorAll('[data-tree-anchor]')).map(el => {
    const r = el.getBoundingClientRect();
    return { tag: el.tagName, cls: (el.className.baseVal || el.className || '').toString().slice(0, 60), top: Math.round(r.top + scrollY), h: Math.round(r.height) };
  });
  const svg = document.querySelector('#tree-svg');
  const feats = Array.from(svg.querySelectorAll(':scope > path.tree-branch-feature')).map(p => {
    const r = p.getBoundingClientRect();
    return { x0: Math.round(r.left), x1: Math.round(r.right), y0: Math.round(r.top + scrollY), y1: Math.round(r.bottom + scrollY) };
  });
  const caps = Array.from(svg.querySelectorAll(':scope > path.tree-branch:not(.tree-branch-feature)')).map(p => {
    const r = p.getBoundingClientRect();
    return { x0: Math.round(r.left), x1: Math.round(r.right), y0: Math.round(r.top + scrollY), y1: Math.round(r.bottom + scrollY) };
  });
  return { anchors: anchors.slice(4), feats, caps: caps.slice(0, 10) };
});
console.log(JSON.stringify(res, null, 1));
await browser.close();
