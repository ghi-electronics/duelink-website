// In this sample:
// Detect motion
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int Detect() {
    return (int)duelink.Engine.ExecuteCommand("Detect()");
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

    auto detect = Detect();

    

    if (detect != 0) {

    Serial.println("Motion Detected");

    

    }

    

    delay(1000);

}