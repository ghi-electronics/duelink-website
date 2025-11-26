
# In this sample:
# Update counter from 0 to 9 every second
# Press LDR button to reset the counter to 0

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def ButtonLDRPressed():
    cmd = "dread(20,2)"
    ret = duelink.Engine.ExecuteCommand(cmd)
    return ret != 0

def DrawNumber(number):
    duelink.Engine.ExecuteCommand("clear(0)")
    cmd = f'TextS("{number}", 1, 1,0,1,1)'
    duelink.Engine.ExecuteCommand(cmd)
    duelink.Engine.ExecuteCommand("show()")

counter = 0

while True:
    if ButtonLDRPressed():
        counter = 0

    DrawNumber(counter)

    counter += 1
    if counter == 10:
        counter = 0

    time.sleep(1)

