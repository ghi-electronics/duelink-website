# Analog

---

These functions provide access to analog pins. 

---

## Analog Write

This feature uses software-generated PWM to control the "Analog" level of a pin. It has a fixed frequency of 50Hz.

**Analog.Write( pin, dutyCycle)**<br>
**pin:** Pin number<br>
**dutyCycle:** 0 to 100

This example code will swing the analog output value up and down in a loop.

### [Python](#tab/py)
```python
while True:
	for i in range(0, 100, 10):
		duelink.Analog.Write('L', i)
		time.sleep(0.1)

	for i in range(90, -1, -10):
		duelink.Analog.Write('L', i)
		time.sleep(0.1)
```



### [JavaScript](#tab/js)

```js
while (true) {
	for (let i = 0; i < 100; i+=10) {
		await duelink.Analog.Write('L', i);
		await Util.sleep(100)
	}

	for (let i = 90; i > -1; i-=10) {
		await duelink.Analog.Write('L', i);
		await Util.sleep(100)
	}
}
```

### [.NET](#tab/net)

```cs
while (true) {
	for (var i = 0; i < 100; i+=10) {
		duelink.Analog.Write('L', i);
		Thread.Sleep(100);
	}

	for (var i = 90; i > -1; i-=10) {
		duelink.Analog.Write('L', i);
		Thread.Sleep(100);
	}
}
```

---

This feature works on all pins.

---

## Analog Read

Use this function to read the analog level on a specific pin.

**Analog.Read(pin)**<br>
**pin:** Pin number <br>
**Returns:** The analog value (0-100) of the pin 

This is an example code to read the analog level on pin 0 and print out to the console 10 times per second.

### [Python](#tab/py)
```python
while True:
	x = duelink.Analog.Read(0)
	print(x)
	time.sleep(0.1)
```

### [JavaScript](#tab/js)
```js
while (true) {
	let x = await duelink.Analog.Read(0)
	console.log(x)
	await Util.sleep(100)
}
```

### [.NET](#tab/net)
```cs
while (true) {
	var x = duelink.Analog.Read(0);
	Console.WriteLine(x);
	Thread.Sleep(100);
}
```

---

Some pins may not support analog read. Check the hardware page for a list of supported pins.