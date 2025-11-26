// In this sample:
// Update counter from 0 to 9 every second
// Press LDR button to reset the counter to 0

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();


async function ButtonLDRPressed() {
    const cmd = "dread(20,2)";
    const ret = await duelink.Engine.ExecuteCommand(cmd);
    return ret !== 0;
}

async function DrawNumber(number) {
    await duelink.Engine.ExecuteCommand("clear(0)");
    const cmd = `TextS("${number}", 1, 1,0,1,1)`;
    await duelink.Engine.ExecuteCommand(cmd);
    await duelink.Engine.ExecuteCommand("show()");
}

let counter = 0;

(async function main() {
    while (true) {
        if (await ButtonLDRPressed()) {
            counter = 0;
        }

        await DrawNumber(counter);

        counter++;
        if (counter === 10) {
            counter = 0;
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // Sleep 1 second
    }
})();


