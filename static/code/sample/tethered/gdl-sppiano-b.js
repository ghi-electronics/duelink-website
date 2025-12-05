// In this sample:
// Simulate tones from note C4 to C5
// Press the left arrow all leds 1,2,3,4,5 are off, play a sweep sound
// Press the right arrow all leds 1,2,3,4,5 are on, play a sweep sound

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();


async function IsLeftArrowTouched() {
    const ret = await duelink.Engine.ExecuteCommand("TLArrow()");
    return ret === 1;
}

async function IsRightArrowTouched() {
    const ret = await duelink.Engine.ExecuteCommand("TRArrow()");
    return ret === 1;
}

async function IsPadTouched(i) {
    const ret = await duelink.Engine.ExecuteCommand(`TPad(${i})`);
    return ret === 1;
}

const tones = [523, 554, 587, 622, 659, 698, 740, 784, 830, 880, 932, 987, 1047];

(async function main() {
    while (true) {
        for (let i = 0; i < tones.length; i++) {
            if (await IsPadTouched(i)) {
                await duelink.Engine.ExecuteCommand(`freq(3, ${tones[i]}, 0, 0.5)`);
                while (true) {
                    if (!(await IsPadTouched(i))) {
                        await duelink.Engine.ExecuteCommand(`freq(3, ${tones[i]}, 0, 1)`);
                        break;
                    }
                    
                    await new Promise(resolve => setTimeout(resolve, 1));
                }
            }
        }

        if (await IsLeftArrowTouched()) {
            await duelink.Engine.ExecuteCommand("SetLEDAll(0)");
            await duelink.Engine.ExecuteCommand("sweep(3, 1000,2000,50,255,250)");
            await new Promise(resolve => setTimeout(resolve, 250));
        }

        if (await IsRightArrowTouched()) {
            await duelink.Engine.ExecuteCommand("SetLEDAll(1)");
            await duelink.Engine.ExecuteCommand("sweep(3, 2000,1000,255,50,250)");
            await new Promise(resolve => setTimeout(resolve, 250));
        }

        await new Promise(resolve => setTimeout(resolve, 1));
    }
})();



