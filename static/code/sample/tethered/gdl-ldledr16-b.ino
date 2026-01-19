// In this sample:
// Scan from led D1 to led D16
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetLed(int index, bool value) {
    auto val = value ? 1 : 0;
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "SetLed(%d,%d)", index, val);
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

    SetLed((count % 16) + 1, (count / 16) % 2 == 0 ? true : false);

    count++;

    

    delay(100);

}