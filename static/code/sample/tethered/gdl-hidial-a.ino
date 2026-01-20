// In this sample:
// Update Dial value every second
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

float Dial() {
    return duelink.Engine.ExecuteCommand("Dial()");
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    float value = Dial();

    Serial.print("Value: ");
    Serial.println(value);

    delay(1000);
}
