// In this sample:
// Get the current rotary value
// Detect if the rotary button is pressed

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

async function Init() {
    await duelink.Engine.ExecuteCommand("Scan()");
}

let distance_bk = 0;
let button_status_bk = false;

(async () => {
    await Init();

    while (true) {
        const distance = await GetValue();
        const button_status = await Pressed();

        if (distance_bk !== distance) {
            distance_bk = distance;
            console.log(`Value: ${distance}`);
        }

        if (button_status_bk !== button_status) {
            button_status_bk = button_status;
            if (button_status_bk)
                console.log("Button pressed!");
            else
                console.log("Button released!");
        }

        await sleep(10); // 10 ms
    }
})();


