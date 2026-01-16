// In this sample:
// Read and display the temperature from pixel[0] to pixel[63]

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

int GetTemperature(int pixel) {   
    return (int)duelink.Engine.ExecuteCommand($"PixTemp({pixel})");
}

while (true) {
    Console.WriteLine("==============================");
    for (var i = 0; i < 64; i++) {
        Console.WriteLine($"Temperature at pixel {i}: {GetTemperature(i)}");
    }

    Thread.Sleep(100);
}
