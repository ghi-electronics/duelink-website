// In this sample:
// Read and display the temperature from pixel[0] to pixel[63]

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
async function GetTemperature(pixel) {
    return Number(await duelink.Engine.ExecuteCommand(`PixTemp(${pixel})`));
}

(async asyncMain => {
    while (true) {
        console.log("==============================");
        for (let i = 0; i < 64; i++) {
            console.log(`Temperature at pixel ${i}: ${await GetTemperature(i)}`);
        }

        await sleep(100);
    }
})();