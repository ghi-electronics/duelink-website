# In this sample:
# The wireless ESP32 turns on Bluetooth as a wireless bridge, allowing a PC to read
# acceleration data (X, Y, Z) through a Bluetooth serial port.
#
# - Press the Up button: increases the fan speed (starts at 50%); displays "Up" on the MT1208.
# - Press the Down button: decreases the fan speed; displays "Dn" on the MT1208.
# - Press the Enter button: turns the fan off; displays "En" on the MT1208.
# - A beep plays when any of the Up / Down / Enter buttons is pressed.
#
# Devices need to be connected in the following order:
# - Wrireless ESP32 at first
# - Accel: device 1
# - Button S7: device 2
# - Retro Sound: device 3
# - MT1208: device 4
# - Fan: device 5
# The wireless ESP32 need script to initialize as Bluetooth bridge, use DUEScipt below:
### USRER CODE START #####
#statled(0, 1, 0)  # turn the statled off
#StartBT("duelink2") # set BT name duelink2
#statled(100, 100, 0) # Blinking: Wait for pair / connect
#while (1)
#  wait(100)
#  if (dread(5, 1) = 0)
#      break
#  end
#wend
#statled(1,0,0) # Statled stay on: Connect successful
#Bridge() # Start bridge 
### USRER CODE END #####
import time
from datetime import datetime
from DUELink.DUELinkController import DUELinkController


duelink = DUELinkController("COMx") #Bluetooth COM port, change to user comport

#variable
current_dev = -1
# methods
def SelectDevice(dev):
    global current_dev
    start = datetime.now()

    if current_dev != dev:
        duelink.Engine.Select(dev)
        current_dev = dev

    end = datetime.now() - start


def GetX():
    SelectDevice(1)
    start = datetime.now()
    x = int(duelink.Engine.ExecuteCommand("GetX()"))
    end = datetime.now() - start
    return x


def GetY():
    SelectDevice(1)
    start = datetime.now()
    y = int(duelink.Engine.ExecuteCommand("GetY()"))
    end = datetime.now() - start
    return y


def GetZ():
    SelectDevice(1)
    start = datetime.now()
    z = int(duelink.Engine.ExecuteCommand("GetZ()"))
    end = datetime.now() - start
    return z


def IsButtonPressed(button):
    SelectDevice(2)
    pin = int(duelink.Engine.ExecuteCommand(f"BtnPin('{button}')"))
    r = int(duelink.Engine.ExecuteCommand(f"btndown({pin})"))
    return r == 1


def SetFan(speed):
    SelectDevice(5)
    duelink.Engine.ExecuteCommand(f"Fan({speed})")


def SetText(c):
    SelectDevice(4)
    duelink.Engine.ExecuteCommand("Clear(0)")
    duelink.Engine.ExecuteCommand(f'Text("{c}",1,0,0)')
    duelink.Engine.ExecuteCommand("show()")


def PlayBeep():
    SelectDevice(3)
    # Use freq for a non-blocking response
    duelink.Engine.ExecuteCommand("freq(1,1000,100,0.5)")


counter = 0
accel_x = 0
accel_y = 0
accel_z = 0
fan_speed = 0.0

btnUp = False
btnDown = False
btnEnter = False

last_accel_read_x = datetime.now()
last_accel_read_y = datetime.now()
last_accel_read_z = datetime.now()


while True:
    count = counter % 7
    diff = 0.0

    if count == 0:
        diff = (datetime.now() - last_accel_read_x).total_seconds() * 1000
        if diff > 3000:
            accel_x = GetX()
            last_accel_read_x = datetime.now()

    elif count == 1:
        diff = (datetime.now() - last_accel_read_y).total_seconds() * 1000
        if diff > 3000:
            accel_y = GetY()
            last_accel_read_y = datetime.now()

    elif count == 2:
        diff = (datetime.now() - last_accel_read_z).total_seconds() * 1000
        if diff > 3000:
            accel_z = GetZ()
            last_accel_read_z = datetime.now()

        print(f"X = {accel_x}, Y = {accel_y}, Z = {accel_z}")

    elif count == 3:
        btnUp = IsButtonPressed('U')

    elif count == 4:
        btnDown = IsButtonPressed('D')

    elif count == 5:
        btnEnter = IsButtonPressed('E')

    if btnUp:
        btnUp = False
        fan_speed += 10

        if fan_speed < 50:
            fan_speed = 50
        if fan_speed > 100:
            fan_speed = 100

        SetFan(fan_speed)
        PlayBeep()
        SetText("Up")

    if btnDown:
        btnDown = False
        fan_speed -= 10

        if fan_speed < 50:
            fan_speed = 1

        SetFan(fan_speed)
        PlayBeep()
        SetText("Dn")

    if btnEnter:
        btnEnter = False
        fan_speed = 1
        SetFan(fan_speed)
        PlayBeep()
        SetText("En")

    counter += 1

    # Thread.Sleep(1) → sleep for 1 ms
    time.sleep(0.001)
