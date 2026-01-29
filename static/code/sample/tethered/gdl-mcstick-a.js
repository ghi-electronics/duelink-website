// In this sample:
// Toggle the status LED every 500 ms

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
async function SetLed() {
    await duelink.Engine.ExecuteCommand("statled(500,500,0)");
}

(async () => {
    await SetLed();
})();