// In this sample:
// Update X, Y and Button status every 100ms
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int button_pin = 0;

int ReadX() {
    float ret = duelink.Engine.ExecuteCommand("JoystickX()");
    return (int)ret;
}

int ReadY() {
    float ret = duelink.Engine.ExecuteCommand("JoystickY()");
    return (int)ret;
}

int ReadButton() {
    int ret = duelink.Digital.Read(button_pin, 1); // PullUp = 1
    return ret == 0 ? 0 : 1;
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    button_pin = (int)duelink.Engine.ExecuteCommand("BtnPin()");
}

void loop() {
    int x = ReadX();
    int y = ReadY();
    int bt = ReadButton();

    char msg[64];
    snprintf(msg, sizeof(msg), "X = %d, Y = %d, Button status: %d", x, y, bt);
    Serial.println(msg);

    delay(100);
}
