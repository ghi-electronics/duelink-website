// In this sample:
// Detect a pressed key and show to software serial

#include <SoftwareSerial.h> 

#define STATLED_PIN 0
#define BUTTON_PIN 5
const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

SoftwareSerial softwareSerial(PA2, PA3); 

// ---------- Global Variables (Alias replacement) ----------
uint16_t key = 0;
uint16_t prevkey = 0;
uint8_t newkey = 0;
uint8_t s = 0;

// ---------- Key map ----------
uint8_t b0[] = {
    0, '*','7','4','1',
    '0','8','5','2',
    '#','9','6','3',
    'D','C','B','A'
};

// ---------- Select Column ----------
void SelCol(uint8_t c) {
    digitalWrite(getpin(6), LOW);
    digitalWrite(getpin(10), LOW);
    digitalWrite(getpin(9), LOW);
    digitalWrite(getpin(8), LOW);

    if (c == 0) digitalWrite(getpin(8), HIGH);
    if (c == 1) digitalWrite(getpin(9), HIGH);
    if (c == 2) digitalWrite(getpin(10), HIGH);
    if (c == 3) digitalWrite(getpin(6), HIGH);
}

// ---------- Scan Keypad ----------
void Scan() {
    key = 0;

    for (uint8_t _c = 0; _c < 4; _c++) {
        SelCol(_c);

        for (uint8_t _r = 0; _r < 4; _r++) {
            // DRead(pin,2) → digitalRead (pulldown assumed configured)
            if (digitalRead(getpin(2 + _r))) {
                key |= (1 << ((_c * 4) + _r));
            }
        }
    }

    if (prevkey != key) {
        prevkey = key;
        newkey = 1;
    } else {
        newkey = 0;
    }
}

// ---------- Key Change ----------
uint8_t IsKeyChange() {
    return newkey;
}

// ---------- Read Key ----------
uint8_t RdKey() {
    uint8_t _r = 0;
    newkey = 0;

    for (uint8_t _i = 0; _i < 16; _i++) {
        if (key & (1 << _i)) {
            _r = _i + 1;
        }
    }

    return b0[_r];
}

// ---------- Setup ----------
void setup() {
    // Column pins
    pinMode(getpin(6), OUTPUT);
    pinMode(getpin(10), OUTPUT);
    pinMode(getpin(9), OUTPUT);
    pinMode(getpin(8), OUTPUT);

    // Row pins (pulldown assumed external or core-supported)
    pinMode(getpin(2), INPUT_PULLDOWN);
    pinMode(getpin(3), INPUT_PULLDOWN);
    pinMode(getpin(4), INPUT_PULLDOWN);
    pinMode(getpin(5), INPUT_PULLDOWN);

    // Status LED
    pinMode(getpin(0), OUTPUT);

    softwareSerial.begin(9600);

    
}

// ---------- Loop ----------
void loop() {
    Scan();
    uint8_t p = IsKeyChange();

    if (s != p) {
        s = p;

        if (s == 1) {
            uint8_t c = RdKey();
            if (c > 0) {
                softwareSerial.print("Key = "); softwareSerial.print((char)c);
            }
        }
    }

    delay(100);
}
