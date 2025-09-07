import sys
import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

duelink.Engine.Run("Ear(1,1)")
duelink.Engine.Run("PlayBeep(2000,100)")
duelink.Engine.Run("statled(100, 100, 0) # blink led forever")
while True:
    duelink.Engine.Run("Eye(0x0000FF,0x0000FF)")
    duelink.Engine.Run("Mouth(1)")
    time.sleep(1)
    duelink.Engine.Run("Eye(0xFF0000,0xFF0000)")
    duelink.Engine.Run("Mouth(0)")
    time.sleep(1)