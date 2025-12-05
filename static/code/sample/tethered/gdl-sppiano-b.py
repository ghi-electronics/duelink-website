
# In this sample:
# Simulate tones from note C4 to C5
# Press the left arrow all leds 1,2,3,4,5 are off, play a sweep sound
# Press the right arrow all leds 1,2,3,4,5 are on, play a sweep sound

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)


def IsLeftArrowTouched():
    ret = duelink.Engine.ExecuteCommand("TLArrow()")
    return ret == 1

def IsRightArrowTouched():
    ret = duelink.Engine.ExecuteCommand("TRArrow()")
    return ret == 1

def IsPadTouched(i):
    ret = duelink.Engine.ExecuteCommand(f"TPad({i})")
    return ret == 1

tones = [523, 554, 587, 622, 659, 698, 740, 784, 830, 880, 932, 987, 1047]

while True:
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

    if IsRightArrowTouched():
        duelink.Engine.ExecuteCommand("SetLEDAll(1)")
        duelink.Engine.ExecuteCommand("sweep(3, 2000,1000,255,50,250)")
        time.sleep(0.25)

    time.sleep(0.001)





