// In this sample:
// Update counter from 0 to 9 every second
// Press any button (A or B) to reset the counter to 0

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

async function ButtonAPressed() {
    const cmd = "BtnA()";
    const ret = await duelink.Engine.ExecuteCommand(cmd);
    return ret !== 0;
}

async function ButtonBPressed() {
    const cmd = "BtnB()";
    const ret = await duelink.Engine.ExecuteCommand(cmd);
    return ret !== 0;
}

async function DrawNumber(number) {
    await duelink.Engine.ExecuteCommand("clear(0)");
    const cmd = `Textt("${number}", 1, 0,0)`;
    await duelink.Engine.ExecuteCommand(cmd);
    await duelink.Engine.ExecuteCommand("show()");
}

let counter = 0;

(async function main() {
    while (true) {
        if (await ButtonAPressed() || await ButtonBPressed()) {
            counter = 0;
        }

        await DrawNumber(counter);

        counter++;
        if (counter === 10) {
            counter = 0;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
})();

