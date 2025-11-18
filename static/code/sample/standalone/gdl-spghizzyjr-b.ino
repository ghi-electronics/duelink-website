#define EYE_LEFT_BLUE PA5
#define EYE_LEFT_RED PA6
#define EYE_LEFT_GREEN PA7
#define EYE_RIGHT_BLUE PA8
#define EYE_RIGHT_RED PB1
#define EYE_RIGHT_GREEN PA0
#define BUTTON_PIN PA14

// Arduino is not working right with analogWrite.
// We will use digitalWrite to get 7 colors.
// When Arduino fixes PWM then you can get full color. 
void Eyes(byte left, byte right){
  digitalWrite(EYE_LEFT_BLUE, left & 1);  
  digitalWrite(EYE_RIGHT_BLUE, right & 1);  
  digitalWrite(EYE_LEFT_GREEN, (left>>1) & 1);  
  digitalWrite(EYE_RIGHT_GREEN, (right>>1) & 1); 
  digitalWrite(EYE_RIGHT_RED, (right>>2) & 1);  
  digitalWrite(EYE_LEFT_RED, (left>>2) & 1);  
}

void setup() {
  pinMode(EYE_LEFT_BLUE, OUTPUT);
  pinMode(EYE_LEFT_RED, OUTPUT);
  pinMode(EYE_LEFT_GREEN, OUTPUT);
  pinMode(EYE_RIGHT_BLUE, OUTPUT);
  pinMode(EYE_RIGHT_RED, OUTPUT);
  pinMode(EYE_RIGHT_GREEN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLDOWN);
}

void loop() {
  if (digitalRead(BUTTON_PIN)) {
    Eyes(0b110, 0b101);
    delay(50);
    Eyes(0b101, 0b011);
    delay(50); 
  }else{  
    Eyes(0b110, 0b101);
    delay(200);
    Eyes(0b101, 0b011);
    delay(200);
  }
}

