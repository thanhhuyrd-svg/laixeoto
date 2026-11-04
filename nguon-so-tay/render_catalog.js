const { chromium } = require('playwright');
const path = require('path');
const { CATALOG } = require('./data5.js');
const CI = require('./catalog_icons.js');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ deviceScaleFactor: 2 });
  const seen = new Set(); let n = 0;
  for (const c of CATALOG) for (const r of c.rows) {
    const id = CI.iconId(r[0]); if (seen.has(id)) continue; seen.add(id);
    await p.setContent(`<html><body style="margin:0;background:transparent">${CI.iconSvg(r[0]).replace('<svg ', '<svg width="96" height="96" ')}</body></html>`);
    await (await p.$('svg')).screenshot({ path: path.join(__dirname, 'png', id + '.png'), omitBackground: true }); n++;
  }
  await b.close(); console.log('rendered', n);
})();
