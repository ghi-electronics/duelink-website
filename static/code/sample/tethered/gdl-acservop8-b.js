// In this sample:
// Continuously set servo 1 from 0 to 180 degree

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
async function Set(servo, degree) {
    await duelink.Engine.ExecuteCommand(`ServoSt(${servo},${degree})`);
}

async function main() {
    while (true) {
        await Set(1, 0);
        await sleep(1000);
        await Set(1, 45);
        await sleep(1000);
        await Set(1, 90);
        await sleep(1000);
        await Set(1, 135);
        await sleep(1000);
        await Set(1, 180);
        await sleep(1000);

        await sleep(1000);
    }
}

main();