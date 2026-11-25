// "The World in One Day" — news-image-20261124 entry (Node 22, standard library only).
// The image is the entry.png beside this file: a newspaper front page summing up
// Tuesday 24 November 2026 in seven stories, drawn as code and rendered once.
// The program copies it to /output/entry.png, so both runs write identical bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, readFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
// Fail fast instead of copying a missing or truncated image: the entry must be a
// whole 1024x1024 PNG, so check the PNG signature and the IHDR dimensions first.
if (!existsSync(src)) throw new Error('entry.png is missing from the repository');
const bytes = readFileSync(src);
const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(pngSig)) throw new Error('entry.png is not a PNG file');
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  throw new Error(`entry.png must be 1024x1024, got ${width}x${height}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, 'entry.png'));
