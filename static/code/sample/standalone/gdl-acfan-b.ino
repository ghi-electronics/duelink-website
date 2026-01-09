// In this sample:
// Continuously turn the fan forward at 50% speed, then backward at 50% speed, with a 2-second delay between each direction change

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

void Fan(int s) {
  pinMode(getpin(3), OUTPUT);
  pinMode(getpin(4), OUTPUT);
    // Clamp the value between -100 and 100
    if (s > 100) s = 100;
    if (s < -100) s = -100;

    if (s < 0) {
        s = -s; // Make positive
        // Analog write to pin 3
        analogWrite(getpin(3), map(s, 0, 100, 0, 255));
        // Digital write LOW to pin 4
        digitalWrite(getpin(4), LOW);
    } else {
        // Analog write to pin 4
        analogWrite(getpin(4), map(s, 0, 100, 0, 255));       
        // Digital write LOW to pin 3
        digitalWrite(getpin(3), LOW);
    }
}

int counter = 0;
int dir = 1;
void loop() {  
  if (counter % 2000 == 0) {
    Fan(50*dir);

    dir = (dir < 0) ? 1:-1;
  }

  delay(1);
  counter++;  
}