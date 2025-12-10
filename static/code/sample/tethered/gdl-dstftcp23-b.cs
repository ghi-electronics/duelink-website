// In this sample:
// Create a watch using the built-in graphics library.

using GHIElectronics.DUELink;
using System;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

// Default driver CP23 is directly mode, 320x240
const int WIDTH = 320;
const int HEIGHT = 240;
const int CENTER_X = WIDTH / 2;
const int CENTER_Y = HEIGHT / 2;
const int RADIUS = 100;

void DrawText(string text, int color, int x, int y, int scalex, int scaley) {
    duelink.Engine.ExecuteCommand($"textS(\"{text}\", {color}, {x}, {y}, {scalex}, {scaley})");
}
void DrawLine(int x1, int y1, int x2, int y2, int color) {
    duelink.Engine.ExecuteCommand($"line({color}, {x1}, {y1}, {x2}, {y2})");
}
void DrawCircle(int x, int y, int radius, int color) {
    duelink.Engine.ExecuteCommand($"circle({color}, {x}, {y}, {radius})");
}

void ClearScreen(int color) {
    duelink.Engine.ExecuteCommand($"clear({color})");
}

// Watch
// Convert RGB to 24-bit integer
int RGB(int r, int g, int b) => (r << 16) | (g << 8) | b;

void DrawNumbers() {
    for (var h = 1; h <= 12; h++) {
        var angle = Math.PI / 6 * (h - 3); // 0 hour at right
        var x = CENTER_X + (int)((RADIUS - 10) * Math.Cos(angle));
        var y = CENTER_Y + (int)((RADIUS - 10) * Math.Sin(angle));
        DrawText(h.ToString(), RGB(255, 255, 255), x, y - 2, 2, 2);
    }
}

// Draw a watch hand
void DrawHand(double angle, int length, int color) {
    var x = CENTER_X + (int)(length * Math.Cos(angle));
    var y = CENTER_Y + (int)(length * Math.Sin(angle));
    DrawLine(CENTER_X, CENTER_Y, x, y, color);
}

var last_sec = 0d;
var last_min = 0d;
var last_hour = 0d;
var counter = 0;

// draw once
ClearScreen(RGB(0, 127, 255));
DrawCircle(CENTER_X + 4, CENTER_Y + 2, RADIUS + 2, RGB(0, 0, 127));
DrawNumbers();

// Main loop
while (true) {
    // Clear screen

    var now = DateTime.Now;

    var secondAngle = Math.PI / 30 * (now.Second - 15);
    var minuteAngle = Math.PI / 30 * (now.Minute - 15 + now.Second / 60.0);
    var hourAngle = Math.PI / 6 * (now.Hour % 12 - 3 + now.Minute / 60.0);

    if (last_sec != secondAngle) {
        DrawHand(last_sec, RADIUS - 10, RGB(0, 127, 255));   // fill background color
        last_sec = secondAngle;
        DrawHand(secondAngle, RADIUS - 10, RGB(0, 0, 255));   // Second: Blue

        // when second go over min and hour, it may clear them, redraw them:
        DrawHand(minuteAngle, RADIUS - 20, RGB(0, 255, 0));  // Minute: Green
        DrawHand(hourAngle, RADIUS - 30, RGB(255, 0, 0));    // Hour: Red
        counter++;
    }

    else if (last_min != minuteAngle) {
        DrawHand(last_min, RADIUS - 20, RGB(0, 127, 255));   // fill background color
        last_min = minuteAngle;
        DrawHand(minuteAngle, RADIUS - 20, RGB(0, 255, 0));  // Minute: Green
    }

    else if (last_hour != hourAngle) {
        DrawHand(last_hour, RADIUS - 30, RGB(0, 127, 255));   // fill background color
        last_hour = hourAngle;
        DrawHand(hourAngle, RADIUS - 30, RGB(255, 0, 0));    // Hour: Red
    }
    else {
        DrawText("DUELink", RGB(255, 0, 255), CENTER_X - 30, CENTER_X - 5, 2, 2);
        Thread.Sleep(100);
    }

}



