// In this sample:
// Detect a pressed key
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

bool IsKeyChange() {
    float ret = duelink.Engine.ExecuteCommand("IsKeyChange()");
    return ret > 0;
}

int ReadKey() {
    float ret = duelink.Engine.ExecuteCommand("RdKey()");
    return (int)ret;
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    duelink.Engine.ExecuteCommand("Scan()");
    delay(10);

    if (IsKeyChange()) {
        int key = ReadKey();

        if (key == 0) {
            Serial.println("Key released");
        } else {
            char msg[32];
            snprintf(msg, sizeof(msg), "Key pressed: %c", (char)key);
            Serial.println(msg);
        }
    }

    delay(100);
}
