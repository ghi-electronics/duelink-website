// In this sample:
// LEDs will run in circle mode.
// Press buttons U, D, L, R: LEDs turn on at positions 8, 4, 6, and 2.
// Press button A: All red LEDs turn on.
// Press button B: All red LEDs turn off.
// Press LDR button: Return to circle mode.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

bool run_ring = true;
bool IsBtnPressed(char button) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "BtnDown(BtnPin('%d'))", button);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    auto ret = __ec;
    return ret == 1;
}
void SetLed(int index, bool value) {
    auto val = value ? 1 : 0;
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "SetLed(%d,%d)", index, val);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    __ec;

}
void SetAllLed(bool value) {
    auto val = value ? 1 : 0;
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "SetAllLed(%d)", val);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    __ec;

}

int count = 0;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    static bool initialized = false;
    if (!initialized) {

        initialized = true;
    }

    if (IsBtnPressed('U')) {

    SetLed(8, true);

    run_ring = false;

    }

    if (IsBtnPressed('R')) {

    SetLed(2, true);

    run_ring = false;

    }

    if (IsBtnPressed('D')) {

    SetLed(4, true);

    run_ring = false;

    }

    if (IsBtnPressed('L')) {

    SetLed(6, true);

    run_ring = false;

    }

    if (IsBtnPressed('A')) {

    SetAllLed(true);

    run_ring = false;

    }

    if (IsBtnPressed('B')) {

    SetAllLed(false);

    run_ring = false;

    }

    

    if (duelink.Engine.ExecuteCommand("dread(20,2)") !=0) {

    count = 0;

    SetAllLed(false);

    run_ring = true;

    delay(100);

    }

    

    if (run_ring) {

    SetLed((count % 8) + 1, (count / 8) % 2 == 0 ? true : false);

    }

    count++;

    

    delay(100);

}