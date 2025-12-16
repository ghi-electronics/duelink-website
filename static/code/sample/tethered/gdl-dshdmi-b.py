# In this sample:
# Draw the text "DUELink" in multiple colors at the center of the screen.

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def Clear():
    duelink.Engine.ExecuteCommand("DLClear()")
    duelink.Engine.ExecuteCommand("DLCmd(C_CLEAR_COLOR,{0,0,0})")
    duelink.Engine.ExecuteCommand("DLCmd(C_CLEAR,{})")


def FillRect(color, x, y, width, height):
    r = (color >> 16) & 0xFF
    g = (color >> 8) & 0xFF
    b = (color >> 0) & 0xFF

    cmd = f"DLCmd(C_COLOR,{{{r},{g},{b}}})"
    duelink.Engine.ExecuteCommand(cmd)

    duelink.Engine.ExecuteCommand("DLCmd(C_BEGIN,{RECTS})")

    cmd = f"DLCmd(C_VERTEX2F, {{{x << 4},{y << 4}}})"
    duelink.Engine.ExecuteCommand(cmd)

    cmd = f"DLCmd(C_VERTEX2F, {{{(width + x) << 4},{(height + y) << 4}}})"
    duelink.Engine.ExecuteCommand(cmd)

    duelink.Engine.ExecuteCommand("DLCmd(C_END,{})")


def DrawChar(c, color, x, y, size):
    r = (color >> 16) & 0xFF
    g = (color >> 8) & 0xFF
    b = (color >> 0) & 0xFF

    cmd = f"DLCmd(C_COLOR,{{{r},{g},{b}}})"
    duelink.Engine.ExecuteCommand(cmd)

    duelink.Engine.ExecuteCommand("DLCmd(C_BEGIN,{BITMAPS})")

    cmd = f"DLCmd(C_VERTEX2II, {{{x},{y},{size},'{c}'}})"
    duelink.Engine.ExecuteCommand(cmd)

    duelink.Engine.ExecuteCommand("DLCmd(C_END,{})")


def Show():
    duelink.Engine.ExecuteCommand("DLCmd(C_DISPLAY,{})")
    duelink.Engine.ExecuteCommand("DLSwap()")


# ---- Main ----

Clear()

DrawChar('D', 0xff0000, 300, 192, 31)
DrawChar('U', 0x00ff00, 335, 192, 31)
DrawChar('E', 0x0000ff, 370, 192, 31)
DrawChar('L', 0x00ffff, 405, 192, 31)
DrawChar('i', 0xff00ff, 435, 192, 31)
DrawChar('n', 0xffff00, 460, 192, 31)
DrawChar('k', 0xffffff, 495, 192, 31)

FillRect(0x808080, 300, 250, 224, 10)
Show()