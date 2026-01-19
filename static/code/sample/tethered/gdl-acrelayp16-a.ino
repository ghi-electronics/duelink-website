// In this sample:
// Continuously switch relay 2 on/off every 2 seconds
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void Set(int relay, bool value) {
    char cmd[64];
    int v = value ? 1 : 0;
    snprintf(cmd, sizeof(cmd), "Set(%d,%d)", relay, v);
    duelink.Engine.ExecuteCommand(cmd);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    delay(2000);
    Set(2, true);

    delay(2000);
    Set(2, false);
}
