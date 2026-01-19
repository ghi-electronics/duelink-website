// In this sample:
// Read temperature, humidity
// Read Air Quality Index
// Read Total Volatile Organic Compounds
// Read Equivalent CO₂
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

// DUELink transport and controller
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

float ReadTemperature() {
    // ExecuteCommand always returns a float number
    return duelink.Engine.ExecuteCommand("AhtTemp()");
}

float ReadHumidity() {
    // ExecuteCommand always returns a float number
    return duelink.Engine.ExecuteCommand("AhtHumid()");
}

int AirQualityIndex() {
    // ExecuteCommand always returns a float number
    return (int)duelink.Engine.ExecuteCommand("EnsAqi()");
}

int TVOC() { // Total Volatile Organic Compounds
    // ExecuteCommand always returns a float number
    return (int)duelink.Engine.ExecuteCommand("EnsTvoc()");
}

int EquivalentCO2() { // Equivalent CO₂
    // ExecuteCommand always returns a float number
    return (int)duelink.Engine.ExecuteCommand("EnsEco2()");
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    float temperature = ReadTemperature();
    float humidity = ReadHumidity();
    int aqi = AirQualityIndex();
    int tvoc = TVOC();
    int eco2 = EquivalentCO2();

    Serial.print("Temp: ");
    Serial.print(temperature);
    Serial.print(", Humidity: ");
    Serial.println(humidity);

    Serial.print("AirQualityIndex: ");
    Serial.print(aqi);
    Serial.print(", TVOC: ");
    Serial.print(tvoc);
    Serial.print(", EquivalentCO2: ");
    Serial.println(eco2);

    delay(2000);
}
