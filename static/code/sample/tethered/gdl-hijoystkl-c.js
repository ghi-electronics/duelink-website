// In this sample:
// Update X, Y and Button status every 100ms

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
var button_pin = await duelink.Engine.ExecuteCommand("BtnPin()");
button_pin = Number(button_pin);

async function ReadX() {
    var ret = await duelink.Engine.ExecuteCommand("JoystickX()");
    return Number(ret);
}

async function ReadY() {
    var ret = await duelink.Engine.ExecuteCommand("JoystickY()");
    return Number(ret);
}

async function ReadButton() {
    var ret = await duelink.Digital.Read(button_pin, 1);
    return ret === false ? 0 : 1;
}

while (true) {
    var x = await ReadX();
    var y = await ReadY();
    var bt = await ReadButton();

    console.log(`X = ${x}, Y = ${y}, Button status: ${bt}`);

    await sleep(100);
}