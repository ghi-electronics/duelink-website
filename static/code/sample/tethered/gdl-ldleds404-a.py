# In this sample:
# Display the current minute and second on the LED (timer version).

import time
from datetime import datetime
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def DrawNumber(led, number):
    duelink.Engine.ExecuteCommand(f"Seg7({led},{number})")

def ShowColon(value):
    duelink.Engine.ExecuteCommand(f"Colon({value})")

def Show():
    duelink.Engine.ExecuteCommand("Show()")

min = 0
sec = 0

while True:
    now = datetime.utcnow()
    minute = now.minute
    second = now.second

    if sec != second or min != minute:
        sec = second
        min = minute
        DrawNumber(0, sec % 10)
        DrawNumber(1, sec // 10)

        DrawNumber(2, min % 10)
        DrawNumber(3, min // 10)

    ShowColon(1)
    Show()
    time.sleep(0.4)  # 

    ShowColon(0)
    Show()
    time.sleep(0.4)  # 