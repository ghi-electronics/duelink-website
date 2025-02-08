"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[4307],{57119:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>t,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"language/javascript","title":"JavaScript","description":"---","source":"@site/docs/language/javascript.mdx","sourceDirName":"language","slug":"/language/javascript","permalink":"/docs/language/javascript","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/language/javascript.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"MicroPython","permalink":"/docs/language/micropython"},"next":{"title":".NET","permalink":"/docs/language/dotnet"}}');var s=a(74848),i=a(28453);const t={},l="JavaScript",o={},c=[{value:"Setup",id:"setup",level:2},{value:"Blinky!",id:"blinky",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",img:"img",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"javascript",children:"JavaScript"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"JavaScript",src:a(59091).A+"",width:"508",height:"194"})}),"\n",(0,s.jsx)(n.p,{children:"JavaScript is one of the core technologies used by the World Wide Web. 98% of all websites use JavaScript. Websites can now use the provided DUELink JavaScript library to access the physical world."}),"\n",(0,s.jsxs)(n.p,{children:["Here is a website demo to demonstrate how JavaScript can control actuators and read sensors: ",(0,s.jsx)(n.a,{href:"https://demo.duelink.com/",children:"demo.duelink.com"})]}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsx)(n.p,{children:"TypeScript can also be used alongside the provided JavaScrip libraries"})}),"\n",(0,s.jsx)(n.h2,{id:"setup",children:"Setup"}),"\n",(0,s.jsx)(n.p,{children:"This page assumes the user is already familiar with JavaScript and there is a development machine that is already setup to build and run JavaScript programs. We'll be running our program on a local machine using NodeJS."}),"\n",(0,s.jsxs)(n.p,{children:["Install ",(0,s.jsx)(n.code,{children:"duelink"})," packgage:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"npm install duelink\n"})}),"\n",(0,s.jsxs)(n.p,{children:["If using serialport, ",(0,s.jsx)(n.code,{children:"dlserialusb"})," package is needed:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"npm install dlserialusb\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.p,{children:["Make sure your hardware is updated with the latest firmware listed on the ",(0,s.jsx)(n.a,{href:"/docs/downloads",children:"downloads"})," page."]})}),"\n",(0,s.jsx)(n.p,{children:"Start a new project with a simple line of code to test out the project is running."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'console.log("Hello World");\n'})}),"\n",(0,s.jsx)(n.h2,{id:"blinky",children:"Blinky!"}),"\n",(0,s.jsx)(n.p,{children:"Our first program will blink the on-board on for 200ms then it shuts off for 800ms, and does this 20 times. We will be using SerialUSB() here. If using a web browser, use WebSerial() instead."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'const { SerialUSB } = require("dlserialusb");\r\nconst { DUELinkController } = require("duelink");\r\n\r\nasync function  Blinky() {\r\n    let duelink = new DUELinkController(new SerialUSB());\r\n\r\n    await duelink.Connect();\r\n    \r\n    // Flash the LED  (on for 200ms, off for 800ms, 20 times)\r\n    await duelink.Led.Set(200,800,20);   \r\n}\r\n\r\nBlinky()\n'})}),"\n",(0,s.jsxs)(n.p,{children:["You can now use any of the available ",(0,s.jsx)(n.a,{href:"/docs/api/intro",children:"APIs"})," such as `duelink.Sound.Beep('p', 500, 1000)' to generate a sound on a connected buzzer."]})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},59091:(e,n,a)=>{a.d(n,{A:()=>r});const r=a.p+"assets/images/javascript-d0c73124a35a72dbf3e8af6053fa3e15.png"},28453:(e,n,a)=>{a.d(n,{R:()=>t,x:()=>l});var r=a(96540);const s={},i=r.createContext(s);function t(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);