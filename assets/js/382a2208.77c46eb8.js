"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[9021],{80959:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>l,contentTitle:()=>c,default:()=>o,frontMatter:()=>i,metadata:()=>t,toc:()=>a});const t=JSON.parse('{"id":"api/intro","title":"API Reference","description":"---","source":"@site/docs/api/intro.mdx","sourceDirName":"api","slug":"/api/intro","permalink":"/docs/api/intro","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/api/intro.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Other Languages","permalink":"/docs/coding/other"},"next":{"title":"Analog","permalink":"/docs/api/analog"}}');var n=s(74848),d=s(28453);const i={},c="API Reference",l={},a=[];function h(e){const r={a:"a",h1:"h1",header:"header",hr:"hr",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,d.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.header,{children:(0,n.jsx)(r.h1,{id:"api-reference",children:"API Reference"})}),"\n",(0,n.jsx)(r.hr,{}),"\n",(0,n.jsx)(r.p,{children:"The DUELink core library provided for multiple languages (such as Python) gives the user an easy access to the available feature through a nicely designed API."}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:"API"}),(0,n.jsx)(r.th,{children:"Description"})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/analog",children:"Analog"})}),(0,n.jsx)(r.td,{children:"Read or Write analog pins"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/bluetooth",children:"Bluetooth"})}),(0,n.jsx)(r.td,{children:"Set name or pin code for bluetooth"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/button",children:"Button"})}),(0,n.jsx)(r.td,{children:"Read a button. Similar to Digital read but handles debounce"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/can",children:"Controller Area Network (CAN)"})}),(0,n.jsx)(r.td,{children:"Read or write message on CAN"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/digital",children:"Digital"})}),(0,n.jsx)(r.td,{children:"Read or write digital pins"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/distance",children:"Distance"})}),(0,n.jsx)(r.td,{children:"Read ultrasonic distance sensor"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/frequency",children:"Frequency"})}),(0,n.jsx)(r.td,{children:"Generate frequency on a specific pin. This uses hardware PWM internally"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/i2c",children:"I2C"})}),(0,n.jsx)(r.td,{children:"Access the I2C bus for transferring data"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/infrared",children:"Infrared"})}),(0,n.jsx)(r.td,{children:"Read and decode IR remote control signal"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/lcd",children:"LCD"})}),(0,n.jsx)(r.td,{children:"Draw on LCD (device specific)"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/led",children:"LED"})}),(0,n.jsx)(r.td,{children:"Control the on-board LED"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/neopixel",children:"NeoPixel"})}),(0,n.jsx)(r.td,{children:"Control smart color LEDs"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/pulse",children:"Pulse"})}),(0,n.jsx)(r.td,{children:"Generate pulse. Great for controlling stepper motors"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/script",children:"Script"})}),(0,n.jsx)(r.td,{children:"Allows for expanding the system with custom scripts for advanced users"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/servo",children:"Servo"})}),(0,n.jsx)(r.td,{children:"Control servo motors"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/sound",children:"Sound"})}),(0,n.jsx)(r.td,{children:"Generate sound"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/spi",children:"SPI"})}),(0,n.jsx)(r.td,{children:"Access the SPI data bus"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/systemfunctions",children:"System Functions"})}),(0,n.jsx)(r.td,{children:"Built-in functions"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/temp-humidity",children:"Temp-Humidity"})}),(0,n.jsx)(r.td,{children:"Works with DHT sensors"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/touch",children:"Touch"})}),(0,n.jsx)(r.td,{children:"Allows for capacitive touch sensing"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.a,{href:"/docs/api/uart",children:"UART"})}),(0,n.jsx)(r.td,{children:"Transfer data on the UART serial port"})]})]})]})]})}function o(e={}){const{wrapper:r}={...(0,d.R)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},28453:(e,r,s)=>{s.d(r,{R:()=>i,x:()=>c});var t=s(96540);const n={},d=t.createContext(n);function i(e){const r=t.useContext(d);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),t.createElement(d.Provider,{value:r},e.children)}}}]);