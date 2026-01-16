// In this sample:
// Play Jingle song

#define PIN_SOUND  getpin(1)  
#define PIN_LEFT_CH  getpin(3)
#define PIN_RIGHT_CH  getpin(4)

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pins: P1, P2, P3....
  // Return the actual pin (PA0, PA1.....)
  if (pin < 0 || pin > sizeof(pin_map) )
    return -1;

  return pin_map[pin];
}

int freq_dur[] = {
    330,200, 330,200, 330,300, 0,100,
    330,200, 330,200, 330,300, 0,100,
    330,200, 392,200, 262,300, 294,100,
    330,400, 0,400, 349,200, 349,200,
    349,300, 0,0, 349,100, 349,200,
    330,200, 330,200, 0,0, 330,100,
    330,100, 392,200, 392,200, 349,200,
    294,200, 262,400, 0,400
};

void setup() {  
  pinMode(PIN_SOUND, OUTPUT);
  pinMode(PIN_LEFT_CH, OUTPUT);
  pinMode(PIN_RIGHT_CH, OUTPUT);
  
  digitalWrite(PIN_LEFT_CH, HIGH); // max volume
  digitalWrite(PIN_RIGHT_CH, HIGH); // max volume
}

void playjingle() {
  for (int i = 0; i < sizeof(freq_dur)/ 4; i+=2) {
    tone(PIN_SOUND, freq_dur[i]);
    delay(freq_dur[i+1]);
  }
}

void loop() { 
 playjingle() ;

 delay(1000);
}