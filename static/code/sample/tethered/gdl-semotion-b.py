# In this sample:
# Detect motion

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# Methods
def Detect():
    return int(duelink.Engine.ExecuteCommand("Detect()"))

while True:
    detect = Detect()

    if detect != 0:
        print("Motion Detected")

    time.sleep(1)  # sleep for 1 second