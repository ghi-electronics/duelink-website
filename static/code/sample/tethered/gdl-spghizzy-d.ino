//This sample runs on Arduino UNO 4 WIFI
// In this sample:
// The left and right ears stay on.
// When no button is pressed: the left and right eyes blink every second.
// When the LDR button is pressed: the left and right eyes blink every 200 ms, and a beep plays as long as the button is held down.

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

// Initialize DUELink using Wire1 for STM32
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

// User-defined functions
void SetLeftEye(int red, int green, int blue) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "LEye(%d,%d,%d)", red, green, blue);
    duelink.Engine.ExecuteCommand(cmd);
}

void SetRightEye(int red, int green, int blue) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "REye(%d,%d,%d)", red, green, blue);
    duelink.Engine.ExecuteCommand(cmd);
}

void SetEar(bool left, bool right) {
    char cmd[64];
    int l = left ? 1 : 0;
    int r = right ? 1 : 0;
    snprintf(cmd, sizeof(cmd), "Ear(%d,%d)", l, r);
    duelink.Engine.ExecuteCommand(cmd);
}

void SetMouth(bool left, bool center, bool right) {
    char cmd[64];
    int l = left ? 1 : 0;
    int c = center ? 1 : 0;
    int r = right ? 1 : 0;
    snprintf(cmd, sizeof(cmd), "Mouth(%d,%d,%d)", l, c, r);
    duelink.Engine.ExecuteCommand(cmd);
}

void PlayBeep() {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "freq(3,1000,100,0.5)");
    duelink.Engine.ExecuteCommand(cmd);
    delay(100);
}

bool IsButtonPressed() {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "dread(20,2)");
    int ret = duelink.Engine.ExecuteCommand(cmd);
    return ret == 1;
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    // Use ExecuteCommand to send standard library
    duelink.Engine.ExecuteCommand("statled(100, 100, 0)");

    // Use defined function
    SetEar(true, true);
    PlayBeep();
}

void loop() {
    int blinkDelay = 500;
    bool btnPress = IsButtonPressed();

    if (btnPress) {
        blinkDelay = 100;
        PlayBeep();
    }

    SetMouth(btnPress, btnPress, btnPress);
    SetLeftEye(255, 255, 255);
    SetRightEye(255, 255, 255);
    delay(blinkDelay);
    SetLeftEye(0, 0, 0);
    SetRightEye(0, 0, 0);
    delay(blinkDelay);
}
