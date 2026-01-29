// In this sample:
// Toggle the statled every 500ms
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetLed() {
    duelink.Engine.ExecuteCommand("statled(500,500,0)");
}

void setup() {
    Wire1.begin();
    duelink.Connect();

    SetLed();
}

void loop() {
    delay(500);
}
