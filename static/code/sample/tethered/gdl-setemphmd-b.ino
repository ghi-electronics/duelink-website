// In this sample:
// Read temperature and humidity every 1.5 second
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

float GetTemperature() {
    return duelink.Engine.ExecuteCommand("Temp(SenPin(), SenType())");
}

float GetHumidity() {
    return duelink.Engine.ExecuteCommand("Humid(SenPin(), SenType())");
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    float temp = GetTemperature();
    float humid = GetHumidity();

    char msg1[32];
    snprintf(msg1, sizeof(msg1), "Temperature: %.2f", temp);
    Serial.println(msg1);

    char msg2[32];
    snprintf(msg2, sizeof(msg2), "Humidity: %.2f", humid);
    Serial.println(msg2);

    delay(1500);
}
