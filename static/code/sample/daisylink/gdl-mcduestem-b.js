// In this sample:
// Display Accel X, Y, and Z on the screen.
// Press the Up button: the light bulb turns red and a short beep plays.
// Press the Down button: the light bulb turns green and a short beep plays.
// Press the Left button: the light bulb turns blue and a short beep plays.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

async function GetAccelX() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("GetX()"));
    return ret;
}

async function GetAccelY() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("GetY()"));
    return ret;
}

async function GetAccelZ() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("GetZ()"));
    return ret;
}

async function GetLight() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("Light()"));
    return ret;
}

async function GetTemperature() {
    const ret = parseInt(await duelink.Engine.ExecuteCommand("ReadTemp()"));
    return ret;
}

async function SetBulb(color) {
    const cmd = `SetBulb(${color})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function SetServo(servo, degree) {
    if (servo !== 5 && servo !== 6) return;
    const cmd = `ServoSt(${servo},${degree})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function ClearScreen() {
    await duelink.Engine.ExecuteCommand("Clear(0)");
}

async function DrawText(s, x, y) {
    const cmd = `TextS("${s}",1,${x},${y},1,2)`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function ShowScreen() {
    await duelink.Engine.ExecuteCommand("Show()");
}

async function ButtonPressed(button) {
    const cmd = `BtnDown(BtnPin('${button}'))`;
    const ret = await duelink.Engine.ExecuteCommand(cmd);
    return ret !== 0;
}

async function PlayTunes(freq, duration) {
    const cmd = `freq(3,${freq},${duration},0.5)`;
    await duelink.Engine.ExecuteCommand(cmd);
}

// Backup values
let x_bk = 0, y_bk = 0, z_bk = 0, light_bk = 0, temp_bk = 0;


while (true) {
    const x = await GetAccelX();
    const y = await GetAccelY();
    const z = await GetAccelZ();
    const light = await GetLight();
    const temp = await GetTemperature();

    // Update screen only if values changed
    if (x_bk !== x || y_bk !== y || z_bk !== z || light_bk !== light || temp_bk !== temp) {
        x_bk = x;
        y_bk = y;
        z_bk = z;
        light_bk = light;
        temp_bk = temp;

        await ClearScreen();
        await DrawText(`X:${x}, Y:${y}, Z:${z}`, 0, 0);
        await DrawText(`Light:${light}%`, 0, 20);
        await DrawText(`Temperature:${temp} C`, 0, 40);
        await ShowScreen();
    }

    // Button actions
    if (await ButtonPressed('U')) {
        await SetBulb(0xFF0000);
        await PlayTunes(1000, 100);
    }
    if (await ButtonPressed('D')) {
        await SetBulb(0x00FF00);
        await PlayTunes(1000, 100);
    }
    if (await ButtonPressed('L')) {
        await SetBulb(0x0000FF);
        await PlayTunes(1000, 100);
    }
    if (await ButtonPressed('R')) {
        await SetBulb(0xFFFFFF);
        await PlayTunes(1000, 100);
    }

    await new Promise(resolve => setTimeout(resolve, 1)); // Sleep 1 ms
}