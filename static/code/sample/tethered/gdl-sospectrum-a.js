// In this sample:
// Get 7 channel data from Spectrum and show it on the console

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
async function main() {
    while (true) {
        await sleep(1); // Sleep 1 millisecond at the top

        const data = new Uint8Array(7); // Equivalent to byte[7] in C#

        await duelink.Engine.ExecuteCommand("UpdBnd()");
        await duelink.Stream.ReadBytes("b1", data);

        console.log("============================");
        for (let i = 0; i < 7; i++) {
            console.log(`data ${i}: ${data[i]}`);
        }
    }
}

// Start the main loop
main();