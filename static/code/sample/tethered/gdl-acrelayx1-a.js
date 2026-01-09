// In this sample:
// Continuously switch relay on/off every 2 seconds

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
async function Set(value) {
    const v = value ? 1 : 0;
    await duelink.Engine.ExecuteCommand(`Set(${v})`);
}

async function main() {
    while (true) {
        await sleep(2000);
        await Set(true);

        await sleep(2000);
        await Set(false);
    }
}

main();