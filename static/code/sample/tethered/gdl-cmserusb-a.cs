// In this sample:
// Receive a byte
// Send back (byte + 1)

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void Initialize() {
    duelink.Uart.Configuration(9600,128);    
}

void WriteByte(byte b) {
    duelink.Uart.WriteByte(b);
}

byte ReadByte() {
    var data = duelink.Uart.ReadByte();
    return data;    
}

int ByteToRead() {
    var count = duelink.Uart.BytesToRead();
    return count;
}

Initialize();

while (true) {        
    while (ByteToRead() == 0) {
        Thread.Sleep(100);
    }
    var b = ReadByte();

    b++;

    WriteByte(b);           
}


