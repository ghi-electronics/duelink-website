// In this sample:
// Warm up the sensor for 10 seconds, then read the analog value
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void Heater(bool value) {
    char cmd[32];
    snprintf(cmd, sizeof(cmd), "Heater(%d)", value ? 1 : 0);
    duelink.Engine.ExecuteCommand(cmd);
}

float SensorRead() {
    return duelink.Engine.ExecuteCommand("SenRead()");
}

int counter = 0;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    delay(1000);

    if (counter == 0) {
        Heater(true);
    }

    counter++;

    if (counter < 10) {
        char msg[32];
        snprintf(msg, sizeof(msg), "Wait for %d/10 seconds", counter);
        Serial.println(msg);
        return;
    }

    float volt = SensorRead();

    char msg[32];
    snprintf(msg, sizeof(msg), "Volt: %.2f", volt);
    Serial.println(msg);
}
