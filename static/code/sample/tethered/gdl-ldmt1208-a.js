// In this sample:
// Display "Hello World" and scroll the text across the screen

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
async function main() {
    let x = 12;

    while (true) {
        await duelink.Graphics.Clear(0);
        await duelink.Graphics.Text("Hello world!", 1, x, 0);
        x--;

        if (x < -70) {
            x = 12;
        }

        await duelink.Graphics.Show();
        await sleep(1); 
    }
}

main();