// In this sample:
// Continuously switch relay on/off every 2 seconds
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void Set(bool value) {
    char cmd[64];
    int v = value ? 1 : 0;
    snprintf(cmd, sizeof(cmd), "Set(%d)", v);
    duelink.Engine.ExecuteCommand(cmd);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    delay(2000);
    Set(true);

    delay(2000);
    Set(false);
}
