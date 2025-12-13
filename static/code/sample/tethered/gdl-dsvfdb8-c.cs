// In this sample:
// Display the text "DUELink!"
// Wait for 1 second
// Display counting up from 0 to 99,999,999

using GHIElectronics.DUELink;
using System;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void DrawNumber(int x, int number) {
    number = number + 48; //48 = '0'
    var cmd = $"CPrint({x},{number})";
    duelink.Engine.ExecuteCommand(cmd);
}
void DrawString(string text) {
    var cmd = $"CPrintS(\"{text}\")";
    duelink.Engine.ExecuteCommand(cmd);
}
void Show() {
    duelink.Engine.ExecuteCommand("VShow()");
}

void Clear() {
    DrawString("        ");
    Show();
}

var number = 0;
var i = 0;

Clear();
DrawString("DUELink!");
Show();
Thread.Sleep(1000);
Clear();

while (true) {
    DrawNumber(i, number);
    Show();
    number = number + 1;
    if (number == 10) {
        number = 0;
        i = i + 1;
        if (i == 8) {
            i = 0;
            Clear();
        }
    }
    Thread.Sleep(10);
}
