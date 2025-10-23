const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const ogDir = path.join(root, 'aarohita-react', 'public', 'images', 'og');

async function convertAll() {
  if (!fs.existsSync(ogDir)) {
    console.error('OG directory not found:', ogDir);
    process.exit(1);
  }

  const files = fs.readdirSync(ogDir).filter(f => f.endsWith('.svg'));
  if (files.length === 0) {
    console.log('No SVG files to convert');
    return;
  }

  await Promise.all(files.map(async (f) => {
    const inPath = path.join(ogDir, f);
    const outName = f.replace(/\.svg$/i, '.png');
    const outPath = path.join(ogDir, outName);
    try {
      await sharp(inPath)
        .resize(1200, 630, { fit: 'cover' })
        .png({ quality: 90 })
        .toFile(outPath);
      console.log('Wrote', outPath);
    } catch (err) {
      console.error('Failed to convert', inPath, err);
    }
  }));
}

convertAll().catch(err => { console.error(err); process.exit(1); });
