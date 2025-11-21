// In this sample:
// STATLED blinks every 100 ms.
// Press and hold the LDR button: STATLED stops blinking and stays on.
// Release the LDR button: STATLED resumes blinking every 100 ms.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

let ldr_btn_state = false;
let ldr_btn_state_backup = false;

async function LdrPressed() {
    const cmd = "dread(20,2)";
    const ret = await duelink.Engine.ExecuteCommand(cmd);
    return ret !== 0;
}

await duelink.Engine.ExecuteCommand("statled(100,100,0)"); // blink 100ms

while (true) {
    ldr_btn_state = await LdrPressed();

    if (ldr_btn_state_backup !== ldr_btn_state) {
        ldr_btn_state_backup = ldr_btn_state;

        if (ldr_btn_state_backup) {
            await duelink.Engine.ExecuteCommand("statled(1,0,0)"); // stay on
        } else {
            await duelink.Engine.ExecuteCommand("statled(100,100,0)"); // blink 100ms
        }
    }

    await new Promise(resolve => setTimeout(resolve, 10)); // Sleep 10 ms
}
