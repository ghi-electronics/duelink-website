// In this sample:
// Set local date/time and read every second.

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
async function SetDateTime(dt) {
    const year = dt.getFullYear();
    const month = dt.getMonth() + 1; // JS months are 0-based
    const day = dt.getDate();
    const hour = dt.getHours();
    const minute = dt.getMinutes();
    const second = dt.getSeconds();

    await duelink.Engine.ExecuteCommand(
        `SetTime(${year}, ${month},${day},${hour},${minute},${second})`
    );
}

async function GetDateTime() {
    await duelink.Engine.ExecuteCommand("ReadTime()");

    const year = parseInt(await duelink.Engine.ExecuteCommand("_y"));
    const month = parseInt(await duelink.Engine.ExecuteCommand("_n"));
    const day = parseInt(await duelink.Engine.ExecuteCommand("_d"));
    const hour = parseInt(await duelink.Engine.ExecuteCommand("_h"));
    const minute = parseInt(await duelink.Engine.ExecuteCommand("_m"));
    const second = parseInt(await duelink.Engine.ExecuteCommand("_s"));

    return new Date(year, month - 1, day, hour, minute, second);
}


async function main() {
    await SetDateTime(new Date());

    while (true) {
        console.log(`Now: ${await GetDateTime()} `);
        await sleep(1000); // 1000 ms
    }
}

main();