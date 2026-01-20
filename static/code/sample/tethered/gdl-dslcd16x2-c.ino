// In this sample:
// Display the text "DUELink!" on the first row
// Continuously display '*' moving from left to right, then right to left

using GHIElectronics.DUELink;
using System;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void DrawChar(char c) {    
    var cmd = $"CPrint('{c}')";
    duelink.Engine.ExecuteCommand(cmd);
}
void DrawString(string text) {
    var cmd = $"CPrintS(\"{text}\")";
    duelink.Engine.ExecuteCommand(cmd);
}
void MoveToHome() {
    duelink.Engine.ExecuteCommand("Home()");
}

void Clear() {
    duelink.Engine.ExecuteCommand("clr()");
}
void MoveTo(int col, int row) {
    duelink.Engine.ExecuteCommand($"CPos({col},{row})");
}

var i = 10;
var dir = 1;

while (true) {
    MoveTo(5, 0);
    DrawString("DUELink!");
    MoveTo(i, 1);
    DrawChar('*');
    Thread.Sleep(30);
    MoveTo(i, 1);
    DrawChar(' ');
    i += dir;
    if (i > 12 || i < 3) {
        dir *= -1;
    }

}
