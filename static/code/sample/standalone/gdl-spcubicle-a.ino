// In this sample:
// Display a heart on the 8x8 matrix display.

#define ROWS 8
#define COLS 8

const int cols[COLS] = {PB0, PB2, PC6, PC15,PB3, PB5, PB4, PB6};    // Row pins
const int rows[ROWS] = {PB1,PA8,PA7,PA6,PA5, PA4, PA1,   PA0};  // Column pins

// Frame buffer for 5x5 matrix
bool buffer[COLS][ROWS];

// Clear all pixels
void clearall() {
  for (int r = 0; r < ROWS; r++)
    for (int c = 0; c < COLS; c++)
      buffer[r][c] = false;
}

// Set a pixel ON/OFF
void setpixel(int color, int x, int y) {
  // rotate:
  int tmp = x;
  x = y;
  y = tmp;
  
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
    buffer[y][x] = color;
  }
  
}

void setup() {
  // Initialize pins
  for (int i = 0; i < ROWS; i++) {
    pinMode(rows[i], OUTPUT);    
    digitalWrite(rows[i], LOW);    
  }

  for (int i = 0; i < COLS; i++) {    
    pinMode(cols[i], OUTPUT);    
    digitalWrite(cols[i], HIGH);
  }

  clearall();
}

void showheart() {

  clearall();
  setpixel(1,3,2); setpixel(1,4,2);
  setpixel(1,2,1); setpixel(1,5,1);
  setpixel(1,1,1); setpixel(1,6,1);
  setpixel(1,1,1); setpixel(1,6,1);
  setpixel(1,0,2); setpixel(1,7,2);
  setpixel(1,0,3); setpixel(1,7,3);
  setpixel(1,0,4); setpixel(1,7,4);
  setpixel(1,1,5); setpixel(1,6,5);
  setpixel(1,1,5); setpixel(1,6,5);
  setpixel(1,2,6); setpixel(1,5,6);
  setpixel(1,3,7); setpixel(1,4,7);
  
}

void loop() {
  
    static int currentRow = 0;
    static unsigned long lastScanTime = 0;
    const unsigned long scanInterval = 100; // microseconds per row (~1 kHz refresh)

    // Use micros() for high precision
    if (micros() - lastScanTime >= scanInterval) {
        lastScanTime = micros();

        // Turn off previous row
        digitalWrite(rows[currentRow], LOW);

        // Move to next row
        currentRow = (currentRow + 1) % ROWS;

        // Set columns for this row
        for (int c = 0; c < COLS; c++) {
            digitalWrite(cols[c], buffer[currentRow][c] ? LOW : HIGH);
        }

        // Turn on current row
        digitalWrite(rows[currentRow], HIGH);
    }
    else {
      showheart();
    }
}