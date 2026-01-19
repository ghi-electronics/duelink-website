// In this sample:
// Get the current rotary value
// Detect if the rotary button is pressed
// Note:
// The rotary driver uses interrupts, so DUEScript user code must remain in a while-loop indefinitely.
// Append the while-loop below to ensure the user code stays in a while-loop indefinitely if the device does not already have one.
// /////// User code //////
// Asio(1) # Allow communication between host and device
// while (1) # while loop indefinitely
//    Wait(1000)
// wend
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int GetValue() {
    auto ret = duelink.Engine.ExecuteCommand("GetValue()");
    return (int)ret;
}
bool Pressed() {
    auto ret = duelink.Engine.ExecuteCommand("Pressed()");
    return ret != 0;
}

int distance_bk = 0;
bool button_status_bk = false;

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

    auto distance = GetValue();

    auto button_status = Pressed();

    

    if (distance_bk != distance) {

    distance_bk = distance;

    char msg[64];
    snprintf(msg, sizeof(msg), "Value: %d", distance);
    Serial.println(msg);

    }

    

    if (button_status_bk != button_status) {

    button_status_bk = button_status;

    if (button_status_bk)

    Serial.println("Button pressed!");

    else

    Serial.println("Button released!");

    }

    

    delay(10);

}