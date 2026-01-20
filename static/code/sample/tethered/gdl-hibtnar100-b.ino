// In this sample:
// When button isn't pressed: Led0: red; Led1: green; Led2: blue; LED control: on
// When button is pressed: All LEDs off
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int button_pin = 0;

void SetLedRing(int index, uint8_t red, uint8_t green, uint8_t blue) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "SetRing(%d,%d,%d,%d)", index, red, green, blue);
    duelink.Engine.ExecuteCommand(cmd);
}

void SetLedControl(bool value) {
    char cmd[64];
    int v = value ? 1 : 0;
    snprintf(cmd, sizeof(cmd), "SetCtr(%d)", v);
    duelink.Engine.ExecuteCommand(cmd);
}

bool IsButtonPressed() {
    // InputType.PullUp → 1
    return duelink.Digital.Read(button_pin, 1) == 0;
}

bool button_state1 = false;
bool button_state2 = true;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    // BtnPin()
    button_pin = (int)duelink.Engine.ExecuteCommand("BtnPin()");
}

void loop() {
    button_state1 = IsButtonPressed();

    if (button_state1 != button_state2) {
        button_state2 = button_state1;

        if (button_state2) {
            // Button pressed: all LEDs off
            SetLedControl(false);
            SetLedRing(0, 0, 0, 0);
            SetLedRing(1, 0, 0, 0);
            SetLedRing(2, 0, 0, 0);
        } else {
            // Button released: RGB pattern
            SetLedRing(0, 255, 0, 0);
            SetLedRing(1, 0, 255, 0);
            SetLedRing(2, 0, 0, 255);
            SetLedControl(true);
        }
    }

    delay(100);
}
