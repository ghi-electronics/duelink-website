// In this sample:
// Set local date/time and read every second.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void SetDateTime(DateTime dt) {
    auto year = dt.Year;
    auto month = dt.Month;
    auto day = dt.Day;
    auto hour = dt.Hour;
    auto minute = dt.Minute;
    auto second = dt.Second;

    char cmd[64];
    snprintf(cmd, sizeof(cmd), "SetTime(%d, %d,%d,%d,%d,%d)", year, month, day, hour, minute, second);
    float __ec = duelink.Engine.ExecuteCommand(cmd);
    __ec;
}

DateTime GetDateTime() {
    duelink.Engine.ExecuteCommand("ReadTime()");

    auto year = (int)duelink.Engine.ExecuteCommand("_y"); ;
    auto month = (int)duelink.Engine.ExecuteCommand("_n"); ;
    auto day = (int)duelink.Engine.ExecuteCommand("_d"); ;
    auto hour = (int)duelink.Engine.ExecuteCommand("_h"); ;
    auto minute = (int)duelink.Engine.ExecuteCommand("_m"); ;
    auto second = (int)duelink.Engine.ExecuteCommand("_s"); ;

    return new DateTime(year,month,day,hour,minute,second);
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    static bool initialized = false;
    if (!initialized) {

    SetDateTime(DateTime.Now);

        initialized = true;
    }

// TODO: Manual conversion needed: Serial.println($"Now: {GetDateTime().ToString()} ");

    

    delay(1000);

}