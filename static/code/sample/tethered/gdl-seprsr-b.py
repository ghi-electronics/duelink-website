# In this sample:
# Display pressure in kPa and PSI units

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# Methods
def ReadPSI():
    return duelink.Engine.ExecuteCommand("PSI()")

def ReadkPa():
    return duelink.Engine.ExecuteCommand("kPa()")

while True:
    print(f"PSI: {ReadPSI()}")
    print(f"kPa: {ReadkPa()}")
    
    time.sleep(1)  # Sleep for 1 second