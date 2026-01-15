// In this sample:
// Receive GPS data from the module every second
// Parse and display the time, date, latitude, longitude, and speed

using System;
using System.Diagnostics;
using System.Globalization;
using System.Text;
using GHIElectronics.DUELink;

var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);

void EnableReceive(bool en) {    
    duelink.Digital.Write(3, en);
}

int DataToRead() {
    var b2r = duelink.Uart.BytesToRead();
    return b2r;
}

int ReadData(byte[] data) {
    // Start receiving data
    EnableReceive(true);
    
    while (DataToRead() < data.Length) {
        Thread.Sleep(100);
    }

    // more than 512, disale receiving to save bus traffic
    EnableReceive(false);
    var total = duelink.Uart.ReadBytes(data, TimeSpan.FromSeconds(2));

    //Discard all left
    duelink.Uart.Discard();

    return total;    
}

static void ParseGNRMC(byte[] buffer) {
    // Convert bytes to ASCII string
    var data = Encoding.ASCII.GetString(buffer);
    // Split by line endings
    var lines = data.Split(new[] { "\r\n", "\n" }, StringSplitOptions.RemoveEmptyEntries);

    foreach (var line in lines) {
        if (line.StartsWith("$GNRMC")) {
            var parts = line.Split(',');

            if (parts.Length < 12) {
                Console.WriteLine("Invalid GNRMC sentence.");
                continue;
            }

            var timeStr = parts[1];
            var status = parts[2];  // A = valid, V = invalid
            var latStr = parts[3];
            var latDir = parts[4];
            var lonStr = parts[5];
            var lonDir = parts[6];
            var speedStr = parts[7]; // in knots
            var dateStr = parts[9];

            if (status != "A") {
                Console.WriteLine("GPS data invalid.");
                continue;
            }

            // Parse latitude
            var latitude = ParseNMEACoordinate(latStr, latDir);
            // Parse longitude
            var longitude = ParseNMEACoordinate(lonStr, lonDir);
            // Parse speed in knots to km/h
            var speedKmh = double.TryParse(speedStr, NumberStyles.Float, CultureInfo.InvariantCulture, out var s) ? s * 1.852 : 0;

            // Parse time
            var timeFormatted = ParseNMEATime(timeStr);
            // Parse date
            var dateFormatted = ParseNMEADate(dateStr);

            // Print results
            Console.WriteLine("======================");
            Console.WriteLine($"Time: {timeFormatted}");
            Console.WriteLine($"Date: {dateFormatted}");
            Console.WriteLine($"Latitude: {latitude:F6}");
            Console.WriteLine($"Longitude: {longitude:F6}");
            Console.WriteLine($"Speed: {speedKmh:F2} km/h");

            break;
        }
    }
}

// Convert NMEA coordinate to decimal degrees
static double ParseNMEACoordinate(string value, string direction) {
    if (string.IsNullOrEmpty(value)) return 0;

    // Latitude: ddmm.mmmm, Longitude: dddmm.mmmm
    var dotIndex = value.IndexOf('.');
    var degLength = (dotIndex == -1) ? 2 : (dotIndex > 4 ? 3 : 2);

    var degStr = value.Substring(0, degLength);
    var minStr = value.Substring(degLength);

    var degrees = double.Parse(degStr, CultureInfo.InvariantCulture);
    var minutes = double.Parse(minStr, CultureInfo.InvariantCulture);

    var result = degrees + (minutes / 60.0);

    if (direction == "S" || direction == "W")
        result = -result;

    return result;
}

// Parse NMEA time hhmmss.ss -> hh:mm:ss
static string ParseNMEATime(string time) {
    if (time.Length < 6) return time;
    var hh = time.Substring(0, 2);
    var mm = time.Substring(2, 2);
    var ss = time.Substring(4, 2);
    return $"{hh}:{mm}:{ss}";
}

// Parse NMEA date ddmmyy -> yyyy-mm-dd
static string ParseNMEADate(string date) {
    if (date.Length != 6) return date;
    var dd = date.Substring(0, 2);
    var mm = date.Substring(2, 2);
    var yy = date.Substring(4, 2);
    var year = 2000 + int.Parse(yy);
    return $"{year}-{mm}-{dd}";
}

// Sample code
var data_received = new byte[512];
duelink.Uart.Configuration(9600, 2048);
while (true) {
    var total = ReadData(data_received);
    ParseGNRMC(data_received);

    Thread.Sleep(1000);
}
