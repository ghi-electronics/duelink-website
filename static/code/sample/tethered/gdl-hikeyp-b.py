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


while True:
    # use this then no need to call SStart("Scan", 100, 0)
    # in script that require while(1) loop active
    duelink.Engine.ExecuteCommand("Scan()")

    time.sleep(0.01)  # Thread.Sleep(10)

    if IsKeyChange():
        key = ReadKey()

        if key == 0:
            print("Key released")
        else:
            print(f"Key pressed: {chr(ReadKey())}")

    time.sleep(0.1)  # Thread.Sleep(100)