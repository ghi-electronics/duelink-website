// In this sample:
// Reading X,Y,Z values
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

// DUELink transport and controller
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int GetX() {
    // ExecuteCommand always returns a float number
    return (int)duelink.Engine.ExecuteCommand("getx()");
}

int GetY() {
    // ExecuteCommand always returns a float number
    return (int)duelink.Engine.ExecuteCommand("gety()");
}

int GetZ() {
    // ExecuteCommand always returns a float number
    return (int)duelink.Engine.ExecuteCommand("getz()");
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    int x = GetX();
    int y = GetY();
    int z = GetZ();

    Serial.print("X = ");
    Serial.print(x);
    Serial.print(", Y = ");
    Serial.print(y);
    Serial.print(", Z = ");
    Serial.println(z);

    delay(1000);
}
