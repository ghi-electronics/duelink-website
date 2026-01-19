// In this sample:
// Initialize the network profile (IP, gateway, etc.).
// Implement Listen, Accept, Send, Receive, and Available.
// Send the message: "Hello, I am DUELink\r\n" to the PC.
// Receive the message from the PC: "Hello, I am PC".
// At the end of the sample, C# code is provided to set up the PC.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

int Initialize(const char* ip_add, const char* gw_add) {
    int ip[4];
    int gw[4];
    char cmd[64];

    sscanf(ip_add, "%d.%d.%d.%d", &ip[0], &ip[1], &ip[2], &ip[3]);
    sscanf(gw_add, "%d.%d.%d.%d", &gw[0], &gw[1], &gw[2], &gw[3]);

    snprintf(
        cmd,
        sizeof(cmd),
        "Init([%d,%d,%d,%d],[%d,%d,%d,%d],[255,255,255,0])",
        ip[0], ip[1], ip[2], ip[3],
        gw[0], gw[1], gw[2], gw[3]
    );

    return (int)duelink.Engine.ExecuteCommand(cmd);
}

int Listen(int socket, int port) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Listen(%d,%d)", socket, port);
    return (int)duelink.Engine.ExecuteCommand(cmd);
}

int Accept(int socket) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Accept(%d)", socket);
    return (int)duelink.Engine.ExecuteCommand(cmd);
}

int SendData(int socket, const char* text) {
    char cmd[64];
    int len = strlen(text);

    snprintf(cmd, sizeof(cmd), "dim b6[%d]", len);
    duelink.Engine.ExecuteCommand(cmd);

    for (int i = 0; i < len; i++) {
        snprintf(cmd, sizeof(cmd), "b6[%d]=%d", i, (uint8_t)text[i]);
        duelink.Engine.ExecuteCommand(cmd);
    }

    snprintf(cmd, sizeof(cmd), "Send(%d,b6)", socket);
    return (int)duelink.Engine.ExecuteCommand(cmd);
}

int Receive(int socket, uint8_t* data, int max_len) {
    char cmd[64];

    snprintf(cmd, sizeof(cmd), "dim b7[%d]", max_len);
    duelink.Engine.ExecuteCommand(cmd);

    int recv_len = (int)duelink.Engine.ExecuteCommand("Recv(0,b7)");
    int len = recv_len < max_len ? recv_len : max_len;

    for (int i = 0; i < len; i++) {
        snprintf(cmd, sizeof(cmd), "b7[%d]", i);
        data[i] = (uint8_t)duelink.Engine.ExecuteCommand(cmd);
    }

    return len;
}

int Available(int socket) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "Avail(%d)", socket);
    return (int)duelink.Engine.ExecuteCommand(cmd);
}

int socket_id = 0;
int port = 5000;
bool connected = false;

uint8_t rx_buffer[64];

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    Initialize("192.168.0.50", "192.168.0.1");
}

void loop() {
    if (!connected) {
        delay(1000);

        Listen(socket_id, port);
        Serial.println("Listening...");

        Accept(socket_id);
        Serial.println("Socket connected!");

        SendData(socket_id, "Hello, I am DUELink\r\n");
        connected = true;
    }

    delay(1);

    int available = Available(socket_id);
    if (available > 0 && available <= (int)sizeof(rx_buffer)) {
        int len = Receive(socket_id, rx_buffer, available);

        Serial.print("Received: ");
        for (int i = 0; i < len; i++) {
            Serial.print((char)rx_buffer[i]);
        }
        Serial.println();
    }
}
