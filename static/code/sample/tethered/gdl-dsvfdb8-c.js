// In this sample:
// Display the text "DUELink!"
// Wait for 1 second
// Display counting up from 0 to 99,999,999

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function DrawNumber(x, number) {
    number = number + 48; // 48 = '0'
    const cmd = `CPrint(${x},${number})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function DrawString(text) {
    const cmd = `CPrintS("${text}")`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function Show() {
    await duelink.Engine.ExecuteCommand("VShow()");
}

async function Clear() {
    await DrawString("        ");
    await Show();
}

async function main() {
    let number = 0;
    let i = 0;

    await Clear();
    await DrawString("DUELink!");
    await Show();
    await sleep(1000);
    await Clear();

    while (true) {
        await DrawNumber(i, number);
        await Show();

        number = number + 1;

        if (number === 10) {
            number = 0;
            i = i + 1;

            if (i === 8) {
                i = 0;
                await Clear();
            }
        }

        await sleep(10); // 10 ms
    }
}

// start program
main();
