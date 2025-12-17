# In this sample:
# Read temperature every 1.5 second
# Issue: The reading temperature is about ~3 degrees Celsius higher than normal.

import time
from datetime import datetime
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def GetTemperature():
    return float(duelink.Engine.ExecuteCommand("ReadTemp()"))

while True:
    print(f"Temperature: {GetTemperature()} ")    

    time.sleep(1.5)  # 1500 ms
