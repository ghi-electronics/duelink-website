// In this sample:
// Display pressure in kPa and PSI units
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

float ReadPSI() {
    return duelink.Engine.ExecuteCommand("PSI()");
}

float ReadkPa() {
    return duelink.Engine.ExecuteCommand("kPa()");
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    float psi = ReadPSI();
    float kpa = ReadkPa();

    char msg1[32];
    snprintf(msg1, sizeof(msg1), "PSI: %.2f", psi);
    Serial.println(msg1);

    char msg2[32];
    snprintf(msg2, sizeof(msg2), "kPa: %.2f", kpa);
    Serial.println(msg2);

    delay(1000);
}
