# In this sample:
# Continuously set the stepper motor 1 to 200 steps, alternating the direction between forward and backward

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def Set(stepdrive_index, direction, step_num):
    if direction != 1:
        direction = 0

    if stepdrive_index == 1:
        duelink.Engine.ExecuteCommand(f"step_m1({direction},{step_num})")

    elif stepdrive_index == 2:  # available on StepDrive P3 only
        duelink.Engine.ExecuteCommand(f"step_m2({direction},{step_num})")

    elif stepdrive_index == 3:  # available on StepDrive P3 only
        duelink.Engine.ExecuteCommand(f"step_m3({direction},{step_num})")


while True:
    Set(1, 1, 200)     # forward
    time.sleep(1.0)   # 1000 ms
    Set(1, -1, 200)   # backward
    time.sleep(1.0)   # 1000 ms
