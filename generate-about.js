const fs = require('fs');
const { getFontStyles, FONT_FAMILY: FN } = require('./font-loader');

const W = 842;
const H = 340;
const cx = W / 2;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${getFontStyles()}
  </defs>

  <!-- ABOUT -->
  <text x="${cx}" y="40" fill="#8b949e" font-family="${FN}" font-size="12" font-weight="500" letter-spacing="2" text-anchor="middle">About</text>

  <!-- Title -->
  <text x="${cx}" y="95" fill="#f0f6fc" font-family="${FN}" font-size="38" font-weight="500" text-anchor="middle">The Product Engineer</text>

  <!-- Paragraph -->
  <text x="${cx}" y="165" fill="#8b949e" font-family="${FN}" font-size="16" font-weight="400" text-anchor="middle">Hi, I'm Prajyot. I build software that works, not demos that impress. I've</text>
  <text x="${cx}" y="195" fill="#8b949e" font-family="${FN}" font-size="16" font-weight="400" text-anchor="middle">engineered AI tools like DevFlow and ContextGraph, solved 417 LeetCode problems,</text>
  <text x="${cx}" y="225" fill="#8b949e" font-family="${FN}" font-size="16" font-weight="400" text-anchor="middle">merged a PR in JupyterLab, and freelance for international clients.</text>

  <!-- Button -->
  <g transform="translate(${cx - 85}, 280)">
    <rect width="170" height="42" rx="21" fill="#f0f6fc" />
    <text x="85" y="26" fill="#0d1117" font-family="${FN}" font-size="14" font-weight="500" text-anchor="middle">Visit Portfolio</text>
  </g>
</svg>`;

fs.writeFileSync('about.svg', svg);
console.log('Generated about.svg');
