import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve(import.meta.dirname, '../../assets/readme/hero.svg');

const font = {
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['11110', '10000', '10000', '10111', '10001', '10001', '11110'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  X: ['10001', '01010', '00100', '00100', '00100', '01010', '10001']
};

function hash(seed) {
  let value = 2166136261;
  for (const char of seed) {
    value ^= char.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function decimal(value) {
  return value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
}

function pixelWord(word, x, y, color, accent, label) {
  const size = 10;
  const step = 15;
  const letterWidth = 5;
  const letterGap = 1;
  const pixels = [];
  let pixelIndex = 0;

  [...word].forEach((letter, letterIndex) => {
    font[letter].forEach((row, rowIndex) => {
      [...row].forEach((active, columnIndex) => {
        if (active !== '1') return;

        const seed = `${label}-${letterIndex}-${rowIndex}-${columnIndex}`;
        const value = hash(seed);
        const px = x + (letterIndex * (letterWidth + letterGap) + columnIndex) * step;
        const py = y + rowIndex * step;
        const fill = value % 13 === 0 ? accent : color;
        const high = 0.76 + (value % 18) / 100;
        const low = 0.4 + ((value >>> 5) % 18) / 100;
        const middle = 0.62 + ((value >>> 10) % 18) / 100;
        const duration = 3.2 + ((value >>> 15) % 27) / 10;
        const begin = -((value >>> 20) % 50) / 10;
        const animate = value % 4 !== 0;

        pixels.push(`          <rect x="${px}" y="${py}" width="${size}" height="${size}" rx="2.5" fill="${fill}" opacity="${decimal(high)}">`);
        if (animate) {
          pixels.push(`            <animate class="pixel-motion" attributeName="opacity" values="${decimal(high)};${decimal(low)};${decimal(middle)};${decimal(high)}" keyTimes="0;0.34;0.68;1" dur="${decimal(duration)}s" begin="${decimal(begin)}s" repeatCount="indefinite" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1;.4 0 .6 1"/>`);
        }
        pixels.push('          </rect>');
        pixelIndex += 1;
      });
    });
  });

  return { markup: pixels.join('\n'), count: pixelIndex };
}

const gnss = pixelWord('GNSS', 770, 102, '#65D7D1', '#F5C96A', 'gnss');
const fix = pixelWord('FIX', 812, 220, '#EF6A5B', '#F5C96A', 'fix');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="420" viewBox="0 0 1200 420" role="img" aria-labelledby="title desc">
  <title id="title">Jianquan Lu - positioning, navigation, and open source</title>
  <desc id="desc">A calm pixel signal field spells GNSS and FIX beside a profile for precise positioning and multi-sensor navigation research.</desc>
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1200" y2="420" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0B1015"/>
      <stop offset="1" stop-color="#151D24"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#B9C4C9" stroke-opacity=".08"/>
    </pattern>
    <pattern id="panel-dots" width="15" height="15" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#52646C" fill-opacity=".2"/>
    </pattern>
    <clipPath id="frame"><rect width="1200" height="420" rx="22"/></clipPath>
    <style>
      @media (prefers-reduced-motion: reduce) {
        .pixel-motion { display: none; }
      }
    </style>
  </defs>
  <g clip-path="url(#frame)">
    <rect width="1200" height="420" fill="url(#sky)"/>
    <rect width="1200" height="420" fill="url(#grid)"/>
    <path d="M0 338C160 320 253 351 405 334C564 316 711 289 873 304C1018 317 1110 299 1200 270V420H0Z" fill="#10171D"/>
    <path d="M0 338C160 320 253 351 405 334C564 316 711 289 873 304C1018 317 1110 299 1200 270" fill="none" stroke="#65D7D1" stroke-opacity=".45"/>

    <g transform="translate(64 56)">
      <text x="0" y="0" fill="#65D7D1" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="15" letter-spacing="2">PROFILE / 30.52 N 114.31 E</text>
      <text x="0" y="78" fill="#F4F7F7" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="62" font-weight="750">JIANQUAN LU</text>
      <text x="2" y="124" fill="#B9C4C9" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="23">Reliable positioning from complex observations.</text>
      <g transform="translate(2 170)" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="14">
        <rect width="104" height="30" rx="4" fill="#65D7D1"/><text x="15" y="20" fill="#0B1015" font-weight="700">GNSS / PPP</text>
        <rect x="114" width="96" height="30" rx="4" fill="#202B33"/><text x="130" y="20" fill="#F5C96A">LiDAR</text>
        <rect x="220" width="76" height="30" rx="4" fill="#202B33"/><text x="238" y="20" fill="#F5C96A">IMU</text>
        <rect x="306" width="102" height="30" rx="4" fill="#202B33"/><text x="321" y="20" fill="#EF6A5B">CAMERA</text>
      </g>
      <text x="2" y="260" fill="#77858C" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="13">WUHAN UNIVERSITY  /  RESEARCH + ENGINEERING  /  OPEN SOURCE</text>
    </g>

    <g>
      <rect x="732" y="46" width="404" height="320" rx="14" fill="#10171D" stroke="#33434B"/>
      <rect x="732" y="46" width="404" height="320" rx="14" fill="url(#panel-dots)"/>
      <text x="756" y="78" fill="#77858C" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="12" letter-spacing="1">LIVE / MULTI-SENSOR SIGNAL FIELD</text>
      <circle cx="1107" cy="74" r="4" fill="#65D7D1" opacity=".8">
        <animate class="pixel-motion" attributeName="opacity" values=".8;.45;.8" dur="4.8s" repeatCount="indefinite"/>
      </circle>
      <g aria-label="GNSS pixel matrix">
${gnss.markup}
      </g>
      <path d="M770 198H1098" stroke="#33434B" stroke-dasharray="3 6"/>
      <g aria-label="FIX pixel matrix">
${fix.markup}
      </g>
      <text x="756" y="344" fill="#77858C" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="11">FIXED / 30.5200 N / 114.3100 E</text>
      <text x="1112" y="344" fill="#F5C96A" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="11" text-anchor="end">${gnss.count + fix.count} PX</text>
    </g>
  </g>
</svg>
`;

await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, svg, 'utf8');
console.log(`Generated ${output} with ${gnss.count + fix.count} signal pixels.`);
