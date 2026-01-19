// In this sample:
// Read temperature every 1.5 second
// ±2°C Accuracy
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

float GetTemperature() {
    return duelink.Engine.ExecuteCommand("ReadTemp()");
}

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

// TODO: Manual conversion needed: Serial.println($"Temperature: {GetTemperature().ToString()} ");

    delay(1500);

}