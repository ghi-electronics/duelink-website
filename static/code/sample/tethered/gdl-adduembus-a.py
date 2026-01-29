# In this sample:
# Read an analog value from pin AN
import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def ReadAnalog():
    return duelink.Engine.ExecuteCommand("vread(5)")

while True:
    print(f"Analog: {ReadAnalog()}")
    time.sleep(1.0)