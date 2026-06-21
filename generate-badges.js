const fs = require('fs');
const si = require('simple-icons');

const badges = [
  { name: 'LinkedIn', file: 'btn-linkedin.svg', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', text: 'LinkedIn', color: '#202021' },
  { name: 'Portfolio', file: 'btn-portfolio.svg', icon: si.siGoogleearth, text: 'Portfolio', color: '#202021' },
  { name: 'Instagram', file: 'btn-instagram.svg', icon: si.siInstagram, text: 'Instagram', color: '#202021' },
  { name: 'Gmail', file: 'btn-gmail.svg', icon: si.siGmail, text: 'Gmail', color: '#202021' },
  { name: 'Resume', file: 'btn-resume.svg', icon: si.siReaddotcv, text: 'Resume', color: '#202021' },
];

const { getFontStyles, FONT_FAMILY: FN } = require('./font-loader');
// rough character width approximation
const charW = (ch) => {
  const CW = { m: 0.88, w: 0.78, i: 0.27, j: 0.27, l: 0.27, t: 0.39, r: 0.39, f: 0.34 };
  return (CW[ch.toLowerCase()] ?? 0.59);
};
const textW = (s, sz) => [...s].reduce((t, c) => t + charW(c) * sz, 0);

badges.forEach(badge => {
  const paddingX = 14;
  const iconSize = 16;
  const gap = 8;
  const fontSize = 13;
  const paddingY = 6;
  
  const tw = textW(badge.text, fontSize) + 10; // extra padding for safety
  const width = paddingX * 2 + iconSize + gap + tw;
  const height = iconSize + paddingY * 2;
  
  const path = badge.path ? badge.path : (badge.icon ? badge.icon.path : '');
  
  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    \${getFontStyles()}
  </defs>
  <rect width="${width}" height="${height}" rx="14" fill="${badge.color}" />
  <g transform="translate(${paddingX}, ${paddingY})">
    <path d="${path}" fill="#f0f6fc" transform="scale(${iconSize/24})"/>
  </g>
  <text x="${paddingX + iconSize + gap}" y="${height/2 + fontSize * 0.35}" fill="#f0f6fc" font-family="${FN}" font-size="${fontSize}" font-weight="400">${badge.text}</text>
</svg>`;

  fs.writeFileSync(badge.file, svg);
  console.log(`Generated ${badge.file}`);
});
