# In this sample:
# Update X, Y and Button status every 100ms

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
button_pin = int(duelink.Engine.ExecuteCommand("BtnPin()"))

def ReadX():
    ret = duelink.Engine.ExecuteCommand("JoystickX()")
    return int(ret)

def ReadY():
    ret = duelink.Engine.ExecuteCommand("JoystickY()")
    return int(ret)

def ReadButton():
    ret = duelink.Digital.Read(button_pin, 1)
    return 0 if ret == False else 1

while True:
    x = ReadX()
    y = ReadY()
    bt = ReadButton()

    print(f"X = {x}, Y = {y}, Button status: {bt}")

    time.sleep(0.1)