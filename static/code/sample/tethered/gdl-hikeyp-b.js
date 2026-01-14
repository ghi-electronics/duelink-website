// In this sample:
// Detect a pressed key

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
async function IsKeyChange() {
    const ret = await duelink.Engine.ExecuteCommand("IsKeyChange()");
    return ret > 0 ? true : false;
}

async function ReadKey() {
    const ret = await duelink.Engine.ExecuteCommand("RdKey()");
    return ret | 0;
}


while (true) {
    // use this then no need to call SStart("Scan", 100, 0)
    // in script that require while(1) loop active
    await duelink.Engine.ExecuteCommand("Scan()");

    await sleep(10); // Thread.Sleep(10)

    if (await IsKeyChange()) {
        const key = await ReadKey();

        if (key === 0) {
            console.log("Key released");
        } else {
            console.log(`Key pressed: ${String.fromCharCode(await ReadKey())}`);
        }
    }

    await sleep(100); // Thread.Sleep(100)
}