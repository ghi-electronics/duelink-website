# In this sample:
# Receive GPS data from the module every second
# Parse and display the time, date, latitude, longitude, and speed

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def EnableReceive(en: bool):
    duelink.Digital.Write(3, en)

def DataToRead() -> int:
    return duelink.Uart.BytesToRead()

def ReadData(data: bytearray) -> int:
    # Start receiving data
    EnableReceive(True)

    while DataToRead() < len(data):
        time.sleep(0.1)  # Sleep 100 ms

    # More than 512 bytes, disable receiving to save bus traffic
    EnableReceive(False)
    total = duelink.Uart.ReadBytes(data, 2.0)  # Timeout 2 seconds

    # Discard any remaining bytes
    duelink.Uart.Discard()

    return total

def ParseGNRMC(buffer: bytearray):
    # Convert bytes to ASCII string
    #try:
    #    data = buffer.decode('ascii')
    #except UnicodeDecodeError:
    #    print("Error decoding buffer")
    #    return
    data = buffer.decode('ascii', errors='ignore')

    # Split by line endings
    lines = [line for line in data.replace('\r', '\n').split('\n') if line]

    for line in lines:
        if line.startswith("$GNRMC"):
            parts = line.split(',')

            if len(parts) < 12:
                print("Invalid GNRMC sentence.")
                continue

            timeStr = parts[1]
            status = parts[2]  # A = valid, V = invalid
            latStr = parts[3]
            latDir = parts[4]
            lonStr = parts[5]
            lonDir = parts[6]
            speedStr = parts[7]  # in knots
            dateStr = parts[9]

            if status != "A":
                print("GPS data invalid.")
                continue

            # Parse latitude
            latitude = ParseNMEACoordinate(latStr, latDir)
            # Parse longitude
            longitude = ParseNMEACoordinate(lonStr, lonDir)
            # Parse speed in knots to km/h
            try:
                speedKmh = float(speedStr) * 1.852
            except ValueError:
                speedKmh = 0

            # Parse time
            timeFormatted = ParseNMEATime(timeStr)
            # Parse date
            dateFormatted = ParseNMEADate(dateStr)

            # Print results
            print("======================")
            print(f"Time: {timeFormatted}")
            print(f"Date: {dateFormatted}")
            print(f"Latitude: {latitude:.6f}")
            print(f"Longitude: {longitude:.6f}")
            print(f"Speed: {speedKmh:.2f} km/h")

            break

def ParseNMEACoordinate(value: str, direction: str) -> float:
    if not value:
        return 0.0

    # Latitude: ddmm.mmmm, Longitude: dddmm.mmmm
    dot_index = value.find('.')
    deg_length = 3 if dot_index > 4 else 2

    deg_str = value[:deg_length]
    min_str = value[deg_length:]

    try:
        degrees = float(deg_str)
        minutes = float(min_str)
    except ValueError:
        return 0.0

    result = degrees + (minutes / 60.0)

    if direction in ("S", "W"):
        result = -result

    return result

def ParseNMEATime(time_str: str) -> str:
    if len(time_str) < 6:
        return time_str
    hh = time_str[:2]
    mm = time_str[2:4]
    ss = time_str[4:6]
    return f"{hh}:{mm}:{ss}"

def ParseNMEADate(date_str: str) -> str:
    if len(date_str) != 6:
        return date_str
    dd = date_str[:2]
    mm = date_str[2:4]
    yy = date_str[4:6]
    year = 2000 + int(yy)
    return f"{year}-{mm}-{dd}"


# Sample code
data_received = bytearray(512)
duelink.Uart.Configuration(9600, 2048)

while True:
    total = ReadData(data_received)
    ParseGNRMC(data_received)
    time.sleep(1)  # Sleep 1 second