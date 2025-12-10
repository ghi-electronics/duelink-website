// In this sample:
// Create a watch using the built-in graphics library.
// Needs 'GFX Library for Arduino' lib that support graphics and Arduino_GC9A01
// Needs TimeLib lib

#include <Arduino_GFX_Library.h>
#include <TimeLib.h>

#define TFT_CS     getpin(8)  // Chip select
#define TFT_RST    getpin(17)   // Reset pin
#define TFT_DC     getpin(9)  // Data/Command pin

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

Arduino_GFX *gfx = new Arduino_GC9A01(bus, TFT_RST);
const int WIDTH = 240;
const int HEIGHT = 240;
const int CENTER_X = WIDTH / 2;
const int CENTER_Y = HEIGHT / 2;
const int RADIUS = 100;

// Forward declarations
void DrawText(const char *text, uint32_t color, int x, int y, int scalex, int scaley);
void DrawLine(int x1, int y1, int x2, int y2, uint32_t color);
void ClearScreen(uint32_t color);
void Show();
uint32_t RGB(int r, int g, int b);
void DrawNumbers();
void DrawHand(double angle, int length, uint32_t color);

// Variables to track last hand angles
double last_sec = 0;
double last_min = 0;
double last_hour = 0;

void setup() {

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
  
  gfx->begin();
  gfx->setRotation(0);        // Set rotation if needed
  gfx->fillScreen(RGB(0,127,255)); // Clear screen to background color

  setTime(12, 0, 0, 1, 1, 2025); // initialize software clock

}

void loop() {
  int h = hour();
  int m = minute();
  int s = second();

  double secondAngle = PI / 30 * (s - 15);
  double minuteAngle = PI / 30 * (m - 15 + s / 60.0);
  double hourAngle = PI / 6 * ((h % 12) - 3 + m / 60.0);

  if (last_sec != secondAngle) {
    DrawHand(last_sec, RADIUS, RGB(0,127,255)); // erase previous second hand
    last_sec = secondAngle;
    DrawHand(secondAngle, RADIUS, RGB(0,0,255)); // draw new second hand

    // redraw minute/hour hands
    DrawHand(minuteAngle, RADIUS - 5, RGB(0,255,0));
    DrawHand(hourAngle, RADIUS - 10, RGB(255,0,0));
  }
  else if (last_min != minuteAngle) {
    DrawHand(last_min, RADIUS - 5, RGB(0,127,255));
    last_min = minuteAngle;
    DrawHand(minuteAngle, RADIUS - 5, RGB(0,255,0));
  }
  else if (last_hour != hourAngle) {
    DrawHand(last_hour, RADIUS - 10, RGB(0,127,255));
    last_hour = hourAngle;
    DrawHand(hourAngle, RADIUS - 10, RGB(255,0,0));
  }
  else {
    DrawNumbers();
    DrawText("DUELink", RGB(255,0,255), CENTER_X -36, CENTER_Y + 10, 2, 1);
    delay(100); // 100 ms
  }
}

// -------------------------
// Function implementations
// -------------------------
void DrawText(const char *text, uint32_t color, int x, int y, int scalex, int scaley) {
  gfx->setTextColor(color);
  gfx->setTextSize(scalex); // Using scalex for simplicity
  gfx->setCursor(x, y);
  gfx->print(text);
}

void DrawLine(int x1, int y1, int x2, int y2, uint32_t color) {
  gfx->drawLine(x1, y1, x2, y2, color);
}

void ClearScreen(uint32_t color) {
  gfx->fillScreen(color);
}

uint32_t RGB(int r, int g, int b) {
  return ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF);
}

void DrawNumbers() {
  for (int h = 1; h <= 12; h++) {
    double angle = PI / 6 * (h - 3);
    int x = CENTER_X + (int)((RADIUS) * cos(angle));
    int y = CENTER_Y + (int)((RADIUS) * sin(angle));

    if (h > 6) x -= 4;

    if (h < 10)
      DrawText(String(h).c_str(), RGB(255,255,255), x, y-3, 2, 1);
    else
      DrawText(String(h).c_str(), RGB(255,255,255), x-4, y-3, 2, 1);
  }
}

void DrawHand(double angle, int length, uint32_t color) {
  int x = CENTER_X + (int)(length * cos(angle));
  int y = CENTER_Y + (int)(length * sin(angle));
  DrawLine(CENTER_X, CENTER_Y, x, y, color);
}