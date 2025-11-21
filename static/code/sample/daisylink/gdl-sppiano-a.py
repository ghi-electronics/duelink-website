# In this sample:
# Simulate tones from note C4 to C5
# Press the left or right arrow to play a sweep sound
# All leds 1,2,3,4,5 turn to ON

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)


def CreateArray(array, data):
    cmd = f"dim {array}"
    duelink.Engine.ExecuteCommand(cmd)

    for i in range(len(data)):
        cmd = f"{array}[{i}]=data[{i}]"
        duelink.Engine.ExecuteCommand(cmd)
        time.sleep(0.001)  

def IsTouch(pin):
    cmd = f"PulseIn({pin}, 500, 1,100)"
    ret = duelink.Engine.ExecuteCommand(cmd)

    if ret > 150 and ret < 65000:
        return True
    return False

def PlayTone(tone):
    cmd = f"freq(3, {tone}, 500, 0.5)"
    duelink.Engine.ExecuteCommand(cmd)

def SweepSound():
    cmd = "sweep(3, 2000,4000,50,255,100)"
    duelink.Engine.ExecuteCommand(cmd)

def SetAllLed(on):
    value = 1 if on else 0
    for i in range(5):
        cmd = f"SetLED({i+1},{value})"
        duelink.Engine.ExecuteCommand(cmd)

b1 = [23, 19, 12, 13, 14, 15, 16, 18, 24, 10, 9, 8, 17]
a1 = [261, 277, 293, 311, 329, 349, 369, 392, 415, 440, 466, 493, 523]

b3 = [False] * len(b1)
b4 = [False] * len(b1)

CreateArray("b1", b1)
CreateArray("a1", a1)

SetAllLed(True)

while True:
    for i in range(len(b1)):
        b3[i] = IsTouch(b1[i])

        if b4[i] != b3[i]:
            b4[i] = b3[i]

            if b4[i]:
                PlayTone(a1[i])

    if IsTouch(7) or IsTouch(11):
        SweepSound()

    time.sleep(0.001)  # 1 ms



