// In this sample:
// Receive a byte
// Send back (byte + 1)

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
    await duelink.Uart.Configuration(9600, 128);
}

async function WriteByte(b) {
    await duelink.Uart.WriteByte(b);
}

async function ReadByte() {
    const data = await duelink.Uart.ReadByte();
    return data;
}

async function ByteToRead() {
    const count = await duelink.Uart.BytesToRead();
    return count;
}

await Initialize();

while (true) {
    while (await ByteToRead() === 0) {
        await sleep(100); // same as Thread.Sleep(100)
    }

    let b = await ReadByte();
    b++;
    await WriteByte(b);
}
