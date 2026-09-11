const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 19 modules in strict dependency order
const files = [
  'js/data/i18n.data.js',
  'js/data/projects.data.js',
  'js/data/skills.data.js',
  'js/data/certs.data.js',
  'js/modules/i18n.js',
  'js/modules/theme.js',
  'js/modules/carousel.js',
  'js/modules/modal.js',
  'js/modules/skill-linking.js',
  'js/modules/terminal.js',
  'js/modules/fab.js',
  'js/modules/section-nav.js',
  'js/modules/cert-modal.js',
  'js/modules/cert-filter.js',
  'js/modules/email-copy.js',
  'js/modules/contact-form.js',
  'js/modules/github-stats.js',
  'js/modules/ui-interactions.js',
  'js/scripts.js'
];

console.log('Concatenating 19 modules...');
const combined = files.map(f => {
  if (!fs.existsSync(f)) {
    throw new Error(`File not found: ${f}`);
  }
  return `/* === ${f} === */\n` + fs.readFileSync(f, 'utf8');
}).join('\n\n');

const tempBundle = 'js/bundle.temp.js';
fs.writeFileSync(tempBundle, combined, 'utf8');

console.log('Minifying with esbuild...');
execSync(`npx esbuild ${tempBundle} --minify --outfile=js/bundle.min.js`);

if (fs.existsSync(tempBundle)) {
  fs.unlinkSync(tempBundle);
}

const outSize = fs.statSync('js/bundle.min.js').size;
console.log(`Successfully generated js/bundle.min.js (${(outSize / 1024).toFixed(1)} KB)`);
