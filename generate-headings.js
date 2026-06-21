const fs = require('fs');
const { getFontStyles, FONT_FAMILY: FN } = require('./font-loader');

const headings = [
  { file: 'heading-projects.svg', text: 'Projects', sub: 'A collection of things I\'ve built.' },
  { file: 'heading-achievements.svg', text: 'Achievements', sub: 'Milestones and open source contributions.' }
];

headings.forEach(({ file, text, sub }) => {
  const width = 842;
  const height = 110;
  
  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>${getFontStyles()}</defs>
  <!-- Category Tag (About style: sentence-case, gray, size 12) -->
  <text x="${width/2}" y="35" fill="#8b949e" font-family="${FN}" font-size="12" font-weight="500" letter-spacing="2" text-anchor="middle">${text}</text>
  <!-- Description/Subtitle (styled like the old big white title) -->
  <text x="${width/2}" y="80" fill="#f0f6fc" font-family="${FN}" font-size="28" font-weight="500" letter-spacing="1.5" text-anchor="middle">${sub}</text>
</svg>`;

  fs.writeFileSync(file, svg);
  console.log(`Generated ${file}`);
});
