
# In this sample:
# Update counter from 0 to 9 every second
# Press any button (A or B) to reset the counter to 0

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)


def ButtonAPressed():
    cmd = "BtnA()"
    ret = duelink.Engine.ExecuteCommand(cmd)
    return ret != 0

def ButtonBPressed():
    cmd = "BtnB()"
    ret = duelink.Engine.ExecuteCommand(cmd)
    return ret != 0

def DrawNumber(number):
    duelink.Engine.ExecuteCommand("clear(0)")
    cmd = f'Textt("{number}", 1, 0,0)'
    duelink.Engine.ExecuteCommand(cmd)
    duelink.Engine.ExecuteCommand("show()")

counter = 0

while True:
    if ButtonAPressed() or ButtonBPressed():
        counter = 0

    DrawNumber(counter)

    counter += 1
    if counter == 10:
        counter = 0

    time.sleep(1)
