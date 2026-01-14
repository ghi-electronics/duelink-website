# In this sample:
# When a button is pressed, set light to white color 100% brightness on that button.

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def SetColor(button, red, green, blue, brightness):
    c = 1 if red else 0

    c = (c | (1 << 1)) if green else c
    c = (c | (1 << 2)) if blue else c

    brightness = 100 if brightness > 100 else brightness
    brightness = 0 if brightness < 0 else brightness

    index = 0

    if button == 'A':
        index = 0
    elif button == 'B':
        index = 1
    elif button == 'C':
        index = 2
    elif button == 'D':
        index = 3

    duelink.Engine.ExecuteCommand(f"SetClr({index},{c},{brightness})")


def IsButtonPressed(button):
    pressed = duelink.Engine.ExecuteCommand(
        f"Dread(BtnPin('{button}'),1)"
    ) == 0
    return pressed


buttonA_state1 = False
buttonA_state2 = True

buttonB_state1 = False
buttonB_state2 = True

buttonC_state1 = False
buttonC_state2 = True

buttonD_state1 = False
buttonD_state2 = True

while True:
    buttonA_state1 = IsButtonPressed('A')
    buttonB_state1 = IsButtonPressed('B')
    buttonC_state1 = IsButtonPressed('C')
    buttonD_state1 = IsButtonPressed('D')

    if buttonA_state1 != buttonA_state2:
        buttonA_state2 = buttonA_state1

        if buttonA_state2:
            SetColor('A', True, True, True, 100)
        else:
            SetColor('A', False, False, False, 0)

    if buttonB_state1 != buttonB_state2:
        buttonB_state2 = buttonB_state1

        if buttonB_state2:
            SetColor('B', True, True, True, 100)
        else:
            SetColor('B', False, False, False, 0)

    if buttonC_state1 != buttonC_state2:
        buttonC_state2 = buttonC_state1

        if buttonC_state2:
            SetColor('C', True, True, True, 100)
        else:
            SetColor('C', False, False, False, 0)

    if buttonD_state1 != buttonD_state2:
        buttonD_state2 = buttonD_state1

        if buttonD_state2:
            SetColor('D', True, True, True, 100)
        else:
            SetColor('D', False, False, False, 0)

    # Thread.Sleep(50) → 50 ms = 0.05 seconds
    time.sleep(0.05)