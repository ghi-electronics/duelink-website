# Infrared

---

IR decoder is fixed to pin 2 and 8.

- **Infrared.Enable(pin, enable)** - Enables pin for IR signal capture <br>
**pin:** Pin number <br>
**enable:** True = enable, false = disable <br>

- **Infrared.Read()** - Reads the value from the IR enabled pin <br>
**Return:** Tracks the past 16 key presses and returns them. -1 if none.

This example will enable and read IR code from pin 2.

## [Python](#tab/py)

```py
duelink.Infrared.Enable(2, True)

while True:
    x = duelink.Infrared.Read()
    if x >= 0:
        print (x)
        
    time.sleep(1)
```

## [JavaScript](#tab/js)

```js
await duelink.Infrared.Enable(2, true)

while (true){
    let x = await duelink.Infrared.Read()

    if (x >=0)                
        console.log(x)

     await Util.sleep(1000)               
}
```

## [.NET](#tab/net)

```cs
duelink.Infrared.Enable(2, true);

while (true){
    var x = duelink.Infrared.Read();

    if (x >=0)                
        Console.WriteLine(x);

    Thread.Sleep(1000);                
}
```

---
