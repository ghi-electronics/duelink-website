# In this sample:
# When the light level is above 10%, all LEDs (5x5) turn on.
# When the light level is below 10%, all LEDs (5x5) turn off.
# Touch any touch pad (A, B, Up, Down, Left, Right): a short beep plays.

from DUELink.DUELinkController import DUELinkController
import time

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def IsTouchA():
    ret = int(duelink.Engine.ExecuteCommand("TouchA()"))
    return ret == 1

def IsTouchB():
    ret = int(duelink.Engine.ExecuteCommand("TouchB()"))
    return ret == 1

def IsTouchUp():
    ret = int(duelink.Engine.ExecuteCommand("TouchUp()"))
    return ret == 1

def IsTouchDown():
    ret = int(duelink.Engine.ExecuteCommand("TouchDown()"))
    return ret == 1

def IsTouchLeft():
    ret = int(duelink.Engine.ExecuteCommand("TouchLeft()"))
    return ret == 1

def IsTouchRight():
    ret = int(duelink.Engine.ExecuteCommand("TouchRight()"))
    return ret == 1

def GetLight():
    ret = int(duelink.Engine.ExecuteCommand("Light()"))
    return ret

def PlayBuzzer(freq, duration):
    cmd = f"freq(7,{freq},{duration},0.5)"
    duelink.Engine.ExecuteCommand(cmd)

def TurnLedAll(on):
    cmd = "Clear(0)"
    if on:
        cmd = "Clear(1)"
    duelink.Engine.ExecuteCommand(cmd)
    duelink.Engine.ExecuteCommand("show()")

# Main loop
while True:
    # Turn all lights on if light is 10% or higher
    TurnLedAll(GetLight() > 10)

    # Detect touch on A, B, Up, Down, Left, Right pads
    touch = IsTouchA() or IsTouchB() or IsTouchUp() or IsTouchDown() or IsTouchLeft() or IsTouchRight()

    if touch:
        PlayBuzzer(1000, 100)

    time.sleep(0.1)