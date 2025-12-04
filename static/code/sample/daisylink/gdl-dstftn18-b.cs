// In this sample:
// Create a watch using the built-in graphics library.

using GHIElectronics.DUELink;
using System;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

const int WIDTH = 160/2;
const int HEIGHT = 128/2;
const int CENTER_X = WIDTH / 2;
const int CENTER_Y = HEIGHT / 2;
const int RADIUS = 30;

// API wrapper
void DrawTextTiny(string text, int color, int x, int y) {
    duelink.Engine.ExecuteCommand($"textT(\"{text}\", {color}, {x}, {y})");
}
void DrawText(string text, int color, int x, int y, int scalex, int scaley) {
    duelink.Engine.ExecuteCommand($"textS(\"{text}\", {color}, {x}, {y}, {scalex}, {scaley})");
}
void DrawLine(int x1, int y1, int x2, int y2, int color) {
    duelink.Engine.ExecuteCommand($"line({color}, {x1}, {y1}, {x2}, {y2})");
}
void FillRect(int color, int x, int y, int width, int height) {
    duelink.Engine.ExecuteCommand($"fill({color}, {x}, {y}, {width}, {height})");
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

// Draw a pixel on the screen
void SetPixel(int color, int x, int y) {
    // Implement hardware-specific code here
    duelink.Engine.ExecuteCommand($"Pixel({color},{x},{y})");
}

void DrawNumbers() {
    for (var h = 1; h <= 12; h++) {
        var angle = Math.PI / 6 * (h - 3); // 0 hour at right
        var x = CENTER_X + (int)((RADIUS - 5) * Math.Cos(angle));
        var y = CENTER_Y + (int)((RADIUS - 5) * Math.Sin(angle));        
        DrawTextTiny(h.ToString(), RGB(255, 255, 255), x-2, y-2);
    }
}

// Draw a watch hand
void DrawHand(double angle, int length, int color) {
    var x = CENTER_X + (int)(length * Math.Cos(angle));
    var y = CENTER_Y + (int)(length * Math.Sin(angle));
    DrawLine(CENTER_X, CENTER_Y, x, y, color);
}


// Main loop
while (true) {
    // Clear screen
    ClearScreen(RGB(0, 127, 255));

    DrawCircle(CENTER_X, CENTER_Y, RADIUS, RGB(0, 0, 127));
    DrawNumbers();

    var now = DateTime.Now;

    var secondAngle = Math.PI / 30 * (now.Second - 15);
    var minuteAngle = Math.PI / 30 * (now.Minute - 15 + now.Second / 60.0);
    var hourAngle = Math.PI / 6 * (now.Hour % 12 - 3 + now.Minute / 60.0);

    DrawHand(hourAngle, RADIUS - 10, RGB(255, 0, 0));    // Hour: Red
    DrawHand(minuteAngle, RADIUS - 7, RGB(0, 255, 0));  // Minute: Green
    DrawHand(secondAngle, RADIUS - 5, RGB(0, 0, 255));   // Second: Blue

    DrawTextTiny("DUELink", RGB(255, 0, 255), 20, 30);
    Show();
}



