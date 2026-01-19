// In this sample:
// Play Jingle song
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void PlayJingle() {
    const char* cmd = "melodyP(7,a1)";
    duelink.Engine.ExecuteCommand(cmd);
}


    char cmd[64];

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    static bool initialized = false;
    if (!initialized) {

    // Frequency-duration array

    int[] freq_dur = {

    330,200, 330,200, 330,300, 0,100,

    330,200, 330,200, 330,300, 0,100,

    330,200, 392,200, 262,300, 294,100,

    330,400, 0,400, 349,200, 349,200,

    349,300, 0,0, 349,100, 349,200,

    330,200, 330,200, 0,0, 330,100,

    330,100, 392,200, 392,200, 349,200,

    294,200, 262,400, 0,400

    };

    // Send array to DUELink

    duelink.Engine.ExecuteCommand("dim a1[31*2]");

    for (int i = 0; i < freq_durLen; i++) {

    snprintf(cmd, sizeof(cmd), "a1[%d]=%d", i, freq_dur[i]);

    duelink.Engine.ExecuteCommand(cmd);

    }

    PlayJingle();

        initialized = true;
    }

}