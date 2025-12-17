# In this sample:
# Read temperature and humidity every 1.5 second

import time
from datetime import datetime
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def GetTemperature():
    return float(duelink.Engine.ExecuteCommand("Temp(SenPin(), SenType())"))

def GetHumidity():
    return float(duelink.Engine.ExecuteCommand("Humid(SenPin(), SenType())"))

while True:
    print(f"Temperature: {GetTemperature()} ")
    print(f"Humidity: {GetHumidity()} ")

    time.sleep(1.5)  # 1500 ms
