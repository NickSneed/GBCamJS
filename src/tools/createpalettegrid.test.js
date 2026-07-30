import { describe, expect, it } from 'vitest';
import { generatePaletteGridSvg } from './createpalettegrid.js';

describe('generatePaletteGridSvg', () => {
    it('creates SVG markup with swatches and palette labels', () => {
        const palettes = [
            [
                'Test Palette',
                {
                    colors: [
                        { r: 1, g: 2, b: 3 },
                        { r: 4, g: 5, b: 6 }
                    ]
                }
            ]
        ];

        const svg = generatePaletteGridSvg(palettes, {
            palettesPerRow: 1,
            swatchSize: 12,
            swatchGap: 2,
            paletteGap: 10
        });

        expect(svg).toContain('<svg');
        expect(svg).toContain('rect');
        expect(svg).toContain('Test Palette');
        expect(svg).toContain('fill="#010203"');
    });
});
