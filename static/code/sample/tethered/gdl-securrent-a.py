# In this sample:
# Display current (A)

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# Methods
def ReadCurrent():
    return float(duelink.Engine.ExecuteCommand("Current()"))

while True:
    print(f"Current: {ReadCurrent()} A")
    time.sleep(1)  # 1000 ms