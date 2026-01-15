// In this sample:
// Display the current minute and second on the LED (timer version).

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
async function DrawNumber(led, number) {
    await duelink.Engine.ExecuteCommand(`Seg7(${led},${number})`);
}

async function ShowColon(value) {
    await duelink.Engine.ExecuteCommand(`Colon(${value})`);
}

async function Show() {
    await duelink.Engine.ExecuteCommand("Show()");
}

let min = 0;
let sec = 0;

(async function mainLoop() {
    while (true) {
        const now = new Date();
        const minute = now.getUTCMinutes();
        const second = now.getUTCSeconds();

        if (sec !== second || min !== minute) {
            sec = second;
            min = minute;

            await DrawNumber(0, sec % 10);
            await DrawNumber(1, Math.floor(sec / 10));

            await DrawNumber(2, min % 10);
            await DrawNumber(3, Math.floor(min / 10));
        }

        await ShowColon(1);
        await Show();
        await sleep(400); // 

        await ShowColon(0);
        await Show();
        await sleep(400); // 
    }
})();
