// In this sample:
// Using the DUELink graphics library
// Configuration for two vertically scanned 32x8 panels creating a 64x8 LED display
// Scrolling DUELink text on the panels with red, green, and blue colors
// Visit https://www.duelink.com/docs/engine/graphics
// for more DUELink graphics APIs: DrawLine, scaled text, Rect, Image, etc.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

// Sleep helper (ms)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Methods
const SCREEN_WIDTH = 64;   // Combined width of two panels (32 x 2)
const SCREEN_HEIGHT = 8;   // Height

async function Configuration() {
    const config_array = [
        14,             // Pin used
        SCREEN_WIDTH,
        SCREEN_HEIGHT,
        1               // Vertical scanning
    ];

    await duelink.Graphics.Configuration(
        3,              // Type 3 - WS2812
        config_array,
        SCREEN_WIDTH,
        SCREEN_HEIGHT,
        1               // Buffered x1
    );
}

async function Clear(color) {
    await duelink.Graphics.Clear(color);
}

async function DrawText(text, color, x, y) {
    await duelink.Graphics.Text(text, color, x, y);
}

async function Show() {
    await duelink.Graphics.Show();
}

let posX = SCREEN_WIDTH;   // Start from the right side
let count = 0;


(async function mainLoop() {
    await Configuration()
    while (true) {

        let color = 0xFF0000; // Red
        if (count % 3 === 1) {
            color = 0x00FF00; // Green
        } else if (count % 3 === 2) {
            color = 0x0000FF; // Blue
        }

        await Clear(0);
        await DrawText("DUELink", color, posX, 0);
        await Show();

        posX--;
        if (posX < -40) {
            posX = SCREEN_WIDTH;
            count++;
        }

        await sleep(10); // 10 ms delay
    }
})();