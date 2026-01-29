# In this sample:
# Toggle the status LED every 500 ms
import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def SetLed():
    duelink.Engine.ExecuteCommand("statled(500,500,0)")

SetLed()