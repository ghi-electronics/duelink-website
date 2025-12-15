// In this sample:
// Draw a red circle with white borders.
// Display the text "DUELink" in white at the center of the circle.
// Draw a white rectangle at the top of the circle.
// Display the text "!Smart module!" in red at the top of the circle.
// Show() takes 20 seconds to flush the current buffer to the screen.

using System;
using GHIElectronics.DUELink;
using static System.Net.Mime.MediaTypeNames;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void DrawOnBlackWhite() {        
    duelink.Engine.ExecuteCommand("DrawOnBW()");
}
void DrawOnRed() {
    duelink.Engine.ExecuteCommand("DrawOnRed()");
}
void DrawText(string text, int color, int x, int y, int scalex, int scaley ) {
    var c = color > 0 ? 1 : 0;
    var cmd = $"texts(\"{text}\",{c},{x},{y},{scalex},{scaley})";
    duelink.Engine.ExecuteCommand(cmd);
}
void DrawCircle(int color, int x, int y, int radius) {
    var c = color > 0 ? 1 : 0;
    var cmd = $"circle({c},{x},{y},{radius})";
    duelink.Engine.ExecuteCommand(cmd);
}

void Fillrect(int color, int x, int y, int width, int height) {
    var c = color > 0 ? 1 : 0;
    var cmd = $"Fill({c}, {x},{y},{width},{height})";
    duelink.Engine.ExecuteCommand(cmd);
}
void Clear(int color) {
    var c = color > 0 ? 1 : 0;
    duelink.Engine.ExecuteCommand($"Clear({c})");
}

void Show() {
    duelink.Engine.ExecuteCommand("show()");
}
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
Thread.Sleep(20 * 1000);

DrawOnRed();
Clear(0);
DrawText("!Smart Modules!", 1, 55, 47, 1, 1);
DrawCircle(1, 100, 75, 58);
DrawCircle(1, 100, 75, 59);
DrawCircle(1, 100, 75, 60);
DrawCircle(1, 100, 75, 61);
DrawCircle(1, 100, 75, 62);
Show();
Thread.Sleep(20 * 1000);
// Wait for 20 seconds to flush the screen

