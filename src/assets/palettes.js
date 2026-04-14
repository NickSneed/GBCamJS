// Super Game Boy™ values were sources from:
// https://gamefaqs.gamespot.com/snes/588731-super-game-boy/faqs/58647

const palettes = {
    bw: {
        name: 'Super Game Boy 2H',
        colors: [
            { r: 255, g: 255, b: 255 },
            { r: 191, g: 184, b: 191 },
            { r: 112, g: 112, b: 112 },
            { r: 0, g: 0, b: 0 }
        ]
    },
    gb: {
        name: 'Game Boy DMG',
        colors: [
            { r: 165, g: 198, b: 48 },
            { r: 139, g: 172, b: 48 },
            { r: 48, g: 98, b: 48 },
            { r: 15, g: 56, b: 48 }
        ]
    },
    vb: {
        name: 'Virtual Boy',
        colors: [
            { r: 255, g: 0, b: 0 },
            { r: 170, g: 0, b: 0 },
            { r: 85, g: 0, b: 0 },
            { r: 0, g: 0, b: 0 }
        ]
    },
    sepia: {
        name: 'Sepia',
        colors: [
            { r: 245, g: 239, b: 188 },
            { r: 222, g: 195, b: 149 },
            { r: 178, g: 142, b: 110 },
            { r: 104, g: 60, b: 52 }
        ]
    },
    bw1: {
        name: 'Black and White 1',
        colors: [
            { r: 255, g: 255, b: 255 },
            { r: 0, g: 0, b: 0 },
            { r: 0, g: 0, b: 0 },
            { r: 0, g: 0, b: 0 }
        ]
    },
    bw2: {
        name: 'Black and White 2',
        colors: [
            { r: 255, g: 255, b: 255 },
            { r: 255, g: 255, b: 255 },
            { r: 0, g: 0, b: 0 },
            { r: 0, g: 0, b: 0 }
        ]
    },
    bw3: {
        name: 'Black and White 3',
        colors: [
            { r: 255, g: 255, b: 255 },
            { r: 255, g: 255, b: 255 },
            { r: 255, g: 255, b: 255 },
            { r: 0, g: 0, b: 0 }
        ]
    }
};

export default palettes;
