"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[2968],{26977:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>r,contentTitle:()=>d,default:()=>h,frontMatter:()=>o,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"engine/daisylink","title":"Daisylink","description":"---","source":"@site/docs/engine/daisylink.mdx","sourceDirName":"engine","slug":"/engine/daisylink","permalink":"/docs/engine/daisylink","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/engine/daisylink.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Standalone","permalink":"/docs/engine/standalone"},"next":{"title":"Bursts","permalink":"/docs/engine/bursts"}}');var i=s(74848),a=s(28453);const o={},d="Daisylink",r={},c=[{value:"Device Selection",id:"device-selection",level:2},{value:"Broadcast",id:"broadcast",level:2},{value:"Module to Module Commands",id:"module-to-module-commands",level:2}];function l(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",img:"img",p:"p",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"daisylink",children:"Daisylink"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Upstream-Downstream",src:s(12188).A+"",width:"4744",height:"981"})}),"\n",(0,i.jsxs)(n.p,{children:["In a DUELink setup, where there are more than one module, there will always be a connection between the Upstream and Downstream sockets. The limit of connected devices is 255 devices. And if you need more, use another ",(0,i.jsx)(n.a,{href:"../interface/intro",children:"Interface"})," to add another 255 devices! Each module single module in a stream is an active repeater of the signal. There will be no degradation of the signal quality. If necessary, add ",(0,i.jsx)(n.a,{href:"../catalog/accessory/power-inject",children:"Power Inject"})," to help with power.\r\n",(0,i.jsx)(n.img,{alt:"Daisylink",src:s(2774).A+"",width:"2000",height:"422"})]}),"\n",(0,i.jsx)(n.h2,{id:"device-selection",children:"Device Selection"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.a,{href:"./stdlib",children:"Standard Library"})," offers the ",(0,i.jsx)(n.code,{children:"Sel()"})," command to activate devices on the stream. To blink the status LED on the second device on the stream, use ",(0,i.jsx)(n.code,{children:"Sel(2)"})," followed by ",(0,i.jsx)(n.code,{children:"LED(200,200,50)"}),". The LED will blink 50 times on the second module in the stream."]}),"\n",(0,i.jsxs)(n.p,{children:["Daisylinked devices on a stream are addressed from ",(0,i.jsx)(n.code,{children:"1"}),". The fourth device on the bus is selected using 'Sel(4)'."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Select",src:s(76798).A+"",width:"5044",height:"1077"})}),"\n",(0,i.jsxs)(n.p,{children:["It is possible to select more than one device at once. LEts say we want to select devices 1,3 and 4 ",(0,i.jsx)(n.code,{children:"Sel(1,3,4)"})]}),"\n",(0,i.jsx)(n.p,{children:"image"}),"\n",(0,i.jsx)(n.h2,{id:"broadcast",children:"Broadcast"}),"\n",(0,i.jsx)(n.p,{children:"Address zero is a special address on the stream, which indicates a broadcast selection. During a broadcast, all modules are required to process the command."}),"\n",(0,i.jsx)(n.p,{children:"In this example, we have 4 modules connected."}),"\n",(0,i.jsxs)(n.p,{children:["Sending ",(0,i.jsx)(n.code,{children:"Sel(0)"})," followed by ",(0,i.jsx)(n.code,{children:"LED(200,200,50)"})," will blink the status LED 50 times on each one of the four modules. It is also possible to read from multiple devices. ",(0,i.jsx)(n.code,{children:'Sel(0):Print("Hi")'}),"."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Broadcast",src:s(13601).A+"",width:"5044",height:"1077"})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["Do not confuse the module address with ",(0,i.jsx)(n.a,{href:"../interface/i2c",children:"I2C"})," address. They are unrelated! The module address work the same no matter what ",(0,i.jsx)(n.a,{href:"../interface/intro",children:"Interface"})," is being used."]})}),"\n",(0,i.jsx)(n.h2,{id:"module-to-module-commands",children:"Module to Module Commands"}),"\n",(0,i.jsxs)(n.p,{children:["DUELink is very flexible that things can get quite nifty! A Button can be programmed to run ",(0,i.jsx)(n.a,{href:"./standalone",children:"Standalone"}),", where this button sends commands to control an LED!"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Button Controlling LEDs",src:s(1589).A+"",width:"800",height:"357"})}),"\n",(0,i.jsxs)(n.p,{children:["Want more?! Daisylinked modules can be controlled from just about any micro running ",(0,i.jsx)(n.a,{href:"../language/micropython",children:"MicroPython"})," with a 4pin JST connector, but in the middle there is a module that is also pushing commands ",(0,i.jsx)(n.a,{href:"../interface/downstream",children:"Downstream"}),"."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Other Micros",src:s(39822).A+"",width:"3544",height:"1039"})}),"\n",(0,i.jsxs)(n.p,{children:["The rule is simple: Commands are pushed ",(0,i.jsx)(n.a,{href:"../interface/downstream",children:"Downstream"})," to whatever comes next. Having muti-master on the bus is not recommended and causes many undesired edge-cases. We are only mentioning it here to show the power of DUELink."]})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},13601:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/broadcast-044e6a7b72cbcd695a2211a18abf55fc.png"},1589:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/button-led-fa860b519af913e0eacafec78156254c.gif"},2774:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/daisylink-78f211a343f3bf2e60ac1908c8806614.png"},39822:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/other-micros-f06ab7bacffd89645132408cbe5fb3a1.png"},76798:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/select-39e2fb5af80b79d5a01afb1fd3532676.png"},12188:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/upstream-downstream-537efd962fb9b3944165eee058baa58b.png"},28453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>d});var t=s(96540);const i={},a=t.createContext(i);function o(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);