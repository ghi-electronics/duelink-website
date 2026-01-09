// In this sample:
// Continuously set the stepper motor to 200 steps, alternating the direction between forward and backward
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void Set(int stepdrive_index, int direction, int step_num) {
    if (direction != 1)
        direction = 0;

    switch (stepdrive_index) {
        case 1:
            duelink.Engine.ExecuteCommand($"step_m1({direction},{step_num})");
            break;

        case 2: // available on StepDrive P3 only
            duelink.Engine.ExecuteCommand($"step_m2({direction},{step_num})");
            break;

        case 3: // available on StepDrive P3 only
            duelink.Engine.ExecuteCommand($"step_m3({direction},{step_num})");
            break;

    }
    
}

while (true) {
    Set(1, 1,200); // forward
    Thread.Sleep(1000);
    Set(1, -1, 200); // backward
    Thread.Sleep(1000);   
}
