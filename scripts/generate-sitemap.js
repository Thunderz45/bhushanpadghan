import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { portfolioData } from '../src/data/portfolioData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.bhushanpadghan.online';
const TODAY = new Date().toISOString().split('T')[0];

function generateSitemap() {
  const sections = [
    { path: '', priority: '1.0', changefreq: 'weekly', title: 'Home & Portfolio' },
    { path: '#about', priority: '0.8', changefreq: 'monthly', title: 'About Bhushan Padghan' },
    { path: '#experience', priority: '0.8', changefreq: 'monthly', title: 'Experience & T-HUB Incubation' },
    { path: '#projects', priority: '0.9', changefreq: 'weekly', title: 'Featured Projects & AI Systems' },
    { path: '#skills', priority: '0.8', changefreq: 'monthly', title: 'Technical Skills & Architecture' },
    { path: '#gallery', priority: '0.7', changefreq: 'monthly', title: 'Exhibition & Summit Gallery' },
    { path: '#contact', priority: '0.7', changefreq: 'monthly', title: 'Contact & Inquiries' }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n`;
  xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n`;
  xml += `                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

  // Add primary URLs & Anchors
  sections.forEach(sec => {
    const url = sec.path ? `${DOMAIN}/${sec.path}` : `${DOMAIN}/`;
    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${sec.changefreq}</changefreq>\n`;
    xml += `    <priority>${sec.priority}</priority>\n`;

    // Add main portfolio image for primary URL
    if (sec.path === '') {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${DOMAIN}/work/dist/images/bhushan_portrait.png</image:loc>\n`;
      xml += `      <image:title>${escapeXml('Bhushan Padghan — AI Developer & Systems Architect')}</image:title>\n`;
      xml += `      <image:caption>Portrait of Bhushan Padghan</image:caption>\n`;
      xml += `    </image:image>\n`;
    }
    xml += `  </url>\n`;
  });

  // Add project images to sitemap for Google Image indexing
  if (portfolioData.projects && Array.isArray(portfolioData.projects)) {
    portfolioData.projects.forEach(project => {
      if (project.image) {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}/#project-${project.id}</loc>\n`;
        xml += `    <lastmod>${TODAY}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${DOMAIN}${project.image}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(project.title)} — ${escapeXml(project.category)}</image:title>\n`;
        xml += `      <image:caption>${escapeXml(project.description)}</image:caption>\n`;
        xml += `    </image:image>\n`;
        xml += `  </url>\n`;
      }
    });
  }

  // Add gallery images to sitemap
  if (portfolioData.gallery && Array.isArray(portfolioData.gallery)) {
    portfolioData.gallery.forEach(item => {
      if (item.src) {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}/#gallery-${item.id}</loc>\n`;
        xml += `    <lastmod>${TODAY}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${DOMAIN}${item.src}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(item.title)}</image:title>\n`;
        xml += `      <image:caption>${escapeXml(item.description)}</image:caption>\n`;
        xml += `    </image:image>\n`;
        xml += `  </url>\n`;
      }
    });
  }

  xml += `</urlset>\n`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`✅ Sitemap successfully generated at: ${outputPath}`);
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

generateSitemap();
