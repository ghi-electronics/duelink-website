// In this sample:
// Draw the text "DUELink" in multiple colors at the center of the screen.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Clear() {
    await duelink.Engine.ExecuteCommand("DLClear()");
    await duelink.Engine.ExecuteCommand("DLCmd(C_CLEAR_COLOR,{0,0,0})");
    await duelink.Engine.ExecuteCommand("DLCmd(C_CLEAR,{})");
}

async function DrawChar(c, color, x, y, size) {
    const r = (color >> 16) & 0xFF;
    const g = (color >> 8) & 0xFF;
    const b = (color >> 0) & 0xFF;
    let cmd = `DLCmd(C_COLOR,{${r},${g},${b}})`;
    await duelink.Engine.ExecuteCommand(cmd);

    await duelink.Engine.ExecuteCommand("DLCmd(C_BEGIN,{BITMAPS})");

    cmd = `DLCmd(C_VERTEX2II,{${x},${y},${size},'${c}'})`;
    await duelink.Engine.ExecuteCommand(cmd);

    await duelink.Engine.ExecuteCommand("DLCmd(C_END,{})");
}

async function Show() {
    await duelink.Engine.ExecuteCommand("DLCmd(C_DISPLAY,{})");
    await duelink.Engine.ExecuteCommand("DLSwap()");
}

// Example usage
(async () => {
    await Clear();
    await DrawChar('D', 0xff0000, 300, 192, 31);
    await DrawChar('U', 0x00ff00, 335, 192, 31);
    await DrawChar('E', 0x0000ff, 370, 192, 31);
    await DrawChar('L', 0x00ffff, 405, 192, 31);
    await DrawChar('i', 0xff00ff, 435, 192, 31);
    await DrawChar('n', 0xffff00, 460, 192, 31);
    await DrawChar('k', 0xffffff, 495, 192, 31);
    await Show();
})();
