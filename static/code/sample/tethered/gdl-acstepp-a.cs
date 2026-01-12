// In this sample:
// Tested on Bi-Polar Stepper Motor Driver-2M542
// Continuously move axes X, Y, and Z forward and backward for 400 steps, with a 10 ms delay per step.

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void StepX(int direction, int stepnum) {
    duelink.Engine.ExecuteCommand($"StepX({direction},{stepnum})");
    
    //Blocking mode
    Thread.Sleep(stepnum);
}
void StepY(int direction, int stepnum) {
    duelink.Engine.ExecuteCommand($"StepY({direction},{stepnum})");

    //Blocking mode
    Thread.Sleep(stepnum);
}

void StepZ(int direction, int stepnum) {
    duelink.Engine.ExecuteCommand($"StepZ({direction},{stepnum})");

    //Blocking mode
    Thread.Sleep(stepnum);
}

while (true) {
    StepX(1, 400); // forward
    StepY(1, 400); // forward
    StepZ(1, 400); // forward
    Thread.Sleep(1000);
    StepX(0, 400); // forward
    StepY(0, 400); // forward
    StepZ(0, 400); // forward
    Thread.Sleep(1000);
}
