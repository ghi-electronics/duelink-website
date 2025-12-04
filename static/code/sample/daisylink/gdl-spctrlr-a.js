// In this sample:
// LEDs will run in circle mode.
// Press buttons U, D, L, R: LEDs turn on at positions 8, 4, 6, and 2.
// Press button A: All red LEDs turn on.
// Press button B: All red LEDs turn off.
// Press LDR button: Return to circle mode.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();


let run_ring = true;

async function IsBtnPressed(button) {
    const ret = await duelink.Engine.ExecuteCommand(`BtnDown(BtnPin('${button}'))`);
    return ret === 1;
}

async function SetLed(index, value) {
    const val = value ? 1 : 0;
    await duelink.Engine.ExecuteCommand(`SetLed(${index},${val})`);
}

async function SetAllLed(value) {
    const val = value ? 1 : 0;
    await duelink.Engine.ExecuteCommand(`SetAllLed(${val})`);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let count = 0;

(async function main() {
    while (true) {
        if (await IsBtnPressed('U')) {
            await SetLed(8, true);
            run_ring = false;
        }
        if (await IsBtnPressed('R')) {
            await SetLed(2, true);
            run_ring = false;
        }
        if (await IsBtnPressed('D')) {
            await SetLed(4, true);
            run_ring = false;
        }
        if (await IsBtnPressed('L')) {
            await SetLed(6, true);
            run_ring = false;
        }
        if (await IsBtnPressed('A')) {
            await SetAllLed(true);
            run_ring = false;
        }
        if (await IsBtnPressed('B')) {
            await SetAllLed(false);
            run_ring = false;
        }

        if (await duelink.Engine.ExecuteCommand("dread(20,2)") !== 0) {
            count = 0;
            await SetAllLed(false);
            run_ring = true;
            await sleep(100);
        }

        if (run_ring) {
            await SetLed(parseInt((count % 8) + 1), (parseInt((count / 8) % 2) === 0) ? true : false);
        }

        count++;
        await sleep(100);
    }
})();
