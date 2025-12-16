// In this sample:
// Touch on pin 2, status LED turns on
// Touch on pin 7, status LED turns off

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
async function SetStatLed(value) {
    const high = value ? 1 : 0;
    const low = value ? 0 : 1;
    await duelink.Engine.ExecuteCommand(`Statled(${high},${low},0)`);
}

async function Touched(pin) {
    const ret = await duelink.Engine.ExecuteCommand(`PulseIn(${pin},1000,0,100)`);
    return ret > 110;
}

(async () => {
    while (true) {
        if (await Touched(2)) {
            await SetStatLed(true);
        }
        if (await Touched(7)) {
            await SetStatLed(false);
        }

        await sleep(50); // 50 ms delay
    }
})();