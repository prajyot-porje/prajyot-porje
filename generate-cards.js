const fs = require('fs');
const sharp = require('sharp');

const cards = [
  {
    id: 'devflow',
    img: 'Devflow.png',
    title: 'DevFlow',
    desc: 'AI Code Generation and Execution Platform',
  },
  {
    id: 'contextgraph',
    img: 'contextGraph.png',
    title: 'ContextGraph',
    desc: 'Multi-Tenant AI Context Engine with MCP',
  }
];

const W = 410;
const H = 230;
const { getFontStyles, FONT_FAMILY: FN } = require('./font-loader');

async function run() {
  for (const card of cards) {
    const buffer = await sharp(card.img)
      .resize(W * 2) // retina resolution
      .jpeg({ quality: 80 })
      .toBuffer();
      
    const b64 = buffer.toString('base64');
    
    const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    \${getFontStyles()}
    <clipPath id="card-clip"><rect width="${W}" height="${H}" rx="16"/></clipPath>
    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0d1117" stop-opacity="0.1"/>
      <stop offset="40%" stop-color="#0d1117" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0d1117" stop-opacity="0.95"/>
    </linearGradient>
  </defs>

  <g clip-path="url(#card-clip)">
    <!-- Background Image -->
    <image href="data:image/jpeg;base64,${b64}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice"/>
    
    <!-- Dark Gradient Overlay -->
    <rect width="${W}" height="${H}" fill="url(#grad)" />
    
    <!-- Stroke/Border -->
    <rect width="${W}" height="${H}" rx="16" fill="none" stroke="#30363d" stroke-width="2" />
    
    <!-- Texts -->
    <text x="24" y="${H - 52}" fill="#ffffff" font-family="${FN}" font-size="22" font-weight="500">${card.title}</text>
    <text x="24" y="${H - 26}" fill="#8b949e" font-family="${FN}" font-size="13" font-weight="400">${card.desc}</text>
    
    <!-- Live Button Graphic -->
    <g transform="translate(${W - 84}, 24)">
      <rect width="60" height="26" rx="13" fill="#238636"/>
      <circle cx="16" cy="13" r="3" fill="#3fb950">
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="26" y="17" fill="#ffffff" font-family="${FN}" font-size="12" font-weight="500">Live</text>
    </g>
  </g>
</svg>`;

    fs.writeFileSync(`card-${card.id}.svg`, svg);
    console.log(`Generated card-${card.id}.svg`);
  }
}

run();
