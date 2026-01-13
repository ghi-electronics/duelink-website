# In this sample:
# Tested on Bi-Polar Stepper Motor Driver-2M542
# Continuously move axes X, Y, and Z forward and backward for 400 steps, with a 10 ms delay per step.

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def StepX(direction, stepnum):
    duelink.Engine.ExecuteCommand(f"StepX({direction},{stepnum})")
    
    # Blocking mode (C# Thread.Sleep uses milliseconds)
    time.sleep(stepnum / 1000.0)

def StepY(direction, stepnum):
    duelink.Engine.ExecuteCommand(f"StepY({direction},{stepnum})")
    
    # Blocking mode
    time.sleep(stepnum / 1000.0)

def StepZ(direction, stepnum):
    duelink.Engine.ExecuteCommand(f"StepZ({direction},{stepnum})")
    
    # Blocking mode
    time.sleep(stepnum / 1000.0)

while True:
    StepX(1, 400)  # forward
    StepY(1, 400)  # forward
    StepZ(1, 400)  # forward
    time.sleep(1)

    StepX(0, 400)  # backward
    StepY(0, 400)  # backward
    StepZ(0, 400)  # backward
    time.sleep(1)