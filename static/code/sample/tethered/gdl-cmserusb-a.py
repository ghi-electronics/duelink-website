# In this sample:
# Receive a byte
# Send back (byte + 1)

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def Initialize():
    duelink.Uart.Configuration(9600, 128)

def WriteByte(b):
    duelink.Uart.WriteByte(b)

def ReadByte():
    data = duelink.Uart.ReadByte()
    return data

def ByteToRead():
    count = duelink.Uart.BytesToRead()
    return count

Initialize()

while True:
    while ByteToRead() == 0:
        time.sleep(0.1)  # 100 ms, same as Thread.Sleep(100)

    b = ReadByte()
    b += 1
    WriteByte(b)