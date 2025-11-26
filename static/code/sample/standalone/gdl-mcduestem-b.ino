// In this sample:
// Displays temperature and light on the screen.

// Setup IDE:Select DUELink from board manager
// Install Adafruit_GFX
// Install Adafruit_SSD1306
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET    PA10  
TwoWire i2c1Wire(PB7, PB6); 
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &i2c1Wire, OLED_RESET);
uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

int getpin(int pin) {
  return pin_map[pin];
}

float temperature() {  
  int rawValue = analogRead(getpin(9));  
  float voltage = (rawValue *100) / 4095.0;
  
  return voltage;
}

float light() {  
  int rawValue = analogRead(getpin(17));  
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
}


void loop() {
  display.clearDisplay();  

  display.setCursor(30,0);
  display.println("--DueSTEM--");

   display.setCursor(0,20);
  display.println("Temp (C):");
  display.setCursor(60,20);
  display.println(temperature());  

  display.setCursor(0,40);
  display.println("Light (%):");
  display.setCursor(60,40);
  display.println(light());

  display.display();
  delay(1000);
    
}
