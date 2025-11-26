// In this sample:
// All 27 LEDs are repeatedly set to random colors.
// When the LDR button is pressed, the Jingle song is played.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

import { setTimeout as sleep } from 'timers/promises';

let duelink = new DUELinkController(new SerialUSB());

await duelink.Connect();

async function SetLed(index, color, brightness) {
    const b = Math.floor((brightness * 31) / 100);
    const cmd = `SetLed(${index},${color},${b})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function SetAll(color) {
    await duelink.Engine.ExecuteCommand(`SetAll(${color})`);
}

async function ShowLed() {
    await duelink.Engine.ExecuteCommand("ShowLed()");
}

async function RndLed() {
    await duelink.Engine.ExecuteCommand("RndLed()");
}

async function PlayLed(enable) {
    const e = enable ? 1 : 0;
    await duelink.Engine.ExecuteCommand(`PlayLed(${e})`);
}

async function Buzzer(frequency, durationMs) {
    const cmd = `freq(1,${frequency},${durationMs},0.5)`;
    await duelink.Engine.ExecuteCommand(cmd);
    await sleep(durationMs);
}

async function IsButtonPressed() {
    const cmd = "dread(20,2)";
    const ret = await duelink.Engine.ExecuteCommand(cmd);
    return ret === 1; // Assuming ExecuteCommand returns string
}

async function PlayJingle() {
    await duelink.Engine.ExecuteCommand("melodyP(1,a1)");
}

async function Wait(delay_ms) {
    //await new Promise(resolve => setTimeout(resolve, delay_ms));
    await sleep(delay_ms)
}

// Frequency-duration array
const freq_dur = [
    330,200, 330,200, 330,300, 0,100,
    330,200, 330,200, 330,300, 0,100,
    330,200, 392,200, 262,300, 294,100,
    330,400, 0,400, 349,200, 349,200,
    349,300, 0,0, 349,100, 349,200,
    330,200, 330,200, 0,0, 330,100,
    330,100, 392,200, 392,200, 349,200,
    294,200, 262,400, 0,400
];

// Send array to DUELink
await duelink.Engine.ExecuteCommand("dim a1[31*2]");
for (let i = 0; i < freq_dur.length; i++) {
    await duelink.Engine.ExecuteCommand(`a1[${i}]=${freq_dur[i]}`);
}


await SetAll(0);
let btnStatus = false;

while (true) {
    const btnPress = await IsButtonPressed();

    if (btnPress !== btnStatus) {
        btnStatus = btnPress;
        if (btnStatus) {
            await PlayJingle();
        }
    }

    await RndLed();
    await Wait(250);
}
