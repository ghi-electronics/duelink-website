// In this sample:
// Detect a fingerprint and store it in the system
// Compare the detected fingerprint with the stored fingerprints
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

/* ---------- Helper functions ---------- */

void Initialize() {
    int init = 1;

    Serial.println("Wait for initialize, setting baudrate....");
    while (init != 0) {
        init = (int)duelink.Engine.ExecuteCommand("Init()");
        delay(1000);
    }
    Serial.println("Initialize done.");
}

int GetSavedCount() {
    return (int)duelink.Engine.ExecuteCommand("GetSavedCnt()");
}

void DeleteModel(int location) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "DelModel(%d)", location);
    duelink.Engine.ExecuteCommand(cmd);
}

int TakeImg() {
    return (int)duelink.Engine.ExecuteCommand("TakeImg()");
}

int ConvertImg(int id) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "ConvertImg(%d)", id);
    return (int)duelink.Engine.ExecuteCommand(cmd);
}

int CreateModel() {
    return (int)duelink.Engine.ExecuteCommand("CreateModel()");
}

int StoreModel(int location) {
    char cmd[64];
    snprintf(cmd, sizeof(cmd), "StoreModel(%d)", location);
    return (int)duelink.Engine.ExecuteCommand(cmd);
}

int FastSearch() {
    return (int)duelink.Engine.ExecuteCommand("FastSearch()");
}

void SetColor(int color, bool blink, int count) {
    // color: 0 off, 1 red, 2 blue, 3 purple
    int b = blink ? 1 : 0;

    char cmd[64];
    snprintf(cmd, sizeof(cmd), "SetLed(%d,%d,%d)", color, b, count);
    duelink.Engine.ExecuteCommand(cmd);
}

bool DetectFinger() {
    // InputType.PullUp → 1
    return duelink.Digital.Read(4, 1) == 0;
}

/* ---------- State machine ---------- */

enum State {
    STATE_INIT,
    STATE_DELETE_OLD,
    STATE_ENROLL_WAIT,
    STATE_ENROLL_FIRST,
    STATE_ENROLL_REMOVE,
    STATE_ENROLL_SECOND,
    STATE_ENROLL_STORE,
    STATE_WAIT_REMOVE,
    STATE_SEARCH
};

State state = STATE_INIT;
int savedCount = 0;

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    switch (state) {

        case STATE_INIT:
            Initialize();
            savedCount = GetSavedCount();
            state = STATE_DELETE_OLD;
            break;

        case STATE_DELETE_OLD:
            if (savedCount > 0) {
                Serial.println("Detected saved, deleting....");
                DeleteModel(1);
                savedCount = GetSavedCount();
                Serial.print("After deleted, count: ");
                Serial.println(savedCount);
            }
            state = STATE_ENROLL_WAIT;
            break;

        case STATE_ENROLL_WAIT:
            if (savedCount == 0) {
                Serial.println("No saved fingerprint found, need to add");

                if (DetectFinger()) {
                    SetColor(1, true, 0); // Blink red
                    Serial.println("Taking image of your fingerprint.....");
                    state = STATE_ENROLL_FIRST;
                }
            } else {
                state = STATE_SEARCH;
            }
            delay(100);
            break;

        case STATE_ENROLL_FIRST:
            if (TakeImg() == 0 && ConvertImg(1) == 0) {
                Serial.println("Converted. Remove your finger");
                state = STATE_ENROLL_REMOVE;
            } else {
                Serial.println("Bad image! Try again");
                delay(1000);
            }
            break;

        case STATE_ENROLL_REMOVE:
            if (!DetectFinger()) {
                delay(100);
                Serial.println("Place your same fingerprint again");
                state = STATE_ENROLL_SECOND;
            }
            break;

        case STATE_ENROLL_SECOND:
            if (DetectFinger()) {
                if (TakeImg() == 0 && ConvertImg(2) == 0) {
                    Serial.println("Converted");
                    state = STATE_ENROLL_STORE;
                } else {
                    Serial.println("Bad image! Try again");
                    delay(1000);
                }
            }
            break;

        case STATE_ENROLL_STORE:
            if (CreateModel() == 0 && StoreModel(1) == 0) {
                savedCount = GetSavedCount();
                if (savedCount > 0) {
                    Serial.println("Your finger is saved. Remove your finger");
                    SetColor(2, false, 0); // Blue
                    state = STATE_WAIT_REMOVE;
                }
            }
            break;

        case STATE_WAIT_REMOVE:
            if (!DetectFinger()) {
                state = STATE_SEARCH;
            } else {
                Serial.println("Remove your finger!!!!");
                delay(500);
            }
            break;

        case STATE_SEARCH:
            if (DetectFinger()) {
                SetColor(3, false, 0); // Purple
                Serial.println("Detect finger. Taking image of your finger.....");

                if (TakeImg() == 0 && ConvertImg(1) == 0) {
                    if (FastSearch() == 0) {
                        Serial.println("Your finger FOUND in our database");
                        SetColor(2, false, 0); // Blue
                        // Stay here forever
                    } else {
                        Serial.println("Your finger does NOT match in our database");
                    }
                } else {
                    Serial.println("Bad image! Try again");
                }
            }
            delay(100);
            break;
    }
}
