# In this sample:
# STATLED blinks every 100 ms.
# Press and hold the LDR button: STATLED stops blinking and stays on.
# Release the LDR button: STATLED resumes blinking every 100 ms.

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

ldr_btn_state = False
ldr_btn_state_backup = False

def LdrPressed():
    cmd = "dread(20,2)"
    ret = duelink.Engine.ExecuteCommand(cmd)
    return ret != 0

duelink.Engine.ExecuteCommand("statled(100,100,0)")  # blink 100ms

while True:
    ldr_btn_state = LdrPressed()

    if ldr_btn_state_backup != ldr_btn_state:
        ldr_btn_state_backup = ldr_btn_state

        if ldr_btn_state_backup:
            duelink.Engine.ExecuteCommand("statled(1,0,0)")  # stay on
        else:
            duelink.Engine.ExecuteCommand("statled(100,100,0)")  # blink 100ms

    time.sleep(0.001)  # 1 ms
