const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ogDir = path.join(root, 'aarohita-react', 'public', 'images', 'og');
if (!fs.existsSync(ogDir)) fs.mkdirSync(ogDir, { recursive: true });

async function main(){
  const mod = await import(path.join(root, 'aarohita-react', 'src', 'data', 'blogs.js'));
  const blogs = mod.blogs || mod.default || [];

  function escapeXml(str){
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function makeSvg(title, subtitle){
  const safeTitle = escapeXml(title);
  const safeSubtitle = subtitle ? escapeXml(subtitle) : '';
  const footer = escapeXml('Aarohita Vigyan · AI, Web & IoT');
  return `<?xml version="1.0" encoding="utf-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">\n  <defs>\n    <linearGradient id="g" x1="0" x2="1">\n      <stop offset="0%" stop-color="#1e3a8a"/>\n      <stop offset="100%" stop-color="#7c3aed"/>\n    </linearGradient>\n  </defs>\n  <rect width="100%" height="100%" fill="url(#g)"/>\n  <g font-family="Inter, Roboto, Arial, sans-serif" fill="#fff">\n    <text x="60" y="220" font-size="56" font-weight="700">${safeTitle}</text>\n    ${safeSubtitle ? `<text x="60" y="300" font-size="32" opacity="0.95">${safeSubtitle}</text>` : ''}\n    <text x="60" y="540" font-size="20" opacity="0.9">${footer}</text>\n  </g>\n</svg>`;
}


  // Generate per-blog SVGs
  blogs.forEach(b => {
    const svg = makeSvg(b.title, b.description ? b.description.slice(0, 120) : '');
    const out = path.join(ogDir, `${b.slug}.svg`);
    fs.writeFileSync(out, svg, 'utf8');
    console.log('Wrote', out);
  });

  // Default blog listing image
  const listingSvg = `<?xml version="1.0" encoding="utf-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">\n  <rect width="100%" height="100%" fill="#0f172a"/>\n  <text x="60" y="220" font-family="Inter, Roboto, Arial, sans-serif" font-size="64" font-weight="700" fill="#fff">Aarohita Vigyan Blog</text>\n  <text x="60" y="300" font-family="Inter, Roboto, Arial, sans-serif" font-size="28" fill="#c7d2fe">AI, IoT, Website Development & Case Studies</text>\n  <text x="60" y="540" font-family="Inter, Roboto, Arial, sans-serif" font-size="18" fill="#93c5fd">aarohitavigyan.com</text>\n</svg>`;
  fs.writeFileSync(path.join(ogDir, 'blog-listing.png'), listingSvg, 'utf8');
  fs.writeFileSync(path.join(ogDir, 'blog-listing.svg'), listingSvg, 'utf8');
  console.log('Wrote blog-listing images');

  console.log('OG generation complete');
}

main().catch(err => { console.error(err); process.exit(1); });
