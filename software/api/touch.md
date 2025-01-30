# Touch

---

This feature allows sensing of a finger or human touch to a pin, or when using a touch screen, use 'x' or 'y' to return the x & y positions where the screen is being touched.

- **Touch.Read(pin)** - Read pin for touch, or reads the x y position on a touch screen   <br>
**pin:** Pin number, 'x', or 'y' <br>
**pin Returns:** 0 = pin not touched, 1 = pin touched <br>
**x or y Returns:**  -1 = screen not touched, x position , y position

This example detects human touching on pin 6, interval 100ms

## [Python](#tab/py)
```py
while True:
    touched = duelink.Touch.Read(6)

    if (touched):
        print("touched")
                
    time.sleep(0.1)
```

## [JavaScript](#tab/js)
```js
while (true){
    let touched = await duelink.Touch.Read(6)

    if (touched)
        console.log("touched")
                
    await Util.sleep(100)
}
```

## [.NET](#tab/net)
```cs
while (true){
    var touched = duelink.Touch.Read(6);

    if (touched)
        Console.WriteLine("touched");
                
    Thread.Sleep(100);
}
```

---