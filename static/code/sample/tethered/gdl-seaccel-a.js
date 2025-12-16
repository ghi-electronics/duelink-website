// In this sample:
// Reading X,Y,Z values

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

// Methods
// Helper sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function GetX() {
    return parseInt(await duelink.Engine.ExecuteCommand("getx()"));
}

async function GetY() {
    return parseInt(await duelink.Engine.ExecuteCommand("gety()"));
}

async function GetZ() {
    return parseInt(await duelink.Engine.ExecuteCommand("getz()"));
}

(async () => {
    while (true) {
        const x = await GetX();
        const y = await GetY();
        const z = await GetZ();

        console.log(`X = ${x}, Y = ${y}, Z = ${z}`);

        await sleep(1000); // correctly ported from Thread.Sleep(1000)
    }
})();
