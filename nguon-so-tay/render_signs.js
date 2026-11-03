const { chromium } = require('playwright');
const path = require('path');
const { ICONS, signSvg, auxSvg } = require('./signs.js');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  const items = Object.keys(ICONS).map(k => [k, signSvg(k, k), 100, 100]);
  items.push(['aux', auxSvg('6h–9h'), 100, 50]);
  for (const [k, svg, w, h] of items) {
    await page.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${w*1.6}" height="${h*1.6}" `)}</body></html>`);
    const el = await page.$('svg');
    await el.screenshot({ path: path.join(__dirname, 'png', k + '.png'), omitBackground: true });
  }
  await browser.close();
  console.log('rendered', items.length);
})();
