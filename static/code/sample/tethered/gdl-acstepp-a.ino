// In this sample:
// Tested on Bi-Polar Stepper Motor Driver-2M542
// Continuously move axes X, Y, and Z forward and backward for 400 steps,
// with a 10 ms delay per step.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void StepX(int direction, int stepnum) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "StepX(%d,%d)", direction, stepnum);
    duelink.Engine.ExecuteCommand(cmd);

    // Blocking mode
    delay(stepnum);
}

void StepY(int direction, int stepnum) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "StepY(%d,%d)", direction, stepnum);
    duelink.Engine.ExecuteCommand(cmd);

    // Blocking mode
    delay(stepnum);
}

void StepZ(int direction, int stepnum) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "StepZ(%d,%d)", direction, stepnum);
    duelink.Engine.ExecuteCommand(cmd);

    // Blocking mode
    delay(stepnum);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    StepX(1, 400); // forward
    StepY(1, 400); // forward
    StepZ(1, 400); // forward
    delay(1000);

    StepX(0, 400); // backward
    StepY(0, 400); // backward
    StepZ(0, 400); // backward
    delay(1000);
}
