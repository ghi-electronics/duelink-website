// In this sample:
// Receive a byte
// Send back (byte + 1)

#include <SoftwareSerial.h> 
SoftwareSerial softwareSerial(PA0, PA1);

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

void setup() {
    softwareSerial.begin(9600);
}

void WriteByte(uint8_t b) {
    softwareSerial.write(b);    
    softwareSerial.flush();
}

void loop() { 
    
    if (softwareSerial.available()) {
        byte b = softwareSerial.read();
        softwareSerial.write(b+1); 
    }

    delay(10);

}

