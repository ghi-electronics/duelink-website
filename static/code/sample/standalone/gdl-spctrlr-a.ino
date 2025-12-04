// In this sample:
// LEDs will run in circle mode.
// Press buttons U, D, L, R: LEDs turn on at positions 8, 4, 6, and 2.
// Press button A: All red LEDs turn on.
// Press button B: All red LEDs turn off.
// Press LDR button: All red leds blink.

#define LDR_PIN 20 
const uint8_t pin_led[] = {9,7,8,13,17,15,14,12};

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};
int getpin(int pin) {
  // Input mapped DUELink pin
  // Return the actual pin (PA0, PA1.....)
  if (pin < 0 || pin > sizeof(pin_map) )
    return -1;

  return pin_map[pin];
}

void setled(int led, bool value) {
  if ((led > sizeof(pin_led)) || (led < 1))
    return;
  
  digitalWrite(getpin(pin_led[led-1]), value);
}

void setallled(bool value) {
  for (int i = 0; i <sizeof(pin_led); i++ ) {
    digitalWrite(getpin(pin_led[i]), value);
  }
}

void setup() {
  for (int i = 0; i <sizeof(pin_led); i++ ) {
    pinMode(getpin(pin_led[i]),  OUTPUT);
  }

  pinMode(getpin(BtnPin('U')),INPUT_PULLUP);
  pinMode(getpin(BtnPin('D')),INPUT_PULLUP);
  pinMode(getpin(BtnPin('L')),INPUT_PULLUP);
  pinMode(getpin(BtnPin('R')),INPUT_PULLUP);
  pinMode(getpin(BtnPin('A')),INPUT_PULLUP);
  pinMode(getpin(BtnPin('B')),INPUT_PULLUP);
  pinMode(getpin(LDR_PIN),INPUT_PULLDOWN);
  
  setallled(false);  
}

int BtnPin(char p) {
  if (p == 'A') {
      return 1;
  }

  if (p == 'B') {
      return 2;
  }

  if (p == 'U') {
      return 6;
  }

  if (p == 'D') {
      return 3;
  }

  if (p == 'R') {
      return 4;
  }

  if (p == 'L') {
      return 5;
  } 

  return -1;
}



void loop() {
  static int count = 0;

  if (!digitalRead(getpin(BtnPin('A')))) {
    setallled(true);
    return;
  }

  if (!digitalRead(getpin(BtnPin('B')))) {
    setallled(false);
    return;
  }

  if (!digitalRead(getpin(BtnPin('U')))) {
    setallled(false);
    setled(8,true);
    return;
  }

  if (!digitalRead(getpin(BtnPin('D')))) {
    setallled(false);
    setled(4,true);
    return;
  }

  if (!digitalRead(getpin(BtnPin('L')))) {
    setallled(false);
    setled(6,true);
    return;
  }

  if (!digitalRead(getpin(BtnPin('R')))) {
    setallled(false);
    setled(2,true);
    return;
  }

  if (digitalRead(getpin(LDR_PIN))) {
    setallled(true);
    delay(100);
    setallled(false);
    delay(100);
    return;
  }

  setled((count % 8) + 1, (count / 8) % 2 == 0 ? true : false);
  count++;

  delay(100);
}