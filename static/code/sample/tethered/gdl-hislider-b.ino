// In this sample:
// Update Slide value every second
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

float Slide() {
    return duelink.Engine.ExecuteCommand("Slide()");
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    static bool initialized = false;
    if (!initialized) {

        initialized = true;
    }

    char msg[64];
    snprintf(msg, sizeof(msg), "Value: %d", Slide());
    Serial.println(msg);

    delay(1000);

}