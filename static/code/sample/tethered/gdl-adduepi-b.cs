// In this sample:
// Create a watch using the built-in graphics library.

using GHIElectronics.DUELink;
using System;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

// Default driver CP23 is directly mode, 320x240
const int WIDTH = 64;
const int HEIGHT = 64;
const int CENTER_X = WIDTH;
const int CENTER_Y = HEIGHT / 2;
const int RADIUS = 26;

void DrawText(string text, int color, int x, int y, int scalex, int scaley) {    
    duelink.Engine.ExecuteCommand($"textT(\"{text}\", {color}, {x}, {y})");
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

void Show() {
    duelink.Engine.ExecuteCommand("show()");
}

// Watch
// Convert RGB to 24-bit integer
int RGB(int r, int g, int b) => (r << 16) | (g << 8) | b;

void DrawNumbers() {
    for (var h = 1; h <= 12; h++) {
        var angle = Math.PI / 6 * (h - 3); // 0 hour at right
        var x = CENTER_X + (int)((RADIUS - 0) * Math.Cos(angle));
        var y = CENTER_Y + (int)((RADIUS - 0) * Math.Sin(angle));

        if (h > 6)
            x -= 2;

        DrawText(h.ToString(), RGB(255, 255, 255), (h < 10) ? x:x-4, y-3 , 1, 1);
    }
}

// Draw a watch hand
void DrawHand(double angle, int length, int color) {
    var x = CENTER_X + (int)(length * Math.Cos(angle));
    var y = CENTER_Y + (int)(length * Math.Sin(angle));
    DrawLine(CENTER_X, CENTER_Y, x, y, color);
}

// draw once
ClearScreen(RGB(0, 0, 0));

// Main loop
while (true) {
    // Clear screen

    var now = DateTime.Now;
    ClearScreen(RGB(0, 0, 0));
    DrawCircle(CENTER_X, CENTER_Y-1, 31, 1);
    DrawNumbers();

    var secondAngle = Math.PI / 30 * (now.Second - 15);
    var minuteAngle = Math.PI / 30 * (now.Minute - 15 + now.Second / 60.0);
    var hourAngle = Math.PI / 6 * (now.Hour % 12 - 3 + now.Minute / 60.0);

    DrawHand(secondAngle, RADIUS - 0, RGB(0, 127, 255));   // fill background color
    DrawHand(minuteAngle, RADIUS - 5, RGB(0, 255, 0));  // Minute: Green
    DrawHand(hourAngle, RADIUS - 10, RGB(255, 0, 0));    // Hour: Red

    Show();
    Thread.Sleep(10);
}


