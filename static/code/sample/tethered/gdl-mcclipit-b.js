// In this sample:
// When the light level is above 10%, all LEDs (5x5) turn on.
// When the light level is below 10%, all LEDs (5x5) turn off.
// Touch any touch pad (A, B, Up, Down, Left, Right): a short beep plays.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

async function IsTouchA() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("TouchA()"));
    return ret === 1;
}

async function IsTouchB() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("TouchB()"));
    return ret === 1;
}

async function IsTouchUp() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("TouchUp()"));
    return ret === 1;
}

async function IsTouchDown() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("TouchDown()"));
    return ret === 1;
}

async function IsTouchLeft() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("TouchLeft()"));
    return ret === 1;
}

async function IsTouchRight() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("TouchRight()"));
    return ret === 1;
}

async function GetLight() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("Light()"));
    return ret;
}

async function PlayBuzzer(freq, duration) {
    const cmd = `freq(7,${freq},${duration},0.5)`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function TurnLedAll(on) {
    let cmd = "Clear(0)";
    if (on) {
        cmd = "Clear(1)";
    }
    await duelink.Engine.ExecuteCommand(cmd);
    await duelink.Engine.ExecuteCommand("show()");
}

while (true) {
    // Turn all lights on if light is 10% or higher
    await TurnLedAll(await GetLight() > 10);

    // Detect touch on A, B, Up, Down, Left, Right pads
    const touch = await IsTouchA() || await IsTouchB() || await IsTouchUp() || await IsTouchDown() || await IsTouchLeft() || await IsTouchRight();

    if (touch) {
        await PlayBuzzer(1000, 100);
    }

    await new Promise(resolve => setTimeout(resolve, 100)); // Sleep 100ms
}


