/**
 * Rotates image data by a specified number of degrees (clockwise).
 *
 * @param {Uint8ClampedArray|Array} data - The image data (RGBA).
 * @param {number} width - The width of the image.
 * @param {number} height - The height of the image.
 * @param {number} degrees - Degrees to rotate: 0, 90, 180, or 270.
 * @returns {Uint8ClampedArray} - The rotated image data.
 */
export default function rotate(data, width, height, degrees = 0) {
    if (![0, 90, 180, 270].includes(degrees)) {
        throw new Error('Degrees must be 0, 90, 180, or 270');
    }

    if (degrees === 0) return new Uint8ClampedArray(data);

    const rotations = degrees / 90;
    let currentData = data;
    let currentWidth = width;
    let currentHeight = height;

    for (let i = 0; i < rotations; i++) {
        const newWidth = currentHeight;
        const newHeight = currentWidth;
        const newData = new Uint8ClampedArray(currentData.length);

        for (let y = 0; y < currentHeight; y++) {
            for (let x = 0; x < currentWidth; x++) {
                const oldIndex = (y * currentWidth + x) * 4;
                const newX = currentHeight - 1 - y;
                const newY = x;
                const newIndex = (newY * newWidth + newX) * 4;

                newData[newIndex] = currentData[oldIndex];
                newData[newIndex + 1] = currentData[oldIndex + 1];
                newData[newIndex + 2] = currentData[oldIndex + 2];
                newData[newIndex + 3] = currentData[oldIndex + 3];
            }
        }
        currentData = newData;
        currentWidth = newWidth;
        currentHeight = newHeight;
    }

    return currentData;
}
