// In this sample:
// Continuously switch relay 2 on/off every 2 seconds

#define SW_SERIAL_DBG 0 // optional: this will use PA2, PA3 as software serial for debug runtime value

#if SW_SERIAL_DBG
#include <SoftwareSerial.h> 
SoftwareSerial softwareSerial(PA2, PA3);
#endif
const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pin: P1, P2, P3
  // Return STM32 pin:PA0, PA1, PB0....
  return pin_map[pin];
}

void setup() {
#if SW_SERIAL_DBG  
  softwareSerial.begin(9600);
#endif

}

// Set relay function
void Set(int r, int v) {
    pinMode(getpin(7-r), OUTPUT);
    digitalWrite(getpin(7-r), v);
}

void loop() {  
  Set(2, 1);
  delay(2000);
  Set(2, 0);
  delay(2000);
}