// In this sample:
// Display current (A)
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

// DUELink transport and controller
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

float ReadCurrent() {
    // Build the command using a stack buffer (no heap allocation)
    char command[64];
    snprintf(command, sizeof(command), "Current()");

    // ExecuteCommand always returns a float value
    return duelink.Engine.ExecuteCommand(command);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    float current = ReadCurrent();

    Serial.print("Current: ");
    Serial.print(current);
    Serial.println(" A");

    delay(1000);
}
