// In this sample:
// Write 0 and 1 every 1 second
// Work in Progress
#include <SoftwareSerial.h> 
SoftwareSerial softwareSerial(PA1, PA0);

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

void setup() {
    softwareSerial.begin(9600);

    pinMode(getpin(5), OUTPUT);
    pinMode(getpin(6), OUTPUT);

    digitalWrite(getpin(5), LOW);
    digitalWrite(getpin(6), LOW);
}

void WriteByte(uint8_t b) {
    digitalWrite(getpin(5), HIGH); // disable RX
    digitalWrite(getpin(6), HIGH); // Enable TX

    softwareSerial.write(b);    
    softwareSerial.flush();

    digitalWrite(getpin(5), LOW); // Enable RX
    digitalWrite(getpin(6), LOW); // disable TX
}

int count = 0;
void loop() { 
    WriteByte(count %2);

    delay(1000);

    count++;
}