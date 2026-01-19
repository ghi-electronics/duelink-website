// In this sample:
// Using the DUELink graphics library
// Configuration for two vertically scanned 32x8 panels creating a 64x8 LED display
// Scrolling DUELink text on the panels with red, green, and blue colors
// Visit https://www.duelink.com/docs/engine/graphics
// for more DUELink graphics APIs: DrawLine, Text with scale, Rect, Image, etc.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

const int SCREEN_WIDTH = 64;   // this will be two panels width: 32x2
const int SCREEN_HEIGHT = 8;   // height

int posX = SCREEN_WIDTH;       // start from the right
int count = 0;

void Configuration() {
    float config_array[4] = {};
    config_array[0] = 14;              // Pin used
    config_array[1] = SCREEN_WIDTH;
    config_array[2] = SCREEN_HEIGHT;
    config_array[3] = 1;               // Vertical scanning

    duelink.Graphics.Configuration(
        3,                             // type 3 - WS2812
        (const float*)config_array,
        4,
        (int)SCREEN_WIDTH,
        (int)SCREEN_HEIGHT,
        1                              // buffered x1
    );
}

void Clear(uint32_t color) {
    duelink.Graphics.Clear(color);
}

void DrawText(const char* text, uint32_t color, int x, int y) {
    duelink.Graphics.Text(text, color, x, y);
}

void Show() {
    duelink.Graphics.Show();
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    Configuration();
}

void loop() {
    uint32_t color = 0xFF0000;

    if ((count % 3) == 1) {
        color = 0x00FF00;
    }
    if ((count % 3) == 2) {
        color = 0x0000FF;
    }

    Clear(0);
    DrawText("DUELink", color, posX, 0);
    Show();

    posX--;
    if (posX < -40) {
        posX = SCREEN_WIDTH;
        count++;
    }

    delay(10);
}
