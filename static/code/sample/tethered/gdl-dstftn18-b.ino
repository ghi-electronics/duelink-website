// In this sample:
// Create a watch using the built-in graphics library.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

// DUELink transport and controller
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

const int WIDTH = 160 / 2;
const int HEIGHT = 128 / 2;
const int CENTER_X = WIDTH / 2;
const int CENTER_Y = HEIGHT / 2;
const int RADIUS = 30;

// API wrapper
void DrawTextTiny(const char* text, int color, int x, int y) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd),
             "textT(\"%s\", %d, %d, %d)",
             text, color, x, y);
    duelink.Engine.ExecuteCommand(cmd);
}

void DrawText(const char* text, int color, int x, int y, int scalex, int scaley) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd),
             "textS(\"%s\", %d, %d, %d, %d, %d)",
             text, color, x, y, scalex, scaley);
    duelink.Engine.ExecuteCommand(cmd);
}

void DrawLine(int x1, int y1, int x2, int y2, int color) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd),
             "line(%d, %d, %d, %d, %d)",
             color, x1, y1, x2, y2);
    duelink.Engine.ExecuteCommand(cmd);
}

void FillRect(int color, int x, int y, int width, int height) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd),
             "fill(%d, %d, %d, %d, %d)",
             color, x, y, width, height);
    duelink.Engine.ExecuteCommand(cmd);
}

void DrawCircle(int x, int y, int radius, int color) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd),
             "circle(%d, %d, %d, %d)",
             color, x, y, radius);
    duelink.Engine.ExecuteCommand(cmd);
}

void ClearScreen(int color) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "clear(%d)", color);
    duelink.Engine.ExecuteCommand(cmd);
}

void Show() {
    duelink.Engine.ExecuteCommand("show()");
}

// Watch
// Convert RGB to 24-bit integer
int RGB(int r, int g, int b) {
    return (r << 16) | (g << 8) | b;
}

// Draw a pixel on the screen
void SetPixel(int color, int x, int y) {
    // Implement hardware-specific code here
    char cmd[64];
    snprintf(cmd, sizeof(cmd),
             "Pixel(%d,%d,%d)",
             color, x, y);
    duelink.Engine.ExecuteCommand(cmd);
}

void DrawNumbers() {
    char text[4];

    for (int h = 1; h <= 12; h++) {
        double angle = PI / 6 * (h - 3); // 0 hour at right
        int x = CENTER_X + (int)((RADIUS - 5) * cos(angle));
        int y = CENTER_Y + (int)((RADIUS - 5) * sin(angle));

        snprintf(text, sizeof(text), "%d", h);
        DrawTextTiny(text, RGB(255, 255, 255), x - 2, y - 2);
    }
}

// Draw a watch hand
void DrawHand(double angle, int length, int color) {
    int x = CENTER_X + (int)(length * cos(angle));
    int y = CENTER_Y + (int)(length * sin(angle));
    DrawLine(CENTER_X, CENTER_Y, x, y, color);
}

// Software clock based on millis()
// This replaces DateTime.Now from the C# sample
unsigned long startMillis = 0;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    startMillis = millis();
}

void loop() {
    // Clear screen
    ClearScreen(RGB(0, 127, 255));

    DrawCircle(CENTER_X, CENTER_Y, RADIUS, RGB(0, 0, 127));
    DrawNumbers();

    unsigned long elapsed = (millis() - startMillis) / 1000;

    int seconds = elapsed % 60;
    int minutes = (elapsed / 60) % 60;
    int hours = (elapsed / 3600) % 12;

    double secondAngle = PI / 30 * (seconds - 15);
    double minuteAngle = PI / 30 * (minutes - 15 + seconds / 60.0);
    double hourAngle = PI / 6 * (hours - 3 + minutes / 60.0);

    DrawHand(hourAngle, RADIUS - 10, RGB(255, 0, 0));   // Hour: Red
    DrawHand(minuteAngle, RADIUS - 7, RGB(0, 255, 0)); // Minute: Green
    DrawHand(secondAngle, RADIUS - 5, RGB(0, 0, 255)); // Second: Blue

    DrawTextTiny("DUELink", RGB(255, 0, 255), 20, 30);
    Show();

    delay(100);
}
