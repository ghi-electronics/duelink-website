# In this sample:
# Continuously turn the motor forward at 50% speed, then backward at 50% speed, with a 2-second delay between each direction change

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def Set(speed):
    duelink.Engine.ExecuteCommand(f"Set({speed})")

while True:
    Set(50)      # forward
    time.sleep(2)  # 2000 ms -> 2 seconds
    Set(-50)     # backward
    time.sleep(2)