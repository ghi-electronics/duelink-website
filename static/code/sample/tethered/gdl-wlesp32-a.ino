// In this sample:
// Enable Wi-Fi and set the multicast DNS name to "duelink".
// A TCP client (for example, the TeraTerm application) can connect to
// "duelink" on port 8080 to send and receive commands.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

bool IsBluetoothConnected() {
    float ret = duelink.Engine.ExecuteCommand("dread(5,1)");
    return ret == 0;
}

bool IsWiFiConnected() {
    float ret = duelink.Engine.ExecuteCommand("dread(5,1)");
    return ret == 0;
}

bool IsSocketConnected() {
    float ret = duelink.Engine.ExecuteCommand("dread(4,1)");
    return ret == 0;
}

void StartBluetooth(const char* name) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "StartBT(\"%s\")", name);
    duelink.Engine.ExecuteCommand(cmd);
}

void StartWiFi(const char* ssid, const char* pwd) {
    char cmd[96];
    snprintf(cmd, sizeof(cmd), "StartWiFi(\"%s\",\"%s\")", ssid, pwd);
    duelink.Engine.ExecuteCommand(cmd);
}

void SetMulticastDns(const char* mdns_name) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "StartTcp(\"%s\")", mdns_name);
    duelink.Engine.ExecuteCommand(cmd);
}

void EnableBridge() {
    duelink.Engine.ExecuteCommand("Bridge()");
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    delay(2000);

    StartWiFi("ssid", "pwd");

    delay(1000);
    while (!IsWiFiConnected()) {
        delay(1000);
        Serial.println("Wait for WiFi connection...");
    }

    SetMulticastDns("duelink");
    
    while (!IsSocketConnected()) {
        delay(1000);
        Serial.println("Wait for tcp connection...");
    }

    EnableBridge();
    Serial.println("The bridge is ready for sending/receiving command from TeraTerm");
}

void loop() {

   

}
