// In this sample:
// Create a watch using the built-in graphics library.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

// Default driver CP23 is direct mode, 320x240
const WIDTH = 320;
const HEIGHT = 240;
const CENTER_X = Math.floor(WIDTH / 2);
const CENTER_Y = Math.floor(HEIGHT / 2);
const RADIUS = 100;

// Sleep helper
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function DrawText(text, color, x, y, scalex, scaley) {
    await duelink.Engine.ExecuteCommand(`textS("${text}", ${color}, ${x}, ${y}, ${scalex}, ${scaley})`);
}

async function DrawLine(x1, y1, x2, y2, color) {
    await duelink.Engine.ExecuteCommand(`line(${color}, ${x1}, ${y1}, ${x2}, ${y2})`);
}

async function DrawCircle(x, y, radius, color) {
    await duelink.Engine.ExecuteCommand(`circle(${color}, ${x}, ${y}, ${radius})`);
}

async function ClearScreen(color) {
    await duelink.Engine.ExecuteCommand(`clear(${color})`);
}

// Convert RGB to 24-bit integer
function RGB(r, g, b) {
    return (r << 16) | (g << 8) | b;
}

async function DrawNumbers() {
    for (let h = 1; h <= 12; h++) {
        const angle = Math.PI / 6 * (h - 3); // 0 hour at right
        const x = CENTER_X + Math.floor((RADIUS - 10) * Math.cos(angle));
        const y = CENTER_Y + Math.floor((RADIUS - 10) * Math.sin(angle));
        await DrawText(h.toString(), RGB(255, 255, 255), x, y - 2, 2, 2);
    }
}

async function DrawHand(angle, length, color) {
    const x = CENTER_X + Math.floor(length * Math.cos(angle));
    const y = CENTER_Y + Math.floor(length * Math.sin(angle));
    await DrawLine(CENTER_X, CENTER_Y, x, y, color);
}

// Main async function
async function main() {
    let last_sec = 0;
    let last_min = 0;
    let last_hour = 0;
    let counter = 0;

    // Draw once
    await ClearScreen(RGB(0, 127, 255));
    await DrawCircle(CENTER_X + 4, CENTER_Y + 2, RADIUS + 2, RGB(0, 0, 127));
    await DrawNumbers();

    while (true) {
        const now = new Date();

        const secondAngle = Math.PI / 30 * (now.getSeconds() - 15);
        const minuteAngle = Math.PI / 30 * (now.getMinutes() - 15 + now.getSeconds() / 60.0);
        const hourAngle = Math.PI / 6 * (now.getHours() % 12 - 3 + now.getMinutes() / 60.0);

        if (last_sec !== secondAngle) {
            await DrawHand(last_sec, RADIUS - 10, RGB(0, 127, 255)); // fill background color
            last_sec = secondAngle;
            await DrawHand(secondAngle, RADIUS - 10, RGB(0, 0, 255)); // Second: Blue

            await DrawHand(minuteAngle, RADIUS - 20, RGB(0, 255, 0)); // Minute: Green
            await DrawHand(hourAngle, RADIUS - 30, RGB(255, 0, 0));   // Hour: Red
            counter++;
        } else if (last_min !== minuteAngle) {
            await DrawHand(last_min, RADIUS - 20, RGB(0, 127, 255)); // fill background color
            last_min = minuteAngle;
            await DrawHand(minuteAngle, RADIUS - 20, RGB(0, 255, 0)); // Minute: Green
        } else if (last_hour !== hourAngle) {
            await DrawHand(last_hour, RADIUS - 30, RGB(0, 127, 255)); // fill background color
            last_hour = hourAngle;
            await DrawHand(hourAngle, RADIUS - 30, RGB(255, 0, 0));   // Hour: Red
        } else {
            await DrawText("DUELink", RGB(255, 0, 255), CENTER_X - 30, CENTER_X - 5, 2, 2);
            await sleep(100); // sleep 100ms
        }
    }
}

// Run the main loop
main();