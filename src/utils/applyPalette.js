import palettes from '../assets/palettes.js';

const applyPalette = (photoData, paletteId) => {
    const pixels = new Uint8ClampedArray(photoData.length * 4);
    const palette = palettes[paletteId];

    for (let i = 0; i < photoData.length; i++) {
        const val = photoData[i];
        const color = palette[val];
        const pixelIndex = i * 4;
        pixels[pixelIndex + 0] = color.r;
        pixels[pixelIndex + 1] = color.g;
        pixels[pixelIndex + 2] = color.b;
        pixels[pixelIndex + 3] = 255; // Alpha
    }

    console.log(pixels);

    return pixels;
};

export default applyPalette;
