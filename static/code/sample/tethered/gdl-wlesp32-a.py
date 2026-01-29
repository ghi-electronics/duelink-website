# In this sample:
# Enable Wi-Fi and set the multicast DNS name to "duelink".
# A TCP client (for example, the Tera Term application) can connect to
# "duelink" on port 8080 to send and receive commands.
import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)


# methods
def IsBluetoothConnected():
    ret = duelink.Engine.ExecuteCommand("dread(5,1)")
    return ret == 0

def IsWiFiConnected():
    ret = duelink.Engine.ExecuteCommand("dread(5,1)")
    return ret == 0

def IsSocketConnected():
    ret = duelink.Engine.ExecuteCommand("dread(4,1)")
    return ret == 0

def StartBluetooth(name):
    duelink.Engine.ExecuteCommand(f'StartBT("{name}")')

def StartWiFi(ssid, pwd):
    duelink.Engine.ExecuteCommand(f'StartWiFi("{ssid}","{pwd}")')

def SetMulticastDns(mdns_name):
    duelink.Engine.ExecuteCommand(f'StartTcp("{mdns_name}")')

def EnableBrigde():
    duelink.Engine.ExecuteCommand("Bridge(1)")



StartWiFi("ssid", "pwd")

# The Wi-Fi connection can take up to 30 seconds.
# For testing, sleep for 1 seconds first.
time.sleep(1)

while IsWiFiConnected() == False:
    time.sleep(1)
    print("Waiting for Wi-Fi connection...")

SetMulticastDns("duelink")

while IsSocketConnected() == False:
    time.sleep(1)
    print("Waiting for TCP connection...")

EnableBrigde()

print("The bridge is ready for sending and receiving commands from TeraTerm")
