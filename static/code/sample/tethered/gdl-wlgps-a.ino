// In this sample:
// Receive GPS data from the module every second
// Parse and display the time, date, latitude, longitude, and speed
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

void EnableReceive(bool en) {
    duelink.Digital.Write(3, en);
}

int DataToRead() {
    return (int)duelink.Uart.BytesToRead();
}

int ReadData(uint8_t* data, int maxLen) {
    EnableReceive(true);

    while (DataToRead() < maxLen) {
        delay(100);
    }

    EnableReceive(false);
    int total = duelink.Uart.ReadBytes(data, maxLen, 2000);
    duelink.Uart.Discard();
    return total;
}

double ParseCoordinate(const char* value, char dir) {
    if (!value || !*value) return 0;

    double raw = atof(value);
    int deg = (int)(raw / 100);
    double min = raw - (deg * 100);
    double result = deg + (min / 60.0);

    if (dir == 'S' || dir == 'W') {
        result = -result;
    }
    return result;
}

void ParseGNRMC(const char* buffer) {
    const char* line = buffer;

    while ((line = strstr(line, "$GNRMC")) != NULL) {
        char copy[128];
        strncpy(copy, line, sizeof(copy) - 1);
        copy[sizeof(copy) - 1] = 0;

        char* token;
        char* save;

        token = strtok_r(copy, ",", &save); // $GNRMC
        token = strtok_r(NULL, ",", &save); // time
        if (!token) return;

        char time[7];
        strncpy(time, token, 6);
        time[6] = 0;

        token = strtok_r(NULL, ",", &save); // status
        if (!token || token[0] != 'A') return;

        char latStr[16], latDir, lonStr[16], lonDir, speedStr[16], dateStr[7];

        strncpy(latStr, strtok_r(NULL, ",", &save), sizeof(latStr) - 1);
        latDir = strtok_r(NULL, ",", &save)[0];
        strncpy(lonStr, strtok_r(NULL, ",", &save), sizeof(lonStr) - 1);
        lonDir = strtok_r(NULL, ",", &save)[0];
        strncpy(speedStr, strtok_r(NULL, ",", &save), sizeof(speedStr) - 1);

        strtok_r(NULL, ",", &save); // course

        strncpy(dateStr, strtok_r(NULL, ",", &save), 6);
        dateStr[6] = 0;

        double lat = ParseCoordinate(latStr, latDir);
        double lon = ParseCoordinate(lonStr, lonDir);
        double speedKmh = atof(speedStr) * 1.852;

        Serial.println("======================");

        char msg[64];

        snprintf(msg, sizeof(msg), "Time: %.2s:%.2s:%.2s", time, time + 2, time + 4);
        Serial.println(msg);

        snprintf(msg, sizeof(msg), "Date: 20%.2s-%.2s-%.2s", dateStr + 4, dateStr + 2, dateStr);
        Serial.println(msg);

        snprintf(msg, sizeof(msg), "Latitude: %.6f", lat);
        Serial.println(msg);

        snprintf(msg, sizeof(msg), "Longitude: %.6f", lon);
        Serial.println(msg);

        snprintf(msg, sizeof(msg), "Speed: %.2f km/h", speedKmh);
        Serial.println(msg);

        return;
    }
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();

    duelink.Uart.Configuration(9600, 2048);
}

void loop() {
    static uint8_t buffer[512];

    int total = ReadData(buffer, sizeof(buffer));
    buffer[total < 511 ? total : 511] = 0;

    ParseGNRMC((const char*)buffer);

    delay(1000);
}
