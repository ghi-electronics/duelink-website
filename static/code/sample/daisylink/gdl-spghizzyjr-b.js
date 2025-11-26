// In this sample:
// When the LDR button is not pressed: the left and right eyes blink every second.
// When the LDR button is pressed: the left and right eyes blink every 200 ms.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

import { setTimeout as sleep } from 'timers/promises';

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

async function setLeftEye(red, green, blue) {
    const cmd = `LEye(${red},${green},${blue})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function setRightEye(red, green, blue) {
    const cmd = `REye(${red},${green},${blue})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function isButtonPressed() {
    const cmd = "dread(20,2)";
    const ret = await duelink.Engine.ExecuteCommand(cmd);
    return ret === 1;
}

// Use ExecuteCommand to send standard library
await duelink.Engine.ExecuteCommand("statled(100, 100, 0)");

// Use defined function
while (true) {
    let delay = 500;
    const btnPress = await isButtonPressed();

    if (btnPress) {
        delay = 100;
    }
    
    await setLeftEye(255, 255, 255);
    await setRightEye(255, 255, 255);
    await sleep(delay);
    await setLeftEye(0, 0, 0);
    await setRightEye(0, 0, 0);
    await sleep(delay);
}
