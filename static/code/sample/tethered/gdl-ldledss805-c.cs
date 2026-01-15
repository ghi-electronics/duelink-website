// In this sample:
// Show characters, dot, numbers.

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void DrawText(string text) {
    duelink.Engine.ExecuteCommand($"PrntStr(\"{text}\")");
}

void DrawDot(int pos, int value) {
    duelink.Engine.ExecuteCommand($"Dot({pos},{value})");
}

void DrawNumber(int number) {
    duelink.Engine.ExecuteCommand($"Digit({number})");
}
void Clear() {
    duelink.Engine.ExecuteCommand("Clear(0)");
}
void Show() {
    duelink.Engine.ExecuteCommand("Show()");
}


DrawText("ABCDE");
Show();
Thread.Sleep(1000);
DrawText("FGHIJ");
Show();
Thread.Sleep(1000);
DrawText("KLMNO");
Show();
Thread.Sleep(1000);
DrawText("PQRST");
Show();
Thread.Sleep(1000);
DrawText("UVWXY");
Show();
Thread.Sleep(1000);
DrawText("  Z  ");
DrawDot(0, 1); DrawDot(1, 1); DrawDot(3, 1); DrawDot(4, 1);
Show();
Thread.Sleep(1000);

var n = 0;
while (true) {    
    Clear();
    DrawNumber(n%100000);
    n++;
    Show();
    Thread.Sleep(100);

}
