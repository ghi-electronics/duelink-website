// In this sample:
// Read X,Y,Z and Temperature on DOF9
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int GetX() {
    return (int)duelink.Engine.ExecuteCommand("_x");
}

int GetY() {
    return (int)duelink.Engine.ExecuteCommand("_y");
}

int GetZ() {
    return (int)duelink.Engine.ExecuteCommand("_z");
}

float GetTemperature() {
    return duelink.Engine.ExecuteCommand("_t");
}

void ActiveAccel() {
    duelink.Engine.ExecuteCommand("RAccel()");
}

void ActiveGyro() {
    duelink.Engine.ExecuteCommand("RGyro()");
}

void ActiveCompass() {
    duelink.Engine.ExecuteCommand("RCompass()");
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    ActiveAccel();
    {
        char msg[64];
        snprintf(msg, sizeof(msg), "Accel X = %d, Y = %d, Z = %d", GetX(), GetY(), GetZ());
        Serial.println(msg);
    }

    ActiveGyro();
    {
        char msg[64];
        snprintf(msg, sizeof(msg), "Gyro X = %d, Y = %d, Z = %d, Temperature = %.2f", GetX(), GetY(), GetZ(), GetTemperature());
        Serial.println(msg);
    }

    ActiveCompass();
    {
        char msg[64];
        snprintf(msg, sizeof(msg), "Compass X = %d, Y = %d, Z = %d", GetX(), GetY(), GetZ());
        Serial.println(msg);
    }

    delay(2000);
}
