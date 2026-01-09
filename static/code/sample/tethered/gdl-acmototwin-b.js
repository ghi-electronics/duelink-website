// In this sample:
// Continuously turn the motor A,B forward at 50% speed, then backward at 50% speed, with a 2-second delay between each direction change

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
async function SetMotorA(speed) {
    await duelink.Engine.ExecuteCommand(`SMotorA(${speed})`);
}

async function SetMotorB(speed) {
    await duelink.Engine.ExecuteCommand(`SMotorB(${speed})`);
}

async function main() {
    while (true) {
        await SetMotorA(50); // forward
        await SetMotorB(50); // forward
        await sleep(2000);   // 2-second delay
        await SetMotorA(-50); // backward
        await SetMotorB(-50); // backward
        await sleep(2000);    // 2-second delay
    }
}

// Start the loop
main();
