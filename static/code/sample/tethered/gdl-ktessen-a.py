# In this sample:
# 1. Read the distance and display it on the TFT N18
# 2. Continuously scan LEDs from D1 to D16 (play LEDs in a circular - circle mode)
# 3. When the rotary button is pressed:
#  - All LEDs from D1 to D16 on LEDR16 turn on.
#  - The servo rotates to 180 degrees.
# 4. When the rotary button is released:
#  - All LEDs from D1 to D16 on LEDR16 return to circular mode.
#  - The servo rotates back to 0 degrees.
# 5. When light detection is below 20%, the buzzer repeatedly beeps. If it is above 20%, the buzzer stays quiet.
# 6. Changes in distance will adjust the LED circle speed. For example:
#    5 cm = 5 ms delay, 10 cm = 10 ms delay, and so on.

import math
import time
from datetime import datetime
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

DISTANCE_ADDRESS = 1
DISPLAY_ADDRESS = 2
SERVO_ADDRESS = 3
LEDR16_ADDRESS = 4
BUZER_ADDRESS = 5
ROTARY_ADDRESS = 6
LIGHT_ADDRESS = 7

currentAddress = -1

distance_val = -1.0
rotary_val = 0
counter = 0
counter2 = 0
doUpdateScreen = False
rotary_button_pressed = False
light_val = 0

def SelectDevice(deviceAddress):
    global currentAddress
    if currentAddress != deviceAddress:
        currentAddress = deviceAddress
        duelink.Engine.ExecuteCommand(f"sel({currentAddress})")
        time.sleep(0.002)   # Thread.Sleep(2)


# ---------------- Display ------------------

def DrawText(text, color, x, y, scalex, scaley):
    SelectDevice(DISPLAY_ADDRESS)
    duelink.Engine.ExecuteCommand(f'textS("{text}", {color}, {x}, {y}, {scalex}, {scaley})')


def ClearScreen(color):
    SelectDevice(DISPLAY_ADDRESS)
    duelink.Engine.ExecuteCommand(f"clear({color})")


def Show():
    SelectDevice(DISPLAY_ADDRESS)
    duelink.Engine.ExecuteCommand("show()")


def RGB(r, g, b):
    return (r << 16) | (g << 8) | b


def UpdateScreen(update):
    global distance_val, rotary_button_pressed, light_val

    if update:
        ClearScreen(0)

        dis = f"{distance_val:.2f}"
        DrawText("Distance:", RGB(255, 255, 255), 0, 0, 1, 1)
        DrawText(f"{dis} cm", RGB(0, 255, 0), 5, 10, 1, 1)

        DrawText("Rotary button:", RGB(255, 255, 255), 0, 20, 1, 1)
        DrawText("Pressed" if rotary_button_pressed else "Released",
                 RGB(0, 255, 0), 5, 30, 1, 1)

        DrawText("Light:", RGB(255, 255, 255), 0, 40, 1, 1)
        DrawText(f"{light_val}%", RGB(0, 255, 0), 5, 50, 1, 1)

        Show()


# ---------------- Distance ------------------

def GetDistance():
    SelectDevice(DISTANCE_ADDRESS)
    ret = duelink.Engine.ExecuteCommand("Distance()")
    ret1 = int(ret * 10)
    return ret1 / 10.0


# ---------------- Rotary ------------------

def GetRotaryPress():
    SelectDevice(ROTARY_ADDRESS)
    ret = duelink.Engine.ExecuteCommand("Pressed()")
    return ret != 0


# ---------------- LEDR16 ------------------

def SetLedR16(led, value):
    SelectDevice(LEDR16_ADDRESS)
    val = 1 if value else 0
    duelink.Engine.ExecuteCommand(f"SetLed({led},{val})")


def SetLedR16All(value):
    SelectDevice(LEDR16_ADDRESS)
    val = 1 if value else 0
    if value:
        for led in range(1, 17):
            duelink.Engine.ExecuteCommand(f"SetLed({led},{val})")
    else:
        duelink.Engine.ExecuteCommand("LedOff()")


# ---------------- Servo ------------------

def SetServo(position):
    SelectDevice(SERVO_ADDRESS)
    duelink.Engine.ExecuteCommand(f"ServoSt(1,{position})")


# ---------------- Light ------------------

def GetLight():
    SelectDevice(LIGHT_ADDRESS)
    ret = duelink.Engine.ExecuteCommand("Light()")
    return int(ret)


# ---------------- Buzzer ------------------

def PlaySound():
    SelectDevice(BUZER_ADDRESS)
    duelink.Engine.ExecuteCommand("freq(7, 1000, 250, 0.5)")


# ---------------- Main Loop ------------------

while True:
    

    if counter % 10 == 0:
        cur_distance = GetDistance()
        if cur_distance != distance_val:
            distance_val = cur_distance
            doUpdateScreen = True

    if counter % 11 == 0:
        pressed = GetRotaryPress()
        if pressed != rotary_button_pressed:
            rotary_button_pressed = pressed

            if rotary_button_pressed:
                SetLedR16All(True)
                SetServo(180)
            else:
                SetLedR16All(False)
                SetServo(0)

    if counter % 12 == 0:
        light_tmp = GetLight()
        if light_tmp != light_val:
            light_val = light_tmp
            doUpdateScreen = True

        if light_val < 20:
            PlaySound()

    if not rotary_button_pressed:
        SetLedR16((counter % 16) + 1,
                  True if ((counter // 16) % 2 == 0) else False)

    if counter % 16 == 0:
        UpdateScreen(doUpdateScreen)
        doUpdateScreen = False

    counter += 1

    DELAY_MAX = 100
    DELAY_MIN = 5

    distance_val = max(DELAY_MIN, min(DELAY_MAX, distance_val))

    time.sleep(distance_val / 1000.0)