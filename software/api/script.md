# Script

---

These methods allow developers to control DUE Scripts right from within Python, JavaScript or .NET

- **Script.New()** - Clears the program stored in flash <br>
- **Script.Load(script)** - Loads the line into internal buffer <br>
**script:** Line to load into internal buffer <br>
- **Script.Record()** - Sends the internal buffer to the device, overwriting any previous programs <br>
- **Script.Read()** - Read the program stored in flash and return as string <br>
- **Script.Execute(script)** - Executes the single line of code immediately <br>
**script:** Script to be executed<br>



This is an example to execute a single line in immediate mode. This does not modify the application stored in flash. 

## [Python](#tab/py)

```py
duelink.Script.Execute("LED(200,200,10)")
```

## [JavaScript](#tab/js)

```js
await duelink.Script.Execute("LED(200,200,10)")
```

## [.NET](#tab/net)

```cs
duelink.Script.Execute("LED(200,200,10)");
```

___

This example will check any script stored in flash, and clear them if program found.

## [Python](#tab/py)

```py

currentScript = duelink.Script.Read()

if (currentScript != ""):
    duelink.Script.New()
```

## [JavaScript](#tab/js)

```js
let currentScript = await duelink.Script.Read()

if (currentScript != "")
    await duelink.Script.New();
```

## [.NET](#tab/net)

```cs
var currentScript = duelink.Script.Read();

if (currentScript != "")
    duelink.Script.New();
```

---

This example will load a simple program line by line and then record it. Variable `c` is used to indicate how many times the LED will blink for, which is 10 in this case. 

## [Python](#tab/py)

```py
duelink.Script.Load("c = 10")
duelink.Script.Load("@Blink")
duelink.Script.Load("Led(100,100,c)")
duelink.Script.Record()
```

## [JavaScript](#tab/js)

```js
await duelink.Script.Load("c = 10")
await duelink.Script.Load("@Blink")
await duelink.Script.Load("Led(100,100,c)")
await duelink.Script.Record()
```

## [.NET](#tab/net)

```cs
duelink.Script.Load("c = 10");
duelink.Script.Load("@Blink");
duelink.Script.Load("Led(100,100,c)");
duelink.Script.Record();
```

___


You can then access a previously recorder program using goto (to label) or by calling a function that has a return. This example calls the recorded program above by executing a single line that contains two commands. The first one sets `c` to 5 and the second will send execution to `@Blink`, which will cause the LED to blink 5 times.

## [Python](#tab/py)

```py
duelink.Script.Execute("c=5:goto Blink")
```

## [JavaScript](#tab/js)

```js
await duelink.Script.Execute("c=5:goto Blink")
```

## [.NET](#tab/net)

```cs
duelink.Script.Execute("c=5:goto Blink");
```

___
