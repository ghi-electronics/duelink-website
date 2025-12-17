// In this sample:
// Read temperature and humidity every 1.5 second
// Issue: The reading temperature is about ~3 degrees Celsius higher than normal.

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
async function GetTemperature() {
    return await duelink.Engine.ExecuteCommand("ReadTemp()");
}

async function main() {
    while (true) {
        console.log(`Temperature: ${await GetTemperature()} `);        
        await sleep(1500); // 1500 ms
    }
}

main();