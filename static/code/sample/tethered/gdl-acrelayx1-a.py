# In this sample:
# Continuously switch relay on/off every 2 seconds

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def Set(value):
    v = 1 if value else 0
    duelink.Engine.ExecuteCommand(f"Set({v})")

while True:
    time.sleep(2)
    Set(True)

    time.sleep(2)
    Set(False)
