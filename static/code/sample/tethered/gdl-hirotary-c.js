// In this sample:
// Get the current rotary value
// Detect if the rotary button is pressed
// Note:
// The rotary driver uses interrupts, so DUEScript user code must remain in a while loop indefinitely.
// Append the while loop below to ensure the user code stays in a while loop indefinitely if the device does not already have one.
// /////// User code //////
// Asio(1) # Allow communication between host and device
// while (1) # while loop indefinitely 
//    Wait(1000)
// wend
import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();


async function GetValue() {
    const ret = await duelink.Engine.ExecuteCommand("GetValue()");
    return parseInt(ret, 10);
}

async function Pressed() {
    const ret = await duelink.Engine.ExecuteCommand("Pressed()");
    return ret !== 0;
}

async function main() {
    let distance_bk = 0;
    let button_status_bk = false;

    while (true) {
        const distance = await GetValue();
        const button_status = await Pressed();

        if (distance_bk !== distance) {
            distance_bk = distance;
            console.log(`Value: ${distance}`);
        }

        if (button_status_bk !== button_status) {
            button_status_bk = button_status;
            if (button_status_bk) {
                console.log("Button pressed!");
            } else {
                console.log("Button released!");
            }
        }

        await new Promise(resolve => setTimeout(resolve, 10));
    }
}

await main().catch(err => console.error(err));


