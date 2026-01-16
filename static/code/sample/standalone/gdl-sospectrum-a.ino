// In this sample:
// Get 7 channel data from Spectrum and send it over serial port debugger

#include <Arduino.h>
#include <SoftwareSerial.h> 


const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

// Alias pins
#define strobePin getpin(5)
#define resetPin getpin(3)

// Array declaration
float b1[7]; // b1[7] in DUELink script

SoftwareSerial debugSerial(PA2, PA3); 

// Initialize the spectrum
void Init() {
    analogReadResolution(12); // 12-bit analog as requested

    pinMode(strobePin, OUTPUT);
    pinMode(resetPin, OUTPUT);

    digitalWrite(strobePin, HIGH);
    digitalWrite(resetPin, HIGH);
    delay(1);

    digitalWrite(strobePin, LOW);
    delay(1);

    digitalWrite(resetPin, HIGH);
    delay(1);

    digitalWrite(strobePin, HIGH);
    delay(1);

    digitalWrite(strobePin, LOW);
    delay(1);

    digitalWrite(resetPin, LOW);
    delay(1);
}

// Update spectrum bands
void UpdBnd() {
    for (int i = 0; i < 7; i++) {
        // Read analog value from pin 4 (VRead(4)/3.3*100)
        b1[i] = analogRead(getpin(4)) / 4095.0 * 100.0; // 12-bit ADC -> 0-4095

        digitalWrite(strobePin, HIGH);
        delayMicroseconds(50);

        digitalWrite(strobePin, LOW);
        delayMicroseconds(50);
    }
}

void setup() {
    debugSerial.begin(9600);
    Init();
    
}

void loop() {
    while (1) {
        UpdBnd();
        for (int i = 0; i < 7; i++) {
            debugSerial.println(b1[i]);
        }
    }
}