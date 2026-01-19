// In this sample:
// Play Jingle song
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void PlayJingle() {
    duelink.Engine.ExecuteCommand("melodyP(7,a1)");
}

const int freq_dur[] = {
    330,200, 330,200, 330,300, 0,100,
    330,200, 330,200, 330,300, 0,100,
    330,200, 392,200, 262,300, 294,100,
    330,400, 0,400, 349,200, 349,200,
    349,300, 0,0, 349,100, 349,200,
    330,200, 330,200, 0,0, 330,100,
    330,100, 392,200, 392,200, 349,200,
    294,200, 262,400, 0,400
};

const int freq_len = sizeof(freq_dur) / sizeof(freq_dur[0]);

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    duelink.Engine.ExecuteCommand("dim a1[62]");

    char cmd[32];
    for (int i = 0; i < freq_len; i++) {
        snprintf(cmd, sizeof(cmd), "a1[%d]=%d", i, freq_dur[i]);
        duelink.Engine.ExecuteCommand(cmd);
    }

    PlayJingle();
}

void loop() {
}
