# In this sample:
# Update distance in cm every second

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def GetDistance():
    ret = duelink.Engine.ExecuteCommand("Distance()")
    return ret

while True:
    distance = GetDistance()
    print(f"Distance: {distance} cm")
    time.sleep(1)