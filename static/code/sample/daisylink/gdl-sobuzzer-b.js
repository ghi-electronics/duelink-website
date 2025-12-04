
// In this sample:
// Play Jingle song

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();


async function PlayJingle() {
    const cmd = "melodyP(7,a1)";
    await duelink.Engine.ExecuteCommand(cmd);
}

async function main() {

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
        const cmd = `a1[${i}]=${freq_dur[i]}`;
        await duelink.Engine.ExecuteCommand(cmd);
    }

    await PlayJingle();
}

main();



