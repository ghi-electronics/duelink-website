# In this sample:
# Send 0 or 1 to another RS485 to control the LED status.
# Receive data from the RS485.

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def Initialize():
    EnableRx(True)
    EnableTx(False)
    duelink.Uart.Configuration(9600, 128)
    # duelink.Engine.ExecuteCommand("SerCfg(9600,128)")  # same thing

def EnableRx(value):
    v = 0 if value else 1
    duelink.Digital.Write(5, not value)
    # duelink.Engine.ExecuteCommand(f"dwrite(5, {v})")  # same thing

def EnableTx(value):
    v = 1 if value else 0
    duelink.Digital.Write(6, value)
    # duelink.Engine.ExecuteCommand(f"dwrite(6, {v})")  # same thing

def WriteByte(b):
    EnableRx(False)
    EnableTx(True)
    duelink.Uart.WriteByte(b)
    # duelink.Engine.ExecuteCommand(f"SerWr({b})")  # same thing

    EnableTx(False)
    EnableRx(True)

def ReadByte():
    data = duelink.Uart.ReadByte()
    # data = duelink.Engine.ExecuteCommand("SerRd()")  # same thing
    return data

def ByteToRead():
    count = duelink.Uart.BytesToRead()
    # count = duelink.Engine.ExecuteCommand("SerB2R()")  # same thing
    return count

Initialize()
count = 0

while True:
    v = count % 2
    WriteByte(v)
    while ByteToRead() == 0:
        time.sleep(0.001)  # Sleep 1 ms, equivalent to Thread.Sleep(1)
    
    print(f"Rx: {ReadByte()}")
    count += 1
    time.sleep(1)  # Sleep 1 second