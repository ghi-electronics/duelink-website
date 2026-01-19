// In this sample:
// Continuously turn the motor A,B forward at 50% speed, then backward at 50% speed,
// with a 2-second delay between each direction change
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetMotorA(int speed) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "SMotorA(%d)", speed);
    duelink.Engine.ExecuteCommand(cmd);
}

void SetMotorB(int speed) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "SMotorB(%d)", speed);
    duelink.Engine.ExecuteCommand(cmd);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    SetMotorA(50);   // forward
    SetMotorB(50);   // forward
    delay(2000);

    SetMotorA(-50);  // backward
    SetMotorB(-50);  // backward
    delay(2000);
}
