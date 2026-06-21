const fs = require('fs');
const si = require('simple-icons');

const W = 842;
const H = 120;
const { getFontStyles, FONT_FAMILY: FN } = require('./font-loader');

const achievements = [
  {
    icon: (si.siJupyter && si.siJupyter.path) || 'M4.238 18.066h3.454v-3.41H4.238v3.41zm3.844-4.88h3.454v-3.41H8.082v3.41zm3.844-4.88h3.454v-3.41h-3.454v3.41zm3.844-4.88h3.454v-3.41h-3.454v3.41z', 
    color: '#F37626',
    title: 'Merged PR #18157',
    sub: 'JupyterLab Contribution',
    delay: '0.2s'
  },
  {
    icon: (si.siLeetcode && si.siLeetcode.path) || 'M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.396.702-1.863l4.332-4.363c.467-.467 1.112-.662 1.824-.662s1.357.195 1.823.662l2.697 2.607c.467.467.662 1.112.662 1.824s-.195 1.357-.662 1.823z',
    color: '#FFA116',
    title: '417 LeetCode Solved',
    sub: '32 Hard • 150+ GFG',
    delay: '0.4s'
  },
  {
    icon: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z', 
    color: '#F1C40F',
    title: 'Hackathon Finalist',
    sub: 'ADCET 2024 Innovation',
    delay: '0.6s'
  }
];

let itemsSvg = '';
const colW = W / 3;

achievements.forEach((ach, i) => {
  const cx = colW * i + colW / 2;
  const cy = H / 2;
  
  itemsSvg += `
    <g opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="${ach.delay}" fill="freeze" />
      <animateTransform attributeName="transform" type="translate" from="${cx - 110} ${cy - 10}" to="${cx - 110} ${cy - 18}" dur="0.8s" begin="${ach.delay}" fill="freeze" />
      
      <!-- Icon -->
      <svg x="0" y="0" width="36" height="36" viewBox="0 0 24 24">
        <path d="${ach.icon}" fill="${ach.color}" />
      </svg>
      
      <!-- Text -->
      <text x="56" y="15" fill="#ffffff" font-family="${FN}" font-size="15" font-weight="500">${ach.title}</text>
      <text x="56" y="33" fill="#8b949e" font-family="${FN}" font-size="13" font-weight="400">${ach.sub}</text>
    </g>
  `;
});

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    \${getFontStyles()}
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" rx="20" fill="#202021" stroke="#30363d" stroke-width="1"/>

  <!-- Dividers -->
  <line x1="${colW}" y1="25" x2="${colW}" y2="${H - 25}" stroke="#30363d" stroke-width="1" />
  <line x1="${colW * 2}" y1="25" x2="${colW * 2}" y2="${H - 25}" stroke="#30363d" stroke-width="1" />

  <!-- Content -->
  ${itemsSvg}
</svg>`;

fs.writeFileSync('achievements.svg', svg);
console.log('Generated achievements.svg');
