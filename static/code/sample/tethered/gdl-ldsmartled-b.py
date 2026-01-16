# In this sample:
# Using the DUELink graphics library
# Configuration for two vertically scanned 32x8 panels creating a 64x8 LED display
# Scrolling DUELink text on the panels with red, green, and blue colors
# Visit https://www.duelink.com/docs/engine/graphics
# for more DUELink graphics APIs: DrawLine, Text with scale, Rect, Image, etc.


import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
SCREEN_WIDTH = 64   # Combined width of two panels (32 x 2)
SCREEN_HEIGHT = 8   # Height

def Configuration():
    config_array = [
        14,             # Pin used
        SCREEN_WIDTH,
        SCREEN_HEIGHT,
        1               # Vertical scanning
    ]

    duelink.Graphics.Configuration(
        3,              # Type 3 - WS2812
        config_array,
        SCREEN_WIDTH,
        SCREEN_HEIGHT,
        1               # Buffered x1
    )

def Clear(color):
    duelink.Graphics.Clear(color)

def DrawText(text, color, x, y):
    duelink.Graphics.Text(text, color, x, y)

def Show():
    duelink.Graphics.Show()

posX = SCREEN_WIDTH  # Start from the right side
count = 0

Configuration()
while True:
    color = 0xFF0000  # Red
    if count % 3 == 1:
        color = 0x00FF00  # Green
    elif count % 3 == 2:
        color = 0x0000FF  # Blue

    Clear(0)
    DrawText("DUELink", color, posX, 0)
    Show()

    posX -= 1
    if posX < -40:
        posX = SCREEN_WIDTH
        count += 1

    time.sleep(0.01)  # 10 ms delay