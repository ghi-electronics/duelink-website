# In this sample:
# All 27 LEDs are repeatedly set to random colors.
# When the LDR button is pressed, the Jingle song is played.

import sys
import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

def SetLed(index:int, color:int, brightness:int):
    b =   int(brightness * 31)/100
    cmd = f"SetLed({index},{color},{b})" 
    duelink.Engine.ExecuteCommand(cmd)

def SetAll(color:int):  
    cmd = f"SetAll({color})" 
    duelink.Engine.ExecuteCommand(cmd)    

def ShowLed():
    cmd = "ShowLed()" 
    duelink.Engine.ExecuteCommand(cmd)    

def RndLed():
    cmd = "RndLed()" 
    duelink.Engine.ExecuteCommand(cmd) 

def PlayLed(enable:bool):
    e = {True:1,False:0}[enable == True]  
    cmd = f"PlayLed({e})" 
    duelink.Engine.ExecuteCommand(cmd)   

def Buzzer(frequency:int, duration_ms:int):
    cmd = f"freq(1,{frequency}, {duration_ms}, 0.5)"
    duelink.Engine.ExecuteCommand(cmd)  
    time.sleep(duration_ms/1000)

def IsButtonPressed()->bool:
    cmd = "dread(20,2)"
    ret = duelink.Engine.ExecuteCommand(cmd)  
    return ret == 1

def PlayJingle():
    cmd = "melodyP(1, a1)"
    ret = duelink.Engine.ExecuteCommand(cmd)  

freq_dur = [  330,200,
                330,200,
                330,300,
                0,100,
                330,200,
                330,200,
                330,300,
                0,100,
                330,200,
                392,200,
                262,300,
                294,100,
                330,400,
                0,400,
                349,200,
                349,200,
                349,300,
                0, 0,
                349, 100,
                349, 200,
                330, 200,
                330, 200,
                0, 0,
                330, 100,
                330, 100,
                392, 200,
                392, 200,
                349, 200,
                294, 200,
                262, 400,
                0,400]

# Send array
duelink.Engine.ExecuteCommand("dim a1[31*2]")
for i in range (len(freq_dur)):
    cmd = f"a1[{i}]={freq_dur[i]}"
    duelink.Engine.ExecuteCommand(cmd)


SetAll(0)
btnStatus = False
btnPress = False
while True:    
    btnPress = IsButtonPressed()

    if (btnPress != btnStatus):
        btnStatus = btnPress
        if (btnStatus):
            PlayJingle()
    
    RndLed()
    time.sleep(0.25)



   
