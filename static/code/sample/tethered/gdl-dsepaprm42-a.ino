// In this sample:
// Draw a red circle with white borders.
// Display the text "DUELink" in white at the center of the circle.
// Draw a white rectangle at the top of the circle.
// Display the text "!Smart module!" in red at the top of the circle.
// Show() takes 20 seconds to flush the current buffer to the screen.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

// DUELink transport and controller initialization
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

// Select black and white drawing mode
void DrawOnBlackWhite() {
    duelink.Engine.ExecuteCommand("DrawOnBW()");
}

// Select red drawing mode
void DrawOnRed() {
    duelink.Engine.ExecuteCommand("DrawOnRed()");
}

// Draw text on the screen
void DrawText(const char* text, int color, int x, int y, int scalex, int scaley) {
    int c = color > 0 ? 1 : 0;
    char cmd[64];

    // Build command safely on the stack
    snprintf(cmd, sizeof(cmd), "texts(\"%s\",%d,%d,%d,%d,%d)",
             text, c, x, y, scalex, scaley);
    duelink.Engine.ExecuteCommand(cmd);
}

// Draw a circle
void DrawCircle(int color, int x, int y, int radius) {
    int c = color > 0 ? 1 : 0;
    char cmd[64];

    // Build command safely on the stack
    snprintf(cmd, sizeof(cmd), "circle(%d,%d,%d,%d)", c, x, y, radius);
    duelink.Engine.ExecuteCommand(cmd);
}

// Draw a filled rectangle
void Fillrect(int color, int x, int y, int width, int height) {
    int c = color > 0 ? 1 : 0;
    char cmd[64];

    // Build command safely on the stack
    snprintf(cmd, sizeof(cmd), "Fill(%d,%d,%d,%d,%d)",
             c, x, y, width, height);
    duelink.Engine.ExecuteCommand(cmd);
}

// Clear the screen
void Clear(int color) {
    int c = color > 0 ? 1 : 0;
    char cmd[64];

    // Build command safely on the stack
    snprintf(cmd, sizeof(cmd), "Clear(%d)", c);
    duelink.Engine.ExecuteCommand(cmd);
}

// Flush the buffer to the screen
void Show() {
    duelink.Engine.ExecuteCommand("show()");
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

static int count = 0;
void loop() {
    if (count == 0) {
        count = 1; // we set only once
        // First screen: black and white background with white graphics
        DrawOnBlackWhite();
        Clear(0);
        DrawText("DUELink", 1, 60, 70, 2, 3);
        DrawCircle(1, 100, 75, 56);
        DrawCircle(1, 100, 75, 57);
        DrawCircle(1, 100, 75, 63);
        DrawCircle(1, 100, 75, 64);
        Fillrect(1, 53, 40, 95, 20);
        Show();

        // Wait for 20 seconds to flush the screen
        delay(20 * 1000);

        // Second screen: red background with text and circles
        DrawOnRed();
        Clear(0);
        DrawText("!Smart Modules!", 1, 55, 47, 1, 1);
        DrawCircle(1, 100, 75, 58);
        DrawCircle(1, 100, 75, 59);
        DrawCircle(1, 100, 75, 60);
        DrawCircle(1, 100, 75, 61);
        DrawCircle(1, 100, 75, 62);
        Show();

        // Wait for 20 seconds to flush the screen
        delay(20 * 1000);
    }
}
