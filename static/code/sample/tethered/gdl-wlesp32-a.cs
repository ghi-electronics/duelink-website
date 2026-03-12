// In this sample:
// Using TeraTerm, connect to the device using TCP/IP (if WiFi is used) or Serial (if Bluetooth is used).
// From TeraTerm, send 1 byte and receive that byte +1. Example: press '1', TeraTerm shows '2'.
// Setup requirements:
// Wireless ESP32 must be configured for WiFi (or Bluetooth) as Data Gateway (AT disabled and Bridge mode disabled).

using System.Text;
using GHIElectronics.DUELink;
using static System.Runtime.InteropServices.JavaScript.JSType;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

bool IsBluetoothConnected() {
    // Pin 5 goes low when Bluetooth is connected
    var ret = duelink.Engine.ExecuteCommand("dread(5,1)");
    return (int)ret==0;
}
bool IsWiFiConnected() {
    // Pin 5 goes low when WiFi is connected
    var ret = duelink.Engine.ExecuteCommand("dread(5,1)");
    return (int)ret == 0;
}
bool IsTcpConnected() {
    // Pin 4 goes low when a TCP connection occurs (on mDNS "duelink", port 8080 if default)
    var ret = duelink.Engine.ExecuteCommand("dread(4,1)");
    return (int)ret == 0;
}
int WirelessRead() {
    var ret = duelink.Engine.ExecuteCommand("wlRead()");
    return (int)ret;
}
int WirelessReadCount() {
    var ret = duelink.Engine.ExecuteCommand("wlReadcnt()");
    return (int)ret;
}
void WirelessWrite(byte data) {
    duelink.Engine.ExecuteCommand($"wlWrite({data})");
}

while (true) {
    if (!IsWiFiConnected()) {
        Console.WriteLine("Wait for FiFi connection...");
        Thread.Sleep(1000);
        continue;
    }

    if (!IsTcpConnected()) {
        Console.WriteLine("Wait for tcp connection...");
        Thread.Sleep(1000);
        continue;
    }

    if (WirelessReadCount() > 0) {
        var d = WirelessRead();

        Console.WriteLine($"Received: {(char)d}");
        WirelessWrite((byte)(d + 1));
        Console.WriteLine($"Sent: {(char)(d+1)}");
    }

    Thread.Sleep(10);
}


