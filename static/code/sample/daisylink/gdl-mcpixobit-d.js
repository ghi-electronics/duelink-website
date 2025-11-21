// In this sample:
// Draws circles on the screen
// Plays a sweep sound when a touch is detected on pin 0, 1, or 2
// Plays a sweep sound when a pressed is detected on button A,B
// Show light value on the top of the screen

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

const buzzerPin = 4;
let x = 50;
let d = 10;
const width = parseInt(await duelink.Engine.ExecuteCommand("getw()"));
const height = parseInt(await duelink.Engine.ExecuteCommand("geth()"));

while (true) {
    await duelink.Graphics.Circle(1, x, Math.floor(height / 2), 10);
    await duelink.Graphics.Show();
    x = x + d;

    if (x > width || x < 0) {
        d = d * -1;
        await duelink.Graphics.Clear(0);
        const light = await duelink.Engine.ExecuteCommand("Light()");
        await duelink.Graphics.TextS(`Light: ${light}%`, 1, 0, 0, 1, 1);
    }

    for (let i = 0; i < 3; i++) {
        if (await IsTouch(i)) {
            await duelink.Sound.Sweep(buzzerPin, 2000, 4000, 50, 255, 100);
            break;
        }
    }

    if (await duelink.Engine.ExecuteCommand("BtnA()") != 0 || await duelink.Engine.ExecuteCommand("BtnB()") != 0) {
        await duelink.Sound.Sweep(buzzerPin, 1000, 2000, 50, 255, 100);
    }

    await new Promise(resolve => setTimeout(resolve, 1)); 
}
