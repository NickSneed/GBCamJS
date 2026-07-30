/**
 * @file This script generates an SVG image that visually represents all available color palettes.
 * It arranges the palettes in a grid, where each palette is shown as a series of color swatches
 * with its name printed below. The resulting file, palettes.svg, is saved in the assets directory.
 * This is a standalone utility script and is not part of the main application flow.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { palettes as p } from 'tricklens-js';

const palettes = Object.entries(p);

const escapeXml = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const toHex = (value) => {
    const clamped = Math.max(0, Math.min(255, Math.round(value)));
    return clamped.toString(16).padStart(2, '0');
};

export const generatePaletteGridSvg = (paletteEntries, options = {}) => {
    const resolvedPalettes = Array.isArray(paletteEntries) ? paletteEntries : Object.entries(paletteEntries);
    const { palettesPerRow = 4, swatchSize = 32, swatchGap = 4, paletteGap = 30, backgroundColor = '#000', textColor = '#fff' } = options;

    const numRows = Math.ceil(resolvedPalettes.length / palettesPerRow);
    const width = palettesPerRow * (swatchSize * 4 + swatchGap * 3 + paletteGap);
    const height = numRows * (swatchSize + paletteGap);

    const svgBody = resolvedPalettes
        .map(([name, palette], i) => {
            const row = Math.floor(i / palettesPerRow);
            const col = i % palettesPerRow;
            const x0 = col * (swatchSize * 4 + swatchGap * 3 + paletteGap);
            const y0 = row * (swatchSize + paletteGap);
            const colorEntries = Array.isArray(palette?.colors) ? palette.colors : [];

            const swatches = colorEntries
                .map((color, j) => {
                    const hexColor = `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
                    const x = x0 + j * (swatchSize + swatchGap);
                    return `<rect x="${x}" y="${y0}" width="${swatchSize}" height="${swatchSize}" fill="${hexColor}" />`;
                })
                .join('');

            const label = `<text x="${x0}" y="${y0 + swatchSize + 14}" fill="${textColor}" font-family="sans-serif" font-size="14">${escapeXml(name)}</text>`;

            return `${swatches}${label}`;
        })
        .join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${backgroundColor}" />
  ${svgBody}
</svg>`;
};

export const writePaletteGridSvg = (outputFilePath = path.resolve(process.cwd(), 'src/assets/palettes.svg')) => {
    const folderPath = path.dirname(outputFilePath);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const svg = generatePaletteGridSvg(palettes);
    fs.writeFileSync(outputFilePath, svg, 'utf8');
    return outputFilePath;
};

const run = () => {
    const outputFilePath = path.resolve(process.cwd(), 'src/assets/palettes.svg');
    const writtenFilePath = writePaletteGridSvg(outputFilePath);
    console.log(writtenFilePath);
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    run();
}
