// In this sample:
// Send 0 or 1 to another RS485 to control the LED status.
// Receive data from the RS485.


using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void Initialize() {
    EnableRx(true);
    EnableTx(false);
    duelink.Uart.Configuration(9600,128);
    //duelink.Engine.ExecuteCommand("SerCfg(9600,128)"); // same thing
}
void EnableRx(bool value) {
    var v = value ? 0 : 1;

    duelink.Digital.Write(5, !value);
    //duelink.Engine.ExecuteCommand($"dwrite(5, {v})"); // same thing
}

void EnableTx(bool value) {
    var v = value ? 1 : 0;
    duelink.Digital.Write(6, value);
    //duelink.Engine.ExecuteCommand($"dwrite(6, {v})"); // same thing
}

void WriteByte(byte b) {
    EnableRx(false);
    EnableTx(true);
    duelink.Uart.WriteByte(b);
    //duelink.Engine.ExecuteCommand($"SerWr({b})"); // same thing

    EnableTx(false);
    EnableRx(true);
}

byte ReadByte() {
    var data = duelink.Uart.ReadByte();
    //var data = (byte)duelink.Engine.ExecuteCommand("SerRd()"); // same thing

    return data;    
}

int ByteToRead() {
    var count = duelink.Uart.BytesToRead();
    //var count = (int)duelink.Engine.ExecuteCommand("SerB2R()"); // same thing
    return count;
}

Initialize();
var count = 0;  
while (true) {
    var v = count % 2;
    WriteByte((byte)(v));
    while (ByteToRead() == 0) {
        Thread.Sleep(1);
    }

    Console.WriteLine($"Rx: {ReadByte()}");
    count++;
    Thread.Sleep(1000);
}


