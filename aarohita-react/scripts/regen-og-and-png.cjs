const { execSync } = require('child_process');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const generator = path.join(repoRoot, 'scripts', 'generate-og.js');
const converter = path.join(__dirname, 'svg-to-png-local.cjs');

try {
  console.log('Running SVG generator...');
  execSync(`node "${generator}"`, { stdio: 'inherit' });

  console.log('Running SVG -> PNG converter...');
  execSync(`node "${converter}"`, { stdio: 'inherit' });

  console.log('All OG images regenerated and converted to PNG.');
} catch (err) {
  console.error('Failed during OG regeneration pipeline:', err);
  process.exit(1);
}
