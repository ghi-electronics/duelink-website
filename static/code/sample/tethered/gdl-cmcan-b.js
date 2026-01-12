// In this sample:
// On receiving a CAN message, display the RX values and send a CAN message (ID: 1,
// data: {1, 2, 3, 4, 5, 6, 7, 8}). Poll interval: 1 second.

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
async function Read(data) {
    const cmd = `dim b1[${1 + data.length}]`; // length at first byte
    await duelink.Engine.ExecuteCommand(cmd);

    const ret = Number(await duelink.Engine.ExecuteCommand("RxRd(b1)"));

    if (ret >= 0) {
        const id = await duelink.Engine.ExecuteCommand("b1[0]");
        console.log(`length: ${id}`);

        for (let i = 1; i <= data.length; i++) {
            data[i - 1] = Number(await duelink.Engine.ExecuteCommand(`b1[${i}]`)) & 0xFF;
            const val = data[i - 1].toString(16).padStart(2, "0");
            console.log(`Rx data: 0x${val}`);
        }
    }

    return ret;
}

async function Write(id, data) {
    const cmd = `dim b0[${data.length}]`; // data length
    await duelink.Engine.ExecuteCommand(cmd);

    for (let i = 0; i < data.length; i++) {
        await duelink.Engine.ExecuteCommand(`b0[${i}]=${data[i]}`);
    }

    await duelink.Engine.ExecuteCommand(`TxReq(${id},len(b0),b0)`);
    console.log(`Sent: ${id}`);
}

const read_arr = new Uint8Array(8);
const write_arr = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);

while (true) {
    if (await Read(read_arr) >= 0) {
        await Write(1, write_arr);
    }
    await sleep(1000);
}
