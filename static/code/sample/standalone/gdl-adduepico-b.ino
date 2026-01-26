// In this sample:
// Create a watch using the built-in graphics library.

// Setup IDE:Select DUELink from board manager
// Install Adafruit_GFX
// Install Adafruit_SSD1306
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET_PIN 1


uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

int getpin(int pin) {
  // Input mapped DUELink  pin
  // Return the actual pin (PA0, PA1.....)
  return pin_map[pin];
}

TwoWire i2c1Wire(getpin(16), getpin(15)); 
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &i2c1Wire, -1);

// Constants for the clock
const int WIDTH = 64;
const int HEIGHT = 64;
const int CENTER_X = WIDTH;
const int CENTER_Y = HEIGHT / 2;
const int RADIUS = 26;

// Function to convert RGB to a 16-bit color (not used here directly, since Adafruit_GFX uses 16-bit color)
uint16_t RGB(int r, int g, int b) {
  return (r << 11) | (g << 5) | b;
}

// Function to initialize the display
void setup() {
  // reset pin
  pinMode(getpin(OLED_RESET_PIN), OUTPUT);

  digitalWrite(getpin(OLED_RESET_PIN), 0);
  delay(10); 
  digitalWrite(getpin(OLED_RESET_PIN), 1);
  delay(10); 
  
  // Initialize OLED display
  i2c1Wire.begin(); // Initialize I2C1
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // i2c add: 0x3C

    for(;;) {// Don't proceed, loop forever

    }
  }

  // Clear the display buffer
  display.clearDisplay();

  // Set text color to white
  display.setTextColor(SSD1306_WHITE);
  display.setTextSize(1);  // Set text size (1x1)
  
  // Draw clock face once
  ClearScreen(SSD1306_BLACK);
  DrawCircle(CENTER_X, CENTER_Y - 1, 31, SSD1306_WHITE);
  DrawNumbers();
}

// Draw text function
void DrawText(String text, int x, int y) {
  display.setCursor(x, y);
  display.print(text);
}

// Draw line function
void DrawLine(int x1, int y1, int x2, int y2, int color) {
  display.drawLine(x1, y1, x2, y2, color);
}

// Draw circle function
void DrawCircle(int x, int y, int radius, int color) {
  display.drawCircle(x, y, radius, color);
}

// Clear the display
void ClearScreen(int color) {
  display.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, color);
}

// Draw numbers around the clock
void DrawNumbers() {
  for (int h = 1; h <= 12; h++) {
    float angle = (PI / 6) * (h - 3);  // 0 hour at right (3 o'clock)
    int x = CENTER_X + (int)((RADIUS - 0) * cos(angle));
    int y = CENTER_Y + (int)((RADIUS - 0) * sin(angle));

    if (h > 6) x -= 2;

    // Adjust position slightly for hours above 9
    DrawText(String(h), (h < 10) ? x : x - 4, y - 3);
  }
}

// Draw clock hand (second, minute, or hour)
void DrawHand(float angle, int length, int color) {
  int x = CENTER_X + (int)(length * cos(angle));
  int y = CENTER_Y + (int)(length * sin(angle));
  DrawLine(CENTER_X, CENTER_Y, x, y, color);
}

void loop() {
  // Get the current time from Arduino's millis
  // For simplicity, I'll use millis() for time simulation (not accurate for long periods)
  unsigned long currentMillis = millis();
  
  int second = (currentMillis / 1000) % 60;
  int minute = (currentMillis / 60000) % 60;
  int hour = (currentMillis / 3600000) % 12;

  // Clear screen
  ClearScreen(SSD1306_BLACK);
  
  // Draw the clock face again
  DrawCircle(CENTER_X, CENTER_Y - 1, 31, SSD1306_WHITE);
  DrawNumbers();
  
  // Calculate angles for hands (second, minute, hour)
  float secondAngle = (PI / 30) * (second - 15);
  float minuteAngle = (PI / 30) * (minute - 15 + second / 60.0);
  float hourAngle = (PI / 6) * (hour - 3 + minute / 60.0);
  
  // Draw the hands
  DrawHand(secondAngle, RADIUS, SSD1306_WHITE);   // Second hand: SSD1306_WHITE
  DrawHand(minuteAngle, RADIUS - 5, SSD1306_WHITE); // Minute hand: SSD1306_WHITE
  DrawHand(hourAngle, RADIUS - 10, SSD1306_WHITE);    // Hour hand: SSD1306_WHITE
  
  // Update the display
  display.display();

  // Delay for a short time
  delay(100);  // Delay in milliseconds
}