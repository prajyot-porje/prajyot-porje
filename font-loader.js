const fs = require('fs');
const path = require('path');

function getFontStyles() {
  const regularPath = path.join(__dirname, 'grift-geometric-typeface', 'grift-medium.ttf');
  const boldPath = path.join(__dirname, 'grift-geometric-typeface', 'grift-bold.ttf');
  
  const regularB64 = fs.readFileSync(regularPath).toString('base64');
  const boldB64 = fs.readFileSync(boldPath).toString('base64');

  return `
    <style>
      @font-face {
        font-family: 'Grift';
        src: url(data:font/truetype;charset=utf-8;base64,${regularB64}) format('truetype');
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: 'Grift';
        src: url(data:font/truetype;charset=utf-8;base64,${regularB64}) format('truetype');
        font-weight: 500;
        font-style: normal;
      }
      @font-face {
        font-family: 'Grift';
        src: url(data:font/truetype;charset=utf-8;base64,${boldB64}) format('truetype');
        font-weight: 600;
        font-style: normal;
      }
      @font-face {
        font-family: 'Grift';
        src: url(data:font/truetype;charset=utf-8;base64,${boldB64}) format('truetype');
        font-weight: 700;
        font-style: normal;
      }
    </style>
  `;
}

module.exports = { 
  getFontStyles, 
  FONT_FAMILY: "'Grift', sans-serif" 
};
