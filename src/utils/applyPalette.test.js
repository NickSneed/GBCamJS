import { describe, it, expect, vi } from 'vitest';
import applyPalette from './applyPalette.js';

// Mock the palettes from the external asset file.
vi.mock('../assets/palettes.js', () => ({
    default: {
        'test-palette': [
            { r: 0, g: 0, b: 0 }, // index 0 -> black
            { r: 85, g: 85, b: 85 }, // index 1 -> dark grey
            { r: 170, g: 170, b: 170 }, // index 2 -> light grey
            { r: 255, g: 255, b: 255 } // index 3 -> white
        ],
        'another-palette': [
            { r: 255, g: 0, b: 0 }, // index 0 -> red
            { r: 0, g: 255, b: 0 }, // index 1 -> green
            { r: 0, g: 0, b: 255 }, // index 2 -> blue
            { r: 255, g: 255, b: 0 } // index 3 -> yellow
        ]
    }
}));

describe('applyPalette', () => {
    it('should correctly map photoData indices to RGBA pixel values for a given palette', () => {
        const photoData = [0, 1, 2, 3, 3, 2, 1, 0];
        const paletteId = 'test-palette';

        const result = applyPalette(photoData, paletteId);

        const expectedPixels = new Uint8ClampedArray([
            // 0 -> black
            0, 0, 0, 255,
            // 1 -> dark grey
            85, 85, 85, 255,
            // 2 -> light grey
            170, 170, 170, 255,
            // 3 -> white
            255, 255, 255, 255,
            // 3 -> white
            255, 255, 255, 255,
            // 2 -> light grey
            170, 170, 170, 255,
            // 1 -> dark grey
            85, 85, 85, 255,
            // 0 -> black
            0, 0, 0, 255
        ]);

        expect(result).toEqual(expectedPixels);
    });

    it('should work with a different palette', () => {
        const photoData = [0, 1, 2, 3];
        const paletteId = 'another-palette';

        const result = applyPalette(photoData, paletteId);

        const expectedPixels = new Uint8ClampedArray([
            // 0 -> red
            255, 0, 0, 255,
            // 1 -> green
            0, 255, 0, 255,
            // 2 -> blue
            0, 0, 255, 255,
            // 3 -> yellow
            255, 255, 0, 255
        ]);

        expect(result).toEqual(expectedPixels);
    });

    it('should return an empty array for empty photoData', () => {
        const photoData = [];
        const paletteId = 'test-palette';

        const result = applyPalette(photoData, paletteId);

        expect(result).toEqual(new Uint8ClampedArray([]));
    });
});
