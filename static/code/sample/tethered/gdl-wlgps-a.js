// In this sample:
// Receive GPS data from the module every second
// Parse and display the time, date, latitude, longitude, and speed

import pkg_serialusb from 'dlserialusb';
const {SerialUSB} = pkg_serialusb

import pkg_duelink from 'duelink';
const {DUELinkController} = pkg_duelink

let duelink = new DUELinkController(new SerialUSB());
await duelink.Connect();

// Sleep helper (ms)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Methods
async function EnableReceive(en) {
    await duelink.Digital.Write(3, en);
}

async function DataToRead() {
    return await duelink.Uart.BytesToRead();
}

async function ReadData(data) {
    // Start receiving data
    await EnableReceive(true);

    while ((await DataToRead()) < data.length) {
        await sleep(100); // Sleep 100 ms
    }

    // More than 512 bytes, disable receiving to save bus traffic
    await EnableReceive(false);
    let total = await duelink.Uart.ReadBytes(data, 2000); // Timeout 2000 ms

    // Discard any remaining bytes
    await duelink.Uart.Discard();

    return total;
}

async function ParseGNRMC(buffer) {
    // Convert bytes to ASCII string, ignoring invalid characters
    let data;
    try {
        data = Buffer.from(buffer).toString('ascii'); // Node.js buffer
    } catch (err) {
        console.log("Error decoding buffer");
        return;
    }

    // Split by line endings
    let lines = data.replace(/\r/g, '\n').split('\n').filter(line => line);

    for (let line of lines) {
        if (line.startsWith("$GNRMC")) {
            let parts = line.split(',');

            if (parts.length < 12) {
                console.log("Invalid GNRMC sentence.");
                continue;
            }

            let timeStr = parts[1];
            let status = parts[2];  // A = valid, V = invalid
            let latStr = parts[3];
            let latDir = parts[4];
            let lonStr = parts[5];
            let lonDir = parts[6];
            let speedStr = parts[7]; // in knots
            let dateStr = parts[9];

            if (status !== "A") {
                console.log("GPS data invalid.");
                continue;
            }

            // Parse latitude
            let latitude = ParseNMEACoordinate(latStr, latDir);
            // Parse longitude
            let longitude = ParseNMEACoordinate(lonStr, lonDir);
            // Parse speed in knots to km/h
            let speedKmh = parseFloat(speedStr) ? parseFloat(speedStr) * 1.852 : 0;

            // Parse time
            let timeFormatted = ParseNMEATime(timeStr);
            // Parse date
            let dateFormatted = ParseNMEADate(dateStr);

            // Print results
            console.log("======================");
            console.log(`Time: ${timeFormatted}`);
            console.log(`Date: ${dateFormatted}`);
            console.log(`Latitude: ${latitude.toFixed(6)}`);
            console.log(`Longitude: ${longitude.toFixed(6)}`);
            console.log(`Speed: ${speedKmh.toFixed(2)} km/h`);

            break;
        }
    }
}

// Convert NMEA coordinate to decimal degrees
function ParseNMEACoordinate(value, direction) {
    if (!value) return 0;

    // Latitude: ddmm.mmmm, Longitude: dddmm.mmmm
    let dotIndex = value.indexOf('.');
    let degLength = (dotIndex > 4) ? 3 : 2;

    let degStr = value.substring(0, degLength);
    let minStr = value.substring(degLength);

    let degrees = parseFloat(degStr) || 0;
    let minutes = parseFloat(minStr) || 0;

    let result = degrees + (minutes / 60.0);

    if (direction === "S" || direction === "W") result = -result;

    return result;
}

// Parse NMEA time hhmmss.ss -> hh:mm:ss
function ParseNMEATime(time) {
    if (time.length < 6) return time;
    let hh = time.substring(0, 2);
    let mm = time.substring(2, 4);
    let ss = time.substring(4, 6);
    return `${hh}:${mm}:${ss}`;
}

// Parse NMEA date ddmmyy -> yyyy-mm-dd
function ParseNMEADate(date) {
    if (date.length !== 6) return date;
    let dd = date.substring(0, 2);
    let mm = date.substring(2, 4);
    let yy = date.substring(4, 6);
    let year = 2000 + parseInt(yy, 10);
    return `${year}-${mm}-${dd}`;
}

// Sample code
(async () => {
    let data_received = new Uint8Array(512);
    await duelink.Uart.Configuration(9600, 2048);

    while (true) {
        let total = await ReadData(data_received);
        await ParseGNRMC(data_received);
        await sleep(1000); // Sleep 1 second
    }
})();