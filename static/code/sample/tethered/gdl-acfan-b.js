// In this sample:
// Continuously turn the fan forward at 50% speed, then backward at 50% speed, with a 2-second delay between each direction change

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
async function SetSpeed(speed) {
    let v = speed;
    if (v > 100) v = 100;
    if (v < -100) v = -100;
    await duelink.Engine.ExecuteCommand(`Fan(${v})`);
}

(async () => {
    while (true) {
        await sleep(2000);  // 2000 milliseconds
        await SetSpeed(50);

        await sleep(2000);
        await SetSpeed(-50);
    }
})();