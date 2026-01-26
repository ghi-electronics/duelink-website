// In this sample:
// Reading analog value from the pin AN

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
async function ReadAnalog() {
    return await duelink.Engine.ExecuteCommand("vread(5)");
}

(async function main() {
    while (true) {
        console.log(`Analog: ${await ReadAnalog()}`);
        await sleep(1000);
    }
})();