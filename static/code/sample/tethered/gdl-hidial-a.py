# In this sample:
# Update Dial value every second

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def Dial():
    return duelink.Engine.ExecuteCommand("Dial()")

while True:
    print(f"Value: {Dial()}")
    time.sleep(1)  # Sleep for 1 second