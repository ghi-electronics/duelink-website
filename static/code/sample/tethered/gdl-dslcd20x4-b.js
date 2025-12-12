// In this sample:
// Display the text "DUELink!" on the first row
// Continuously display '*' moving from left to right, then right to left

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function DrawChar(c) {
    const cmd = `CPrint('${c}')`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function DrawString(text) {
    const cmd = `CPrintS("${text}")`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function MoveToHome() {
    await duelink.Engine.ExecuteCommand("Home()");
}

async function Clear() {
    await duelink.Engine.ExecuteCommand("clr()");
}

async function MoveTo(col, row) {
    const cmd = `CPos(${col},${row})`;
    await duelink.Engine.ExecuteCommand(cmd);
}

async function main() {
    let i = 10;
    let dir = 1;

    while (true) {
        await MoveTo(5, 0);
        await DrawString("DUELink!");
        await MoveTo(i, 1);
        await DrawChar('*');
        await sleep(30); // 30 ms
        await MoveTo(i, 1);
        await DrawChar(' ');
        i += dir;

        if (i > 12 || i < 3) {
            dir *= -1;
        }
    }
}

// Start the async loop
main();
