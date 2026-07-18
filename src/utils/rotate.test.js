import { describe, it, expect } from 'vitest';
import rotate from './rotate.js';

describe('rotate', () => {
    it('should rotate a 2x2 image 180 degrees', () => {
        const data = new Uint8ClampedArray([0, 0, 0, 255, 255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255]);
        const width = 2;
        const height = 2;
        const rotated = rotate(data, width, height);

        const expected = new Uint8ClampedArray([0, 0, 255, 255, 0, 255, 0, 255, 255, 0, 0, 255, 0, 0, 0, 255]);

        expect(rotated).toEqual(expected);
    });
});
