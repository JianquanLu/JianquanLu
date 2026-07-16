import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '../..');
const framesDir = path.join(import.meta.dirname, '.frames');
const output = path.join(root, 'assets/readme/hero.gif');
const fps = 25;
const durationMs = 5000;
const frameCount = Math.round((durationMs / 1000) * fps);
const edgeCandidates = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe'
];
const executablePath = edgeCandidates.find(existsSync);

if (!executablePath) throw new Error('Microsoft Edge was not found.');

await rm(framesDir, { recursive: true, force: true });
await mkdir(framesDir, { recursive: true });

const server = spawn(process.execPath, [
  path.join(import.meta.dirname, 'node_modules/http-server/bin/http-server'),
  root,
  '-p', '4173', '-c-1', '--silent'
], { stdio: 'ignore' });

try {
  await new Promise((resolve) => setTimeout(resolve, 700));
  const browser = await chromium.launch({ executablePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 420 }, deviceScaleFactor: 1 });
  page.on('console', (message) => console.log(`[browser:${message.type()}] ${message.text()}`));
  page.on('pageerror', (error) => console.error(`[browser:error] ${error.message}`));
  await page.goto('http://127.0.0.1:4173/tools/readme-animation/index.html');
  await page.waitForFunction(() => window.animationReady === true, { timeout: 10000 });

  for (let index = 0; index < frameCount; index += 1) {
    const time = (index / frameCount) * durationMs;
    await page.evaluate((frameTime) => window.renderFrame(frameTime), time);
    const png = await page.screenshot({ type: 'png' });
    await sharp(png)
      .resize({ width: 960 })
      .png({ palette: true, colours: 128, dither: 0 })
      .toFile(path.join(framesDir, `frame-${String(index).padStart(4, '0')}.png`));
  }

  await browser.close();
  const ffmpeg = spawnSync('ffmpeg', [
    '-y', '-framerate', String(fps),
    '-i', path.join(framesDir, 'frame-%04d.png'),
    '-filter_complex', '[0:v]split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=none:diff_mode=rectangle',
    '-loop', '0', output
  ], { stdio: 'inherit' });

  if (ffmpeg.status !== 0) throw new Error('ffmpeg failed to encode the GIF.');
} finally {
  server.kill();
  await rm(framesDir, { recursive: true, force: true });
}
