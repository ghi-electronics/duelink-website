// In this sample:
// Continuously set servo 1 from 0 to 180 degree
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void Set(int servo, int degree) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "ServoSt(%d,%d)", servo, degree);
    duelink.Engine.ExecuteCommand(cmd);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    Set(1, 0);
    delay(1000);

    Set(1, 45);
    delay(1000);

    Set(1, 90);
    delay(1000);

    Set(1, 135);
    delay(1000);

    Set(1, 180);
    delay(1000);

    delay(1000);
}
