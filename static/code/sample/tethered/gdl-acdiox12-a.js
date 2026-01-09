// In this sample:
// Continuously toggle P1 to P12, with a 100 ms delay for each pin

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
async function SetPin(pin, value) {
    const v = value ? 1 : 0;
    await duelink.Engine.ExecuteCommand(`dwrite(${pin+1},${v})`);
}

async function main() {
    let counter = 0;
    let value = false;

    while (true) {
        await sleep(10); // 10 ms sleep, same as Thread.Sleep(10)

        await SetPin(counter % 12, value);

        counter++;

        if (counter % 12 === 0) {
            value = !value;
        }
    }
}

// Start the loop
main();