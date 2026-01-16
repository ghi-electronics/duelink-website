// In this sample:
// Allows setting volume and channel on the RadioFM module

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
async function SetVolume(volume) {
    // Set the volume on the RadioFM module (0-100)
    if (volume >= 0 && volume <= 100) {
        await duelink.Engine.ExecuteCommand(`SetVol(${volume})`);
    }
}

async function SetChannel(channel) {
    // Set the channel on the RadioFM module
    await duelink.Engine.ExecuteCommand(`SetChan(${channel})`);
}

// Example usage
(async () => {
    await SetVolume(50);      // Set volume to 50%
    await SetChannel(100.3);  // Set channel to 100.3
})();