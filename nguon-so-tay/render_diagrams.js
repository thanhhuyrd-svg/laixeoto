const { chromium } = require('playwright');
const path = require('path');
const { D, STACKS } = require('./diagrams.js');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  const items = Object.keys(D).map(k => [k, D[k](), 400, 240]).concat(Object.keys(STACKS).map(k => [k, STACKS[k](), 160, 200]));
  for (const [k, svg, w, h] of items) {
    await page.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${w*1.5}" height="${h*1.5}" `)}</body></html>`);
    await (await page.$('svg')).screenshot({ path: path.join(__dirname, 'png', k + '.png'), omitBackground: true });
  }
  await browser.close(); console.log('rendered', items.length);
})();
