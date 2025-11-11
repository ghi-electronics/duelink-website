import time
import machine
import duelink

from duelink import transport
from duelink.graphics import GraphicsType
from machine import Pin, Timer

def LcdCmd(c):
    due.I2c.Write(0x3c, [0,c])
    
uart = transport.UartTransportController(0)
due = duelink.DUELinkController(uart)

due.System.New() # Make sure all memory is available

due.Digital.Write(9,1) # reset pin
due.I2c.Configuration(1000)
time.sleep(0.1)
due.Graphics.Configuration(GraphicsType.I2c, [0x3c], 128, 64, 1)
LcdCmd(0xAE);LcdCmd(0x00);LcdCmd(0x10)
LcdCmd(0x40);LcdCmd(0x81);LcdCmd(0xCF)
LcdCmd(0xA1);LcdCmd(0xA6);LcdCmd(0xA8)
LcdCmd(0x3F);LcdCmd(0xD3);LcdCmd(0x00)
LcdCmd(0xD5);LcdCmd(0x80);LcdCmd(0xD9)
LcdCmd(0xF1);LcdCmd(0xDA);LcdCmd(0x12)
LcdCmd(0xDB);LcdCmd(0x40);LcdCmd(0x8D)
LcdCmd(0x14);LcdCmd(0xAF);LcdCmd(0xC8)
LcdCmd(0x20);LcdCmd(0x00);LcdCmd(0x21)
LcdCmd(0);LcdCmd(128-1)
LcdCmd(0x22);LcdCmd(0);LcdCmd(7)

due.System.SetArrayValue("a1", [0,0,1,1,1,1,0,0,
                                0,1,1,1,1,1,1,0,
                                1,1,0,1,1,0,1,1,
                                1,1,1,1,1,1,1,1,
                                1,1,0,1,1,0,1,1,
                                1,1,1,0,0,0,1,1,
                                0,1,1,1,1,1,1,0,
                                0,0,1,1,1,1,0,0])

due.System.SetArrayValue("a2", [200,50,300,25])

due.Frequency.Write(6,1000,1000)
due.System.StatLed(100,100,10)
due.Sound.MelodyPlay(11, [1000,100,2000,100,500,100])

speed=3
r=10;x=64;y=32;dx=speed;dy=speed
while True:
    due.Graphics.Clear(0)
    due.Graphics.Text("DUELink",1,43,0)
    due.Graphics.DrawImage("a1",x-4,y-4,8,8,1)
    due.Graphics.Circle(1,x,y,r)
    due.Graphics.Show()
    if x-speed <= r or x+speed >= 127-r:
        dx=-dx
        due.Sound.MelodyPlay(11, "a2")
        due.transport.execute("print(a2)")
    if y-speed <= r or y+speed >= 63-r:
        dy=-dy
        due.Sound.MelodyPlay(11, "a2")
    x=x+dx;y=y+dy