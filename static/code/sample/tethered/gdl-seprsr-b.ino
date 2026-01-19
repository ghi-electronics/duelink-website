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
    static bool initialized = false;
    if (!initialized) {

        initialized = true;
    }

    char msg[64];
    snprintf(msg, sizeof(msg), "PSI: %d", ReadPSI());
    Serial.println(msg);

    char msg[64];
    snprintf(msg, sizeof(msg), "kPa: %d", ReadkPa());
    Serial.println(msg);

    

    delay(1000);

}