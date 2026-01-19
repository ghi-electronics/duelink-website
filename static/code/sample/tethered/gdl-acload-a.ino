// In this sample:
// Continuously toggle P1 to P8, with a 10ms delay for each pin
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetPin(int pin, bool value) {
    char cmd[64];
    int v = value ? 1 : 0;
    snprintf(cmd, sizeof(cmd), "dwrite(%d,%d)", pin + 1, v);
    duelink.Engine.ExecuteCommand(cmd);
}

int counter = 0;
bool value = false;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    delay(10);

    SetPin(counter % 8, value);

    counter++;

    if ((counter % 8) == 0) {
        value = !value;
    }
}
