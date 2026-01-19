// In this sample:
// Detect if any button (Up, Down, Left, Right, Forward, Back) is pressed; the LED corresponding to the button will turn on.
// Detect if Enter is pressed and all leds turn to off
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

bool IsBtnPressed(char button) {
    char cmd[64];

    snprintf(cmd, sizeof(cmd), "BtnPin('%c')", button);
    int code = (int)duelink.Engine.ExecuteCommand(cmd);

    // Button.Down(code)
    return duelink.Button.Down(code);
}

void SetLed(char button, bool value) {
    char cmd[64];
    int v = value ? 1 : 0;

    snprintf(cmd, sizeof(cmd), "SetLed('%c',%d)", button, v);
    duelink.Engine.ExecuteCommand(cmd);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    if (IsBtnPressed('U')) {
        Serial.println("Button Up Pressed");
        SetLed('U', true);
    }

    if (IsBtnPressed('D')) {
        Serial.println("Button Down Pressed");
        SetLed('D', true);
    }

    if (IsBtnPressed('L')) {
        Serial.println("Button Left Pressed");
        SetLed('L', true);
    }

    if (IsBtnPressed('R')) {
        Serial.println("Button Right Pressed");
        SetLed('R', true);
    }

    if (IsBtnPressed('F')) {
        Serial.println("Button Forward Pressed");
        SetLed('F', true);
    }

    if (IsBtnPressed('B')) {
        Serial.println("Button Back Pressed");
        SetLed('B', true);
    }

    if (IsBtnPressed('E')) {
        Serial.println("Button Enter Pressed");

        SetLed('U', false);
        SetLed('D', false);
        SetLed('L', false);
        SetLed('R', false);
        SetLed('F', false);
        SetLed('B', false);
    }

    delay(100);
}
