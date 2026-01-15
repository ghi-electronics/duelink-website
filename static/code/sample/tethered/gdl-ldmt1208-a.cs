// In this sample:
// Display "Hello World" and scroll the text across the screen

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

var x = 12;
while (true) {
    duelink.Graphics.Clear(0);
    duelink.Graphics.Text("Hello world!", 1, x, 0);
    x--;

    if (x < -70) {
        x = 12;
    }
    duelink.Graphics.Show();
    Thread.Sleep(1);
}
