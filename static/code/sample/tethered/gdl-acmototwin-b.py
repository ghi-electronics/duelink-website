# In this sample:
# Continuously turn the motor A,B forward at 50% speed, then backward at 50% speed, with a 2-second delay between each direction change

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def SetMotorA(speed):
    duelink.Engine.ExecuteCommand(f"SMotorA({speed})")

def SetMotorB(speed):
    duelink.Engine.ExecuteCommand(f"SMotorB({speed})")

while True:
    SetMotorA(50)  # forward
    SetMotorB(50)  # forward
    time.sleep(2)  # 2-second delay
    SetMotorA(-50)  # backward
    SetMotorB(-50)  # backward
    time.sleep(2)  # 2-second delay