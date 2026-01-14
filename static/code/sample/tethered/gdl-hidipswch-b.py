# In this sample:
# Scan all switches and indicate if any switch is in the ON position.

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def Read(index):
    ret = duelink.Engine.ExecuteCommand(f"Read({index})")
    return ret != 0

while True:
    for i in range(10):
        if Read(i + 1):
            print(f"Detected ON on switch index: {i + 1}")
    
    time.sleep(1) 

