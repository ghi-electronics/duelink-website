// In this sample:
// When a button is pressed, set light to white color 100% brightness on that button.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetColor(char button, bool red, bool green, bool blue, int brightness) {
    char cmd[64];
    int c = red ? 1 : 0;

    c = green ? (c | (1 << 1)) : c;
    c = blue  ? (c | (1 << 2)) : c;

    if (brightness > 100) brightness = 100;
    if (brightness < 0)   brightness = 0;

    int index = 0;

    switch (button) {
        case 'A': index = 0; break;
        case 'B': index = 1; break;
        case 'C': index = 2; break;
        case 'D': index = 3; break;
    }

    snprintf(cmd, sizeof(cmd), "SetClr(%d,%d,%d)", index, c, brightness);
    duelink.Engine.ExecuteCommand(cmd);
}

bool IsButtonPressed(char button) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Dread(BtnPin('%c'),1)", button);

    return duelink.Engine.ExecuteCommand(cmd) == 0;
}

bool buttonA_state1 = false;
bool buttonA_state2 = true;

bool buttonB_state1 = false;
bool buttonB_state2 = true;

bool buttonC_state1 = false;
bool buttonC_state2 = true;

bool buttonD_state1 = false;
bool buttonD_state2 = true;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    buttonA_state1 = IsButtonPressed('A');
    buttonB_state1 = IsButtonPressed('B');
    buttonC_state1 = IsButtonPressed('C');
    buttonD_state1 = IsButtonPressed('D');

    if (buttonA_state1 != buttonA_state2) {
        buttonA_state2 = buttonA_state1;

        if (buttonA_state2) {
            SetColor('A', true, true, true, 100);
        } else {
            SetColor('A', false, false, false, 0);
        }
    }

    if (buttonB_state1 != buttonB_state2) {
        buttonB_state2 = buttonB_state1;

        if (buttonB_state2) {
            SetColor('B', true, true, true, 100);
        } else {
            SetColor('B', false, false, false, 0);
        }
    }

    if (buttonC_state1 != buttonC_state2) {
        buttonC_state2 = buttonC_state1;

        if (buttonC_state2) {
            SetColor('C', true, true, true, 100);
        } else {
            SetColor('C', false, false, false, 0);
        }
    }

    if (buttonD_state1 != buttonD_state2) {
        buttonD_state2 = buttonD_state1;

        if (buttonD_state2) {
            SetColor('D', true, true, true, 100);
        } else {
            SetColor('D', false, false, false, 0);
        }
    }

    delay(50);
}
