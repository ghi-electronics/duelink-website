// In this sample:
// Set the scanner to Continuous mode
// Show the barcode when the barcode is close enough to the scanner

#include <Arduino.h>
#include <SoftwareSerial.h>

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

SoftwareSerial softwareSerial(PA0, PA1);
SoftwareSerial debugSerial(PA2, PA3);

/* ------------------------------------------------
 * Helper functions to match DUELink semantics
 * ------------------------------------------------ */

void SerCfg(uint32_t baudrate) {
    softwareSerial.begin(baudrate);
}

void SerWrs(const uint8_t *data, uint16_t length) {
    softwareSerial.write(data, length);
}

void SerWr(uint8_t data) {
    softwareSerial.write(data);
}

int SerB2R() {
    return softwareSerial.available();
}

uint8_t SerRd() {
    return softwareSerial.read();
}

void SerDisc() {
    while (softwareSerial.available()) {
        softwareSerial.read();
    }
}

void Init() {
    SerCfg(9600);

    // Setup default configuration
    const uint8_t cmd_default[] = {
        0x7E, 0x00, 0x08, 0x01, 0x00, 0xD9, 0x50, 0xAB, 0xCD
    };
    SerWrs(cmd_default, sizeof(cmd_default));
    delay(1000); // wait 1 second for applying default setup

    // Enable settings
    const uint8_t cmd_enable_settings[] = {
        0x7E, 0x00, 0x08, 0x01, 0x00, 0x03, 0x01, 0xAB, 0xCD
    };
    SerWrs(cmd_enable_settings, sizeof(cmd_enable_settings));
    delay(100);

    // Put barcode into working mode
    const uint8_t cmd_working_mode[] = {
        0x7E, 0x00, 0x08, 0x01, 0x00, 0x00, 0xD5, 0xAB, 0xCD
    };
    SerWrs(cmd_working_mode, sizeof(cmd_working_mode));
    delay(500);

    SerDisc(); // clear buffer

    // Enable serial output
    const uint8_t cmd_enable_serial[] = {
        0x7E, 0x00, 0x08, 0x01, 0x00, 0x0D, 0x00, 0xAB, 0xCD
    };
    SerWrs(cmd_enable_serial, sizeof(cmd_enable_serial));
    delay(100);
}

/* ------------------------------------------------
 * Set scanner mode
 * m: 1 = Trigger mode
 * m: 2 = Continuous mode
 * ------------------------------------------------ */
void SetMode(uint8_t m) {
    // Trigger mode: user sends trigger command to start scanning
    // Continuous mode: scanner keeps scanning automatically
    m = 0xD4 + m;

    uint8_t cmd_set_mode[] = {
        0x7E, 0x00, 0x08, 0x01, 0x00, 0x00, m, 0xAB, 0xCD
    };
    SerWrs(cmd_set_mode, sizeof(cmd_set_mode));
    delay(100);

    SerDisc(); // clear buffer
}

/* ------------------------------------------------
 * Continuous example
 * ------------------------------------------------ */
void ContExple() {
    SetMode(2); // Continuous mode

    uint8_t b1[3]; // declared as byte array (per original script)

    while (1) {
        int x = SerB2R();
        delay(250); // wait 250 ms

        // If buffer size is stable and greater than zero,
        // it means no more data is coming, so we can display it.
        if ((x == SerB2R()) && (x > 0)) {
            for (int i = 0; i < x; i++) {
                uint8_t c = SerRd();
                debugSerial.write(c); // show barcode text
            }
            debugSerial.println();
        }
    }
}

/* ------------------------------------------------
 * Arduino entry points
 * ------------------------------------------------ */
void setup() {
    debugSerial.begin(9600); // Debug output
    Init();
    ContExple(); // runs forever
}

void loop() {
    // Not used because ContExple() is blocking
}
