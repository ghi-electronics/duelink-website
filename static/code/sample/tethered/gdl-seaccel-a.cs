// In this sample:
// Reading X,Y,Z values

using System;
using System.Drawing;
using GHIElectronics.DUELink;
using static System.Net.Mime.MediaTypeNames;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

int GetX() {
    return (int)duelink.Engine.ExecuteCommand("getx()");
}
int GetY() {
    return (int)duelink.Engine.ExecuteCommand("gety()");
}
int GetZ() {
    return (int)duelink.Engine.ExecuteCommand("getz()");
}

while (true) {
    Console.WriteLine($"X = {GetX()}, Y = {GetY()}, Z = {GetZ()}");
    Thread.Sleep(1000);
}

