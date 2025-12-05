# In this sample:
# Create a watch using the built-in graphics library.

import math
import time
from datetime import datetime
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

WIDTH = 160 // 2
HEIGHT = 128 // 2
CENTER_X = WIDTH // 2
CENTER_Y = HEIGHT // 2
RADIUS = 30

# API wrapper
def DrawTextTiny(text, color, x, y):
    duelink.Engine.ExecuteCommand(f'textT("{text}", {color}, {x}, {y})')

def DrawText(text, color, x, y, scalex, scaley):
    duelink.Engine.ExecuteCommand(f'textS("{text}", {color}, {x}, {y}, {scalex}, {scaley})')

def DrawLine(x1, y1, x2, y2, color):
    duelink.Engine.ExecuteCommand(f'line({color}, {x1}, {y1}, {x2}, {y2})')

def FillRect(color, x, y, width, height):
    duelink.Engine.ExecuteCommand(f'fill({color}, {x}, {y}, {width}, {height})')

def DrawCircle(x, y, radius, color):
    duelink.Engine.ExecuteCommand(f'circle({color}, {x}, {y}, {radius})')

def ClearScreen(color):
    duelink.Engine.ExecuteCommand(f'clear({color})')

def Show():
    duelink.Engine.ExecuteCommand('show()')

# Watch
def RGB(r, g, b):
    return (r << 16) | (g << 8) | b

def SetPixel(color, x, y):
    duelink.Engine.ExecuteCommand(f'Pixel({color},{x},{y})')

def DrawNumbers():
    for h in range(1, 13):
        angle = math.pi / 6 * (h - 3)  # 0 hour at right
        x = CENTER_X + int((RADIUS - 5) * math.cos(angle))
        y = CENTER_Y + int((RADIUS - 5) * math.sin(angle))
        DrawTextTiny(str(h), RGB(255, 255, 255), x-2, y-2)

def DrawHand(angle, length, color):
    x = CENTER_X + int(length * math.cos(angle))
    y = CENTER_Y + int(length * math.sin(angle))
    DrawLine(CENTER_X, CENTER_Y, x, y, color)

# Main loop
while True:
    ClearScreen(RGB(0, 127, 255))
    DrawCircle(CENTER_X, CENTER_Y, RADIUS, RGB(0, 0, 127))
    DrawNumbers()

    now = datetime.now()

    secondAngle = math.pi / 30 * (now.second - 15)
    minuteAngle = math.pi / 30 * (now.minute - 15 + now.second / 60.0)
    hourAngle = math.pi / 6 * (now.hour % 12 - 3 + now.minute / 60.0)

    DrawHand(hourAngle, RADIUS - 10, RGB(255, 0, 0))   # Hour: Red
    DrawHand(minuteAngle, RADIUS - 7, RGB(0, 255, 0))  # Minute: Green
    DrawHand(secondAngle, RADIUS - 5, RGB(0, 0, 255))  # Second: Blue

    DrawTextTiny("DUELink", RGB(255, 0, 255), 20, 30)
    Show()

    time.sleep(0.01)  # Small delay to reduce CPU usage (10ms)