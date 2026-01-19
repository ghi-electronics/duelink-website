// In this sample:
// Pull light value every second
// When light below 25, turn the statled on
// When light higher 25, turn the statled off
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int GetLight() {
    float ret = duelink.Engine.ExecuteCommand("Light()");
    return (int)ret;
}

void SetStatLed(bool on) {
    if (on) {
        duelink.Engine.ExecuteCommand("statled(1,0,0)");
    } else {
        duelink.Engine.ExecuteCommand("statled(0,1,0)");
    }
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    int light = GetLight();

    if (light < 25) {
        SetStatLed(true);
    } else {
        SetStatLed(false);
    }

    char msg[32];
    snprintf(msg, sizeof(msg), "Light value: %d", light);
    Serial.println(msg);

    delay(1000);
}
