// In this sample:
// Control a DMX light.
// Set the color to red, green, or blue.
// Set the brightness from 0 to 255.
// Issue: The DMX light may stop working randomly.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

uint8_t data[4];

void EnableTransmit(bool value) {
    duelink.Digital.Write(5, value ? 1 : 0);
    duelink.Digital.Write(6, value ? 1 : 0);
}

void Initialize() {
    duelink.Uart.Configuration(250000, 512 + 1);
    EnableTransmit(true);
}

void SetColor(uint8_t red, uint8_t green, uint8_t blue) {
    data[1] = red;
    data[2] = green;
    data[3] = blue;
}

void SetBrightness(int brightness) {
    if (brightness < 0) brightness = 0;
    if (brightness > 255) brightness = 255;
    data[0] = (uint8_t)brightness;
}

void Flush() {
    duelink.DMX.Write(data);
    delay(100);
}

int color = 0;
int brightness = 0;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    Initialize();
}

void loop() {
    int c = color % 4;

    switch (c) {
        case 0: // red
            SetColor(255, 0, 0);
            break;

        case 1: // green
            SetColor(0, 255, 0);
            break;

        case 2: // blue
            SetColor(0, 0, 255);
            break;

        case 3: // white
            SetColor(255, 255, 255);
            break;
    }

    SetBrightness(brightness);
    Flush();

    brightness += 25;
    if (brightness >= 255) {
        brightness = 0;
        color++;
    }

    delay(10);
}
