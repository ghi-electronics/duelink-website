// In this sample:
// When a button is pressed, set light to white color 100% brightness on that button.

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
async function SetColor(button, red, green, blue, brightness) {
    let c = red ? 1 : 0;

    c = green ? (c | (1 << 1)) : c;
    c = blue ? (c | (1 << 2)) : c;

    brightness = brightness > 100 ? 100 : brightness;
    brightness = brightness < 0 ? 0 : brightness;

    let index = 0;

    switch (button) {
        case 'A':
            index = 0;
            break;
        case 'B':
            index = 1;
            break;
        case 'C':
            index = 2;
            break;
        case 'D':
            index = 3;
            break;
    }

    await duelink.Engine.ExecuteCommand(`SetClr(${index},${c},${brightness})`);
}

async function IsButtonPressed(button) {
    const pressed =
        (await duelink.Engine.ExecuteCommand(
            `Dread(BtnPin('${button}'),1)`
        )) == 0;

    return pressed;
}

let buttonA_state1 = false;
let buttonA_state2 = true;

let buttonB_state1 = false;
let buttonB_state2 = true;

let buttonC_state1 = false;
let buttonC_state2 = true;

let buttonD_state1 = false;
let buttonD_state2 = true;

while (true) {
    buttonA_state1 = await IsButtonPressed('A');
    buttonB_state1 = await IsButtonPressed('B');
    buttonC_state1 = await IsButtonPressed('C');
    buttonD_state1 = await IsButtonPressed('D');

    if (buttonA_state1 != buttonA_state2) {
        buttonA_state2 = buttonA_state1;

        if (buttonA_state2) {
            await SetColor('A', true, true, true, 100);
        } else {
            await SetColor('A', false, false, false, 0);
        }
    }

    if (buttonB_state1 != buttonB_state2) {
        buttonB_state2 = buttonB_state1;

        if (buttonB_state2) {
            await SetColor('B', true, true, true, 100);
        } else {
            await SetColor('B', false, false, false, 0);
        }
    }

    if (buttonC_state1 != buttonC_state2) {
        buttonC_state2 = buttonC_state1;

        if (buttonC_state2) {
            await SetColor('C', true, true, true, 100);
        } else {
            await SetColor('C', false, false, false, 0);
        }
    }

    if (buttonD_state1 != buttonD_state2) {
        buttonD_state2 = buttonD_state1;

        if (buttonD_state2) {
            await SetColor('D', true, true, true, 100);
        } else {
            await SetColor('D', false, false, false, 0);
        }
    }

    // Thread.Sleep(50) → sleep(50 ms)
    await sleep(50);
}