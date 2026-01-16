# In this sample:
# Allows setting volume and channel on the RadioFM module

import time
from DUELink.DUELinkController import DUELinkController

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

# method
def SetVolume(volume: int):
    """Set the volume on the RadioFM module (0-100)."""
    if 0 <= volume <= 100:
        duelink.Engine.ExecuteCommand(f"SetVol({volume})")

def SetChannel(channel: float):
    """Set the channel on the RadioFM module."""
    duelink.Engine.ExecuteCommand(f"SetChan({channel})")

# Example usage
SetVolume(50)    # Set volume to 50%
SetChannel(100.3)  # Set channel to 100.3