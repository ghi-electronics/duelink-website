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
  
  for (int i = 0; i < 16; i++) {
      pinMode(getpin(i+1), OUTPUT);
      digitalWrite(getpin(i+1), 1); // 1: off: 0: on
  }

}

// Set relay function
void Set(int r, int v) {
    // Invert v as in original script
    if (v > 0) { // 1: off: 0: on
        v = 0;
    } else {
        v = 1;
    }

    // Relay mapping
    if (r == 1)  digitalWrite(getpin(11), v);
    if (r == 2)  digitalWrite(getpin(7), v);
    if (r == 3)  digitalWrite(getpin(8), v);
    if (r == 4)  digitalWrite(getpin(9), v);
    if (r == 5)  digitalWrite(getpin(6), v);
    if (r == 6)  digitalWrite(getpin(5), v);
    if (r == 7)  digitalWrite(getpin(4), v);
    if (r == 8)  digitalWrite(getpin(3), v);
    if (r == 9)  digitalWrite(getpin(2), v);
    if (r == 10) digitalWrite(getpin(1), v);
    if (r == 11) digitalWrite(getpin(12), v);
    if (r == 12) digitalWrite(getpin(13), v);
    if (r == 13) digitalWrite(getpin(15), v);
    if (r == 14) digitalWrite(getpin(14), v);
    if (r == 15) digitalWrite(getpin(16), v);
    if (r == 16) digitalWrite(getpin(10), v);
}


void loop() {  
  Set(2, 1);
  delay(2000);
  Set(2, 0);
  delay(2000);
}