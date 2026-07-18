/**
 * Rotates image data 180 degrees clockwise.
 *
 * @param {Uint8ClampedArray|Array} data - The image data (RGBA).
 * @returns {Uint8ClampedArray} - The rotated image data.
 */
export default function rotate(data) {
    const newData = new Uint8ClampedArray(data.length);
    const pixelCount = data.length / 4;

    for (let i = 0; i < pixelCount; i++) {
        const oldIndex = i * 4;
        const newIndex = (pixelCount - 1 - i) * 4;

        newData[newIndex] = data[oldIndex];
        newData[newIndex + 1] = data[oldIndex + 1];
        newData[newIndex + 2] = data[oldIndex + 2];
        newData[newIndex + 3] = data[oldIndex + 3];
    }

    return newData;
}
