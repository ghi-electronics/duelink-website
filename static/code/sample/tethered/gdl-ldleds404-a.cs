// In this sample:
// Display the current minute and second on the LED (timer version).
using System.Drawing;
using GHIElectronics.DUELink;
using static System.Runtime.InteropServices.JavaScript.JSType;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void DrawNumber(int led, int number) {
    duelink.Engine.ExecuteCommand($"Seg7({led},{number})");
}

void ShowColon(int value) {
    duelink.Engine.ExecuteCommand($"Colon({value})");
}

void Show() {
    duelink.Engine.ExecuteCommand("Show()");
}

var min = 0;
var sec = 0;
while (true) {    
    var minute = DateTime.UtcNow.Minute;
    var second = DateTime.UtcNow.Second;
    if (sec != second || min != minute) {
        sec = second;
        min = minute;
        DrawNumber(0, sec % 10);
        DrawNumber(1, sec / 10);

        DrawNumber(2, min % 10);
        DrawNumber(3, min / 10);
    }
    ShowColon(1);
    Show();
    Thread.Sleep(400); // off 100ms
    ShowColon(0);
    Show();
    Thread.Sleep(400); // off 100ms

}
