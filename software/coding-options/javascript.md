# JavaScript

---

![JavaSript](../images/javascript.png)

JavaScript is one of the core technologies used by the World Wide Web. 98% of all websites use JavaScript. Websites can now use the provided DUELink JavaScript library to access the physical world.

Here is a website demo to demonstrate how JavaScript can control actuators and read sensors: [demo.duelink.com](https://demo.duelink.com/)

## Setup

This page assumes the user is already familiar with JavaScript and there is a development machine that is already setup to build and run JavaScript programs. We'll be running our program on a local machine using NodeJS.

Install `duelink` packgage:
```js
npm install duelink
```

If using serialport, `dlserialusb` package is needed:

```js
npm install dlserialusb
```

> [!TIP]
> Make sure your hardware is updated with the latest firmware listed on the [downloads](../downloads.md) page.

Start a new project with a simple line of code to test out the project is running.

```js
console.log("Hello World");
```

## Blinky!

Our first program will blink the on-board on for 200ms then it shuts off for 800ms, and does this 20 times. We will be using SerialUSB() here. If using a web browser, use WebSerial() instead.

```js
const { SerialUSB } = require("dlserialusb");
const { DUELinkController } = require("duelink");

async function  Blinky() {
    let duelink = new DUELinkController(new SerialUSB());

    await duelink.Connect();
    
    // Flash the LED  (on for 200ms, off for 800ms, 20 times)
    await duelink.Led.Set(200,800,20);   
}

Blinky()
```

## JavaScript API

The [API](../api/intro.md) page includes all details and examples to use all the available "physical world" services.

Use the above example program to initiate the hardware, instantiate the `duelink` object, and then use any of the available APIs, such as `duelink.Sound.Beep('p', 500, 1000)' to generate a beep using the on-board peizo buzzer with a frequency of 500Hz for 1000ms