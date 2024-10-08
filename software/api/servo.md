# Servo Motor

---

- **Servo.Set(pin, degree)** - Sets servo motor connected to pin to a specific position<br>
**pin:** Pin number. Pin 5 and 6 supported by hardware PWM which is more accurate than other pins <br>
**degree:**  0 to 180

## [Python](#tab/py)

```py
while True:
    duelink.Servo.Set(7, 0)
    time.sleep(1)
    duelink.Servo.Set(7, 45)
    time.sleep(1)
    duelink.Servo.Set(7, 90)
    time.sleep(1)
    duelink.Servo.Set(7, 135)
    time.sleep(1)
    duelink.Servo.Set(7, 180)
    time.sleep(1)
```

## [JavaScript](#tab/js)

```js
while (true) {
    await duelink.Servo.Set(7, 0)
    await Util.sleep(1000)
    await duelink.Servo.Set(7, 45)
    await Util.sleep(1000)
    await duelink.Servo.Set(7, 90)
    await Util.sleep(1000)
    await duelink.Servo.Set(7, 135)
    await Util.sleep(1000)
    await duelink.Servo.Set(7, 180)
    await Util.sleep(1000)
}
```

## [.NET](#tab/net)

```cs
while (true) {
    duelink.Servo.Set(7, 0);
    Thread.Sleep(1000);
    duelink.Servo.Set(7, 45);
    Thread.Sleep(1000);
    duelink.Servo.Set(7, 90);
    Thread.Sleep(1000);
    duelink.Servo.Set(7, 135);
    Thread.Sleep(1000);
    duelink.Servo.Set(7, 180);
    Thread.Sleep(1000);
}
```

---

> [!TIP] 
> Many servo motors need 5V to work.
