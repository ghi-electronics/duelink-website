// In this sample:
// When button isn't pressed: Led0: red; led1: green; led2: blue; Led control: on
// When button is pressed: All led off

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
const button_pin = Number(await duelink.Engine.ExecuteCommand("BtnPin()"));

async function SetLedRing(index, red, green, blue) {
    await duelink.Engine.ExecuteCommand(
        `SetRing(${index},${red},${green},${blue})`
    );
}

async function SetLedControl(value) {
    const v = value ? 1 : 0;
    await duelink.Engine.ExecuteCommand(`SetCtr(${v})`);
}

async function IsButtonPressed() {
    return !(await duelink.Digital.Read(
        button_pin,
        1
    ));
}

let button_state1 = false;
let button_state2 = true;

while (true) {
    button_state1 = await IsButtonPressed();

    if (button_state1 !== button_state2) {
        button_state2 = button_state1;

        if (button_state2) {
            await SetLedControl(false);
            await SetLedRing(0, 0, 0, 0);
            await SetLedRing(1, 0, 0, 0);
            await SetLedRing(2, 0, 0, 0);
        } else {
            await SetLedRing(0, 255, 0, 0);
            await SetLedRing(1, 0, 255, 0);
            await SetLedRing(2, 0, 0, 255);
            await SetLedControl(true);
        }
    }

    await sleep(100); // equivalent to Thread.Sleep(100)
}