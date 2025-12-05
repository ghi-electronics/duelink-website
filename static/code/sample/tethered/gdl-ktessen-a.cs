// In this sample:
// 1. Read the distance and display it on the TFT N18
// 2. Continuously scan LEDs from D1 to D16 (play LEDs in a circular - circle mode)
// 3. When the rotary button is pressed:
//  - All LEDs from D1 to D16 on LEDR16 turn on.
//  - The servo rotates to 180 degrees.
// 4. When the rotary button is released:
//  - All LEDs from D1 to D16 on LEDR16 return to circular mode.
//  - The servo rotates back to 0 degrees.
// 5. When light detection is below 20%, the buzzer repeatedly beeps. If it is above 20%, the buzzer stays quiet.
// 6. Changes in distance will adjust the LED circle speed. For example:
//    5 cm = 5 ms delay, 10 cm = 10 ms delay, and so on.

using System;
using System.Drawing;
using System.Net;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

const int DISTANCE_ADDRESS = 1;
const int DISPLAY_ADDRESS = 2;
const int SERVO_ADDRESS = 3;
const int LEDR16_ADDRESS = 4;
const int BUZER_ADDRESS = 5;
const int ROTARY_ADDRESS = 6;
const int LIGHT_ADDRESS = 7;

var currentAddress = -1;

var distance_val = -1.0;
var rotary_val = 0;
var counter = 0;
var counter2 = 0;
var doUpdateScreen = false;
var rotary_button_pressed = false;
var light_val = 0;

void SelectDevice(int deviceAddress) {
    // Optimize the bus, reduce bus traffic
    // No send command if address are same
    if (currentAddress != deviceAddress) {
        currentAddress = deviceAddress;
        duelink.Engine.ExecuteCommand($"sel({currentAddress})");
        Thread.Sleep(2); // give some delay
    }
}


// Display
void DrawText(string text, int color, int x, int y, int scalex, int scaley) {
    SelectDevice(DISPLAY_ADDRESS);
    duelink.Engine.ExecuteCommand($"textS(\"{text}\", {color}, {x}, {y}, {scalex}, {scaley})");
}
void ClearScreen(int color) {
    SelectDevice(DISPLAY_ADDRESS);
    duelink.Engine.ExecuteCommand($"clear({color})");
}
void Show() {
    SelectDevice(DISPLAY_ADDRESS);
    duelink.Engine.ExecuteCommand("show()");
}
int RGB(int r, int g, int b) => (r << 16) | (g << 8) | b;
void UpdateScreen(bool update) {
    if (update) {

        ClearScreen(0);

        DrawText("Distance:", RGB(255, 255, 255), 0, 0, 1, 1);
        var dis = distance_val.ToString("F2");
        DrawText($"{dis} cm", RGB(0, 255, 0), 5, 10, 1, 1);

        DrawText("Rotary button:", RGB(255, 255, 255), 0, 20, 1, 1);
        DrawText(rotary_button_pressed ? "Pressed" : "Released", RGB(0, 255, 0), 5, 30, 1, 1);

        DrawText("Light:", RGB(255, 255, 255), 0, 40, 1, 1);
        DrawText($"{light_val}%", RGB(0, 255, 0), 5, 50, 1, 1);

        Show();
    }
}

// Distance
float GetDistance() {
    SelectDevice(DISTANCE_ADDRESS);
    var ret = duelink.Engine.ExecuteCommand("Distance()");

    var ret1 = ((int)(ret * 10));
    ret = ret1 / 10.0f;
    return ret;
}

// Rotary
//int GetRotary() {
//    SelectDevice(ROTARY_ADDRESS);
//    var ret = duelink.Engine.ExecuteCommand("GetValue()");
//    return (int)ret;
//}

bool GetRotaryPress() {
    SelectDevice(ROTARY_ADDRESS);
    var ret = duelink.Engine.ExecuteCommand("Pressed()");
    return ret != 0;
}

// LedR16
void SetLedR16(int led, bool value) {
    SelectDevice(LEDR16_ADDRESS);
    var val = value ? 1 : 0;
    duelink.Engine.ExecuteCommand($"SetLed({led},{val})");

}

void SetLedR16All(bool value) {
    SelectDevice(LEDR16_ADDRESS);
    var val = value ? 1 : 0;
    if (value) {
        for (var led = 1; led <= 16; led++) {
            duelink.Engine.ExecuteCommand($"SetLed({led},{val})");
        }
    }
    else {
        duelink.Engine.ExecuteCommand("LedOff()");
    }
}

//Servo
void SetServo(int position) {
    SelectDevice(SERVO_ADDRESS);
    duelink.Engine.ExecuteCommand($"ServoSt(1,{position})");
}

// Light
int GetLight() {
    SelectDevice(LIGHT_ADDRESS);
    var ret = duelink.Engine.ExecuteCommand("Light()");
    return (int)ret;
}

// Buzzer
void PlaySound() {
    SelectDevice(BUZER_ADDRESS);
    duelink.Engine.ExecuteCommand("freq(7, 1000, 250, 0.5)");
}



while (true) {

    if (counter % 10 == 0) {
        var cur_distance = GetDistance();
        if (cur_distance != distance_val) {
            distance_val = cur_distance;
            doUpdateScreen = true;
        }
    }
    if (counter % 11 == 0) {
        var pressed = GetRotaryPress();
        if (pressed != rotary_button_pressed) {
            rotary_button_pressed = pressed;

            if (rotary_button_pressed) {
                SetLedR16All(true);
                SetServo(180);

            }
            else {
                SetLedR16All(false);
                SetServo(0);
            }
        }

    }
    if (counter % 12 == 0) {
        var light_tmp = GetLight();

        if (light_val != light_tmp) {
            light_val = light_tmp;
            doUpdateScreen = true;
        }

        if (light_val < 20) {
            PlaySound();
        }
    }

    //if (counter % 13 == 0) {
    //    var rotary_tmp = GetRotary();

    //    if (rotary_val != rotary_tmp) {
    //        rotary_val = rotary_tmp;
    //        doUpdateScreen = true;            
    //    }
    //}

    if (!rotary_button_pressed) {
        SetLedR16((counter % 16) + 1, (counter / 16) % 2 == 0 ? true : false);
    }

    if (counter % 16 == 0) {
        UpdateScreen(doUpdateScreen);
        doUpdateScreen = false;        
    }

    counter++;
    const int DELAY_MAX = 100;
    const int DELAY_MIN = 5;

    distance_val = Math.Max(DELAY_MIN, Math.Min(DELAY_MAX, distance_val));
    
    Thread.Sleep((int)distance_val);
}



