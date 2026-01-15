// In this sample:
// Show characters, dots, and numbers.

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
async function DrawText(text) {
    await duelink.Engine.ExecuteCommand(`PrntStr("${text}")`);
}

async function DrawDot(pos, value) {
    await duelink.Engine.ExecuteCommand(`Dot(${pos},${value})`);
}

async function DrawNumber(number) {
    await duelink.Engine.ExecuteCommand(`Digit(${number})`);
}

async function Clear() {
    await duelink.Engine.ExecuteCommand("Clear(0)");
}

async function Show() {
    await duelink.Engine.ExecuteCommand("Show()");
}

(async () => {
    await DrawText("ABCDE");
    await Show();
    await sleep(1000);

    await DrawText("FGHIJ");
    await Show();
    await sleep(1000);

    await DrawText("KLMNO");
    await Show();
    await sleep(1000);

    await DrawText("PQRST");
    await Show();
    await sleep(1000);

    await DrawText("UVWXY");
    await Show();
    await sleep(1000);

    await DrawText("  Z  ");
    await DrawDot(0, 1);
    await DrawDot(1, 1);
    await DrawDot(3, 1);
    await DrawDot(4, 1);
    await Show();
    await sleep(1000);

    let n = 0;
    while (true) {
        await Clear();
        await DrawNumber(n % 100000);
        n++;
        await Show();
        await sleep(100);
    }
})();
