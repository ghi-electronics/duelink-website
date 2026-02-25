// This sample runs on Arduino UNO 4 WIFI

// In this sample:
// Read acceleration data (X, Y, Z)
//
// - Press the Up button: increases the fan speed (starts at 50%); displays "Up" on the MT1208.
// - Press the Down button: decreases the fan speed; displays "Dn" on the MT1208.
// - Press the Enter button: turns the fan off; displays "En" on the MT1208.
// - A beep plays when any of the Up / Down / Enter buttons is pressed.
//
// Devices need to be connected in the following order:
// - Wireless ESP32 first
// - Fan: device 2
// - MT1208: device 3
// - Retro Sound: device 4
// - Button S7: device 5
// - Accel: device 6


#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int current_dev = -1;

int counter = 0;
int accel_x = 0;
int accel_y = 0;
int accel_z = 0;
float fan_speed = 0.0f;

bool btnUp = false;
bool btnDown = false;
bool btnEnter = false;

unsigned long last_accel_read_x = 0;
unsigned long last_accel_read_y = 0;
unsigned long last_accel_read_z = 0;

void SelectDevice(int dev) {
    if (current_dev != dev) {
        duelink.Engine.Select(dev);
        current_dev = dev;
    }
}

int GetX() {
    SelectDevice(6);
    float x = duelink.Engine.ExecuteCommand("GetX()");
    return (int)x;
}

int GetY() {
    SelectDevice(6);
    float y = duelink.Engine.ExecuteCommand("GetY()");
    return (int)y;
}

int GetZ() {
    SelectDevice(6);
    float z = duelink.Engine.ExecuteCommand("GetZ()");
    return (int)z;
}

bool IsButtonPressed(char button) {
    SelectDevice(5);

    char cmd1[64];
    snprintf(cmd1, sizeof(cmd1), "BtnPin('%c')", button);
    float pin_f = duelink.Engine.ExecuteCommand(cmd1);
    int pin = (int)pin_f;

    char cmd2[64];
    snprintf(cmd2, sizeof(cmd2), "btndown(%d)", pin);
    float r_f = duelink.Engine.ExecuteCommand(cmd2);
    int r = (int)r_f;

    return r == 1;
}

void SetFan(float speed) {
    SelectDevice(2);

    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Fan(%f)", speed);
    duelink.Engine.ExecuteCommand(cmd);
}

void SetText(const char* c) {
    SelectDevice(3);

    duelink.Engine.ExecuteCommand("Clear(0)");

    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Text(\"%s\",1,0,0)", c);
    duelink.Engine.ExecuteCommand(cmd);

    duelink.Engine.ExecuteCommand("show()");
}

void PlayBeep() {
    SelectDevice(4);
    duelink.Engine.ExecuteCommand("freq(1,1000,100,0.5)"); // use freq for non-blocking response
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    last_accel_read_x = millis();
    last_accel_read_y = millis();
    last_accel_read_z = millis();
}

void loop() {

    int count = counter % 7;
    unsigned long now_ms = millis();
    unsigned long diff = 0;

    switch (count) {
        case 0:
            diff = now_ms - last_accel_read_x;
            if (diff > 3000) {
                accel_x = GetX();
                last_accel_read_x = now_ms;
            }
            break;

        case 1:
            diff = now_ms - last_accel_read_y;
            if (diff > 3000) {
                accel_y = GetY();
                last_accel_read_y = now_ms;
            }
            break;

        case 2:
            diff = now_ms - last_accel_read_z;
            if (diff > 3000) {
                accel_z = GetZ();
                last_accel_read_z = now_ms;
                Serial.print("X = ");
                Serial.print(accel_x);
                Serial.print(", Y = ");
                Serial.print(accel_y);
                Serial.print(", Z = ");
                Serial.println(accel_z);
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

        default:
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

    delay(1);
}