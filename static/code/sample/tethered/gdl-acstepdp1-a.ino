// In this sample:
// Continuously set the stepper motor to 200 steps, alternating the direction between forward and backward
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void Set(int stepdrive_index, int direction, int step_num) {
    char cmd[64];

    if (direction != 1) {
        direction = 0;
    }

    switch (stepdrive_index) {
        case 1:
            snprintf(cmd, sizeof(cmd), "step_m1(%d,%d)", direction, step_num);
            duelink.Engine.ExecuteCommand(cmd);
            break;

        case 2: // available on StepDrive P3 only
            snprintf(cmd, sizeof(cmd), "step_m2(%d,%d)", direction, step_num);
            duelink.Engine.ExecuteCommand(cmd);
            break;

        case 3: // available on StepDrive P3 only
            snprintf(cmd, sizeof(cmd), "step_m3(%d,%d)", direction, step_num);
            duelink.Engine.ExecuteCommand(cmd);
            break;
    }
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    Set(1, 1, 200);   // forward
    delay(1000);

    Set(1, -1, 200);  // backward
    delay(1000);
}
