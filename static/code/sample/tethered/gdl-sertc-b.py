# In this sample:
# Set local date/time and read every second.)

import time
from datetime import datetime
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)


# method
def SetDateTime(dt):
    year = dt.year
    month = dt.month
    day = dt.day
    hour = dt.hour
    minute = dt.minute
    second = dt.second

    duelink.Engine.ExecuteCommand(
        f"SetTime({year}, {month},{day},{hour},{minute},{second})"
    )

def GetDateTime():
    duelink.Engine.ExecuteCommand("ReadTime()")

    year = int(duelink.Engine.ExecuteCommand("_y"))
    month = int(duelink.Engine.ExecuteCommand("_n"))
    day = int(duelink.Engine.ExecuteCommand("_d"))
    hour = int(duelink.Engine.ExecuteCommand("_h"))
    minute = int(duelink.Engine.ExecuteCommand("_m"))
    second = int(duelink.Engine.ExecuteCommand("_s"))

    return datetime(year, month, day, hour, minute, second)

SetDateTime(datetime.now())

while True:
    print(f"Now: {GetDateTime()} ")
    time.sleep(1)  # 1000 ms
