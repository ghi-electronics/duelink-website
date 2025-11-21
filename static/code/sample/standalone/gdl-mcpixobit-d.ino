// In this sample:
// Display light sensor value on the screen
// Press any button A or B, a short beep plays
// Blink statled

// Setup IDE:Select DUELink from board manager
// Install Adafruit_GFX
// Install Adafruit_SSD1306
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET    PC6  
#define BUTTON_A_PIN 20
#define BUTTON_B_PIN 23
#define BUZZER_PIN 4
#define LIGHT_PIN 5
#define STATLED_PIN 0

TwoWire i2c1Wire(PB7, PB6); 
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &i2c1Wire, OLED_RESET);
uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

int getpin(int pin) {
  // Input mapped DUELink  pin
  // Return the actual pin (PA0, PA1.....)
  return pin_map[pin];
}

float light() {  
  int rawValue = analogRead(getpin(LIGHT_PIN));  
  float voltage = (rawValue *100) / 4095.0;
  
  return voltage;
}

void setup() {
  i2c1Wire.begin(); // Initialize I2C1
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // i2c add: 0x3C

    for(;;) {// Don't proceed, loop forever

    }
  }
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  analogReadResolution(12);
  pinMode(getpin(BUTTON_A_PIN), INPUT_PULLDOWN);
  pinMode(getpin(BUTTON_B_PIN), INPUT_PULLDOWN);
  pinMode(getpin(BUZZER_PIN), OUTPUT);
  pinMode(getpin(STATLED_PIN), OUTPUT);
}

void loop() {
  display.clearDisplay();  

  display.setCursor(30,0);
  display.println("--PixoBit--");

  display.setCursor(0,20);
  display.println("Light (%):");
  display.setCursor(60,20);
  display.println(light());
  display.display();

  if (digitalRead(getpin(BUTTON_A_PIN)) || digitalRead(getpin(BUTTON_B_PIN))) {
    analogWrite(getpin(BUZZER_PIN), 128); // play buzzer
    delay(100);
    analogWrite(getpin(BUZZER_PIN), 0); //stop
  }
  delay(250);
  int read = digitalRead(getpin(STATLED_PIN));
  digitalWrite(getpin(STATLED_PIN), !read);
    
}