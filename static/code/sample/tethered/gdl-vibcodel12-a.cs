// In this sample:
// Set the scanner to Continuous mode
// Show the barcode when the barcode is close enough to the scanner

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void SetMode(int mode) {
    // 1: Trigger mode
    // 2: Continuous mode
    duelink.Engine.ExecuteCommand($"SetMode({mode})");
}

int ByteToRead() {
    return duelink.Uart.BytesToRead();
}

byte ReadByte() {
    return duelink.Uart.ReadByte();
}

SetMode(2);//Continuous mode

while (true) {
    var available1 = ByteToRead();

    Thread.Sleep(250); // wait for 250ms

    var available2 = ByteToRead();

    if (available2 > 0 && available1 == available2) {
        // After waiting 250 ms, if available2 equals available1,
        // it means no more data is coming, so we can display the data.
        var data = new byte[available1];
        Console.WriteLine("Detect barcode:");
        for (var i = 0; i < data.Length; i++) {
            data[i] = ReadByte();
            Console.Write((char)data[i]);
        }
        Console.WriteLine("");
    }

    Thread.Sleep(250);
}
