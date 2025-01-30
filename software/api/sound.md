# Sound

---

`Beep()` uses any pin to generate a tone.  

- **Beep(pin, frequency, duration)** - Creates a tone for a specified duration on any pin <br>
**pin:** Pin number, 'p' used with on-board piezo buzzer <br>
**frequency:** The frequency in Hz, max value is 10KHz <br>
**duration:** The duration of the beep in milliseconds, max value is 1000ms <br>

This example code will generate beep on pin 0 and on-board piezo buzzer at frequency 256Hz for one second.

## [Python](#tab/py)

```py
duelink.Sound.Beep(0, 256, 1000)

duelink.Sound.Beep('p', 256, 1000)
```

## [JavaScript](#tab/js)

```js
await duelink.Sound.Beep(0, 256, 1000)

await duelink.Sound.Beep('p', 256, 1000)
```

## [.NET](#tab/net)

```cs
duelink.Sound.Beep(0, 256, 1000)

duelink.Sound.Beep('p', 256, 1000)
```

---
> [!NOTE] 
> This feature is blocking, so the rest of your code will stop until `Beep()` is completed. 