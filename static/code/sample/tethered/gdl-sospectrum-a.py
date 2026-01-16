# In this sample:
# Get 7 channel data from Spectrum and show it on the console

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
while True:
    data = bytearray(7)  # Python equivalent of byte[7]
    
    duelink.Engine.ExecuteCommand("UpdBnd()")
    duelink.Stream.ReadBytes("b1", data)
    
    print("============================")
    for i in range(7):
        print(f"data {i}: {data[i]}")
    
    time.sleep(0.001)  # Sleep 1 millisecond