// This sample runs on DueDuino

// In this sample:
// Using TeraTerm, connect to the device using TCP/IP (if WiFi is used) or Serial (if Bluetooth is used).
// From TeraTerm, send 1 byte and receive that byte +1. Example: press '1', TeraTerm shows '2'.
// Setup requirements:
// Wireless ESP32 must be configured for WiFi (or Bluetooth) as Data Gateway (AT disabled and Bridge mode disabled).

#include <Arduino.h>
#include <DUELink.h>

SerialTransport transport(Serial2);
DUELink duelink(transport);

bool IsBluetoothConnected() {
    // Pin 5 goes low when Bluetooth is connected
    float ret = duelink.Engine.ExecuteCommand("dread(5,1)");
    return ((int)ret) == 0;
}

bool IsWiFiConnected() {
    // Pin 5 goes low when WiFi is connected
    float ret = duelink.Engine.ExecuteCommand("dread(5,1)");
    return ((int)ret) == 0;
}

bool IsTcpConnected() {
    // Pin 4 goes low when a TCP connection occurs (on mDNS "duelink", port 8080 if default)
    float ret = duelink.Engine.ExecuteCommand("dread(4,1)");
    return ((int)ret) == 0;
}

int WirelessRead() {
    float ret = duelink.Engine.ExecuteCommand("wlRead()");
    return (int)ret;
}

int WirelessReadCount() {
    float ret = duelink.Engine.ExecuteCommand("wlReadcnt()");
    return (int)ret;
}

void WirelessWrite(uint8_t data) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "wlWrite(%u)", data);
    duelink.Engine.ExecuteCommand(cmd);
}

void setup() {
    Serial2.begin(115200);
    duelink.Connect();
}

void loop() {
    if (!IsWiFiConnected()) {        
        delay(1000);
        return;
    }

    if (!IsTcpConnected()) {        
        delay(1000);
        return;
    }

    if (WirelessReadCount() > 0) {
        int d = WirelessRead();
        WirelessWrite((uint8_t)(d + 1));       
    }

    delay(10);
}