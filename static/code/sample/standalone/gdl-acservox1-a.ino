// In this sample:
// Repeatedly set the servo position to 0, 45, 90, 135, and 180, then reset it to 0.
// There is a one-second delay after each change.

#include <Servo.h>

#define PIN_SERVO getpin(1)

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

Servo myServo;  // create servo object

const int getpin(int pin) {
  // Input mapped DUELink pins: P1, P2, P3....
  // Return the actual pin (PA0, PA1.....)
  if (pin < 0 || pin > sizeof(pin_map) )
    return -1;

  return pin_map[pin];
}

void setup() {  
  myServo.attach(PIN_SERVO);  // attach servo to pin 9
}

void loop() { 
  for(int angle = 0; angle <= 180; angle += 45) {
    myServo.write(angle);  // set servo position
    delay(1000);             // wait 1s for servo to reach position
  }
}