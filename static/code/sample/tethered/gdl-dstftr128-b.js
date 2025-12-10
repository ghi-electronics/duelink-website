
// In this sample:
// Create a watch using the built-in graphics library.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

// Default driver R128 is buffer mode, multiple 3. 240/3 = 80
const WIDTH = 80;
const HEIGHT = 80;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const RADIUS = 32;

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function DrawText(text, color, x, y, scalex, scaley) {
    await duelink.Engine.ExecuteCommand(`textS("${text}", ${color}, ${x}, ${y}, ${scalex}, ${scaley})`);
}

async function DrawLine(x1, y1, x2, y2, color) {
    await duelink.Engine.ExecuteCommand(`line(${color}, ${x1}, ${y1}, ${x2}, ${y2})`);
}

async function ClearScreen(color) {
    await duelink.Engine.ExecuteCommand(`clear(${color})`);
}

async function Show() {
    await duelink.Engine.ExecuteCommand("show()");
}

// Convert RGB to 24-bit integer
function RGB(r, g, b) {
    return (r << 16) | (g << 8) | b;
}

async function DrawNumbers() {
    for (let h = 1; h <= 12; h++) {
        const angle = Math.PI / 6 * (h - 3); // 0 hour at right
        let x = CENTER_X + Math.floor((RADIUS - 0) * Math.cos(angle));
        let y = CENTER_Y + Math.floor((RADIUS - 0) * Math.sin(angle));

        if (h > 6) x -= 4;

        await DrawText(
            h.toString(),
            RGB(255, 255, 255),
            (h < 10) ? x : x - 4,
            y - 3,
            1,
            1
        );
    }
}

async function DrawHand(angle, length, color) {
    const x = CENTER_X + Math.floor(length * Math.cos(angle));
    const y = CENTER_Y + Math.floor(length * Math.sin(angle));
    await DrawLine(CENTER_X, CENTER_Y, x, y, color);
}

let last_sec = 0;
let last_min = 0;
let last_hour = 0;
let counter = 0;

// draw once
await ClearScreen(RGB(0, 127, 255));

while (true) {
    const now = new Date();

    const secondAngle = Math.PI / 30 * (now.getSeconds() - 15);
    const minuteAngle = Math.PI / 30 * (now.getMinutes() - 15 + now.getSeconds() / 60);
    const hourAngle = Math.PI / 6 * ((now.getHours() % 12) - 3 + now.getMinutes() / 60);

    if (last_sec !== secondAngle) {
        await DrawHand(last_sec, RADIUS - 0, RGB(0, 127, 255));    // fill background color
        last_sec = secondAngle;
        await DrawHand(secondAngle, RADIUS - 0, RGB(0, 0, 255));  // Second: Blue

        // when second goes over minute/hour, redraw them
        await DrawHand(minuteAngle, RADIUS - 5, RGB(0, 255, 0));  // Minute: Green
        await DrawHand(hourAngle, RADIUS - 10, RGB(255, 0, 0));   // Hour: Red
        counter++;

    } else if (last_min !== minuteAngle) {
        await DrawHand(last_min, RADIUS - 5, RGB(0, 127, 255));   // erase
        last_min = minuteAngle;
        await DrawHand(minuteAngle, RADIUS - 5, RGB(0, 255, 0));  // Minute: Green

    } else if (last_hour !== hourAngle) {
        await DrawHand(last_hour, RADIUS - 10, RGB(0, 127, 255)); // erase
        last_hour = hourAngle;
        await DrawHand(hourAngle, RADIUS - 10, RGB(255, 0, 0));   // Hour: Red

    } else {
        await DrawNumbers();
        await DrawText("DUELink", RGB(255, 0, 255), CENTER_X - 18, CENTER_Y + 10, 1, 1);
        await Show();
        await sleep(100); 
    }
}