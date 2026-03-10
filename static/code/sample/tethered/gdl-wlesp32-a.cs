// In this sample:
// Send AT command AT+GMR
// Read responses (multiple lines)

using System.Text;
using GHIElectronics.DUELink;


var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);
void ATCmdSend(string cmd) {
    duelink.Engine.ExecuteCommand($"ATCmd(\"{cmd}\")");
}

string ATCmdReadLine(int timeout) {
    duelink.Engine.ExecuteCommand($"ReadLine(1, {timeout})");

    var data = new byte[1024];
    duelink.Stream.ReadBytes("b0", data);
    var str = UTF8Encoding.UTF8.GetString(data);
    return str;
}

while (true) {
    ATCmdSend("AT+GMR");

    var line = ATCmdReadLine(1000);
    
    while (true) {
        // read version return multiple lines, read still end
        if (line != null && line.Length != 0) {
            Console.WriteLine(line);
            line = ATCmdReadLine(1000);

            Thread.Sleep(1000);
        }
        else {
            break;
        }

    }
}

