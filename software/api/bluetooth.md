# Bluetooth

---

Provided API allows user to set name and pin code for Bluetooth.


- **Bluetooth.SetName(name)** - Sets Bluetooth name <br>
**name:**  Bluetooth name, max characters is 12. Default is "DUELink" <br>
**Returns:** True = success, false = fail <br>

- **Bluetooth.SetPinCode(code)** - Sets Bluetooth pin code  <br>
**code:** In "text", has to be 4 characters from 0 to 9. Default is "1234" <br>
**Returns:** True = success, false = fail <br>

The example below changes Bluetooth name to "DUELink00", and changes pin code to "5678"

## [Python](#tab/py)
```py
print(duelink.Bluetooth.SetName("DUELink00"))

time.sleep(5) # Delay few seconds for Bluetooth reset

print(duelink.Bluetooth.SetPinCode("5678"))
```

## [JavaScript](#tab/js)
```js
console.log(await duelink.Bluetooth.SetName("DUELink00"))

await Util.sleep(5000) // Delay few seconds for Bluetooth reset

console.log(await duelink.Bluetooth.SetPinCode("5678"))
```

## [.NET](#tab/net)
```cs
duelink.Bluetooth.SetName("DUELink00");

Thread.Sleep(5000)  // Delay few seconds for Bluetooth reset

duelink.Bluetooth.SetPinCode("5678");
```

---