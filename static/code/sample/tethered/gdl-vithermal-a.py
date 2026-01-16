# In this sample:
# Read and display the temperature from pixel[0] to pixel[63]

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def GetTemperature(pixel):
    return int(duelink.Engine.ExecuteCommand(f"PixTemp({pixel})"))

while True:
    print("==============================")
    for i in range(64):
        print(f"Temperature at pixel {i}: {GetTemperature(i)}")

    time.sleep(0.1)