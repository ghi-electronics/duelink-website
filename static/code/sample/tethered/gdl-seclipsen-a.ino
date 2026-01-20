// In this sample:
// Touch on pin 2, status LED turns on
// Touch on pin 7, status LED turns off
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

// DUELink transport and controller
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetStatLed(bool value) {
    char cmd[32];
    int high = value ? 1 : 0;
    int low  = !value ? 1 : 0;

    snprintf(cmd, sizeof(cmd), "Statled(%d,%d,0)", high, low);
    duelink.Engine.ExecuteCommand(cmd);
}

bool Touched(int pin) {
    char cmd[32];

    // ExecuteCommand always returns a float number
    snprintf(cmd, sizeof(cmd), "PulseIn(%d,1000,0,100)", pin);
    float ret = duelink.Engine.ExecuteCommand(cmd);

    if (ret > 110) {
        return true;
    }

    return false;
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    if (Touched(2)) {
        SetStatLed(true);
    }

    if (Touched(7)) {
        SetStatLed(false);
    }

    delay(50);
}
