// In this sample:
// Displays a heart (5x5) when light is detected at more than 10%.
// When light is below 10%, the heart disappear, and the buzzer play.

// Setup IDE:Select DUELink from board manager

// Pin configuration
const int rows[5] = {PA15, PA10, PC6, PA9, PA13};    // Row pins
const int cols[5] = {PB1,PB0,PA7,PA6,PA5};  // Column pins

const int buzzerPin = 7;
const int lightPin = 17;

uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

int getpin(int pin) {
  return pin_map[pin];
}
// Frame buffer for 5x5 matrix
bool buffer[5][5];

void setup() {
  // Initialize pins
  for (int i = 0; i < 5; i++) {
    pinMode(rows[i], OUTPUT);
    pinMode(cols[i], OUTPUT);
    digitalWrite(rows[i], LOW);
    digitalWrite(cols[i], HIGH);
  }
  clearall();
  analogReadResolution(12);
  pinMode(getpin(buzzerPin), OUTPUT);
}

// Clear all pixels
void clearall() {
  for (int r = 0; r < 5; r++)
    for (int c = 0; c < 5; c++)
      buffer[r][c] = false;
}

// Set a pixel ON/OFF
void setpixel(int color, int x, int y) {
  if (x >= 0 && x < 5 && y >= 0 && y < 5) {
    buffer[y][x] = color;
  }
  
}

void flush() {
  for (int r = 0; r < 5; r++) {
    digitalWrite(rows[r], HIGH);
    for (int c = 0; c < 5; c++) {
      digitalWrite(cols[c], buffer[r][c] ? LOW : HIGH);
    }
    delay(2); // Persistence of vision
    digitalWrite(rows[r], LOW);
  }
}

void showheart() {
  //. # . # .
  //# # # # #
  //# # # # #
  //. # # # .
  //. . # . .
  clearall();
  setpixel(1,1,0); setpixel(1,3,0);
  setpixel(1,0,1); setpixel(1,1,1); setpixel(1,2,1); setpixel(1,3,1); setpixel(1,4,1);
  setpixel(1,0,2); setpixel(1,1,2); setpixel(1,2,2); setpixel(1,3,2); setpixel(1,4,2);
  setpixel(1,1,3); setpixel(1,2,3); setpixel(1,3,3);
  setpixel(1,2,4);
  
}

float light() {  
  int rawValue = analogRead(getpin(17));  
  float voltage = (rawValue *100) / 4095.0;
  
  return voltage;
}


void loop() {
  if (light() > 10) {
    showheart();
    analogWrite(getpin(buzzerPin), 0); // stop buzzer
  }
  else {
    clearall();
    analogWrite(getpin(buzzerPin), 128);  // play buzzer
  }
  // Continuously refresh
  flush();
}
