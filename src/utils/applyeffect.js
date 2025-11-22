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
 * @returns {number[]} A new array with the zoom effect applied.
 */
const zoom = (photoData) => {
    const width = 128;
    const height = 112;
    const zoomFactor = 2;

    const sourceWidth = width / zoomFactor; // 64
    const sourceHeight = height / zoomFactor; // 56

    const startX = (width - sourceWidth) / 2; // 32
    const startY = (height - sourceHeight) / 2; // 28

    const zoomedData = new Array(width * height);

    for (let y = 0; y < sourceHeight; y++) {
        for (let x = 0; x < sourceWidth; x++) {
            const sourcePixelIndex = (startY + y) * width + (startX + x);
            const pixelValue = photoData[sourcePixelIndex];

            const outX = x * zoomFactor;
            const outY = y * zoomFactor;

            zoomedData[outY * width + outX] = pixelValue;
            zoomedData[outY * width + (outX + 1)] = pixelValue;
            zoomedData[(outY + 1) * width + outX] = pixelValue;
            zoomedData[(outY + 1) * width + (outX + 1)] = pixelValue;
        }
    }

    return zoomedData;
};

/**
 * Applies a specified visual effect to the photo data.
 * @param {number[]} photoData The pixel data for a photo, as an array of palette indices.
 * @param {'invert' | 'mirror-rtl' | 'mirror-ltr' | 'mirror-btt' | 'mirror-ttb' | 'zoom'} effect The name of the effect to apply.
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
        return zoom(photoData);
    }
    return photoData;
};

export default applyEffect;
