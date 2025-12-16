// In this sample:
// Set PWM duty cycle: pin 1 = 10%, pin 2 = 20%, ... pin 8 = 80%

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

async function SetFrequency(pin, frequency, dutycycle) {
    await duelink.Engine.ExecuteCommand(`freq(${pin},${frequency}, 0, ${dutycycle})`);
}

(async () => {
    // Set PWM duty cycles
    await SetFrequency(1, 1000, 0.1); // pin 1, 1kHz, 10%
    await sleep(50); // optional small delay between commands
    await SetFrequency(2, 1000, 0.2);
    await sleep(50);
    await SetFrequency(3, 1000, 0.3);
    await sleep(50);
    await SetFrequency(4, 1000, 0.4);
    await sleep(50);
    await SetFrequency(5, 1000, 0.5);
    await sleep(50);
    await SetFrequency(6, 1000, 0.6);
    await sleep(50);
    await SetFrequency(7, 1000, 0.7);
    await sleep(50);
    await SetFrequency(8, 1000, 0.8);
})();