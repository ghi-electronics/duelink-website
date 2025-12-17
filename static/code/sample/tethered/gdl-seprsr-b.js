// In this sample:
// Display pressure in kPa and PSI units

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
async function ReadPSI() {
    return await duelink.Engine.ExecuteCommand("PSI()");
}

async function ReadkPa() {
    return await duelink.Engine.ExecuteCommand("kPa()");
}

(async function main() {
    while (true) {
        console.log(`PSI: ${await ReadPSI()}`);
        console.log(`kPa: ${await ReadkPa()}`);
        
        await sleep(1000); // Sleep for 1 second
    }
})();