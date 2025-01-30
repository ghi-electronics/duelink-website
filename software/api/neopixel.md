# NeoPixel

---

- **Neo.Clear()** - Clears all LEDs (in memory). Needs `Neo.Show()` to see the affect

- **Neo.SetColor(int index, uint color)** - Sets a specific LED to a color. Needs `Neo.Show()` to see affect<br>
**index:** The LED index where 0 is first one and supporting up to 1024 LEDs<br>
**color:** Color levels, 32 bit format <br>

- **Neo.SetRGB(int index, byte red, byte green, byte blue)** - Sets a specific LED to a color. Needs `Neo.Show()` to see affect<br>
**index:** The LED index where 0 is first one and supporting up to 1024 LEDs<br>
**red, green, blue:** Color levels, 0 to 255 <br>

- **Neo.SetMultiple(int pin, uint[] color)** - Sets multiple leds with color array. No need `Neo.Show()` to see affect<br>
**pin:** Pin connected to NeoPixel<br>
**color:** Array of color levels, 32 bit format <br>

- **NeoShow(pin, count)** - All NeoPixel code is held internally until show is called<br>
 **pin:** Pin connected to NeoPixel<br>
 **count:** The count of LEDs to update and show

## [Python](#tab/py)

```py
duelink.Neo.Clear() # Clear
            
duelink.Neo.SetColor(0, 0xFFFFFF)# Set first led to white
duelink.Neo.Show(6, 1) # show first led on pin 6

duelink.Neo.SetRGB(1,0xFF,0x00,0x00) # Set second led to red
duelink.Neo.Show(6, 2)# show first 2 leds on pin 6

#set first three leds to red, green, blue. SetMultiple call show internally, no need to call show
duelink.Neo.SetMultiple(6, [0xff0000, 0x00FF00, 0x0000FF])
```

## [JavaScript](#tab/js)

```js
await duelink.Neo.Clear() // Clear
            
await duelink.Neo.SetColor(0, 0xFFFFFF)// Set first led to white
await duelink.Neo.Show(6, 1) // show first led on pin 6

await duelink.Neo.SetRGB(1,0xFF,0x00,0x00) // Set second led to red
await duelink.Neo.Show(6, 2)// show first 2 leds on pin 6

//set first three leds to red, green, blue. SetMultiple call show internally, no need to call show
await duelink.Neo.SetMultiple(6, [ 0xff0000, 0x00FF00, 0x0000FF ])
```

## [.NET](#tab/net)

```cs
duelink.Neo.Clear(); // Clear
            
duelink.Neo.SetColor(0, 0xFFFFFF);// Set first led to white
duelink.Neo.Show(6, 1); // show first led on pin 6

duelink.Neo.SetRGB(1,0xFF,0x00,0x00); // Set second led to red
duelink.Neo.Show(6, 2);// show first 2 leds on pin 6

//set first three leds to red, green, blue. SetMultiple call show internally, no need to call show
duelink.Neo.SetMultiple(6, new uint[] { 0xff0000, 0x00FF00, 0x0000FF });
```

---