// In this sample:
// All 27 LEDs are repeatedly set to random colors.
// When the LDR button is pressed, the Jingle song is played.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

// DUELink transport and controller
TwoWireTransport transport(Wire1);
DUELink duelink(transport);

// Functions

void SetLed(int index, int color, int brightness) {
    int b = (brightness * 31) / 100;
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "SetLed(%d,%d,%d)", index, color, b);
    duelink.Engine.ExecuteCommand(cmd);
}

void SetAll(int color) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "SetAll(%d)", color);
    duelink.Engine.ExecuteCommand(cmd);
}

void ShowLed() {
    duelink.Engine.ExecuteCommand("ShowLed()");
}

void RndLed() {
    duelink.Engine.ExecuteCommand("RndLed()");
}

void PlayLed(bool enable) {
    int e = enable ? 1 : 0;
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "PlayLed(%d)", e);
    duelink.Engine.ExecuteCommand(cmd);
}

void Buzzer(int frequency, int durationMs) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "freq(1,%d,%d,0.5)", frequency, durationMs);
    duelink.Engine.ExecuteCommand(cmd);
    delay(durationMs);
}

bool IsButtonPressed() {
    float ret = duelink.Engine.ExecuteCommand("dread(20,2)");
    return ret == 1;
}

void PlayJingle() {
    duelink.Engine.ExecuteCommand("melodyP(1,a1)");
}

// Frequency-duration array
int freq_dur[] = {
    330,200, 330,200, 330,300, 0,100,
    330,200, 330,200, 330,300, 0,100,
    330,200, 392,200, 262,300, 294,100,
    330,400, 0,400, 349,200, 349,200,
    349,300, 0,0, 349,100, 349,200,
    330,200, 330,200, 0,0, 330,100,
    330,100, 392,200, 392,200, 349,200,
    294,200, 262,400, 0,400
};

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    // Send array to DUELink
    duelink.Engine.ExecuteCommand("dim a1[31*2]");

    for (int i = 0; i < (int)(sizeof(freq_dur) / sizeof(freq_dur[0])); i++) {
        char cmd[64];
        snprintf(cmd, sizeof(cmd), "a1[%d]=%d", i, freq_dur[i]);
        duelink.Engine.ExecuteCommand(cmd);
    }

    SetAll(0);
}

void loop() {
    static bool btnStatus = false;

    bool btnPress = IsButtonPressed();

    if (btnPress != btnStatus) {
        btnStatus = btnPress;
        if (btnStatus) {
            PlayJingle();
        }
    }

    RndLed();
    delay(250);
}
