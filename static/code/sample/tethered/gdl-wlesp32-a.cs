// In this sample:
// Enable Wi-Fi and set the multicast DNS name to "duelink".
// A TCP client (for example, the TeraTerm application) can connect to
// "duelink" on port 8080 to send and receive commands.

using System;
using System.Net;
using System.Xml.Linq;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

bool IsBluetoothConnected() {    
    var ret = duelink.Engine.ExecuteCommand("dread(5,1)");

    return ret == 0;
}
bool IsWiFiConnected() {
    var ret = duelink.Engine.ExecuteCommand("dread(5,1)");
    return ret == 0;
}

bool IsSocketConnected() {
    var ret = duelink.Engine.ExecuteCommand("dread(4,1)");
    return ret == 0;
}

void StartBluetooth(string name) {
    duelink.Engine.ExecuteCommand($"StartBT(\"{name}\")");
}
void StartWiFi(string ssid, string pwd) {
    duelink.Engine.ExecuteCommand($"StartWiFi(\"{ssid}\",\"{pwd}\")");    
}

void SetMulticastDns(string mdns_name) {
    duelink.Engine.ExecuteCommand($"StartTcp(\"{mdns_name}\")");
}

void EnableBrigde() {
    duelink.Engine.ExecuteCommand("Bridge(1)");
}


StartWiFi("ssid", "pwd");

// The Wi-Fi connection can take up to 30 seconds.
// For testing, sleep for 1 seconds first.
Thread.Sleep(1000 * 1);
while (IsWiFiConnected() == false) {
    Thread.Sleep(1000);
    Console.WriteLine("Wait for WiFi connection...");
}

SetMulticastDns("duelink");
while (IsSocketConnected() == false) {
    Thread.Sleep(1000);
    Console.WriteLine("Wait for tcp connection...");
}

EnableBrigde();

Console.WriteLine("The brigde is ready for sending/receiving command from TeraTerm");

