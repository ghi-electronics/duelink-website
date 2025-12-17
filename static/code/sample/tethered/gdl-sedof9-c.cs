// In this sample:
// Read X,Y,Z and Temperature on DOF9

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

int GetX() {
    return (int)duelink.Engine.ExecuteCommand("_x");
}

int GetY() {
    return (int)duelink.Engine.ExecuteCommand("_y");
}

int GetZ() {
    return (int)duelink.Engine.ExecuteCommand("_z");
}

float GetTemperature() {
    return duelink.Engine.ExecuteCommand("_t");
}

void ActiveAccel() {
    duelink.Engine.ExecuteCommand("RAccel()");
}

void ActiveGyro() {
    duelink.Engine.ExecuteCommand("RGyro()");
}

void ActiveCompass() {
    duelink.Engine.ExecuteCommand("RCompass()");
}

while (true) {
    ActiveAccel();
    Console.WriteLine($"Accel X = {GetX()}, Y = {GetY()}, Z = {GetZ()}");

    ActiveGyro();
    Console.WriteLine($"Gyro X = {GetX()}, Y = {GetY()}, Z = {GetZ()}, Temperature = {GetTemperature()}");

    ActiveCompass();
    Console.WriteLine($"Compass X = {GetX()}, Y = {GetY()}, Z = {GetZ()}");

    Thread.Sleep(2000);
}


