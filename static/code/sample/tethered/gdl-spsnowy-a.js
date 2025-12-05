// In this sample:
// First led: 1
// Last led: 13
// Run a cycle from LED 1 to LED 13, with a 200 ms delay between each LED.
// When LED 13 is reached, turn off all LEDs and repeat the cycle.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

async function SetLed(led_idx, on) {
    if (led_idx < 1 || led_idx > 13) return;

    const val = on ? 1 : 0;
    const cmd = `setled(${led_idx}, ${val})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function Clear() {
    const cmd = "SetAll(0)";
    await duelink.Engine.ExecuteCommand(cmd);
}

let led_index = 1;

(async function main() {
    await Clear();

    while (true) {
        await SetLed(led_index, true);
        await new Promise(resolve => setTimeout(resolve, 200)); // 200 ms delay
        led_index++;

        if (led_index === 14) {
            await Clear();
            led_index = 1;
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }
})();



