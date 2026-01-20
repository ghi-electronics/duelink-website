// In this sample:
// Detect if the button is pressed
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

bool IsBtnPressed() {
    // Button index 1
    return duelink.Button.Down(1);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    if (IsBtnPressed()) {
        Serial.println("Button Pressed");
    }

    delay(100);
}
