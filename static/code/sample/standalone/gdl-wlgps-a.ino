// In this sample:
// Receive GPS data from the module every second
// Parse and display the time, date, latitude, longitude, and speed

#include <Arduino.h>
#include <SoftwareSerial.h> 

const uint8_t pin_map[] = {PB8, PA0, PA1, PA4, PA5, PA6, PA7, PA8, PB1, PB0, PC15, PC6, PB3, PB4, PB5,PB6,PB7,PB2,PB9,PA15,PA14,PA9,PA10,PA13,PC14};

const int getpin(int pin) {
    // Input mapped DUELink pin: P1, P2, P3
    // Return STM32 pin:PA0, PA1, PB0....
    return pin_map[pin];
}

SoftwareSerial softwareSerial(PA2, PA3); 

SoftwareSerial gpsSerial(PA0, PA1); // RX, TX

// Buffer for incoming GPS data
String gpsData = "";

double convertToDecimalDegrees(String rawValue, String direction) {
  if (rawValue.length() < 6) return 0.0;
  double deg = rawValue.substring(0, rawValue.indexOf('.') - 2).toDouble();
  double min = rawValue.substring(rawValue.indexOf('.') - 2).toDouble();
  double decimal = deg + (min / 60.0);
  if (direction == "S" || direction == "W") decimal *= -1;
  return decimal;
}

// Convert raw UTC time hhmmss.sss to HH:MM:SS
String formatTime(String rawTime) {
  if (rawTime.length() < 6) return "";
  String hh = rawTime.substring(0, 2);
  String mm = rawTime.substring(2, 4);
  String ss = rawTime.substring(4, 6);
  return hh + ":" + mm + ":" + ss;
}

// Convert raw date ddmmyy to YYYY-MM-DD
String formatDate(String rawDate) {
  if (rawDate.length() != 6) return "";
  String dd = rawDate.substring(0, 2);
  String mm = rawDate.substring(2, 4);
  String yy = rawDate.substring(4, 6);
  return "20" + yy + "-" + mm + "-" + dd;  // 21st century
}

// Parse GNRMC sentence
void parseGNRMC(String sentence) {
  if (!sentence.startsWith("$GNRMC")) return;

  String parts[12];
  int index = 0;
  int start = 0;
  for (int i = 0; i < sentence.length(); i++) {
    if (sentence[i] == ',' || sentence[i] == '*') {
      parts[index++] = sentence.substring(start, i);
      start = i + 1;
    }
  }

  String timeUTC = parts[1];      // hhmmss.sss
  String status = parts[2];       // A = active
  String lat = parts[3];          // Latitude
  String latDir = parts[4];       // N/S
  String lon = parts[5];          // Longitude
  String lonDir = parts[6];       // E/W
  String speedKnots = parts[7];   // Speed in knots
  String date = parts[9];         // ddmmyy

  if (status != "A") return; // Only process valid fix

  double latitude = convertToDecimalDegrees(lat, latDir);
  double longitude = convertToDecimalDegrees(lon, lonDir);
  double speedKmh = speedKnots.toFloat() * 1.852; // knots → km/h

  softwareSerial.println("---- GPS Data ----");
  softwareSerial.print("Time: "); softwareSerial.println(formatTime(timeUTC));
  softwareSerial.print("Date: "); softwareSerial.println(formatDate(date));
  softwareSerial.print("Latitude: "); softwareSerial.println(latitude, 6);
  softwareSerial.print("Longitude: "); softwareSerial.println(longitude, 6);
  softwareSerial.print("Speed: "); softwareSerial.print(speedKmh, 2); softwareSerial.println(" km/h");
  softwareSerial.println("-----------------");
}

void setup() {
  softwareSerial.begin(9600);    // Debug serial
  gpsSerial.begin(9600);   // GPS module baud rate
  pinMode(getpin(3), OUTPUT);
  digitalWrite(getpin(3), HIGH);
}

void loop() {
  while (gpsSerial.available()) {
    char c = gpsSerial.read();
    if (c == '\n') {       // End of NMEA sentence
      parseGNRMC(gpsData);
      gpsData = "";
    } else if (c != '\r') {
      gpsData += c;
    }
  }
}