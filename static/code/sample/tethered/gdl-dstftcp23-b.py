# In this sample:
# Create a watch using the built-in graphics library.

import math
import time
from datetime import datetime
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# Default driver CP23 is direct mode, 320x240
WIDTH = 320
HEIGHT = 240
CENTER_X = WIDTH // 2
CENTER_Y = HEIGHT // 2
RADIUS = 100

def DrawText(text, color, x, y, scalex, scaley):
    duelink.Engine.ExecuteCommand(f'textS("{text}", {color}, {x}, {y}, {scalex}, {scaley})')

def DrawLine(x1, y1, x2, y2, color):
    duelink.Engine.ExecuteCommand(f'line({color}, {x1}, {y1}, {x2}, {y2})')

def DrawCircle(x, y, radius, color):
    duelink.Engine.ExecuteCommand(f'circle({color}, {x}, {y}, {radius})')

def ClearScreen(color):
    duelink.Engine.ExecuteCommand(f'clear({color})')

# Convert RGB to 24-bit integer
def RGB(r, g, b):
    return (r << 16) | (g << 8) | b

def DrawNumbers():
    for h in range(1, 13):
        angle = math.pi / 6 * (h - 3)  # 0 hour at right
        x = CENTER_X + int((RADIUS - 10) * math.cos(angle))
        y = CENTER_Y + int((RADIUS - 10) * math.sin(angle))
        DrawText(str(h), RGB(255, 255, 255), x, y - 2, 2, 2)

def DrawHand(angle, length, color):
    x = CENTER_X + int(length * math.cos(angle))
    y = CENTER_Y + int(length * math.sin(angle))
    DrawLine(CENTER_X, CENTER_Y, x, y, color)

last_sec = 0.0
last_min = 0.0
last_hour = 0.0
counter = 0

# Draw once
ClearScreen(RGB(0, 127, 255))
DrawCircle(CENTER_X + 4, CENTER_Y + 2, RADIUS + 2, RGB(0, 0, 127))
DrawNumbers()

# Main loop
while True:
    now = datetime.now()

    secondAngle = math.pi / 30 * (now.second - 15)
    minuteAngle = math.pi / 30 * (now.minute - 15 + now.second / 60.0)
    hourAngle = math.pi / 6 * (now.hour % 12 - 3 + now.minute / 60.0)

    if last_sec != secondAngle:
        DrawHand(last_sec, RADIUS - 10, RGB(0, 127, 255))  # fill background color
        last_sec = secondAngle
        DrawHand(secondAngle, RADIUS - 10, RGB(0, 0, 255))  # Second: Blue

        # redraw minute and hour if needed
        DrawHand(minuteAngle, RADIUS - 20, RGB(0, 255, 0))  # Minute: Green
        DrawHand(hourAngle, RADIUS - 30, RGB(255, 0, 0))    # Hour: Red
        counter += 1

    elif last_min != minuteAngle:
        DrawHand(last_min, RADIUS - 20, RGB(0, 127, 255))  # fill background color
        last_min = minuteAngle
        DrawHand(minuteAngle, RADIUS - 20, RGB(0, 255, 0))  # Minute: Green

    elif last_hour != hourAngle:
        DrawHand(last_hour, RADIUS - 30, RGB(0, 127, 255))  # fill background color
        last_hour = hourAngle
        DrawHand(hourAngle, RADIUS - 30, RGB(255, 0, 0))    # Hour: Red

    else:
        DrawText("DUELink", RGB(255, 0, 255), CENTER_X - 30, CENTER_X - 5, 2, 2)
        time.sleep(0.1)  # sleep 100ms