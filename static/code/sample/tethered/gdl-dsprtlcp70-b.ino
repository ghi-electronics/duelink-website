// In this sample:
// Draw the text "DUELink" in multiple colors at the center of the screen.
// Draw a rectangle under the text
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

// DUELink transport and controller
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void Clear() {
    // Clear the display list
    duelink.Engine.ExecuteCommand("DLClear()");

    // Set clear color to black
    duelink.Engine.ExecuteCommand("DLCmd(C_CLEAR_COLOR,{0,0,0})");

    // Clear the screen
    duelink.Engine.ExecuteCommand("DLCmd(C_CLEAR,{})");
}

void FillRect(uint32_t color, int x, int y, int width, int height) {
    char cmd[64];

    uint8_t r = (color >> 16) & 0xFF;
    uint8_t g = (color >> 8) & 0xFF;
    uint8_t b = (color >> 0) & 0xFF;

    // Set drawing color
    snprintf(cmd, sizeof(cmd), "DLCmd(C_COLOR,{%u,%u,%u})", r, g, b);
    duelink.Engine.ExecuteCommand(cmd);

    // Begin rectangle drawing
    duelink.Engine.ExecuteCommand("DLCmd(C_BEGIN,{RECTS})");

    // First vertex
    snprintf(cmd, sizeof(cmd), "DLCmd(C_VERTEX2F,{%d,%d})", x << 4, y << 4);
    duelink.Engine.ExecuteCommand(cmd);

    // Second vertex
    snprintf(cmd, sizeof(cmd), "DLCmd(C_VERTEX2F,{%d,%d})",
             (width + x) << 4, (height + y) << 4);
    duelink.Engine.ExecuteCommand(cmd);

    // End drawing
    duelink.Engine.ExecuteCommand("DLCmd(C_END,{})");
}

void DrawChar(char c, uint32_t color, int x, int y, int size) {
    char cmd[64];

    uint8_t r = (color >> 16) & 0xFF;
    uint8_t g = (color >> 8) & 0xFF;
    uint8_t b = (color >> 0) & 0xFF;

    // Set drawing color
    snprintf(cmd, sizeof(cmd), "DLCmd(C_COLOR,{%u,%u,%u})", r, g, b);
    duelink.Engine.ExecuteCommand(cmd);

    // Begin bitmap drawing
    duelink.Engine.ExecuteCommand("DLCmd(C_BEGIN,{BITMAPS})");

    // Draw character
    snprintf(cmd, sizeof(cmd),
             "DLCmd(C_VERTEX2II,{%d,%d,%d,'%c'})",
             x, y, size, c);
    duelink.Engine.ExecuteCommand(cmd);

    // End drawing
    duelink.Engine.ExecuteCommand("DLCmd(C_END,{})");
}

void Show() {
    // Display the list and swap buffers
    duelink.Engine.ExecuteCommand("DLCmd(C_DISPLAY,{})");
    duelink.Engine.ExecuteCommand("DLSwap()");
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    // Replicates the top-level C# logic

    Clear();

    DrawChar('D', 0xff0000, 300, 192, 31);
    DrawChar('U', 0x00ff00, 335, 192, 31);
    DrawChar('E', 0x0000ff, 370, 192, 31);
    DrawChar('L', 0x00ffff, 405, 192, 31);
    DrawChar('i', 0xff00ff, 435, 192, 31);
    DrawChar('n', 0xffff00, 460, 192, 31);
    DrawChar('k', 0xffffff, 495, 192, 31);

    FillRect(0xF0000F, 300, 250, 224, 10);

    Show();

    // Run once, then idle
    while (true) {
        delay(1000);
    }
}
