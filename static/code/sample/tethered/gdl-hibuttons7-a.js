// In this sample:
// Detect if any button (Up, Down, Left, Right, Forward, Back) is pressed;
// the LED corresponding to the button will turn on.
// Detect if Enter is pressed and all leds turn to off

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
async function IsBtnPressed(button) {
    const code = parseInt(await duelink.Engine.ExecuteCommand(`BtnPin('${button}')`));
    return await duelink.Button.Down(code);
}

async function SetLed(button, value) {
    const v = value ? 1 : 0;
    await duelink.Engine.ExecuteCommand(`SetLed('${button}',${v})`);
}

while (true) {
    if (await IsBtnPressed('U')) {
        console.log("Button Up Pressed");
        await SetLed('U', true);
    }

    if (await IsBtnPressed('D')) {
        console.log("Button Down Pressed");
        await SetLed('D', true);
    }

    if (await IsBtnPressed('L')) {
        console.log("Button Left Pressed");
        await SetLed('L', true);
    }

    if (await IsBtnPressed('R')) {
        console.log("Button Right Pressed");
        await SetLed('R', true);
    }

    if (await IsBtnPressed('F')) {
        console.log("Button Forward Pressed");
        await SetLed('F', true);
    }

    if (await IsBtnPressed('B')) {
        console.log("Button Back Pressed");
        await SetLed('B', true);
    }

    if (await IsBtnPressed('E')) {
        console.log("Button Enter Pressed");
        await SetLed('U', false);
        await SetLed('D', false);
        await SetLed('L', false);
        await SetLed('R', false);
        await SetLed('F', false);
        await SetLed('B', false);
    }

    await sleep(100);
}