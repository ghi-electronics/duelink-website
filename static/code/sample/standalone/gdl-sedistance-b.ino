// In this sample:
// Measure the distance. If the distance is less than 20 cm, turn the status LED on; otherwise, turn it off.
// Requires the HCSR04 driver.

#include <HCSR04.h>

#define STATLED_PIN getpin(0)
const byte triggerPin = 3;
const byte echoPin = 4;

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pins: P1, P2, P3....
  // Return the actual pin (PA0, PA1.....)
  if (pin < 0 || pin > sizeof(pin_map) )
    return -1;

  return pin_map[pin];
}

UltraSonicDistanceSensor distanceSensor(getpin(triggerPin), getpin(echoPin));

void setup() {
  pinMode(STATLED_PIN, OUTPUT);

}

void loop() { 
  float distance = distanceSensor.measureDistanceCm();
  if (distance< 20) {
    digitalWrite(STATLED_PIN,1);
  }
  else {
     digitalWrite(STATLED_PIN,0);
  }

  delay(1000);
  
}
