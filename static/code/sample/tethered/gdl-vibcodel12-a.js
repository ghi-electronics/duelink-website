// In this sample:
// Set the scanner to Continuous mode
// Show the barcode when the barcode is close enough to the scanner

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
async function SetMode(mode) {
    // 1: Trigger mode
    // 2: Continuous mode
    await duelink.Engine.ExecuteCommand(`SetMode(${mode})`);
}

async function ByteToRead() {
    return await duelink.Uart.BytesToRead();
}

async function ReadByte() {
    return await duelink.Uart.ReadByte();
}

(async function main() {
    await SetMode(2); // Continuous mode

    while (true) {
        const available1 = await ByteToRead();

        await sleep(250); // wait for 250 ms

        const available2 = await ByteToRead();

        if (available2 > 0 && available1 === available2) {
            // After waiting 250 ms, if available2 equals available1,
            // it means no more data is coming, so we can display the data.
            console.log("Detected barcode:");
            let s = ""
            for (let i = 0; i < available1; i++) {
                const byte = await ReadByte();
                s += String.fromCharCode(byte)
                
            }
            console.log(s);
        }

        await sleep(250);
    }
})();