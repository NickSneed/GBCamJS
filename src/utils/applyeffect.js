/**
 * Inverts the colors of the photo.
 * It maps each pixel's palette index to a new one (0->3, 1->2, 2->1, 3->0).
 * @param {number[]} photoData The pixel data for a photo, as an array of palette indices.
 * @returns {number[]} A new array with the inverted colors.
 */
const invert = (photoData) => {
    return photoData.map((pixel) => 3 - pixel);
};

/**
 * Mirrors one half of the photo onto the other half.
 * @param {number[]} photoData The pixel data for a photo, as an array of palette indices.
 * @param {'rtl' | 'ltr' | 'btt' | 'ttb'} direction The direction of mirroring. 'rtl' (right-to-left), 'ltr' (left-to-right), 'btt' (bottom-to-top), 'ttb' (top-to-bottom).
 * @returns {number[]} A new array with the mirrored effect.
 */
const mirror = (photoData, direction) => {
    const width = 128;
    const height = 112;
    // Create a new array to avoid modifying the original photoData.
    const mirroredData = [...photoData];

    if (direction === 'rtl' || direction === 'ltr') {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width / 2; x++) {
                const leftPixelIndex = y * width + x;
                const rightPixelIndex = y * width + (width - 1 - x);
                if (direction === 'rtl') {
                    mirroredData[leftPixelIndex] = photoData[rightPixelIndex];
                } else {
                    // 'ltr'
                    mirroredData[rightPixelIndex] = photoData[leftPixelIndex];
                }
            }
        }
    } else {
        // Vertical mirroring
        for (let y = 0; y < height / 2; y++) {
            for (let x = 0; x < width; x++) {
                const topPixelIndex = y * width + x;
                const bottomPixelIndex = (height - 1 - y) * width + x;
                if (direction === 'btt') {
                    mirroredData[topPixelIndex] = photoData[bottomPixelIndex];
                } else {
                    // 'ttb'
                    mirroredData[bottomPixelIndex] = photoData[topPixelIndex];
                }
            }
        }
    }

    return mirroredData;
};

/**
 * Zooms into the center of the photo by 2x.
 * This crops the image to the central 64x56 area and scales it up to 128x112.
 * @param {number[]} photoData The pixel data for a photo, as an array of palette indices.
 * @param {'center' | 'v' | 'h'} direction The direction of the zoom/stretch. 'center' for 2x zoom, 'v' for vertical, 'h' for horizontal.
 * @returns {number[]} A new array with the zoom effect applied.
 */
const zoom = (photoData, direction) => {
    const width = 128;
    const height = 112;
    const zoomedData = new Array(width * height);

    if (direction === 'center') {
        const sourceWidth = width / 2; // 64
        const sourceHeight = height / 2; // 56
        const startX = (width - sourceWidth) / 2; // 32
        const startY = (height - sourceHeight) / 2; // 28

        for (let y = 0; y < sourceHeight; y++) {
            for (let x = 0; x < sourceWidth; x++) {
                const sourcePixelIndex = (startY + y) * width + (startX + x);
                const pixelValue = photoData[sourcePixelIndex];
                const outX = x * 2;
                const outY = y * 2;
                zoomedData[outY * width + outX] = pixelValue;
                zoomedData[outY * width + (outX + 1)] = pixelValue;
                zoomedData[(outY + 1) * width + outX] = pixelValue;
                zoomedData[(outY + 1) * width + (outX + 1)] = pixelValue;
            }
        }
    } else if (direction === 'v') {
        const sourceHeight = height / 2; // 56
        const startY = (height - sourceHeight) / 2; // 28
        for (let y = 0; y < sourceHeight; y++) {
            for (let x = 0; x < width; x++) {
                const sourcePixelIndex = (startY + y) * width + x;
                const pixelValue = photoData[sourcePixelIndex];
                const outY = y * 2;
                zoomedData[outY * width + x] = pixelValue;
                zoomedData[(outY + 1) * width + x] = pixelValue;
            }
        }
    } else if (direction === 'h') {
        const sourceWidth = width / 2; // 64
        const startX = (width - sourceWidth) / 2; // 32
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < sourceWidth; x++) {
                const sourcePixelIndex = y * width + (startX + x);
                const pixelValue = photoData[sourcePixelIndex];
                const outX = x * 2;
                zoomedData[y * width + outX] = pixelValue;
                zoomedData[y * width + outX + 1] = pixelValue;
            }
        }
    }

    return zoomedData;
};

/**
 * Scales the image down to 1/4 size and tiles it in a 2x2 grid.
 * @param {number[]} photoData The pixel data for a photo, as an array of palette indices.
 * @returns {number[]} A new array with the tile effect applied.
 */
const tile = (photoData) => {
    const width = 128;
    const height = 112;
    const scaledWidth = width / 2;
    const scaledHeight = height / 2;

    // First, create the scaled-down 64x56 image using nearest-neighbor sampling.
    const scaledData = new Array(scaledWidth * scaledHeight);
    for (let y = 0; y < scaledHeight; y++) {
        for (let x = 0; x < scaledWidth; x++) {
            const sourceIndex = y * 2 * width + x * 2;
            scaledData[y * scaledWidth + x] = photoData[sourceIndex];
        }
    }

    // Second, create the final 128x112 image by tiling the scaled-down image.
    const tiledData = new Array(width * height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const sourceX = x % scaledWidth;
            const sourceY = y % scaledHeight;
            tiledData[y * width + x] = scaledData[sourceY * scaledWidth + sourceX];
        }
    }

    return tiledData;
};

/**
 * Applies a specified visual effect to the photo data.
 * @param {number[]} photoData The pixel data for a photo, as an array of palette indices.
 * @param {'invert' | 'mirror-rtl' | 'mirror-ltr' | 'mirror-btt' | 'mirror-ttb' | 'zoom' | 'zoom-v' | 'zoom-h' | 'tile'} effect The name of the effect to apply.
 * @returns {number[]} A new array with the effect applied. Returns the original data if the effect is not recognized.
 */
const applyEffect = (photoData, effect) => {
    if (effect === 'invert') {
        return invert(photoData);
    } else if (effect === 'mirror-rtl') {
        return mirror(photoData, 'rtl');
    } else if (effect === 'mirror-ltr') {
        return mirror(photoData, 'ltr');
    } else if (effect === 'mirror-btt') {
        return mirror(photoData, 'btt');
    } else if (effect === 'mirror-ttb') {
        return mirror(photoData, 'ttb');
    } else if (effect === 'zoom') {
        return zoom(photoData, 'center');
    } else if (effect === 'zoom-v') {
        return zoom(photoData, 'v');
    } else if (effect === 'zoom-h') {
        return zoom(photoData, 'h');
    } else if (effect === 'tile') {
        return tile(photoData);
    }
    return photoData;
};

export default applyEffect;
