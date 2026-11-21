import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { renderToString } from 'react-dom/server';
import { App } from '../src/App';
import { pages } from '../src/content';

const template = await readFile('dist/index.html', 'utf8');
const origin = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : '';
function escape(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
async function render(path: string, title: string, description: string, destination: string) {
  const fullTitle = escape(title + ' | Bhuman Fortune');
  const canonical = origin ? escape(origin + path) : '';
  const noindex = ['/about', '/privacy', '/terms', '/404'].includes(path);
  const meta = [
    '<meta name="description" content="' + escape(description) + '">',
    '<meta property="og:title" content="' + fullTitle + '">',
    '<meta property="og:description" content="' + escape(description) + '">',
    canonical && !noindex ? '<link rel="canonical" href="' + canonical + '"><meta property="og:url" content="' + canonical + '">' : '',
    noindex ? '<meta name="robots" content="noindex">' : '',
  ].join('\n');
  const html = template.replace('<title>BHUMAN FORTUNE</title>', '<title>' + fullTitle + '</title>')
    .replace('<!--meta-->', () => meta)
    .replace('<div id="root"></div>', () => '<div id="root">' + renderToString(<App path={path}/>) + '</div>');
  await writeFile(destination, html);
}
for (const [path, [title, description]] of Object.entries(pages)) {
  if (path !== '/') await mkdir('dist' + path, {recursive:true});
  await render(path, title, description, 'dist' + path + (path === '/' ? '' : '/') + 'index.html');
}
await render('/404', 'Page not found', 'The requested page could not be found.', 'dist/404.html');
if (origin) {
  const urls = Object.keys(pages).filter(p => !['/about','/privacy','/terms'].includes(p));
  await writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls.map(p => '<url><loc>' + escape(origin + p) + '</loc></url>').join('') + '</urlset>');
  await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + origin + '/sitemap.xml\n');
}
