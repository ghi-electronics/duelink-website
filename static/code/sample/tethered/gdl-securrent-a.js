// In this sample:
// Display current (A)

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
async function ReadCurrent() {
    return await duelink.Engine.ExecuteCommand("Current()");
}

async function main() {
    while (true) {
        console.log(`Current: ${await ReadCurrent()} A`);
        await sleep(1000); // 1000 ms
    }
}

main();