// In this sample:
// When the LDR button is not pressed: the left and right eyes blink every second.
// When the LDR button is pressed: the left and right eyes blink every 200 ms.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetLeftEye(int red, int green, int blue) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "LEye(%d,%d,%d)", red, green, blue);
    duelink.Engine.ExecuteCommand(cmd);
}

void SetRightEye(int red, int green, int blue) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "REye(%d,%d,%d)", red, green, blue);
    duelink.Engine.ExecuteCommand(cmd);
}


bool IsButtonPressed() {
    const char* cmd = "dread(20,2)";
    auto ret = duelink.Engine.ExecuteCommand(cmd);
    return ret == 1;
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    static bool initialized = false;
    if (!initialized) {

    // Use ExecuteCommand to send standard library

    duelink.Engine.ExecuteCommand("statled(100, 100, 0)");

    // Use defined function

        initialized = true;
    }

    int delay = 500;

    auto btnPress = IsButtonPressed();

    

    if (btnPress) {

    delay = 100;

    }

    

    SetLeftEye(255, 255, 255);

    SetRightEye(255, 255, 255);

    delay(delay);

    SetLeftEye(0, 0, 0);

    SetRightEye(0, 0, 0);

    delay(delay);

}