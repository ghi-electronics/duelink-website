// In this sample:
// Continuously turn the motor A,B forward at 50% speed, then backward at 50% speed, with a 2-second delay between each direction change
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void SetMotorA(int speed) {
    duelink.Engine.ExecuteCommand($"SMotorA({speed})");
}
void SetMotorB(int speed) {
    duelink.Engine.ExecuteCommand($"SMotorB({speed})");
}

while (true) {
    SetMotorA(50); // forward
    SetMotorB(50); // forward
    Thread.Sleep(2000);
    SetMotorA(-50); // backward
    SetMotorB(-50); // backward
    Thread.Sleep(2000);   
}
