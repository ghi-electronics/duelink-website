// In this sample:
// On receiving a CAN message, display the RX values and send a CAN message (ID: 1,
// data: {1, 2, 3, 4, 5, 6, 7, 8}). Poll interval: 1 second.

using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

int Read(byte[] data) {
    var cmd = $"dim b1[{1 + data.Length}]"; // length at first byte
    duelink.Engine.ExecuteCommand(cmd);

    var ret = (int)duelink.Engine.ExecuteCommand("RxRd(b1)");

    if (ret >= 0) {
        var id = duelink.Engine.ExecuteCommand("b1[0]");

        Console.WriteLine($"length: {id}");

        for (var i = 1; i <= data.Length; i++) {
            data[i - 1] = (byte)duelink.Engine.ExecuteCommand($"b1[{i}]");
            var val = data[i - 1].ToString("x2");
            Console.WriteLine($"Rx data: 0x{val}");
        }
    }
    return ret;
}

void Write(int id, byte[] data) {
    var cmd = $"dim b0[{data.Length}]"; // data length and id (+1)
    duelink.Engine.ExecuteCommand(cmd);

    for (var i = 0; i < data.Length; i++) {
        duelink.Engine.ExecuteCommand($"b0[{i}]={data[i]}");
    }
   
    duelink.Engine.ExecuteCommand($"TxReq({id},len(b0),b0)");
    Console.WriteLine($"Sent: {id}");
}


var read_arr = new byte[8];
var write_arr = new byte[8] { 1, 2, 3, 4, 5, 6, 7, 8 };

while (true) {
    if (Read(read_arr) >= 0) {
        Write(1, write_arr);
    }
    Thread.Sleep(1000);
}
