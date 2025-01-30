# Streams

---

DUELink Scripts are built to be ASCII human-friendly. This works great when using DUE Script. However, there are instances where speed or raw binary data is required. For example, when updating a display using I2C. This is where streams come in handy. Provided libraries, such as Python, use streams internally whenever possible.

> [!TIP] 
> Understanding and utilizing stream is only needed by advanced users.

A stream command initiates the request, such as `LcdStream()`. Once this command is received and accepted by the device, the `&` symbol will be returned indicating readiness. The host can now send the entire data, exactly to the required byte count. See the individual stream command for details on what data count and structure to be sent.

> [!TIP] 
> Streams can't be used directly by typing in ASCII commands, like when using the console. See the source code of one of the provided libraries for reference.
