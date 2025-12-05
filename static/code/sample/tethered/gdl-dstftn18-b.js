
// In this sample:
// Create a watch using the built-in graphics library.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

const WIDTH = 160 / 2;
const HEIGHT = 128 / 2;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const RADIUS = 30;

// Sleep helper (ms)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// API wrapper
async function DrawTextTiny(text, color, x, y) {
    await duelink.Engine.ExecuteCommand(`textT("${text}", ${color}, ${x}, ${y})`);
}

async function DrawText(text, color, x, y, scalex, scaley) {
    await duelink.Engine.ExecuteCommand(`textS("${text}", ${color}, ${x}, ${y}, ${scalex}, ${scaley})`);
}

async function DrawLine(x1, y1, x2, y2, color) {
    await duelink.Engine.ExecuteCommand(`line(${color}, ${x1}, ${y1}, ${x2}, ${y2})`);
}

async function FillRect(color, x, y, width, height) {
    await duelink.Engine.ExecuteCommand(`fill(${color}, ${x}, ${y}, ${width}, ${height})`);
}

async function DrawCircle(x, y, radius, color) {
    await duelink.Engine.ExecuteCommand(`circle(${color}, ${x}, ${y}, ${radius})`);
}

async function ClearScreen(color) {
    await duelink.Engine.ExecuteCommand(`clear(${color})`);
}

async function Show() {
    await duelink.Engine.ExecuteCommand(`show()`);
}

// Convert RGB to 24-bit integer
function RGB(r, g, b) {
    return (r << 16) | (g << 8) | b;
}

async function SetPixel(color, x, y) {
    await duelink.Engine.ExecuteCommand(`Pixel(${color},${x},${y})`);
}

async function DrawNumbers() {
    for (let h = 1; h <= 12; h++) {
        const angle = Math.PI / 6 * (h - 3);
        const x = CENTER_X + Math.floor((RADIUS - 5) * Math.cos(angle));
        const y = CENTER_Y + Math.floor((RADIUS - 5) * Math.sin(angle));
        await DrawTextTiny(h.toString(), RGB(255, 255, 255), x - 2, y - 2);
    }
}

async function DrawHand(angle, length, color) {
    const x = CENTER_X + Math.floor(length * Math.cos(angle));
    const y = CENTER_Y + Math.floor(length * Math.sin(angle));
    await DrawLine(CENTER_X, CENTER_Y, x, y, color);
}

// Main loop
(async function main() {
    while (true) {
        await ClearScreen(RGB(0, 127, 255));
        await DrawCircle(CENTER_X, CENTER_Y, RADIUS, RGB(0, 0, 127));
        await DrawNumbers();

        const now = new Date();
        const secondAngle = Math.PI / 30 * (now.getSeconds() - 15);
        const minuteAngle = Math.PI / 30 * (now.getMinutes() - 15 + now.getSeconds() / 60);
        const hourAngle = Math.PI / 6 * (now.getHours() % 12 - 3 + now.getMinutes() / 60);

        await DrawHand(hourAngle, RADIUS - 10, RGB(255, 0, 0));    // Hour: Red
        await DrawHand(minuteAngle, RADIUS - 7, RGB(0, 255, 0));  // Minute: Green
        await DrawHand(secondAngle, RADIUS - 5, RGB(0, 0, 255));  // Second: Blue

        await DrawTextTiny("DUELink", RGB(255, 0, 255), 20, 30);
        await Show();

        await sleep(10); // 10ms delay for smoother update
    }
})();

