
// In this sample:
// Create a watch using the built-in graphics library.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

// Constants
const WIDTH = 64;
const HEIGHT = 64;
const CENTER_X = WIDTH;
const CENTER_Y = HEIGHT / 2;
const RADIUS = 26;

// Functions
async function DrawText(text, color, x, y, scalex, scaley) {
    await duelink.Engine.ExecuteCommand(`textT("${text}", ${color}, ${x}, ${y})`);
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

async function Show() {
    await duelink.Engine.ExecuteCommand('show()');
}

// RGB color conversion (24-bit)
function RGB(r, g, b) {
    return (r << 16) | (g << 8) | b;
}

async function DrawNumbers() {
    for (let h = 1; h <= 12; h++) {
        const angle = Math.PI / 6 * (h - 3); // 0 hour at right
        let x = CENTER_X + Math.floor((RADIUS - 0) * Math.cos(angle));
        let y = CENTER_Y + Math.floor((RADIUS - 0) * Math.sin(angle));

        if (h > 6) {
            x -= 2;
        }

        await DrawText(h.toString(), RGB(255, 255, 255), (h < 10) ? x : x - 4, y - 3, 1, 1);
    }
}

// Draw a watch hand
async function DrawHand(angle, length, color) {
    const x = CENTER_X + Math.floor(length * Math.cos(angle));
    const y = CENTER_Y + Math.floor(length * Math.sin(angle));
    await DrawLine(CENTER_X, CENTER_Y, x, y, color);
}

// Draw once
await ClearScreen(RGB(0, 0, 0));

// Main loop
async function runClock() {
    while (true) {
        // Clear the screen and update the watch
        const now = new Date();
        await ClearScreen(RGB(0, 0, 0));
        await DrawCircle(CENTER_X, CENTER_Y - 1, 31, 1);  // Draw the background circle
        await DrawNumbers();

        const secondAngle = Math.PI / 30 * (now.getSeconds() - 15);
        const minuteAngle = Math.PI / 30 * (now.getMinutes() - 15 + now.getSeconds() / 60.0);
        const hourAngle = Math.PI / 6 * (now.getHours() % 12 - 3 + now.getMinutes() / 60.0);

        await DrawHand(secondAngle, RADIUS - 0, RGB(0, 127, 255));  // Second hand: Light blue
        await DrawHand(minuteAngle, RADIUS - 5, RGB(0, 255, 0));   // Minute hand: Green
        await DrawHand(hourAngle, RADIUS - 10, RGB(255, 0, 0));    // Hour hand: Red

        await Show();

        // Sleep for 10 milliseconds
        await new Promise(resolve => setTimeout(resolve, 10));
    }
}

// Run the clock
runClock();