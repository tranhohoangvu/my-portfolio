/**
 * Bundles the data + feature modules (in dependency order) into
 * js/bundle.min.js using the locally installed esbuild (devDependency).
 */
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const ROOT = path.resolve(__dirname, '..');

// Order matters: data first, then modules, then the orchestrator.
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
  'js/scripts.js',
];

const combined = files.map((f) => {
  const abs = path.join(ROOT, f);
  if (!fs.existsSync(abs)) throw new Error(`File not found: ${f}`);
  return `/* === ${f} === */\n` + fs.readFileSync(abs, 'utf8');
}).join('\n\n');

console.log(`Bundling ${files.length} files with esbuild...`);
const result = esbuild.transformSync(combined, {
  minify: true,
  target: 'es2020',
  legalComments: 'none',
});

const outFile = path.join(ROOT, 'js/bundle.min.js');
fs.writeFileSync(outFile, result.code, 'utf8');

const kb = (fs.statSync(outFile).size / 1024).toFixed(1);
console.log(`Generated js/bundle.min.js (${kb} KB)`);
