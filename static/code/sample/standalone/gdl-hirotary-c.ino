// In this sample:
// Change brightness of the statled when Rotary value changed.
// Press the Rotary button reset value to 0
// Requires  RotaryEncoder driver.

#include <RotaryEncoder.h>

// Pins (adjust for your board):
#define PIN_A   getpin(6)  // CLK (A) 
#define PIN_B   getpin(5)  // DT  (B)
#define PIN_BTN getpin(2)  // SW (button) – active LOW with INPUT_PULLUP
#define PIN_STATLED getpin(0) // Statled pin

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pins: P1, P2, P3....
  // Return the actual pin (PA0, PA1.....)
  if (pin < 0 || pin > sizeof(pin_map) )
    return -1;

  return pin_map[pin];
}

RotaryEncoder encoder(PIN_A, PIN_B, RotaryEncoder::LatchMode::FOUR3);

// Interrupt service routine: update encoder state
void checkEncoder() {
  encoder.tick();
}

void setup() {  
  pinMode(PIN_A, INPUT);
  pinMode(PIN_B, INPUT);
  pinMode(PIN_BTN, INPUT_PULLUP); // button to GND
  pinMode(PIN_STATLED, OUTPUT);

  // Attach interrupts for A/B channel changes
  attachInterrupt(digitalPinToInterrupt(PIN_A), checkEncoder, CHANGE);
  attachInterrupt(digitalPinToInterrupt(PIN_B), checkEncoder, CHANGE);

  // Optional: set starting position
  encoder.setPosition(0);

}

void loop() { 
  
// Read position & direction when changed
  static long lastPos = encoder.getPosition();
  long newPos = encoder.getPosition();

  if (newPos != lastPos) {
    lastPos = newPos;
    int dir = (int)encoder.getDirection(); // 1=CW, -1=CCW, 0=none

    if (lastPos > 100) {
      lastPos = 100;
      encoder.setPosition(100);
    }
    
    if (lastPos < 0) {
      lastPos = 0;
      encoder.setPosition(0);
    }
    int pwmValue = map(lastPos, 0, 100, 0, 255);

    analogWrite(PIN_STATLED, pwmValue);

  }

  if (digitalRead(PIN_BTN) == 0)   {
    encoder.setPosition(0);
     analogWrite(PIN_STATLED, 0);
  }

  // Small loop delay
  delay(1);  
}
