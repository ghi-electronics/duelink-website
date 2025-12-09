// In this sample:
// Draw text, circle, rect on scren, using 'GFX Library for Arduino'
// No need ILI9342 - this is part of 'GFX Library for Arduino'

#include <Arduino_GFX_Library.h>

#define TFT_CS     getpin(5)  // Chip select
#define TFT_RST    getpin(4)   // Reset pin
#define TFT_DC     getpin(6)  // Data/Command pin
#define TFT_BL  getpin(7)   // backlight

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5, PB6, PB7, PB2, PB9, PA15, PA14, PA9, PA10, PA13, PC14};

const int getpin(int pin) {
  if (pin < 0 || pin >= sizeof(pin_map))
    return -1;

  return pin_map[pin];
}

// SPI bus setup (hardware SPI)
SPIClass mySPI(SPI1_BASE);
Arduino_DataBus *bus = new Arduino_HWSPI(
    TFT_DC,    // DC
    TFT_CS,    // CS
    &mySPI
);

Arduino_GFX *gfx = new Arduino_ILI9342(bus, TFT_RST);

void setup() {
  pinMode(TFT_BL, OUTPUT);
  pinMode(TFT_RST, OUTPUT);

  // reset
  //digitalWrite(TFT_RST, 0);
  //delay(100);
  //digitalWrite(TFT_RST, 1);

  // Setup SPI
  mySPI.begin();//PB3, PB4, PB5, PC6);
  mySPI.setMISO(PB4);
  mySPI.setMOSI(PB5);
  mySPI.setSCLK(PB3);
  mySPI.setBitOrder(MSBFIRST);
  
  digitalWrite(TFT_BL, 1);

  gfx->begin();
  gfx->setRotation(0);        // Set rotation if needed
  gfx->fillScreen(gfx->color565(0, 0, 127));

  gfx->setCursor(90, 100);
  gfx->setTextColor(gfx->color565(255, 0, 0));
  gfx->setTextSize(2);
  gfx->println("DUELink CP23");

  gfx->drawRect(60, 70, 200, 100, gfx->color565(0, 255, 0)); 
  gfx->drawCircle(160, 120, 110, gfx->color565(0, 0, 255));
}

void loop() { 

}