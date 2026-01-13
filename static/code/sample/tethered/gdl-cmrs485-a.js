// In this sample:
// Send 0 or 1 to another RS485 to control the LED status.
// Receive data from the RS485.

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
async function Initialize() {
    await EnableRx(true);
    await EnableTx(false);
    await duelink.Uart.Configuration(9600, 128); 
    // await duelink.Engine.ExecuteCommand("SerCfg(9600,128)"); // same thing
}

async function EnableRx(value) {
    const v = value ? 0 : 1;
    await duelink.Digital.Write(5, !value);
    // await duelink.Engine.ExecuteCommand(`dwrite(5, ${v}`); // same thing
}

async function EnableTx(value) {
    const v = value ? 1 : 0;
    await duelink.Digital.Write(6, value);
    // await duelink.Engine.ExecuteCommand(`dwrite(6, ${v})`); // same thing
}

async function WriteByte(b) {
    await EnableRx(false);
    await EnableTx(true);
    await duelink.Uart.WriteByte(b);
    // await duelink.Engine.ExecuteCommand(`SerWr(${b})`); // same thing

    await EnableTx(false);
    await EnableRx(true);
}

async function ReadByte() {
    const data = await duelink.Uart.ReadByte();
    // const data = await duelink.Engine.ExecuteCommand("SerRd()"); // same thing
    return data;
}

async function ByteToRead() {
    const count = await duelink.Uart.BytesToRead();
    // const count = await duelink.Engine.ExecuteCommand("SerB2R()"); // same thing
    return count;
}

(async () => {
    await Initialize();

    let count = 0;
    while (true) {
        const v = count % 2;
        await WriteByte(v);

        while ((await ByteToRead()) === 0) {
            await sleep(1); // Sleep 1 ms
        }

        console.log(`Rx: ${await ReadByte()}`);
        count++;
        await sleep(1000); // Sleep 1 second
    }
})();
