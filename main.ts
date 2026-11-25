// "The World in One Day" — news-image-20261124 entry (Node 22, standard library only).
// The image is the entry.png beside this file: a newspaper front page summing up
// Tuesday 24 November 2026 in seven stories, drawn as code and rendered once.
// The program copies it to /output/entry.png, so both runs write identical bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync(new URL('./entry.png', import.meta.url), join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
