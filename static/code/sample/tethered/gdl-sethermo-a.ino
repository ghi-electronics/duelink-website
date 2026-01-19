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
    float temp = GetTemperature();

    char msg[32];
    snprintf(msg, sizeof(msg), "Temperature: %.2f", temp);
    Serial.println(msg);

    delay(1500);
}
