// In this sample:
// Set local date/time and read every second.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetDateTime(int year, int month, int day, int hour, int minute, int second) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "SetTime(%d,%d,%d,%d,%d,%d)",
             year, month, day, hour, minute, second);
    duelink.Engine.ExecuteCommand(cmd);
}

void GetDateTime(int &year, int &month, int &day, int &hour, int &minute, int &second) {
    duelink.Engine.ExecuteCommand("ReadTime()");
    year   = (int)duelink.Engine.ExecuteCommand("_y");
    month  = (int)duelink.Engine.ExecuteCommand("_n");
    day    = (int)duelink.Engine.ExecuteCommand("_d");
    hour   = (int)duelink.Engine.ExecuteCommand("_h");
    minute = (int)duelink.Engine.ExecuteCommand("_m");
    second = (int)duelink.Engine.ExecuteCommand("_s");
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    // Set RTC to firmware build time
    const char buildDate[] = __DATE__; // "Mmm dd yyyy"
    const char buildTime[] = __TIME__; // "hh:mm:ss"

    char monthStr[4];
    int day, year, hour, minute, second;

    sscanf(buildDate, "%3s %d %d", monthStr, &day, &year);
    sscanf(buildTime, "%d:%d:%d", &hour, &minute, &second);

    int month = 1;
    const char *months = "JanFebMarAprMayJunJulAugSepOctNovDec";
    const char *p = strstr(months, monthStr);
    if (p) {
        month = (int)((p - months) / 3) + 1;
    }

    SetDateTime(year, month, day, hour, minute, second);
}

void loop() {
    int year, month, day, hour, minute, second;
    GetDateTime(year, month, day, hour, minute, second);

    char msg[64];
    snprintf(msg, sizeof(msg),
             "Now: %04d-%02d-%02d %02d:%02d:%02d",
             year, month, day, hour, minute, second);
    Serial.println(msg);

    delay(1000);
}
