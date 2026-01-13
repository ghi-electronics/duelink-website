// In this sample:
// Detect if the button is pressed

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
async function IsBtnPressed() {
    return await duelink.Button.Down(1);
}

(async function main() {
    while (true) {
        if (await IsBtnPressed()) {
            console.log("Button Pressed");
        }
        await sleep(100);
    }
})();