# In this sample:
# Update Slide value every second

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def Slide():
    return duelink.Engine.ExecuteCommand("Slide()")

while True:
    print(f"Value: {Slide()}")
    time.sleep(1)  # Sleep for 1 second