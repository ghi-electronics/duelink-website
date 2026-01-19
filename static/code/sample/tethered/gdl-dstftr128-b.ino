// In this sample:
// Create a watch using the built-in graphics library.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

// DUELink transport and controller
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

// Default driver R128 is buffer mode, multiple 3. 240/3 = 80
const int WIDTH = 80;
const int HEIGHT = 80;
const int CENTER_X = WIDTH / 2;
const int CENTER_Y = HEIGHT / 2;
const int RADIUS = 32;

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

void DrawNumbers() {
    char text[4];

    for (int h = 1; h <= 12; h++) {
        double angle = PI / 6 * (h - 3); // 0 hour at right
        int x = CENTER_X + (int)(RADIUS * cos(angle));
        int y = CENTER_Y + (int)(RADIUS * sin(angle));

        if (h > 6)
            x -= 4;

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

// Software clock based on millis()
unsigned long startMillis = 0;
double last_sec = 0.0;
double last_min = 0.0;
double last_hour = 0.0;
int counter = 0;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    startMillis = millis();

    // draw once
    ClearScreen(RGB(0, 127, 255));
}

void loop() {
    unsigned long elapsed = (millis() - startMillis) / 1000;

    int seconds = elapsed % 60;
    int minutes = (elapsed / 60) % 60;
    int hours = (elapsed / 3600) % 12;

    double secondAngle = PI / 30 * (seconds - 15);
    double minuteAngle = PI / 30 * (minutes - 15 + seconds / 60.0);
    double hourAngle = PI / 6 * (hours - 3 + minutes / 60.0);

    if (last_sec != secondAngle) {
        DrawHand(last_sec, RADIUS, RGB(0, 127, 255));   // fill background color
        last_sec = secondAngle;
        DrawHand(secondAngle, RADIUS, RGB(0, 0, 255));  // Second: Blue

        // Redraw minute and hour hands if necessary
        DrawHand(minuteAngle, RADIUS - 5, RGB(0, 255, 0));  // Minute: Green
        DrawHand(hourAngle, RADIUS - 10, RGB(255, 0, 0));   // Hour: Red
        counter++;
    }
    else if (last_min != minuteAngle) {
        DrawHand(last_min, RADIUS - 5, RGB(0, 127, 255));   // fill background color
        last_min = minuteAngle;
        DrawHand(minuteAngle, RADIUS - 5, RGB(0, 255, 0));  // Minute: Green
    }
    else if (last_hour != hourAngle) {
        DrawHand(last_hour, RADIUS - 10, RGB(0, 127, 255));   // fill background color
        last_hour = hourAngle;
        DrawHand(hourAngle, RADIUS - 10, RGB(255, 0, 0));    // Hour: Red
    }
    else {
        DrawNumbers();
        DrawText("DUELink", RGB(255, 0, 255), CENTER_X - 18, CENTER_Y + 10, 1, 1);
        Show();
        delay(100);
    }
}
