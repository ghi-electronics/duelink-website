# In this sample:
# Warm up the sensor for 10 seconds, then read the analog value

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def Heater(value: bool):
    v = 1 if value else 0
    duelink.Engine.ExecuteCommand(f"Heater({v})")

def SensorRead() -> float:
    ret = duelink.Engine.ExecuteCommand("SenRead()")
    return ret

counter = 0

while True:
    time.sleep(1)  # Equivalent to Thread.Sleep(1000)

    # Wait for heat on for 10 seconds
    if counter == 0:
        Heater(True)
    counter += 1

    if counter < 10:
        print(f"Wait for {counter}/10 seconds")
        continue

    volt = SensorRead()
    print(f"Volt: {volt}")
