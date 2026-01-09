// In this sample:
// Continuously set the stepper motor 1 to 200 steps, alternating the direction between forward and backward

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
async function Set(stepdrive_index, direction, step_num) {
    if (direction !== 1)
        direction = 0;

    switch (stepdrive_index) {
        case 1:
            await duelink.Engine.ExecuteCommand(`step_m1(${direction},${step_num})`);
            break;

        case 2: // available on StepDrive P3 only
            await duelink.Engine.ExecuteCommand(`step_m2(${direction},${step_num})`);
            break;

        case 3: // available on StepDrive P3 only
            await duelink.Engine.ExecuteCommand(`step_m3(${direction},${step_num})`);
            break;
    }
}

async function main() {
    while (true) {
        await Set(1, 1, 200);    // forward
        await sleep(1000);
        await Set(1, -1, 200);  // backward
        await sleep(1000);
    }
}

await main();