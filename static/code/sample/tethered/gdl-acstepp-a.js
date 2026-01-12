// In this sample:
// Tested on Bi-Polar Stepper Motor Driver-2M542
// Continuously move axes X, Y, and Z forward and backward for 400 steps, with a 10 ms delay per step.

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
async function StepX(direction, stepnum) {
    await duelink.Engine.ExecuteCommand(`StepX(${direction},${stepnum})`);

    // Blocking mode
    await sleep(stepnum);
}

async function StepY(direction, stepnum) {
    await duelink.Engine.ExecuteCommand(`StepY(${direction},${stepnum})`);

    // Blocking mode
    await sleep(stepnum);
}

async function StepZ(direction, stepnum) {
    await duelink.Engine.ExecuteCommand(`StepZ(${direction},${stepnum})`);

    // Blocking mode
    await sleep(stepnum);
}

(async function main() {
    while (true) {
        await StepX(1, 400); // forward
        await StepY(1, 400); // forward
        await StepZ(1, 400); // forward
        await sleep(1000);

        await StepX(0, 400); // backward
        await StepY(0, 400); // backward
        await StepZ(0, 400); // backward
        await sleep(1000);
    }
})();
