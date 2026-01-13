// In this sample:
// Initialize the network profile (IP, gateway, etc.).
// Implement Listen, Accept, Send, Receive, and Available.
// Send the message: "Hello, I am DUELink\r\n" to the PC.
// Receive the message from the PC: "Hello, I am PC".
// At the end of the sample, C# code is provided to set up the PC.

using System.Net;
using System.Net.Sockets;
using System.Text;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

int Initialize(string ip_add, string gw_add) {
    var ip = IPAddress.Parse(ip_add).GetAddressBytes();
    var gw = IPAddress.Parse(gw_add).GetAddressBytes();

    var cmd = $"Init([{ip[0]},{ip[1]},{ip[2]},{ip[3]}],[{gw[0]},{gw[1]},{gw[2]},{gw[3]}],[255,255,255,0])";
    var ret = duelink.Engine.ExecuteCommand(cmd);
    return (int)ret;
}

int Listen(int socket, int port) {
    var cmd = $"Listen({socket},{port})";
    var ret = duelink.Engine.ExecuteCommand(cmd);
    return (int)ret;
}

int Accept(int socket) {
    var cmd = $"Accept({socket})";
    var ret = duelink.Engine.ExecuteCommand(cmd);
    return (int)ret;
}

int Send(int socket, string data) {
    var to_write = UTF8Encoding.UTF8.GetBytes(data);
    duelink.Engine.ExecuteCommand($"dim b6[{to_write.Length}]");

    for (var i = 0; i < to_write.Length; i++ ) {
        duelink.Engine.ExecuteCommand($"b6[{i}]={to_write[i]}");
    }
    
    var cmd = $"Send({socket},b6)";
    var ret = duelink.Engine.ExecuteCommand(cmd);
    return (int)ret;
}

int Receive(int socket, byte[] data) {
    duelink.Engine.ExecuteCommand($"dim b7[{data.Length}]");
    var rev_len = (int)duelink.Engine.ExecuteCommand($"Recv({socket},b7)");
    
    var len = rev_len < data.Length ? rev_len : data.Length;

    for (var i = 0; i < len; i++) {
        data[i] = (byte)duelink.Engine.ExecuteCommand($"b7[{i}]");
    }

    return len;
}

int Available(int socket) {
    var ret = (int)duelink.Engine.ExecuteCommand($"Avail({socket})");
    return ret;
}

Initialize("192.168.0.50", "192.168.0.1");
var socket = 0;
var port = 5000;
while (true) {
    Thread.Sleep(1000);

    Listen(socket, port);
    Console.WriteLine("Listening...");
    Accept(socket);

    Console.WriteLine("Socket connected!");
    Send(socket, "Hello, I am DUELink\r\n");

    while (true) {
        Thread.Sleep(1);
        var read = Available(socket);

        if (read != 0) {
            var data = new byte[read];
            Receive(socket, data );
            var msg = Encoding.UTF8.GetString(data);
            if (msg != null) {
                Console.WriteLine(msg);
            }           
        }
    }
}

//This is for setup the PC, using C#
// 
//using System.Net.Sockets;
//using System.Text;

//var serverIp = "192.168.0.50"; // Replace with your server IP
//var port = 5000; // Replace with your server port
//try {
//    using (var client = new TcpClient(serverIp, port))
//    using (var stream = client.GetStream()) {
//        // Send "Hello World"
//        var message = "Hello, I am PC";
//        var dataToSend = Encoding.UTF8.GetBytes(message);
//        stream.Write(dataToSend, 0, dataToSend.Length);
//        Console.WriteLine("Sent: " + message);

//        // Receive response
//        var receivedBuffer = new byte[1024];
//        var bytesRead = stream.Read(receivedBuffer, 0, receivedBuffer.Length);
//        var response = Encoding.UTF8.GetString(receivedBuffer, 0, bytesRead);
//        Console.WriteLine("Received: " + response);
//    }
//}
//catch (Exception ex) {
//    Console.WriteLine("Error: " + ex.Message);
//}

