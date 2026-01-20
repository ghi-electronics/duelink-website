// In this sample:
// Create a watch using the built-in graphics library.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>
#include <math.h>

// DUELink transport and controller initialization
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

// Default driver CP23 is direct mode, 320x240
const int WIDTH = 64;
const int HEIGHT = 64;
const int CENTER_X = WIDTH;
const int CENTER_Y = HEIGHT / 2;
const int RADIUS = 26;

// Draw text on the screen
void DrawText(const char* text, int color, int x, int y, int scalex, int scaley) {
    char cmd[64];

    // Build command safely on the stack
    snprintf(cmd, sizeof(cmd), "textT(\"%s\", %d, %d, %d)", text, color, x, y);
    duelink.Engine.ExecuteCommand(cmd);
}

// Draw a line
void DrawLine(int x1, int y1, int x2, int y2, int color) {
    char cmd[64];

    // Build command safely on the stack
    snprintf(cmd, sizeof(cmd), "line(%d, %d, %d, %d, %d)", color, x1, y1, x2, y2);
    duelink.Engine.ExecuteCommand(cmd);
}

// Draw a circle
void DrawCircle(int x, int y, int radius, int color) {
    char cmd[64];

    // Build command safely on the stack
    snprintf(cmd, sizeof(cmd), "circle(%d, %d, %d, %d)", color, x, y, radius);
    duelink.Engine.ExecuteCommand(cmd);
}

// Clear the screen
void ClearScreen(int color) {
    char cmd[64];

    // Build command safely on the stack
    snprintf(cmd, sizeof(cmd), "clear(%d)", color);
    duelink.Engine.ExecuteCommand(cmd);
}

// Flush the buffer to the screen
void Show() {
    duelink.Engine.ExecuteCommand("show()");
}

// Watch
// Convert RGB to 24-bit integer
int RGB(int r, int g, int b) {
    return (r << 16) | (g << 8) | b;
}

// Draw hour numbers
void DrawNumbers() {
    for (int h = 1; h <= 12; h++) {
        double angle = PI / 6 * (h - 3); // 0 hour at right
        int x = CENTER_X + (int)(RADIUS * cos(angle));
        int y = CENTER_Y + (int)(RADIUS * sin(angle));

        if (h > 6)
            x -= 2;

        char text[4];
        snprintf(text, sizeof(text), "%d", h);

        DrawText(text, RGB(255, 255, 255), (h < 10) ? x : x - 4, y - 3, 1, 1);
    }
}

// Draw a watch hand
void DrawHand(double angle, int length, int color) {
    int x = CENTER_X + (int)(length * cos(angle));
    int y = CENTER_Y + (int)(length * sin(angle));
    DrawLine(CENTER_X, CENTER_Y, x, y, color);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    // Draw once
    ClearScreen(RGB(0, 0, 0));
}

void loop() {
    // Use millis() as a time source
    unsigned long ms = millis();
    int seconds = (ms / 1000) % 60;
    int minutes = (ms / (1000 * 60)) % 60;
    int hours = (ms / (1000 * 60 * 60)) % 12;

    // Clear screen
    ClearScreen(RGB(0, 0, 0));

    DrawCircle(CENTER_X, CENTER_Y - 1, 31, 1);
    DrawNumbers();

    double secondAngle = PI / 30 * (seconds - 15);
    double minuteAngle = PI / 30 * (minutes - 15 + seconds / 60.0);
    double hourAngle = PI / 6 * (hours - 3 + minutes / 60.0);

    DrawHand(secondAngle, RADIUS - 0, RGB(0, 127, 255)); // Seconds: Blue
    DrawHand(minuteAngle, RADIUS - 5, RGB(0, 255, 0));  // Minute: Green
    DrawHand(hourAngle, RADIUS - 10, RGB(255, 0, 0));   // Hour: Red

    Show();
    delay(10);
}
