// In this sample:
// Get 7 channel data from Spectrum and show it on the console

using System;
using System.Drawing;
using GHIElectronics.DUELink;
using static System.Net.Mime.MediaTypeNames;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

while (true) {
    var data = new byte[7];
   
    duelink.Engine.ExecuteCommand("UpdBnd()");
    duelink.Stream.ReadBytes("b1",data);
    Console.WriteLine("============================");
    for (var i = 0; i < 7; i++) {
        Console.WriteLine($"data {i}: {data[i]}");        
    }    
    Thread.Sleep(1);
}
