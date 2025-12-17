// In this sample:
// Detect motion

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
async function Detect() {
    return await duelink.Engine.ExecuteCommand("Detect()");
}

(async () => {
    while (true) {
        const detect = await Detect();

        if (detect !== 0) {
            console.log("Motion Detected");
        }

        await sleep(1000); // sleep 1 second
    }
})();