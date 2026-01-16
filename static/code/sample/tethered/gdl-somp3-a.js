// In this sample:
// Wrapper functions: Reset, Set volume, Play, Stop, Check playing status, and set loop mode.
// Reset the module
// Set volume to 30%
// Play the MP3 file named 001.mp3 inside the folder named 01
// Check if playback is active. If the file has been playing for more than 10 seconds, stop it.
// SD card structure:
// - Folder names must be in the format: 01, 02, 03, ..., 99
// - File names (songs) must be in the format: 001.mp3, 002.mp3, ..., 999.mp3

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
async function Reset() {
    await duelink.Engine.ExecuteCommand("Rst()");
    await sleep(1000);
}

async function SetVolume(vol) {
    if (vol >= 0 && vol <= 100) {
        await duelink.Engine.ExecuteCommand(`SetVol(${vol})`);
    }
}

async function PlayFile(folder, file) {
    await duelink.Engine.ExecuteCommand(`PlayFile(${folder},${file})`);
}

async function Loop(enable) {
    const v = enable ? 1 : 0;
    await duelink.Engine.ExecuteCommand(`Loop(${v})`);
}

async function Stop() {
    await duelink.Engine.ExecuteCommand("Stop()");
}

async function IsBusy() { // Playing state is also considered busy
    const ret = await duelink.Engine.ExecuteCommand("IsBusy()");
    return ret !== 0;
}

(async () => {
    await Reset();          // Reset the module
    await SetVolume(30);
    await PlayFile(1, 1);   // Play file 001.mp3 in folder 01

    let count = 0;
    while (await IsBusy()) {
        await sleep(1000);
        count++;

        if (count === 10) {
            console.log("The song is longer than 10 seconds, forcing stop");
            await Stop();
            break;
        }
    }

    console.log("The song ended.");
})();
