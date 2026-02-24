// In this sample:
// The wireless ESP32 turns on Bluetooth as a wireless bridge, allowing a PC to read
// acceleration data (X, Y, Z) through a Bluetooth serial port.
//
// - Press the Up button: increases the fan speed (starts at 50%); displays "Up" on the MT1208.
// - Press the Down button: decreases the fan speed; displays "Dn" on the MT1208.
// - Press the Enter button: turns the fan off; displays "En" on the MT1208.
// - A beep plays when any of the Up / Down / Enter buttons is pressed.
//
// Devices need to be connected in the following order:
// - Wrireless ESP32 at first
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


using System;
using System.Net;
using System.Xml.Linq;
using GHIElectronics.DUELink;

var duelink = new DUELinkController("COM75"); // Bluetooth COM port, change to user comport
var current_dev = -1;

void SelectDevice(int dev) {

    if (current_dev != dev) {
        duelink.Engine.Select(dev);
        current_dev = dev;
    }
}
int GetX() {
    SelectDevice(5);

    var x = (int)duelink.Engine.ExecuteCommand("GetX()");


    return x;
}
int GetY() {

    SelectDevice(5);
    var y = (int)duelink.Engine.ExecuteCommand("GetY()");


    return y;
}
int GetZ() {
    SelectDevice(5);

    var z = (int)duelink.Engine.ExecuteCommand("GetZ()");


    return z;
}

bool IsButtonPressed(char button) {
    SelectDevice(4);
    var pin = (int)duelink.Engine.ExecuteCommand($"BtnPin('{button}')");
    var r = (int)duelink.Engine.ExecuteCommand($"btndown({pin})");

    return r == 1;
}

void SetFan(float speed) {
    SelectDevice(1);
    duelink.Engine.ExecuteCommand($"Fan({speed})");
}

void SetText(string c) {
    SelectDevice(2);
    duelink.Engine.ExecuteCommand("Clear(0)");
    duelink.Engine.ExecuteCommand($"Text(\"{c}\",1,0,0)");
    duelink.Engine.ExecuteCommand("show()");
}

void PlayBeep() {
    SelectDevice(3);
    duelink.Engine.ExecuteCommand("freq(1,1000,100,0.5)"); // use freq for non-blocking response    
}

var counter = 0;
var accel_x = 0;
var accel_y = 0;
var accel_z = 0;
var fan_speed = 0f;

var btnUp = false;
var btnDown = false;
var btnEnter = false;

var last_accel_read_x = DateTime.Now;
var last_accel_read_y = DateTime.Now;
var last_accel_read_z = DateTime.Now;

while (true) {
    var count = counter % 7;
    var diff = 0d;
    switch (count) {
        case 0:
            diff = (DateTime.Now - last_accel_read_x).TotalMilliseconds;

            if (diff > 3000) {
                accel_x = GetX();
                last_accel_read_x = DateTime.Now;
            }
            break;
        case 1:
            diff = (DateTime.Now - last_accel_read_y).TotalMilliseconds;

            if (diff > 3000) {
                accel_y = GetY();
                last_accel_read_y = DateTime.Now;
            }
            break;
        case 2:
            diff = (DateTime.Now - last_accel_read_z).TotalMilliseconds;

            if (diff > 3000) {
                accel_z = GetZ();
                last_accel_read_z = DateTime.Now;
                Console.WriteLine($"X = {accel_x}, Y = {accel_y}, Z = {accel_z}");
            }

            break;

        case 3:
            btnUp = IsButtonPressed('U');
            break;

        case 4:
            btnDown = IsButtonPressed('D');
            break;
        case 5:
            btnEnter = IsButtonPressed('E');
            break;
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

        SetFan(fan_speed);
        PlayBeep();
        SetText("Up");
    }

    if (btnDown) {
        btnDown = false;
        fan_speed -= 10;

        if (fan_speed < 50) {
            fan_speed = 1;
        }
        SetFan(fan_speed);
        PlayBeep();
        SetText("Dn");
    }

    if (btnEnter) {
        btnEnter = false;
        fan_speed = 1;
        SetFan(fan_speed);
        PlayBeep();
        SetText("En");
    }

    counter++;

    Thread.Sleep(1);
}

