// In this sample:
// Warm up the sensor for 10 seconds, then read the analog value
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void Heater(bool value) {
    auto v = value ? 1 : 0;
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Heater(%d)", v);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    __ec;
}

float SensorRead() {
    auto ret = duelink.Engine.ExecuteCommand("SenRead()");
    return ret;
}

int counter = 0;

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

    delay(1000);

    

    // Wait for heat on for 10 seconds

    if (counter == 0) {

    Heater(true);

    }

    counter++;

    

    if (counter < 10) {

    char msg[64];
    snprintf(msg, sizeof(msg), "Wait for %d/10 seconds", counter);
    Serial.println(msg);

    continue;

    }

    

    auto volt = SensorRead();

    

    char msg[64];
    snprintf(msg, sizeof(msg), "Volt: %d", volt);
    Serial.println(msg);

}