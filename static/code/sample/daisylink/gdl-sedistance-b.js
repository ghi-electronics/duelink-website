// In this sample:
// Update distance in cm every second
import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

async function GetDistance() {
    const ret = await duelink.Engine.ExecuteCommand("Distance()");
    return ret;
}

async function main() {
    while (true) {
        const distance = await GetDistance();
        console.log(`Distance: ${distance} cm`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

main();