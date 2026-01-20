// In this sample:
// Repeatedly set the servo position to 0, 45, 90, 135, and 180, then reset it to 0.
// There is a one-second delay after each change.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetServo(int position) {
    if (position < 0 || position > 180) {
        return;
    }

    char cmd[64];
    snprintf(cmd, sizeof(cmd), "ServoSt(1,%d)", position);
    duelink.Engine.ExecuteCommand(cmd);
}

int degree = 0;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    SetServo(degree);

    if (degree == 180) {
        degree = 0;
    } else {
        degree += 45;
    }

    delay(1000);
}
