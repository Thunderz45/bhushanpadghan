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
    { path: '#intro', priority: '1.0', changefreq: 'weekly', title: 'Intro — Bhushan Padghan' },
    { path: '#work', priority: '0.95', changefreq: 'weekly', title: 'What I Do — AI Workflows & Systems' },
    { path: '#gallery', priority: '0.9', changefreq: 'weekly', title: 'Gallery — Exhibition & Summit Showcase' },
    { path: '#about', priority: '0.8', changefreq: 'monthly', title: 'About Bhushan Padghan' },
    { path: '#experience', priority: '0.8', changefreq: 'monthly', title: 'Experience & T-HUB Incubation' },
    { path: '#projects', priority: '0.85', changefreq: 'weekly', title: 'Featured Projects & AI Systems' },
    { path: '#contact', priority: '0.75', changefreq: 'monthly', title: 'Contact & Inquiries' }
  ];

  const videos = [
    {
      title: 'Celestial Pixel — Luxury Creative Web Architecture',
      description: 'Luxury web architecture demonstration featuring interactive dynamic components, high-speed Vite performance, and smooth scroll animations.',
      thumbnailUrl: `${DOMAIN}/work/dist/images/projects/celestialpixel.png`,
      contentUrl: `${DOMAIN}/work/video/celestialpixel.mp4`,
      playerUrl: `${DOMAIN}/#work-page`,
      duration: 30,
      publicationDate: '2024-04-01T08:00:00+05:30'
    },
    {
      title: 'Bhushan Padghan — Modern AI & Systems Architecture Showcase',
      description: 'High-performance interactive demonstration of autonomous AI workflows, vector RAG pipelines, and full-stack software development.',
      thumbnailUrl: `${DOMAIN}/work/dist/images/bhushan_portrait.png`,
      contentUrl: `${DOMAIN}/work/video/15254965_1920_1080_24fps.mp4`,
      playerUrl: `${DOMAIN}/#intro`,
      duration: 15,
      publicationDate: '2024-04-01T08:00:00+05:30'
    },
    {
      title: 'Bhushan Padghan — Autonomous AI Systems Loop',
      description: 'Visual showcase of enterprise workflow automation, multi-cloud API webhooks, and intelligent agent engineering.',
      thumbnailUrl: `${DOMAIN}/work/dist/images/bhushan_portrait.png`,
      contentUrl: `${DOMAIN}/work/video/14360605_compressed.mp4`,
      playerUrl: `${DOMAIN}/#intro`,
      duration: 20,
      publicationDate: '2024-04-01T08:00:00+05:30'
    }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n`;
  xml += `        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"\n`;
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

      // Add Video Sitemaps for Primary URL
      videos.forEach(video => {
        xml += `    <video:video>\n`;
        xml += `      <video:thumbnail_loc>${video.thumbnailUrl}</video:thumbnail_loc>\n`;
        xml += `      <video:title>${escapeXml(video.title)}</video:title>\n`;
        xml += `      <video:description>${escapeXml(video.description)}</video:description>\n`;
        xml += `      <video:content_loc>${video.contentUrl}</video:content_loc>\n`;
        xml += `      <video:player_loc>${video.playerUrl}</video:player_loc>\n`;
        xml += `      <video:duration>${video.duration}</video:duration>\n`;
        xml += `      <video:publication_date>${video.publicationDate}</video:publication_date>\n`;
        xml += `      <video:family_friendly>yes</video:family_friendly>\n`;
        xml += `      <video:live>no</video:live>\n`;
        xml += `    </video:video>\n`;
      });
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
