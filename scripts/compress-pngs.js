#!/usr/bin/env node
// Compresses every .png in public/ (recursively) in place using sharp,
// with palette-based lossy compression. Skips files that wouldn't shrink.

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

function findPngs(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPngs(full));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".png")) {
      results.push(full);
    }
  }
  return results;
}

async function compress(file) {
  const before = fs.statSync(file).size;
  const buffer = await sharp(file)
    .png({ quality: 80, compressionLevel: 9, palette: true })
    .toBuffer();

  if (buffer.length < before) {
    fs.writeFileSync(file, buffer);
    const after = buffer.length;
    const pct = (100 * (1 - after / before)).toFixed(1);
    console.log(
      `${path.relative(PUBLIC_DIR, file)}: ${(before / 1024).toFixed(1)}KB -> ${(after / 1024).toFixed(1)}KB (-${pct}%)`
    );
  } else {
    console.log(`${path.relative(PUBLIC_DIR, file)}: already optimal, skipped`);
  }
}

(async () => {
  const pngs = findPngs(PUBLIC_DIR);
  if (pngs.length === 0) {
    console.log("No PNGs found in public/");
    return;
  }
  for (const file of pngs) {
    await compress(file);
  }
})();
