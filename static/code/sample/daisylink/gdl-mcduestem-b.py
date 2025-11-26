# In this sample:
# Display Accel X, Y, and Z on the screen.
# Press the Up button: the light bulb turns red and a short beep plays.
# Press the Down button: the light bulb turns green and a short beep plays.
# Press the Left button: the light bulb turns blue and a short beep plays.


from DUELink.DUELinkController import DUELinkController
import time

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def GetAccelX():
    ret = int(duelink.Engine.ExecuteCommand("GetX()"))
    return ret

def GetAccelY():
    ret = int(duelink.Engine.ExecuteCommand("GetY()"))
    return ret

def GetAccelZ():
    ret = int(duelink.Engine.ExecuteCommand("GetZ()"))
    return ret

def GetLight():
    ret = int(duelink.Engine.ExecuteCommand("Light()"))
    return ret

def GetTemperature():
    ret = int(duelink.Engine.ExecuteCommand("ReadTemp()"))
    return ret

def SetBulb(color):
    cmd = f"SetBulb({color})"
    duelink.Engine.ExecuteCommand(cmd)

def SetServo(servo, degree):
    if servo != 5 and servo != 6:
        return
    cmd = f"ServoSt({servo},{degree})"
    duelink.Engine.ExecuteCommand(cmd)

def ClearScreen():
    duelink.Engine.ExecuteCommand("Clear(0)")

def DrawText(s, x, y):
    cmd = f'TextS("{s}",1,{x},{y},1,2)'
    duelink.Engine.ExecuteCommand(cmd)

def ShowScreen():
    duelink.Engine.ExecuteCommand("Show()")

def ButtonPressed(button):
    cmd = f"BtnDown(BtnPin('{button}'))"
    ret = duelink.Engine.ExecuteCommand(cmd)
    return ret != 0

def PlayTunes(freq, duration):
    cmd = f"freq(3,{freq},{duration},0.5)"
    duelink.Engine.ExecuteCommand(cmd)

# Backup values
x_bk = 0
y_bk = 0
z_bk = 0
light_bk = 0
temp_bk = 0

while True:
    x = GetAccelX()
    y = GetAccelY()
    z = GetAccelZ()
    light = GetLight()
    temp = GetTemperature()

    # Only redraw if values changed
    if x_bk != x or y_bk != y or z_bk != z or light_bk != light or temp_bk != temp:
        x_bk = x
        y_bk = y
        z_bk = z
        light_bk = light
        temp_bk = temp
        ClearScreen()
        DrawText(f"X:{x}, Y:{y}, Z:{z}", 0, 0)
        DrawText(f"Light:{light}%", 0, 20)
        DrawText(f"Temperature:{temp} C", 0, 40)
        ShowScreen()

    # Button actions
    if ButtonPressed('U'):
        SetBulb(0xFF0000)
        PlayTunes(1000, 100)
    if ButtonPressed('D'):
        SetBulb(0x00FF00)
        PlayTunes(1000, 100)
    if ButtonPressed('L'):
        SetBulb(0x0000FF)
        PlayTunes(1000, 100)
    if ButtonPressed('R'):
        SetBulb(0xFFFFFF)
        PlayTunes(1000, 100)

    time.sleep(0.001)  # 1 ms

