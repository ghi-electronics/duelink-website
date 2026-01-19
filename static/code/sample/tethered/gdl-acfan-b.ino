// In this sample:
// Continuously turn the fan forward at 50% speed, then backward at 50% speed,
// with a 2-second delay between each direction change
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetSpeed(int speed) {
    char cmd[64];
    int v = speed;

    if (v > 100) {
        v = 100;
    }
    if (v < -100) {
        v = -100;
    }

    snprintf(cmd, sizeof(cmd), "Fan(%d)", v);
    duelink.Engine.ExecuteCommand(cmd);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    delay(2000);
    SetSpeed(50);

    delay(2000);
    SetSpeed(-50);
}
