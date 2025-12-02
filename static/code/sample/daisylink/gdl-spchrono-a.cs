// In this sample:
// Update counter from 0 to 9 every second
// Press any button (A or B) to reset the counter to 0

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);
bool ButtonAPressed() {
    var cmd = "BtnA()";
    var ret = duelink.Engine.ExecuteCommand(cmd);
    return ret != 0;
}
bool ButtonBPressed() {
    var cmd = "BtnB()";
    var ret = duelink.Engine.ExecuteCommand(cmd);
    return ret != 0;
}
void DrawNumber(int number) {
    duelink.Engine.ExecuteCommand("clear(0)");
    var cmd = $"Textt(\"{number}\", 1, 0,0)";
    duelink.Engine.ExecuteCommand(cmd);
    duelink.Engine.ExecuteCommand("show()");
}

var counter = 0;
 
while (true) {

    if (ButtonAPressed() || ButtonBPressed()) {
        counter = 0;
    }

    DrawNumber(counter);

    counter++;
    if (counter == 10) {
        counter = 0;
    }
    
    Thread.Sleep(1000);
}

