
// In this sample:
// 1. Read the distance and display it on the TFT N18
// 2. Continuously scan LEDs from D1 to D16 (play LEDs in a circular - circle mode)
// 3. When the rotary button is pressed:
//  - All LEDs from D1 to D16 on LEDR16 turn on.
//  - The servo rotates to 180 degrees.
// 4. When the rotary button is released:
//  - All LEDs from D1 to D16 on LEDR16 return to circular mode.
//  - The servo rotates back to 0 degrees.
// 5. When light detection is below 10%, the buzzer repeatedly beeps. If it is above 20%, the buzzer stays quiet.
// 6. Changes in distance will adjust the LED circle speed. For example:
//    5 cm = 5 ms delay, 10 cm = 10 ms delay, and so on.

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

const DISTANCE_ADDRESS = 1;
const DISPLAY_ADDRESS = 2;
const SERVO_ADDRESS = 3;
const LEDR16_ADDRESS = 4;
const BUZER_ADDRESS = 5;
const ROTARY_ADDRESS = 6;
const LIGHT_ADDRESS = 7;

let currentAddress = -1;

let distance_val = -1.0;
let rotary_val = 0;
let counter = 0;
let counter2 = 0;
let doUpdateScreen = false;
let rotary_button_pressed = false;
let light_val = 0;

// Sleep helper
async function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function SelectDevice(deviceAddress) {
    if (currentAddress !== deviceAddress) {
        currentAddress = deviceAddress;
        await duelink.Engine.ExecuteCommand(`sel(${currentAddress})`);
        await Sleep(2);
    }
}

// ---------------- Display ------------------

async function DrawText(text, color, x, y, scalex, scaley) {
    await SelectDevice(DISPLAY_ADDRESS);
    await duelink.Engine.ExecuteCommand(`textS("${text}", ${color}, ${x}, ${y}, ${scalex}, ${scaley})`);
}

async function ClearScreen(color) {
    await SelectDevice(DISPLAY_ADDRESS);
    await duelink.Engine.ExecuteCommand(`clear(${color})`);
}

async function Show() {
    await SelectDevice(DISPLAY_ADDRESS);
    await duelink.Engine.ExecuteCommand("show()");
}

function RGB(r, g, b) {
    return (r << 16) | (g << 8) | b;
}

async function UpdateScreen(update) {
    if (update) {

        await ClearScreen(0);

        await DrawText("Distance:", RGB(255, 255, 255), 0, 0, 1, 1);
        let dis = distance_val.toFixed(2);
        await DrawText(`${dis} cm`, RGB(0, 255, 0), 5, 10, 1, 1);

        await DrawText("Rotary button:", RGB(255, 255, 255), 0, 20, 1, 1);
        await DrawText(rotary_button_pressed ? "Pressed" : "Released",
            RGB(0, 255, 0), 5, 30, 1, 1);

        await DrawText("Light:", RGB(255, 255, 255), 0, 40, 1, 1);
        await DrawText(`${light_val}%`, RGB(0, 255, 0), 5, 50, 1, 1);

        await Show();
    }
}

// ---------------- Distance ------------------

async function GetDistance() {
    await SelectDevice(DISTANCE_ADDRESS);
    let ret = await duelink.Engine.ExecuteCommand("Distance()");
    let ret1 = parseInt(ret * 10);
    ret = ret1 / 10.0;
    return ret;
}

// ---------------- Rotary ------------------

async function GetRotaryPress() {
    await SelectDevice(ROTARY_ADDRESS);
    let ret = await duelink.Engine.ExecuteCommand("Pressed()");
    return ret !== 0;
}

// ---------------- LEDR16 ------------------

async function SetLedR16(led, value) {
    await SelectDevice(LEDR16_ADDRESS);
    let val = value ? 1 : 0;
    await duelink.Engine.ExecuteCommand(`SetLed(${led},${val})`);
}

async function SetLedR16All(value) {
    await SelectDevice(LEDR16_ADDRESS);
    let val = value ? 1 : 0;

    if (value) {
        for (let led = 1; led <= 16; led++) {
            await duelink.Engine.ExecuteCommand(`SetLed(${led},${val})`);
        }
    } else {
        await duelink.Engine.ExecuteCommand("LedOff()");
    }
}

// ---------------- Servo ------------------

async function SetServo(position) {
    await SelectDevice(SERVO_ADDRESS);
    await duelink.Engine.ExecuteCommand(`ServoSt(1,${position})`);
}

// ---------------- Light ------------------

async function GetLight() {
    await SelectDevice(LIGHT_ADDRESS);
    let ret = await duelink.Engine.ExecuteCommand("Light()");
    return parseInt(ret);
}

// ---------------- Buzzer ------------------

async function PlaySound() {
    await SelectDevice(BUZER_ADDRESS);
    await duelink.Engine.ExecuteCommand("freq(7, 1000, 250, 0.5)");
}

// ---------------- Main Loop ------------------

(async () => {

    while (true) {

        if (counter % 10 === 0) {
            let cur_distance = await GetDistance();
            if (cur_distance !== distance_val) {
                distance_val = cur_distance;
                doUpdateScreen = true;
            }
        }

        if (counter % 11 === 0) {
            let pressed = await GetRotaryPress();
            if (pressed !== rotary_button_pressed) {
                rotary_button_pressed = pressed;

                if (rotary_button_pressed) {
                    await SetLedR16All(true);
                    await SetServo(180);
                } else {
                    await SetLedR16All(false);
                    await SetServo(0);
                }
            }
        }

        if (counter % 12 === 0) {
            let light_tmp = await GetLight();

            if (light_val !== light_tmp) {
                light_val = light_tmp;
                doUpdateScreen = true;
            }

            if (light_val < 10) {
                await PlaySound();
            }
        }

        if (!rotary_button_pressed) {
            await SetLedR16((counter % 16) + 1, ((Math.floor(counter / 16)) % 2 === 0));
        }

        if (counter % 16 === 0) {
            await UpdateScreen(doUpdateScreen);
            doUpdateScreen = false;
        }

        counter++;

        const DELAY_MAX = 100;
        const DELAY_MIN = 5;

        distance_val = Math.max(DELAY_MIN, Math.min(DELAY_MAX, distance_val));

        await Sleep(distance_val);
    }

})();

