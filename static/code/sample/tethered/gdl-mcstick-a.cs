// In this sample:
// Toggle the statled every 500ms 

using GHIElectronics.DUELink;
using System;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void SetLed() {  
    duelink.Engine.ExecuteCommand("statled(500,500,0)");
}

SetLed();

