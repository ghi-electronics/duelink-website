// In this sample:
// Display a heart on 5x5 matrix
// When light is detected below 15%, the heart will be cleared and a sweep sound will play
// Play a sweep sound when a press is detected on button A or B
// Play a sweep sound when any touch is detected on pin 0, 1, or 2

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

async function IsTouch(pin) {
    if (pin < 0 || pin > 2)
        return false;

    const cmd = `istouch(${pin})`;
    const ret = parseInt(await duelink.Engine.ExecuteCommand(cmd));

    return ret === 1;
}

async function IsAnyButtonPressed() {
    const btA = await duelink.Engine.ExecuteCommand("BtnA()");
    const btB = await duelink.Engine.ExecuteCommand("BtnB()");
    return btA === 1 || btB === 1;
}

async function SetPixel(x, y) {
    const cmd = `Pixel(1,${x},${y})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function ShowHeart() {
    await duelink.Engine.ExecuteCommand("clear(0)");
    await SetPixel(1, 0); await SetPixel(3, 0);
    await SetPixel(0, 1); await SetPixel(1, 1); await SetPixel(2, 1); await SetPixel(3, 1); await SetPixel(4, 1);
    await SetPixel(0, 2); await SetPixel(1, 2); await SetPixel(2, 2); await SetPixel(3, 2); await SetPixel(4, 2);
    await SetPixel(1, 3); await SetPixel(2, 3); await SetPixel(3, 3);
    await SetPixel(2, 4);
    await duelink.Engine.ExecuteCommand("show()");
}

async function SweepSound(freq_start, freq_end, vol_start, vol_end, duration_ms) {
    const cmd = `sweep(4,${freq_start},${freq_end},${vol_start},${vol_end},${duration_ms})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function GetLight() {
    return parseInt(await duelink.Engine.ExecuteCommand("Light()"));
}

let light_detect_backup = false;
let light_detect = false;

while (true) {
    light_detect = await GetLight() > 15;

    if (light_detect_backup !== light_detect) {
        light_detect_backup = light_detect;

        if (light_detect) {
            await SweepSound(1000, 2000, 255, 50, 250);
            await ShowHeart();
        } else {
            await duelink.Engine.ExecuteCommand("clear(0)");
            await duelink.Engine.ExecuteCommand("show()");
            await SweepSound(2000, 1000, 255, 50, 250);
        }
    } else {
        if (await IsTouch(0) || await IsTouch(1) || await IsTouch(2) || await IsAnyButtonPressed()) {
            await SweepSound(2000, 3000, 50, 255, 250);
        }
    }

    await new Promise(resolve => setTimeout(resolve, 250)); // Sleep 250 ms
}
