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

async function Init() {
    await duelink.Engine.ExecuteCommand("Scan()");
}


async function main() {

    await Init();

    while (true) {

        await sleep(10);
        if (await IsKeyChange()) {
            var key = await ReadKey();

            if (key == 0) {
                console.log("Key released");
            }
            else {
                console.log(`Key pressed: ${String.fromCharCode(await ReadKey())}`);
            }
        }

    }
}

main();