"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[7718],{88464:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"system/arduino","title":"Arduino","description":"We recommend using DueDuino for a first-class experience with Arduino and DUELink.","source":"@site/docs/system/arduino.mdx","sourceDirName":"system","slug":"/system/arduino","permalink":"/docs/system/arduino","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/system/arduino.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"micro:bit","permalink":"/docs/system/microbit"},"next":{"title":"PC & Laptop","permalink":"/docs/system/pc-laptop"}}');var o=r(74848),i=r(28453);const a={},t="Arduino",d={},l=[{value:"All are Mainboards",id:"all-are-mainboards",level:2},{value:"All Arduino Boards",id:"all-arduino-boards",level:2}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"arduino",children:"Arduino"})}),"\n",(0,o.jsxs)(n.p,{children:["We recommend using ",(0,o.jsx)(n.a,{href:"../catalog/mainboard/dueduino",children:"DueDuino"})," for a first-class experience with Arduino and DUELink."]}),"\n",(0,o.jsx)(n.p,{children:"Image"}),"\n",(0,o.jsxs)(n.p,{children:["You can use DUELink Scripts with the default provided firmware for a very easy access using ",(0,o.jsx)(n.a,{href:"../console",children:"DUELink Console"}),". Additionally, the chip used on DUELink modules is STM32C071, which is natively supported by the Arduino IDE ST extension."]}),"\n",(0,o.jsxs)(n.p,{children:["Start the Arduino IDE, and add the ST extension. More details are found ",(0,o.jsx)(n.a,{href:"https://github.com/stm32duino/Arduino_Core_STM32",children:"here"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"image"}),"\n",(0,o.jsx)(n.p,{children:"Now, select Nucleo64 from the options."}),"\n",(0,o.jsx)(n.p,{children:"Image"}),"\n",(0,o.jsx)(n.p,{children:"Select STM32C0 and DFU for file upload."}),"\n",(0,o.jsx)(n.p,{children:"Image"}),"\n",(0,o.jsx)(n.p,{children:"Blink the status LED"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-c",children:"// blink the LED\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Before loading any program, we need to wipe out the chip completely. Details on how to accomplish this is on the ",(0,o.jsx)(n.a,{href:"../loader",children:"Loader"})," page.\r\nTo load the program into the board, press and hold LDR button while resetting or powering up the board. This will place the board in DFU mode."]}),"\n",(0,o.jsx)(n.p,{children:"Image"}),"\n",(0,o.jsx)(n.p,{children:"You can now send the program from the Arduino IDE"}),"\n",(0,o.jsx)(n.p,{children:"Image"}),"\n",(0,o.jsxs)(n.p,{children:["To access DUELink modules connected to ",(0,o.jsx)(n.a,{href:"/",children:"Downstream"}),", we are still in the process of implementing full Arduino libraries for DUELink. However, here is an example that uses the standard Arduino libraries to send ",(0,o.jsx)(n.a,{href:"/",children:"LED"})," command downstream to blink its status LED 10 times."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-c",children:"Wire.Write(\u201cLED(200,200,10)\u201d)\n"})}),"\n",(0,o.jsx)(n.h2,{id:"all-are-mainboards",children:"All are Mainboards"}),"\n",(0,o.jsxs)(n.p,{children:["You may also use any other DUELink module as an Arduino mainboard!! They all share the same processor. Just add a ",(0,o.jsx)(n.a,{href:"/",children:"USB Hook"})," and the board can now connect to a PC and work just like DueDuino."]}),"\n",(0,o.jsx)(n.h2,{id:"all-arduino-boards",children:"All Arduino Boards"}),"\n",(0,o.jsxs)(n.p,{children:["The web has thousands of Arduino-compatible board variants, and they all work with the DUELink ecosystem! Use the ",(0,o.jsx)(n.a,{href:"/",children:"Breakout"})," board to wire the I2C signals from any Arduino-compatible and you have a ",(0,o.jsx)(n.a,{href:"/",children:"Downstream"})," socket ready for hundreds of module options."]}),"\n",(0,o.jsx)(n.p,{children:"Here is board ???? with light sensor and display example."}),"\n",(0,o.jsx)(n.p,{children:"image"})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},28453:(e,n,r)=>{r.d(n,{R:()=>a,x:()=>t});var s=r(96540);const o={},i=s.createContext(o);function a(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);