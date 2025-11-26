# In this sample:
# Simulate tones from note C4 to C5
# Press the left or right arrow to play a sweep sound
# All leds 1,2,3,4,5 turn to ON
# Press the left arrow all leds 1,2,3,4,5 are off, play a sweep sound
# Press the right arrow all leds 1,2,3,4,5 are on, play a sweep sound

import time
from DUELink.DUELinkController import DUELinkController
@@ -10,62 +11,43 @@
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
def IsLeftArrowTouched():
    ret = duelink.Engine.ExecuteCommand("TLArrow()")
    return ret == 1

def SweepSound():
    cmd = "sweep(3, 2000,4000,50,255,100)"
    duelink.Engine.ExecuteCommand(cmd)
def IsRightArrowTouched():
    ret = duelink.Engine.ExecuteCommand("TRArrow()")
    return ret == 1

def SetAllLed(on):
    value = 1 if on else 0
    for i in range(5):
        cmd = f"SetLED({i+1},{value})"
        duelink.Engine.ExecuteCommand(cmd)
def IsPadTouched(i):
    ret = duelink.Engine.ExecuteCommand(f"TPad({i})")
    return ret == 1

b1 = [23, 19, 12, 13, 14, 15, 16, 18, 24, 10, 9, 8, 17]
a1 = [261, 277, 293, 311, 329, 349, 369, 392, 415, 440, 466, 493, 523]

b3 = [False] * len(b1)
b4 = [False] * len(b1)

CreateArray("b1", b1)
CreateArray("a1", a1)

SetAllLed(True)
tones = [523, 554, 587, 622, 659, 698, 740, 784, 830, 880, 932, 987, 1047]

while True:
    for i in range(len(b1)):
        b3[i] = IsTouch(b1[i])
    for i in range(len(tones)):
        if IsPadTouched(i):
            duelink.Engine.ExecuteCommand(f"freq(3, {tones[i]}, 0, 0.5)")
            while True:
                if not IsPadTouched(i):
                    duelink.Engine.ExecuteCommand(f"freq(3, {tones[i]}, 0, 1)")
                    break
                time.sleep(0.001)    

    if IsLeftArrowTouched():
        duelink.Engine.ExecuteCommand("SetLEDAll(0)")
        duelink.Engine.ExecuteCommand("sweep(3, 1000,2000,50,255,250)")
        time.sleep(0.25)

        if b4[i] != b3[i]:
            b4[i] = b3[i]
    if IsRightArrowTouched():
        duelink.Engine.ExecuteCommand("SetLEDAll(1)")
        duelink.Engine.ExecuteCommand("sweep(3, 2000,1000,255,50,250)")
        time.sleep(0.25)

            if b4[i]:
                PlayTone(a1[i])
    time.sleep(0.001)

    if IsTouch(7) or IsTouch(11):
        SweepSound()

    time.sleep(0.001)  # 1 ms
    