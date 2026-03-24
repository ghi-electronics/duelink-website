# In this sample:
# Detect a pressed key

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def IsKeyChange():
    ret = duelink.Engine.ExecuteCommand("IsKeyChange()")
    return True if ret > 0 else False


def ReadKey():
    ret = duelink.Engine.ExecuteCommand("RdKey()")
    return int(ret)

def Init():
    duelink.Engine.ExecuteCommand("Scan()")

Init()

while True:
    time.sleep(0.01)  # Thread.Sleep(10)

    if IsKeyChange():
        key = ReadKey()

        if key == 0:
            print("Key released")
        else:
            print(f"Key pressed: {chr(ReadKey())}")
