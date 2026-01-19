// In this sample:
// Update distance in cm every second
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

// DUELink transport and controller
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

float GetDistance() {
    // Build the command using a stack buffer (no heap allocation)
    char command[64];
    snprintf(command, sizeof(command), "Distance()");

    // ExecuteCommand always returns a float value
    return duelink.Engine.ExecuteCommand(command);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    float distance = GetDistance();

    Serial.print("Distance: ");
    Serial.print(distance);
    Serial.println(" cm");

    delay(1000);
}
