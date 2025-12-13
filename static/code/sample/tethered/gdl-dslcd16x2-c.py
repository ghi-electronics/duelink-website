# In this sample:
# Display the text "DUELink!" on the first row
# Continuously display '*' moving from left to right, then right to left

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def DrawChar(c):
    cmd = f"CPrint('{c}')"
    duelink.Engine.ExecuteCommand(cmd)

def DrawString(text):
    cmd = f"CPrintS(\"{text}\")"
    duelink.Engine.ExecuteCommand(cmd)

def MoveToHome():
    duelink.Engine.ExecuteCommand("Home()")

def Clear():
    duelink.Engine.ExecuteCommand("clr()")

def MoveTo(col, row):
    cmd = f"CPos({col},{row})"
    duelink.Engine.ExecuteCommand(cmd)

i = 10
dir = 1

while True:
    MoveTo(5, 0)
    DrawString("DUELink!")
    MoveTo(i, 1)
    DrawChar('*')
    time.sleep(0.03)   # 30 ms
    MoveTo(i, 1)
    DrawChar(' ')
    i += dir

    if i > 12 or i < 3:
        dir *= -1