// In this sample:
// Update counter from 0 to 9 every second
// Press LDR button to reset the counter to 0

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);
bool ButtonLDRPressed() {
    var cmd = "dread(20,2)";
    var ret = duelink.Engine.ExecuteCommand(cmd);
    return ret != 0;
}
void DrawNumber(int number) {
    duelink.Engine.ExecuteCommand("clear(0)");
    var cmd = $"TextS(\"{number}\", 1, 1,0,1,1)";
    duelink.Engine.ExecuteCommand(cmd);
    duelink.Engine.ExecuteCommand("show()");
}

var counter = 0;
 
while (true) {

    if (ButtonLDRPressed()) {
        counter = 0;
    }

    DrawNumber(counter);

    counter++;
    if (counter == 10) {
        counter = 0;
    }
    
    Thread.Sleep(1000);
}

