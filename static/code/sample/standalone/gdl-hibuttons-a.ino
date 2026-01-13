// In this sample:
// STATLED is on if the button is pressed

#define PIN_STAT_LED PB8
#define PIN_BUTTON PA0

void setup() {
  pinMode(PIN_BUTTON, INPUT_PULLUP);
  pinMode(PIN_STAT_LED, OUTPUT);
}

void loop() {
  if (!digitalRead(PIN_BUTTON)) {
    digitalWrite(PIN_STAT_LED, HIGH);
    delay(200);
    digitalWrite(PIN_STAT_LED, LOW);
    delay(200);
  }
}