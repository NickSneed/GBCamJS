import { describe, it, expect } from 'vitest';
import rotate from './rotate.js';

describe('rotate', () => {
    it('should rotate a 2x2 image 90 degrees clockwise', () => {
        const data = new Uint8ClampedArray([0, 0, 0, 255, 255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255]);
        const width = 2;
        const height = 2;
        const rotated = rotate(data, width, height, 90);

        const expected = new Uint8ClampedArray([0, 255, 0, 255, 0, 0, 0, 255, 0, 0, 255, 255, 255, 0, 0, 255]);

        expect(rotated).toEqual(expected);
    });

    it('should rotate a 2x2 image 180 degrees', () => {
        const data = new Uint8ClampedArray([0, 0, 0, 255, 255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255]);
        const width = 2;
        const height = 2;
        const rotated = rotate(data, width, height, 180);

        const expected = new Uint8ClampedArray([0, 0, 255, 255, 0, 255, 0, 255, 255, 0, 0, 255, 0, 0, 0, 255]);

        expect(rotated).toEqual(expected);
    });

    it('should throw an error for invalid degrees', () => {
        const data = new Uint8ClampedArray([0, 0, 0, 255]);
        expect(() => rotate(data, 1, 1, 45)).toThrow('Degrees must be 0, 90, 180, or 270');
    });
});
