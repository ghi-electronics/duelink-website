// In this sample:
// Continuously change colors: white, red, green, and blue, every second
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void Setled(int led, uint32_t color) {
    char cmd[32];
    snprintf(cmd, sizeof(cmd), "SetLed(%d,%lu)", led, (unsigned long)color);
    duelink.Engine.ExecuteCommand(cmd);
}

int count = 0;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    switch (count % 4) {
        case 0: // white
            Setled(0, 0xFFFFFF);
            Setled(1, 0xFFFFFF);
            Setled(2, 0xFFFFFF);
            break;
        case 1: // red
            Setled(0, 0xFF0000);
            Setled(1, 0xFF0000);
            Setled(2, 0xFF0000);
            break;
        case 2: // green
            Setled(0, 0x00FF00);
            Setled(1, 0x00FF00);
            Setled(2, 0x00FF00);
            break;
        case 3: // blue
            Setled(0, 0x0000FF);
            Setled(1, 0x0000FF);
            Setled(2, 0x0000FF);
            break;
    }
    count++;
    delay(1000);
}
