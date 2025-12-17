// In this sample:
// Warm up the sensor for 10 seconds, then read the analog value

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
async function Heater(value) {
    const v = value ? 1 : 0;
    await duelink.Engine.ExecuteCommand(`Heater(${v})`);
}

async function SensorRead() {
    const ret = await duelink.Engine.ExecuteCommand("SenRead()");
    return ret;
}

async function main() {
    let counter = 0;

    while (true) {
        await sleep(1000); // Equivalent to Thread.Sleep(1000)

        // Wait for heat on for 10 seconds
        if (counter === 0) {
            await Heater(true);
        }
        counter++;

        if (counter < 10) {
            console.log(`Wait for ${counter}/10 seconds`);
            continue;
        }

        const volt = await SensorRead();
        console.log(`Volt: ${volt}`);
    }
}

main();