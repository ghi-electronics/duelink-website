// In this sample:
// The left and right ears stay on.
// When no button is pressed: the left and right eyes blink every second.

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

async function setEar(left, right) {
    const l = left ? 1 : 0;
    const r = right ? 1 : 0;
    const cmd = `Ear(${l},${r})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function setMouth(left, center, right) {
    const l = left ? 1 : 0;
    const c = center ? 1 : 0;
    const r = right ? 1 : 0;
    const cmd = `Mouth(${l},${c},${r})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function playBeep() {
    const cmd = "freq(3,1000,100,0.5)";
    await duelink.Engine.ExecuteCommand(cmd);
    return new Promise(resolve => setTimeout(resolve, 100)); // async delay
}

async function isButtonPressed() {
    const cmd = "dread(20,2)";
    const ret = await duelink.Engine.ExecuteCommand(cmd);
    return ret === 1;
}

await duelink.Engine.ExecuteCommand("statled(100, 100, 0)");


await setEar(true, true);
await playBeep();


while (true) {
    let delay = 500;
    const btnPress = await isButtonPressed();

    if (btnPress) {
        delay = 100;
        await playBeep();
    }

    await setMouth(btnPress, btnPress, btnPress);
    await setLeftEye(255, 255, 255);
    await setRightEye(255, 255, 255);
    await sleep(delay);
    await setLeftEye(0, 0, 0);
    await setRightEye(0, 0, 0);
    await sleep(delay);
}
