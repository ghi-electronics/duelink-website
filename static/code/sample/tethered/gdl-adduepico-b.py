# In this sample:
# Create a watch using the built-in graphics library.

import math
import time
from datetime import datetime
from DUELink.DUELinkController import DUELinkController

# This example runs when connected to a PC.
# If connected to a Pico, you need to implement ExecuteCommand yourself.

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# Constants
WIDTH = 64
HEIGHT = 64
CENTER_X = WIDTH
CENTER_Y = HEIGHT // 2
RADIUS = 26

# Functions
def DrawText(text, color, x, y, scalex, scaley):
    duelink.Engine.ExecuteCommand(f'textT("{text}", {color}, {x}, {y})')

def DrawLine(x1, y1, x2, y2, color):
    duelink.Engine.ExecuteCommand(f'line({color}, {x1}, {y1}, {x2}, {y2})')

def DrawCircle(x, y, radius, color):
    duelink.Engine.ExecuteCommand(f'circle({color}, {x}, {y}, {radius})')

def ClearScreen(color):
    duelink.Engine.ExecuteCommand(f'clear({color})')

def Show():
    duelink.Engine.ExecuteCommand('show()')

# RGB color conversion (24-bit)
def RGB(r, g, b):
    return (r << 16) | (g << 8) | b

def DrawNumbers():
    for h in range(1, 13):
        angle = math.pi / 6 * (h - 3)  # 0 hour at right
        x = CENTER_X + int((RADIUS - 0) * math.cos(angle))
        y = CENTER_Y + int((RADIUS - 0) * math.sin(angle))

        if h > 6:
            x -= 2

        DrawText(str(h), RGB(255, 255, 255), x - 4 if h >= 10 else x, y - 3, 1, 1)

def DrawHand(angle, length, color):
    x = CENTER_X + int(length * math.cos(angle))
    y = CENTER_Y + int(length * math.sin(angle))
    DrawLine(CENTER_X, CENTER_Y, x, y, color)

# Draw once to initialize
ClearScreen(RGB(0, 0, 0))

# Main loop
while True:
    # Clear the screen and update the watch
    now = time.localtime()  # Get the current time
    ClearScreen(RGB(0, 0, 0))
    DrawCircle(CENTER_X, CENTER_Y - 1, 31, 1)  # Draw the background circle
    DrawNumbers()

    second_angle = math.pi / 30 * (now.tm_sec - 15)
    minute_angle = math.pi / 30 * (now.tm_min - 15 + now.tm_sec / 60.0)
    hour_angle = math.pi / 6 * (now.tm_hour % 12 - 3 + now.tm_min / 60.0)

    DrawHand(second_angle, RADIUS - 0, RGB(0, 127, 255))  # Second hand: Light blue
    DrawHand(minute_angle, RADIUS - 5, RGB(0, 255, 0))   # Minute hand: Green
    DrawHand(hour_angle, RADIUS - 10, RGB(255, 0, 0))    # Hour hand: Red

    Show()
    time.sleep(0.01)  # Sleep for 10 milliseconds