// In this sample:
// Control a DMX light.
// Set the color to red, green, or blue.
// Set the brightness from 0 to 255.
// Issue: The DMX light may stop working randomly.

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
let data = new Uint8Array(4);

async function Initialize() {
    await duelink.Uart.Configuration(250000, 512 + 1);
    await EnableTransmit(true);
}

async function EnableTransmit(value) {
    // 5 # RE pin: Low: Enable receive
    // 6 # DE pin: High: Enable transmit
    await duelink.Digital.Write(5, value);
    await duelink.Digital.Write(6, value);
}

async function SetColor(red, green, blue) {
    data[1] = red;
    data[2] = green;
    data[3] = blue;
}

async function SetBrightness(brightness) {
    data[0] = brightness;
}

async function Flush() {
    await duelink.DMX.Write(data);
    await sleep(100); // Sleep 100ms
}

await Initialize();

let color = 0;
let brightness = 0;

while (true) {
    let c = color % 4;

    if (c === 0) { // red
        await SetColor(255, 0, 0);
    } else if (c === 1) { // green
        await SetColor(0, 255, 0);
    } else if (c === 2) { // blue
        await SetColor(0, 0, 255);
    } else if (c === 3) { // white
        await SetColor(255, 255, 255);
    }

    await SetBrightness(brightness);
    await Flush();

    brightness += 25;
    if (brightness >= 255) {
        brightness = 0;
        color += 1;
    }

    await sleep(10); // Sleep 10ms
}