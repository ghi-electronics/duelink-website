// In this sample:
// Continuously toggle P1 to P12, with a 10ms  delay for each pin

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void SetPin(int pin, bool value) {
    var v = value ? 1 : 0;
    duelink.Engine.ExecuteCommand($"dwrite({pin+1},{v})");
}

var counter = 0;
var value = false;

while (true) {
    Thread.Sleep(10);

    SetPin(counter % 12, value);

    counter++;

    if (counter%12 ==0) {
        value = !value;
    }

}
