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
    static bool initialized = false;
    if (!initialized) {

        initialized = true;
    }

// TODO: Manual conversion needed: Serial.println($"Temperature: {GetTemperature().ToString()} ");

// TODO: Manual conversion needed: Serial.println($"Humidity: {GetHumidity().ToString()} ");

    

    delay(1500);

}