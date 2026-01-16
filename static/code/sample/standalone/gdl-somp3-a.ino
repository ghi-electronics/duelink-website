// In this sample:
// Implement: Reset, Set volume, Play, Stop, Check playing status, and set loop mode.
// Reset the module
// Set volume to 30%
// Play the MP3 file named 001.mp3 inside the folder named 01
// SD card structure:
// - Folder names must be in the format: 01, 02, 03, ..., 99
// - File names (songs) must be in the format: 001.mp3, 002.mp3, ..., 999.mp3

#include <Arduino.h>
#include <SoftwareSerial.h>

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

// ---------------- Alias values ----------------
static const uint32_t resp_to   = 2000;
static const uint32_t min_last  = 200;
static const uint32_t reset_to  = 3000;

static const uint8_t min_vol  = 0;
static const uint8_t max_vol  = 30;

static const uint8_t code_ok   = 0x41;
static const uint8_t code_err  = 0x40;
static const uint8_t code_done = 0x3D;
static const uint8_t code_rdy  = 0x3F;

static uint32_t last_sent = 0;
static const int busy_pin = 5;

// ---------------- Serial ----------------
SoftwareSerial softwareSerial(PA0, PA1); // RX, TX

// ---------------- Buffers ----------------
uint8_t b2[10];   // message buffer

// ---------------- Functions ----------------

void Init() {
    softwareSerial.begin(9600);

    pinMode(getpin(busy_pin), INPUT_PULLUP);

    // Power-up delay: MP3 module needs 1.5 seconds to initialize
    delay(1500);
}

uint8_t WResponse(uint32_t t, uint8_t c, int a) {
    uint32_t start = millis();

    uint8_t message[10] = { 0x7E, 0xFF, 0x06, c, 0, 0, 0, 0, 0, 0xEF };

    uint8_t i = 0;
    int b = 0;

    while (millis() - start < t) {
        if (softwareSerial.available() > 0) {
            b = softwareSerial.read();
            if (b >= 0) {
                if (message[i] == 0 || b == message[i]) {
                    i++;
                } else {
                    i = 0;
                }

                if (i == 10) {
                    return 1;
                }
            }
        }
        delay(1);
    }
    return 0;
}

uint8_t SendCmd(uint8_t c, uint16_t a) {
    // Ensure minimum gap between commands
    while ((millis() - last_sent) < min_last) {
        delay(1);
    }

    uint8_t message[10] = {
        0x7E, 0xFF, 0x06, c, 0x01,
        (uint8_t)((a >> 8) & 0xFF),
        (uint8_t)(a & 0xFF),
        0x00, 0x00, 0xEF
    };

    int16_t s = 0;
    for (int i = 1; i <= 7; i++) {
        s -= message[i];
    }

    message[7] = (uint8_t)((s >> 8) & 0xFF);
    message[8] = (uint8_t)(s & 0xFF);

    softwareSerial.write(message, 10);

    while (softwareSerial.available() < 10) {
        // wait for response
    }

    uint8_t b = WResponse(resp_to, code_ok, -1);
    last_sent = millis();

    return b;
}

uint8_t Stop() {
    return SendCmd(0x16, 0);
}

uint8_t SetVol(uint8_t v) {
    return SendCmd(0x06, v);
}

uint8_t IsBusy() {
    // Low = busy, High = free
    return !digitalRead(getpin(busy_pin));
}

uint8_t Loop(uint8_t r) {
    // r: repeat
    return SendCmd(0x19, !r);
}

uint8_t Rst() {
    if (SendCmd(0x0C, 0)) {
        return WResponse(reset_to, code_rdy, -1);
    }
    return 0;
}

uint8_t PlayFile(uint8_t f, uint8_t d) {
    if (d == 0) {
        return SendCmd(0x03, f);
    } else {
        return SendCmd(0x0F, ((uint16_t)d << 8) | f);
    }
}

// ---------------- Arduino Entry Points ----------------

void setup() {
    Init();

    if (Rst()) {                     // Reset module
        SetVol(30);                  // Set volume to max
        if (PlayFile(1, 1)) {        // Play file 001.mp3 in folder 01
            //Serial.println("File is playing.");
        }
    } else {
        //Serial.println("Reset failed.");
    }
}

void loop() {
    
}