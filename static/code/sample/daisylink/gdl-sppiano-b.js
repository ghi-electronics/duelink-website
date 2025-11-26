// In this sample:
// Simulate tones from note C4 to C5
// Press the left or right arrow to play a sweep sound
// All LEDs 1, 2, 3, 4, 5 turn ON

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

async function CreateArray(array, data) {
    let cmd = `dim ${array}`;
    await duelink.Engine.ExecuteCommand(cmd);

    for (let i = 0; i < data.length; i++) {
        cmd = `${array}[${i}]=data[${i}]`;
        await duelink.Engine.ExecuteCommand(cmd);
        await new Promise(resolve => setTimeout(resolve, 1)); // Sleep 1 ms
    }
}

async function IsTouch(pin) {
    const cmd = `PulseIn(${pin}, 500, 1,100)`;
    const ret = await duelink.Engine.ExecuteCommand(cmd);

    return ret > 150 && ret < 65000;
}

async function PlayTone(tone) {
    const cmd = `freq(3, ${tone}, 500, 0.5)`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function SweepSound() {
    const cmd = `sweep(3, 2000,4000,50,255,100)`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function SetAllLed(on) {
    const value = on ? 1 : 0;
    for (let i = 0; i < 5; i++) {
        const cmd = `SetLED(${i + 1},${value})`;
        await duelink.Engine.ExecuteCommand(cmd);
    }
}

const b1 = [23, 19, 12, 13, 14, 15, 16, 18, 24, 10, 9, 8, 17];
const a1 = [261, 277, 293, 311, 329, 349, 369, 392, 415, 440, 466, 493, 523];

let b3 = Array(b1.length).fill(false);
let b4 = Array(b1.length).fill(false);

await CreateArray("b1", b1);
await CreateArray("a1", a1);

await SetAllLed(true);

while (true) {
    for (let i = 0; i < b1.length; i++) {
        b3[i] = await IsTouch(b1[i]);

        if (b4[i] !== b3[i]) {
            b4[i] = b3[i];

            if (b4[i]) {
                await PlayTone(a1[i]);
            }
        }
    }

    if (await IsTouch(7) || await IsTouch(11)) {
        await SweepSound();
    }

    await new Promise(resolve => setTimeout(resolve, 1)); // Sleep 1 ms
}

