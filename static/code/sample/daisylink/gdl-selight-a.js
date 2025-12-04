
// In this sample:
// Pull light value every second
// When light below 25, turn the statled on
// When light higher 25, turn the statled off

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();


async function GetLight() {
    const ret = await duelink.Engine.ExecuteCommand("Light()");
    return parseInt(ret, 10);
}

async function SetStatLed(on) {
    let cmd = "statled(1,0,0)";
    if (!on) {
        cmd = "statled(0,1,0)";
    }
    await duelink.Engine.ExecuteCommand(cmd);
}

async function main() {
    while (true) {
        const light = await GetLight();

        if (light < 25) {
            await SetStatLed(true);
        } else {
            await SetStatLed(false);
        }

        console.log(`Light value: ${light}`);

        // Exact 1000 ms delay (matches C# Thread.Sleep(1000))
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

main().catch(err => console.error(err));



