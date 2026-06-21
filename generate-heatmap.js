const fs = require('fs');
const https = require('https');
const { getFontStyles, FONT_FAMILY: FN } = require('./font-loader');

const username = 'prajyot-porje';

// GitHub Dark Mode Contribution Colors
const COLORS = {
  0: '#161b22', // empty
  1: '#0e4429', // low
  2: '#006d32', // medium
  3: '#26a641', // high
  4: '#39d353'  // very high
};

const TEXT_COLOR = '#8b949e';
const BG_COLOR = 'none'; // transparent background

https.get(`https://github.com/users/${username}/contributions`, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // 1. Extract days
    const dayRegex = /<td[^>]+data-date="([^"]+)"[^>]+data-level="([^"]+)"/g;
    let match;
    const days = [];
    while ((match = dayRegex.exec(data)) !== null) {
      days.push({ date: match[1], level: parseInt(match[2], 10) });
    }

    if (days.length === 0) {
      console.error("No contribution data found.");
      return;
    }

    // Sort days chronologically just in case HTML order isn't chronological
    days.sort((a, b) => new Date(a.date) - new Date(b.date));

    // 2. Build grid (group by weeks)
    const weeks = [];
    let currentWeek = [];
    let lastMonth = -1;
    const months = [];

    days.forEach((day, i) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
      const month = date.getMonth();

      // Start a new week if it's Sunday OR if it's the very first day
      if (dayOfWeek === 0 || i === 0) {
        if (currentWeek.length > 0) {
          weeks.push(currentWeek);
        }
        currentWeek = [];
        // Add month label if month changed and we're starting a new week
        if (month !== lastMonth && weeks.length > 0) {
          // ensure minimum distance from last month label to prevent overlap
          const lastMonthObj = months[months.length - 1];
          if (!lastMonthObj || (weeks.length - lastMonthObj.x) >= 2) {
            months.push({ text: date.toLocaleString('default', { month: 'short' }), x: weeks.length });
            lastMonth = month;
          }
        } else if (lastMonth === -1) {
          lastMonth = month;
        }
      }

      // Pad the very first week with nulls if it doesn't start on Sunday
      if (i === 0 && dayOfWeek !== 0) {
        for (let j = 0; j < dayOfWeek; j++) {
          currentWeek.push(null);
        }
      }

      currentWeek.push(day);
    });
    if (currentWeek.length > 0) weeks.push(currentWeek);

    // 4. Generate SVG
    const cellSize = 10;
    const cellGap = 3;
    const padX = 30;
    const padY = 20;
    
    const svgWidth = padX + (weeks.length * (cellSize + cellGap)) + 10;
    const svgHeight = padY + (7 * (cellSize + cellGap)) + 20;

    let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg" font-family="${FN}">\n`;
    svg += `  <defs>\${getFontStyles()}</defs>\n`;
    svg += `  <rect width="100%" height="100%" fill="${BG_COLOR}" rx="8"/>\n`;

    // Draw month labels
    svg += `  <g font-size="9" fill="${TEXT_COLOR}">\n`;
    months.forEach(m => {
      const x = padX + (m.x * (cellSize + cellGap));
      svg += `    <text x="${x}" y="12">${m.text}</text>\n`;
    });
    svg += `  </g>\n`;

    // Draw day labels
    svg += `  <g font-size="9" fill="${TEXT_COLOR}">\n`;
    svg += `    <text dx="0" dy="${padY + 1*(cellSize+cellGap) + 9}">Mon</text>\n`;
    svg += `    <text dx="0" dy="${padY + 3*(cellSize+cellGap) + 9}">Wed</text>\n`;
    svg += `    <text dx="0" dy="${padY + 5*(cellSize+cellGap) + 9}">Fri</text>\n`;
    svg += `  </g>\n`;

    // Draw cells
    weeks.forEach((week, xIdx) => {
      const x = padX + (xIdx * (cellSize + cellGap));
      week.forEach((day, yIdx) => {
        if (!day) return; // skip padded null days at start of first week
        const y = padY + (yIdx * (cellSize + cellGap));
        const color = COLORS[day.level] || COLORS[0];
        // Add subtle animation for cells that have contributions
        let anim = '';
        if (day.level > 0) {
          const delay = (Math.random() * 2).toFixed(2);
          anim = `<animate attributeName="opacity" values="0.7;1;0.7" dur="3s" begin="${delay}s" repeatCount="indefinite"/>`;
        }
        svg += `  <rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" fill="${color}">${anim}</rect>\n`;
      });
    });

    svg += `</svg>`;

    fs.writeFileSync('heatmap-dark.svg', svg);
    console.log(`Successfully generated heatmap-dark.svg (${svgWidth}x${svgHeight})`);
  });
}).on('error', (err) => {
  console.error(err);
});
