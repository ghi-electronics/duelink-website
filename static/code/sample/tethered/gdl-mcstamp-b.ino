// In this sample:
// STATLED blinks every 100 ms.
// Press and hold the LDR button: STATLED stops blinking and stays on.
// Release the LDR button: STATLED resumes blinking every 100 ms.
// This sample runs on Arduino UNO 4 WIFI

#include <Arduino.h>
#include <Wire.h>
#include <DUELink.h>

TwoWireTransport transport(Wire1);
DUELink duelink(transport);

bool ldr_btn_state = false;
bool ldr_btn_state_backup = false;

bool LdrPressed() {
    const char* cmd = "dread(20,2)";
    auto ret = duelink.Engine.ExecuteCommand(cmd);
    return ret != 0;
}

void setup() {
    Serial.begin(9600);
    Wire1.begin();
    duelink.Connect();
}

void loop() {
    static bool initialized = false;
    if (!initialized) {

    duelink.Engine.ExecuteCommand("statled(100,100,0)"); // blink 100ms

        initialized = true;
    }

    ldr_btn_state = LdrPressed();

    

    if (ldr_btn_state_backup != ldr_btn_state) {

    ldr_btn_state_backup = ldr_btn_state;

    

    if (ldr_btn_state_backup) {

    duelink.Engine.ExecuteCommand("statled(1,0,0)"); // stay on

    }

    else {

    duelink.Engine.ExecuteCommand("statled(100,100,0)"); // blink 100ms

    }

    }

    

    delay(10);

}