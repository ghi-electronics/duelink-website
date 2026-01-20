// In this sample:
// Scan all switches and indicate if any switch is in the ON position.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

bool Read(int index) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Read(%d)", index);

    return duelink.Engine.ExecuteCommand(cmd) != 0;
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    for (int i = 0; i < 10; i++) {
        if (Read(i + 1)) {
            Serial.print("Detected ON on switch index: ");
            Serial.println(i + 1);
        }
    }

    delay(1000);
}
