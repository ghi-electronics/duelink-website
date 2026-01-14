// In this sample:
// Update Slide value every second

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
async function Slide() {
    return await duelink.Engine.ExecuteCommand("Slide()");
}

// Main loop
async function mainLoop() {
    while (true) {
        console.log(`Value: ${await Slide()}`);
        await sleep(1000); // Sleep for 1 second
    }
}

// Start the loop
(async () => {
    await mainLoop();
})();