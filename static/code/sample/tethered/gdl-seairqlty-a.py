# In this sample:
# Read temperature, humidity
# Read Air Quality Index
# Read Total Volatile Organic Compounds
# Read Equivalent CO₂


import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# Methods
def ReadTemperature():
    return duelink.Engine.ExecuteCommand("AhtTemp()")

def ReadHumidity():
    return duelink.Engine.ExecuteCommand("AhtHumid()")

def AirQualityIndex():
    return int(duelink.Engine.ExecuteCommand("EnsAqi()"))

def TVOC():  # Total Volatile Organic Compounds
    return int(duelink.Engine.ExecuteCommand("EnsTvoc()"))

def EquivalentCO2():  # Equivalent CO₂
    return int(duelink.Engine.ExecuteCommand("EnsEco2()"))

while True:
    print(f"Temp: {ReadTemperature()}, Humidity: {ReadHumidity()}")
    print(f"AirQualityIndex: {AirQualityIndex()}, TVOC: {TVOC()}, EquivalentCO2: {EquivalentCO2()}")
    time.sleep(2)  # 2 seconds
