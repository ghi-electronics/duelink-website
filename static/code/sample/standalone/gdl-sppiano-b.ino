// In this sample:
// Simulate tones from note C4 to C5
// Press the left or right arrow to play a sweep sound
// All leds 1,2,3,4,5 turn to ON

// Setup IDE:Select DUELink from board manager
#define TOUCH_CHARGE_TIME_US (500)
#define TOUCH_TIMEOUT_US (10*1000)
#define TONE_PIN 3 // DUELink pin map
#define BUTTON_LEFT_PIN 7 // DUELink pin map
#define BUTTON_RIGHT_PIN 11 // DUELink pin map
#define LED_1 1
#define LED_2 2
#define LED_3 4
#define LED_4 5
#define LED_5 6

uint8_t b1[] = {23, 19, 12, 13, 14, 15, 16, 18, 24, 10, 9, 8, 17}; //DUELink pin map
int32_t a1[] = {261, 277, 293, 311, 329, 349, 369, 392, 415, 440, 466, 493, 523}; // tones frequency

int32_t b3[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}; // current touch state: 0: release, 1: touched
int32_t b4[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}; // backup touch state

uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

int getpin(int pin) {
  // Input mapped DUELink pin
  // Return the actual pin (PA0, PA1.....)
  return pin_map[pin];
}

uint8_t isTouched(uint64_t time) {
  return (time> 150 && time < 65000) ? 1 : 0;
}

uint64_t touch(int pin, int charge_time, int timeout) {
  pinMode(pin, OUTPUT);

  digitalWrite(pin, HIGH); // charge
  delayMicroseconds(charge_time); // delay
  pinMode(pin, INPUT); // discharge

  //return pulseIn(pin, HIGH, timeout);

  uint64_t now = micros();
  uint64_t exp = now + timeout;
  
  //noInterrupts();

  while (digitalRead(pin)) {
    if (micros() > exp)
      //interrupts(); 
      return -1;
  }

  //interrupts(); 

  uint64_t diff = micros() - now;
  return diff;
}

void setled(int led_index, bool state) {
  if (led_index < 1 || led_index > 5)
    return;
  int i = 7 - led_index;
  if (i < 4)
    i--;

  digitalWrite(getpin(i),state );
}

void setup() {
  // set leds
  pinMode(getpin(LED_1), OUTPUT);
  pinMode(getpin(LED_2), OUTPUT);
  pinMode(getpin(LED_3), OUTPUT);
  pinMode(getpin(LED_4), OUTPUT);
  pinMode(getpin(LED_5), OUTPUT);

  // turn all leds on
  for (int i = 1; i < 6; i++) {
    setled(i, true);
  }
}

void loop() {
  for (int i = 0; i < sizeof(b1); i++ ) {
    b3[i] = isTouched(touch(getpin(b1[i]),TOUCH_CHARGE_TIME_US,TOUCH_TIMEOUT_US));

    if (b3[i] != b4[i]) {
      b4[i] = b3[i];

      if (b4[i]) {
        tone(getpin(TONE_PIN),a1[i], 250);
      }
    }
  }

  if (isTouched(touch(getpin(BUTTON_LEFT_PIN),TOUCH_CHARGE_TIME_US,TOUCH_TIMEOUT_US)) || isTouched(touch(getpin(BUTTON_RIGHT_PIN),TOUCH_CHARGE_TIME_US,TOUCH_TIMEOUT_US))) {
    tone(getpin(TONE_PIN),1000, 250);
  }
}