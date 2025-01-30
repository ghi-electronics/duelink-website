# System Functions

---


- **System.Print(text)**  - Prints the value of the argument to the console on the same line <br>
**text:** String or variable

- **System.Println(text)**  - Prints the value of the argument to the console then moves to the next line <br>
**text:** String or variable

- **System.Reset(loader)** - Resets the board <br>
**loader:** 0 = system reset,  1 = reset and stay in loader mode

- **System.GetTickMilliseconds()** - Read system ticks in milliseconds  <br>

- **System.GetTickMicroseconds()** - Read system ticks microseconds  <br>

- **System.Wait(duration)** - Holds program from running <br>
**duration:** Duration in milliseconds

- **System.Version**  - Returns the current firmware version <br>
The last character returned in Version is board <br> 

  | Board       | Character |
  | :---        |:---       |
  |    DUElink Spider     |     D     |
  |    Pulse    |     P     |
  |    Edge     |     E     |
  |    Flea     |     F     |
  |    Pico     |     I     |


Example: 

## [Python](#tab/py)

```py
# print "Hello world"
duelink.System.Print("Hello world")

#  print "Hello world" and add new line
duelink.System.Println("Hello world")

#  Check version number
print(duelink.System.Version)

#  Get device tick in millisecond
print(duelink.System.GetTickMilliseconds())

#  Get device tick in microsecond
print(duelink.System.GetTickMicroseconds())

#  Delay 1 second
duelink.System.Wait(1000)

#  Reset the device
duelink.System.Reset(0)
```

## [JavaScript](#tab/js)

```js
// print "Hello world"
await duelink.System.Print("Hello world")

// print "Hello world" and add new line
await duelink.System.Println("Hello world")

// Check version number
console.log(duelink.System.Version)

// Get device tick in millisecond
console.log(await duelink.System.GetTickMilliseconds())

// Get device tick in microsecond
console.log(await duelink.System.GetTickMicroseconds())

// Delay 1 second
await duelink.System.Wait(1000)

// Reset the device
await duelink.System.Reset(0)
```

## [.NET](#tab/net)

```cs
// print "Hello world"
duelink.System.Print("Hello world");

// print "Hello world" and add new line
duelink.System.Println("Hello world");

// Check version number
Console.WriteLine(duelink.System.Version);

// Get device tick in millisecond
Console.WriteLine(duelink.System.GetTickMilliseconds());

// Get device tick in microsecond
Console.WriteLine(duelink.System.GetTickMicroseconds());

// Delay 1 second
duelink.System.Wait(1000);

// Reset the device
duelink.System.Reset(0);
```










---