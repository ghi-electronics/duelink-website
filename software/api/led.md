# LED

---

This function is used to take control of the on-board LED. It is non-blocking so it can be used as a status indicator for your programs while they run. 

- **Led.Set(highPeriod, lowPeriod, count)**<br>
**highPeriod:** The duration in milliseconds the LED is on.<br>
**lowPeriod:** The duration in milliseconds the LED is off.<br>
**count:** The number of times the LED will blink. <br>

## [Python](#tab/py)

```py
duelink.Led.Set(1000, 1000, 10)
```

## [JavaScript](#tab/js)

```js
await duelink.Led.Set(1000, 1000, 10)
```

## [.NET](#tab/net)

```cs
duelink.Led.Set(1000, 1000, 10);
```

___

> [!TIP] 
> Setting count to **-1** will blink the LED forever, and **0** will turn off the LED.

