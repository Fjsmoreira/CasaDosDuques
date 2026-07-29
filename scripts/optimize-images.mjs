/**
 * Image optimization script for Casa dos Duques.
 *
 * For every JPEG in public/images/airbnb/:
 *   - Creates a full-size WebP version (~80% quality)
 *   - Creates resized JPEGs at 400w, 800w, 1200w (max width)
 *   - Creates resized WebP at 400w, 800w, 1200w (max width)
 *   - Idempotent: only generates outputs that don't already exist
 *
 * Usage: node scripts/optimize-images.mjs
 */

import { readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const INPUT_DIRS = [
  path.resolve('public/images/airbnb'),
  path.resolve('public/images/blog'),
];

// Max widths for responsive srcset
const SIZES = [400, 800, 1200];

const WEBP_QUALITY = 80;
const JPEG_QUALITY = 82;

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);

  if (!['.jpg', '.jpeg'].includes(ext)) return;

  const outputDir = path.dirname(filePath);
  const outputBase = path.join(outputDir, baseName);

  const fullWebp = `${outputBase}.webp`;
  const resizedTargets = SIZES.flatMap((width) => [
    { width, file: `${outputBase}-${width}w.jpeg`, format: 'jpeg' },
    { width, file: `${outputBase}-${width}w.webp`, format: 'webp' },
  ]);

  // Idempotent: skip only if every derived output already exists.
  const missing = [!existsSync(fullWebp), ...resizedTargets.map((t) => !existsSync(t.file))].some(Boolean);
  if (!missing) {
    console.log(`  ⏭  Skipping ${path.basename(filePath)} (already processed)`);
    return { skipped: true };
  }

  const metadata = await sharp(filePath).metadata();
  console.log(`  🖼  Processing ${path.basename(filePath)} (${metadata.width}x${metadata.height})`);

  // Generate full-size WebP
  if (!existsSync(fullWebp)) {
    await sharp(filePath).webp({ quality: WEBP_QUALITY }).toFile(fullWebp);
  }

  // Generate resized JPEG + WebP variants
  for (const target of resizedTargets) {
    if (metadata.width <= target.width || existsSync(target.file)) continue;
    const pipeline = sharp(filePath).resize({ width: target.width, withoutEnlargement: true });
    if (target.format === 'webp') {
      await pipeline.webp({ quality: WEBP_QUALITY }).toFile(target.file);
    } else {
      await pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true }).toFile(target.file);
    }
  }

  return { skipped: false };
}

async function main() {
  let totalProcessed = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const INPUT_DIR of INPUT_DIRS) {
    if (!existsSync(INPUT_DIR)) {
      console.log(`Directory not found, skipping: ${INPUT_DIR}`);
      continue;
    }

    const files = readdirSync(INPUT_DIR)
      .filter((f) => /\.(jpe?g)$/i.test(f) && !/-\d+w\.jpe?g$/i.test(f))
      .map((f) => path.join(INPUT_DIR, f));

    console.log(`\n📁 ${path.relative(process.cwd(), INPUT_DIR)}: ${files.length} JPEG images`);

    for (const file of files) {
      try {
        const result = await processImage(file);
        if (result.skipped) totalSkipped++;
        else totalProcessed++;
      } catch (err) {
        console.error(`  ❌ Error processing ${path.basename(file)}: ${err.message}`);
        totalErrors++;
      }
    }
  }

  console.log(`\n✅ Done! Processed: ${totalProcessed}, Skipped: ${totalSkipped}, Errors: ${totalErrors}`);
}

main();
