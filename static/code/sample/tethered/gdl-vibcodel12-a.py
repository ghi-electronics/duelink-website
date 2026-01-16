# In this sample:
# Set the scanner to Continuous mode
# Show the barcode when the barcode is close enough to the scanner

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def SetMode(mode):
    # 1: Trigger mode
    # 2: Continuous mode
    duelink.Engine.ExecuteCommand(f"SetMode({mode})")

def ByteToRead():
    return duelink.Uart.BytesToRead()

def ReadByte():
    return duelink.Uart.ReadByte()

SetMode(2)  # Continuous mode

print("Place barcode close to the scanner:")
while True:
    available1 = ByteToRead()

    time.sleep(0.25)  # wait for 250 ms

    available2 = ByteToRead()

    if available2 > 0 and available1 == available2:
        # After waiting 250 ms, if available2 == available1, it means no more data is coming,
        # so we can display the data.
        data = bytearray(available1)
        print("Detected barcode:")
        for i in range(len(data)):
            data[i] = ReadByte()
            print(chr(data[i]), end="")
        print()

    time.sleep(0.25)