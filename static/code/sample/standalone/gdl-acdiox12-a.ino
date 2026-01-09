// In this sample:
// Continuously toggle P1 to P12, with a 10 ms delay for each pin

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

  for (int i = 0; i < 12; i++) {
    pinMode(getpin(i+1), OUTPUT); // P1....P12
  }
}

void loop() {  
  static int counter = 0;
  static bool value = true;

  digitalWrite(getpin((counter % 12)+1),value) ; // P1....P12

  delay(10); 
  counter++;

  if (counter %12 == 0) {
    value = !value;
  }
  
}