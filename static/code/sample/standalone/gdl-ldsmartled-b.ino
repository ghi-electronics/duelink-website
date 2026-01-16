// In this sample:
// Use NeoPixel driver - Vertical scaning
// Show text " LED " in green color on the middle of the panel

#include <Arduino.h>
#include <Adafruit_NeoPixel.h>

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

// Configuration
#define PIN        getpin(14)       // Data pin for WS2812
#define NUM_LEDS   32*8     // 32x8 matrix
#define WIDTH      32
#define HEIGHT     8

Adafruit_NeoPixel strip(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);

// Simple 5x7 font for letters
const uint8_t font5x7[][5] = {
  {0x7E,0x11,0x11,0x11,0x7E}, // A
  {0x7F,0x49,0x49,0x49,0x36}, // B
  {0x3E,0x41,0x41,0x41,0x22}, // C
  {0x7F,0x41,0x41,0x22,0x1C}, // D
  {0x7F,0x49,0x49,0x49,0x41}, // E
  {0x7F,0x09,0x09,0x09,0x01}, // F
  {0x3E,0x41,0x49,0x49,0x7A}, // G
  {0x7F,0x08,0x08,0x08,0x7F}, // H
  {0x00,0x41,0x7F,0x41,0x00}, // I
  {0x20,0x40,0x41,0x3F,0x01}, // J
  {0x7F,0x08,0x14,0x22,0x41}, // K
  {0x7F,0x40,0x40,0x40,0x40}, // L
  {0x7F,0x02,0x0C,0x02,0x7F}, // M
  {0x7F,0x04,0x08,0x10,0x7F}, // N
  {0x3E,0x41,0x41,0x41,0x3E}, // O
  {0x7F,0x09,0x09,0x09,0x06}, // P
  {0x3E,0x41,0x51,0x21,0x5E}, // Q
  {0x7F,0x09,0x19,0x29,0x46}, // R
  {0x46,0x49,0x49,0x49,0x31}, // S
  {0x01,0x01,0x7F,0x01,0x01}, // T
  {0x3F,0x40,0x40,0x40,0x3F}, // U
  {0x1F,0x20,0x40,0x20,0x1F}, // V
  {0x3F,0x40,0x38,0x40,0x3F}, // W
  {0x63,0x14,0x08,0x14,0x63}, // X
  {0x07,0x08,0x70,0x08,0x07}, // Y
  {0x61,0x51,0x49,0x45,0x43}, // Z
  {0x00,0x00,0x00,0x00,0x00}, // space
};

const char* text = " LED ";

void setup() {
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'
}

// Map (x,y) to vertical scanning LED index
void setPixelXY(int x, int y, uint32_t color) {
  // Vertical scan: each column is wired top to bottom
  int index;
  if (x % 2 == 0) {
    // even column: top->bottom
    index = x * HEIGHT + y;
  } else {
    // odd column: bottom->top (zigzag)
    index = x * HEIGHT + (HEIGHT - 1 - y);
  }
  strip.setPixelColor(index, color);
}

// Draw single character at x offset
void drawChar(char c, int xOffset, uint32_t color) {
  if (c >= 'A' && c <= 'Z') c = c - 'A';
  else if (c >= 'a' && c <= 'z') c = c - 'a';
  else c = 26; // space

  for (int col = 0; col < 5; col++) {
    uint8_t line = font5x7[c][col];
    for (int row = 0; row < 7; row++) {
      if (line & 0x01) {
        setPixelXY(xOffset + col, row, color);
      }
      line >>= 1;
    }
  }
}

void loop() {
  strip.clear();
  int x = 0;
  for (int i = 0; text[i] != '\0'; i++) {
    drawChar(text[i], x, strip.Color(0, 255, 0)); // green text
    x += 6; // 5 pixels + 1 spacing
  }
  strip.show();
  delay(1000);
}