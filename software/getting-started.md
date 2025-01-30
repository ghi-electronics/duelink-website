# Getting Started

---

<div style="text-align: center;">

![Host Mode](./images/getting-started.png)

</div>


## Hardware Setup

Make sure your DUELink hardware is functional using [demo.duelink.com](https://demo.duelink.com/). Check that the board has the latest firmware. Compare the version  shown on the demo page when the device is connected to the version found on the [Downloads](downloads.md) page.

---

## Software Setup

DUELink is made for software developers so we are assuming you already have a development machine that is already building Python or JavaScrpt programs for example. See the [Coding Options](coding-options/intro.md) to see the available options and install the available libraries.

---

## Blink LED

Following one of the available [Coding Options](coding-options/intro.md) will reveal all the needed steps to blink the on-board LED using the LED API, which handles the LED internally inside the DUELink Engine. Here is a similar example but this one uses a loop on the host side to set the LED high and low.

# [Python](#tab/py)

```py
from DUELink.DUELinkController import DUELinkController
import time

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

while True:
    duelink.Led.Set(1,0,0)
    time.sleep(0.5)
    duelink.Led.Set(0,1,0)
    time.sleep(0.5)
```


# [JavaScript](#tab/js)

```js
const { SerialUSB } = require("dlserialusb");
const { DUELinkController } = require("duelink");
const { Util } = require("duelink");

async function  Blinky() {
    let duelink = new DUELinkController(new SerialUSB());
    await duelink.Connect();
    
    while (true){
        await duelink.Led.Set(1, 0, 0)
        await Util.sleep(500)
        await duelink.Led.Set(0, 1, 0)
        await Util.sleep(500)
    } 
}

Blinky()
```
# [.NET](#tab/net)
```cs
var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);
 
while (true) {
	duelink.Led.Set(1, 0, 0);
	Thread.Sleep(500);
	duelink.Led.Set(0, 1, 0);
	Thread.Sleep(500);
}
```
---

---

## Special Pins

Boards may include on-board features that can be accessed through the API.

Pin "number" | On-board Feature
--|--
'a' or 'A' | Button A
'b' or 'B' | Button B
'p' or 'P' | Piezo buzzer
'l' or 'L' | LED

This is an example of how to blink the on-board LED using the [Digital](api/digital.md) class.

# [Python](#tab/py)

```py
from DUELink.DUELinkController import DUELinkController
import time

availablePort = DUELinkController.GetConnectionPort()
duelink = DUELinkController(availablePort)

while True:
    duelink.Digital.Write('l', 1)
    time.sleep(0.5)
    duelink.Digital.Write('l', 0)
    time.sleep(0.5)
```


# [JavaScript](#tab/js)

```js
import {SerialUSB} from './serialusb.js';
import * as DUELink from './duelink.js';
import { Util } from "./util.js";

let duelink = new DUELink.DUELinkController(new SerialUSB());
await duelink.Connect();

while (true){
	await duelink.Digital.Write('l', 1)
	await Util.sleep(500)
	await duelink.Digital.Write('l', 0)
	await Util.sleep(500)
}
```
# [.NET](#tab/net)
```cs
var availablePort = DUELinkController.GetConnectionPort();
var duelink = new DUELinkController(availablePort);
 
while (true) {
	duelink.Digital.Write('l', 1);
	Thread.Sleep(500);
	duelink.Digital.Write('l', 0);
	Thread.Sleep(500);
}
```
---