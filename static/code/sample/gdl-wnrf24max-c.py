from DUELink.DUELinkController import DUELinkController
import time
availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)