// In this sample:
// Reading analog value from the pin AN
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

float ReadAnalog() {
    return duelink.Engine.ExecuteCommand("vread(5)");
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    float value = ReadAnalog();

    char msg[32];
    snprintf(msg, sizeof(msg), "Analog: %.2f", value);
    Serial.println(msg);

    delay(1000);
}
