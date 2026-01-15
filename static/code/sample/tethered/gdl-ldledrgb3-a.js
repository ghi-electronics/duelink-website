// In this sample:
// Continuously change colors: white, red, green, and blue every second

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
async function Setled(led, color) {
    await duelink.Engine.ExecuteCommand(`SetLed(${led},${color})`);
}

(async function main() {
    let count = 0;

    while (true) {
        switch (count % 4) {
            case 0: // White
                await Setled(0, 0xFFFFFF);
                await Setled(1, 0xFFFFFF);
                await Setled(2, 0xFFFFFF);
                break;

            case 1: // Red
                await Setled(0, 0xFF0000);
                await Setled(1, 0xFF0000);
                await Setled(2, 0xFF0000);
                break;

            case 2: // Green
                await Setled(0, 0x00FF00);
                await Setled(1, 0x00FF00);
                await Setled(2, 0x00FF00);
                break;

            case 3: // Blue
                await Setled(0, 0x0000FF);
                await Setled(1, 0x0000FF);
                await Setled(2, 0x0000FF);
                break;
        }

        count++;
        await sleep(1000);
    }
})();
