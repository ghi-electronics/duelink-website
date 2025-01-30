# Digital

---

These functions provide access to digital pins.

---

## Digital Read

Read the current value of a digital pin.

- **Digital.Read(pin, pull)** <br>
**pin:** Pin number <br> 
**pull:** Sets the internal pull resistors: 'None', 'PullUp', 'PullDown' <br>
**Returns:** True = high or  false = low 

This example will read current value on pin 2.

### [Python](#tab/py)
```py
x = duelink.Digital.Read(2, 'PullUp')
print(x)
```

### [JavaScript](#tab/js)
```js
let x = await duelink.Digital.Read(2, 'PullUp')
console.log(x)
```

### [.NET](#tab/net) 
```cs
var x = duelink.Digital.Read(2, InputType.PullUp);
Console.WriteLine(x);
```

---

---

## Digital Write
Sets a pin's digital output.

- **Digital.Write(pin, state)** <br>
**pin:** Pin number <br> 
**state:** True = high or  false = low <br>

This example will set pin 2 to be High.

### [Python](#tab/py)
```py
duelink.Digital.Write(2, True)
```

### [JavaScript](#tab/js)
```js
duelink.Digital.Write(2, true)
```

### [.NET](#tab/net)
```cs
duelink.Digital.Write(2, true);
```

---