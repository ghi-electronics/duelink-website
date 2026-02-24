// In this sample:
// The wireless ESP32 turns on Bluetooth as a wireless bridge, allowing a PC to read
// acceleration data (X, Y, Z) through a Bluetooth serial port.
//
// - Press the Up button: increases the fan speed (starts at 50%); displays "Up" on the MT1208.
// - Press the Down button: decreases the fan speed; displays "Dn" on the MT1208.
// - Press the Enter button: turns the fan off; displays "En" on the MT1208.
// - A beep plays when any of the Up / Down / Enter buttons is pressed.
//
// Devices must be connected in the following order:
// - Wireless ESP32 first
// - Fan: device H1-1
// - MT1208: device H1-2
// - Retro Sound: device H1-3
// - Button S7: device H1-4
// - Accel: device H1-5

// The wireless ESP32 need script to initialize as Bluetooth bridge, use DUEScipt below:
//### USRER CODE START #####
//statled(0, 1, 0)  # turn the statled off
//StartBT("duelink2") # set BT name duelink2
//statled(100, 100, 0) # Blinking: Wait for pair / connect
//while (1)
//  wait(100)
//  if (dread(5, 1) = 0)
//      break
//  end
//wend
//statled(1,0,0) # Statled stay on: Connect successful
//Bridge(1) # Start bridge 
//### USRER CODE END #####

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB("COM75"));
await duelink.Connect();

// Sleep helper (ms)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Methods
let current_dev = -1;

async function SelectDevice(dev) {
    if (current_dev !== dev) {
        await duelink.Engine.Select(dev);
        current_dev = dev;
    }
}

async function GetX() {
    await SelectDevice(5);
    const x = parseInt(await duelink.Engine.ExecuteCommand("GetX()"));
    return x;
}

async function GetY() {
    await SelectDevice(5);
    const y = parseInt(await duelink.Engine.ExecuteCommand("GetY()"));
    return y;
}

async function GetZ() {
    await SelectDevice(5);
    const z = parseInt(await duelink.Engine.ExecuteCommand("GetZ()"));
    return z;
}

async function IsButtonPressed(button) {
    await SelectDevice(4);
    const pin = parseInt(await duelink.Engine.ExecuteCommand(`BtnPin('${button}')`));
    const r = parseInt(await duelink.Engine.ExecuteCommand(`btndown(${pin})`));
    return r === 1;
}

async function SetFan(speed) {
    await SelectDevice(1);
    await duelink.Engine.ExecuteCommand(`Fan(${speed})`);
}

async function SetText(c) {
    await SelectDevice(2);
    await duelink.Engine.ExecuteCommand("Clear(0)");
    await duelink.Engine.ExecuteCommand(`Text("${c}",1,0,0)`);
    await duelink.Engine.ExecuteCommand("show()");
}

async function PlayBeep() {
    await SelectDevice(3);
    // Use freq for non-blocking response
    await duelink.Engine.ExecuteCommand("freq(1,1000,100,0.5)");
}


// Main loop wrapped in async function
async function main() {

    let counter = 0;
    let accel_x = 0;
    let accel_y = 0;
    let accel_z = 0;
    let fan_speed = 0.0;

    let btnUp = false;
    let btnDown = false;
    let btnEnter = false;

    let last_accel_read_x = Date.now();
    let last_accel_read_y = Date.now();
    let last_accel_read_z = Date.now();

    while (true) {

        const count = counter % 7;
        let diff = 0;

        if (count === 0) {
            diff = Date.now() - last_accel_read_x;
            if (diff > 3000) {
                accel_x = await GetX();
                last_accel_read_x = Date.now();
            }
        }

        else if (count === 1) {
            diff = Date.now() - last_accel_read_y;
            if (diff > 3000) {
                accel_y = await GetY();
                last_accel_read_y = Date.now();
            }
        }

        else if (count === 2) {
            diff = Date.now() - last_accel_read_z;
            if (diff > 3000) {
                accel_z = await GetZ();
                last_accel_read_z = Date.now();
                console.log(`X = ${accel_x}, Y = ${accel_y}, Z = ${accel_z}`);
            }
        }

        else if (count === 3) {
            btnUp = await IsButtonPressed('U');
        }

        else if (count === 4) {
            btnDown = await IsButtonPressed('D');
        }

        else if (count === 5) {
            btnEnter = await IsButtonPressed('E');
        }

        if (btnUp) {
            btnUp = false;
            fan_speed += 10;

            if (fan_speed < 50) {
                fan_speed = 50;
            }
            if (fan_speed > 100) {
                fan_speed = 100;
            }

            await SetFan(fan_speed);
            await PlayBeep();
            await SetText("Up");
        }

        if (btnDown) {
            btnDown = false;
            fan_speed -= 10;

            if (fan_speed < 50) {
                fan_speed = 1; // Original logic preserved
            }

            await SetFan(fan_speed);
            await PlayBeep();
            await SetText("Dn");
        }

        if (btnEnter) {
            btnEnter = false;
            fan_speed = 1;
            await SetFan(fan_speed);
            await PlayBeep();
            await SetText("En");
        }

        counter++;

        await sleep(1);
    }
}


// Start program
main();