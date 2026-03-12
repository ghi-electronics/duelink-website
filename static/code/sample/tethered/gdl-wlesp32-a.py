
# In this sample:
# Using TeraTerm, connect to the device using TCP/IP (if WiFi is used) or Serial (if Bluetooth is used).
# From TeraTerm, send 1 byte and receive that byte +1. Example: press '1', TeraTerm shows '2'.
# Setup requirements:
# Wireless ESP32 must be configured for WiFi (or Bluetooth) as Data Gateway (AT disabled and Bridge mode disabled).

import time
from datetime import datetime
from DUELink.DUELinkController import DUELinkController


availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort) #Bluetooth COM port, change to user comport

# duelink = DUELinkController("/dev/ttyAMA0")

#variable
def IsBluetoothConnected():
    # Pin 5 goes low when Bluetooth is connected
    ret = duelink.Engine.ExecuteCommand("dread(5,1)")
    return int(ret) == 0

def IsWiFiConnected():
    # Pin 5 goes low when WiFi is connected
    ret = duelink.Engine.ExecuteCommand("dread(5,1)")
    return int(ret) == 0

def IsTcpConnected():
    # Pin 4 goes low when a TCP connection occurs (on mDNS "duelink", port 8080 if default)
    ret = duelink.Engine.ExecuteCommand("dread(4,1)")
    return int(ret) == 0

def WirelessRead():
    ret = duelink.Engine.ExecuteCommand("wlRead()")
    return int(ret)

def WirelessReadCount():
    ret = duelink.Engine.ExecuteCommand("wlReadcnt()")
    return int(ret)

def WirelessWrite(data):
    duelink.Engine.ExecuteCommand(f"wlWrite({data})")

while True:

    if not IsWiFiConnected():
        print("Wait for WiFi connection...")
        time.sleep(1)
        continue

    if not IsTcpConnected():
        print("Wait for TCP connection...")
        time.sleep(1)
        continue

    if WirelessReadCount() > 0:
        d = WirelessRead()

        print(f"Received: {chr(d)}")
        WirelessWrite(d + 1)
        print(f"Sent: {chr(d + 1)}")

    time.sleep(0.01)
