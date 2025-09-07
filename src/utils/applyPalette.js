const applyPalette = (photoData, palette) => {
    const imgData = new Uint8ClampedArray(photoData.length * 4);

    for (let i = 0; i < photoData.length; i++) {
        const val = photoData[i];
        const color = palette[val];
        const pixelIndex = i * 4;
        imgData[pixelIndex + 0] = color.r;
        imgData[pixelIndex + 1] = color.g;
        imgData[pixelIndex + 2] = color.b;
        imgData[pixelIndex + 3] = 255; // Alpha
    }

    return imgData;
};

export default applyPalette;
