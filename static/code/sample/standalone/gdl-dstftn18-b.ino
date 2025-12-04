// In this sample:
// Draw text on scren, using Adafruit_GFX and ST7735 driver
// Requires Adafruit_GFX and ST7735 driver

#include <Adafruit_GFX.h>    // Core graphics library
#include <Adafruit_ST7735.h> // Hardware-specific library for ST7735
#include <SPI.h>

#define TFT_CS     getpin(16)  // Chip select
#define TFT_RST    getpin(9)   // Reset pin
#define TFT_DC     getpin(17)   // Data/Command pin
#define TFT_DC_BL     getpin(8)   // backlight

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
  // Input mapped DUELink pins: P1, P2, P3....
  // Return the actual pin (PA0, PA1.....)
  if (pin < 0 || pin > sizeof(pin_map) )
    return -1;

  return pin_map[pin];
}

SPIClass mySPI(SPI1_BASE);
Adafruit_ST7735 tft = Adafruit_ST7735(&mySPI, TFT_CS, TFT_DC, -1);

void setup() {  
  
  pinMode(TFT_DC_BL, OUTPUT);
  pinMode(TFT_RST, OUTPUT);

  // reset
  digitalWrite(TFT_RST, 0);
  delay(100);
  digitalWrite(TFT_RST, 1);

  // Setup SPI
  mySPI.begin();//PB3, PB4, PB5, PC6);
  mySPI.setMISO(PB4);
  mySPI.setMOSI(PB5);
  mySPI.setSCLK(PB3);
  mySPI.setBitOrder(MSBFIRST);

  // Backlight is on
  digitalWrite(TFT_DC_BL, 1);

  // Initialize ST7735
  tft.initR(INITR_BLACKTAB); // Initialize ST7735, black tab variant
  tft.setRotation(1);        // Set rotation if needed
  tft.fillScreen(ST77XX_BLACK); // Clear screen

  // Set text parameters
  tft.setTextColor(ST77XX_WHITE); // Text color
  tft.setTextSize(1);             // Text size (scaling)
  tft.setCursor(40, 30);          // Position (x, y)
  
  tft.println("DUELink TFT N18");   // Draw text
}

void loop() { 
  
}