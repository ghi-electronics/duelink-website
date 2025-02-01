"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[640],{77278:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"coding/python","title":"Python","description":"---","source":"@site/docs/coding/python.mdx","sourceDirName":"coding","slug":"/coding/python","permalink":"/docs/coding/python","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/coding/python.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Scripting","permalink":"/docs/coding/scripting"},"next":{"title":"MicroPython","permalink":"/docs/coding/micropython"}}');var o=t(74848),r=t(28453);const a={},s="Python",l={},d=[{value:"Setup",id:"setup",level:2},{value:"Blinky!",id:"blinky",level:2},{value:"Python API",id:"python-api",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",img:"img",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"python",children:"Python"})}),"\n",(0,o.jsx)(n.hr,{}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"Python",src:t(63112).A+"",width:"508",height:"194"})}),"\n",(0,o.jsx)(n.p,{children:"Python is the main language used with AI and data science. The provided DUELink Python library allows a full standard Python program to access the physical world. For example, an AI vision facial recognition can now control a door lock."}),"\n",(0,o.jsx)(n.h2,{id:"setup",children:"Setup"}),"\n",(0,o.jsx)(n.p,{children:"This page assumes the user is already familiar with Python and there is a development machine that is already setup to build and run Python programs. No changes are needed there but we are using Microsoft Visual Studio Code as a personal preference."}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.code,{children:'<CodeBlock language="python">{MyComponentSource}</CodeBlock>'})}),"\n",(0,o.jsx)(n.admonition,{type:"tip",children:(0,o.jsxs)(n.p,{children:["Make sure your hardware is updated with the latest firmware listed on the ",(0,o.jsx)(n.a,{href:"/docs/downloads",children:"downloads"})," page."]})}),"\n",(0,o.jsx)(n.p,{children:"Start a new project with a simple line of code to test out the project is running."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-py",children:'print("Hello DUELink!")\n'})}),"\n",(0,o.jsxs)(n.p,{children:["We now need to install the DUE Python library ",(0,o.jsx)(n.code,{children:"pip install DUELink"}),". The DUELink package will also install all required dependencies."]}),"\n",(0,o.jsx)(n.admonition,{type:"tip",children:(0,o.jsx)(n.p,{children:"The DUE python library requires pySerial, which may require an admin access to install."})}),"\n",(0,o.jsx)(n.h2,{id:"blinky",children:"Blinky!"}),"\n",(0,o.jsx)(n.p,{children:"Our first program will blink the on-board on for 200ms then it shuts off for 800ms, and does this 20 times."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-py",children:'from DUELink.DUELinkController import DUELinkController\r\nprint("Hello DUE!")\r\navailablePort = DUELinkController.GetConnectionPort()\r\nduelink = DUELinkController(availablePort)\r\n# Flash the LED  (on for 200ms, off for 800ms, 20 times)\r\nduelink.Led.Set(200,800,20)\r\nprint("Bye DUE!")\n'})}),"\n",(0,o.jsx)(n.h2,{id:"python-api",children:"Python API"}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.a,{href:"/docs/api/intro",children:"API"}),' page includes all details and examples to use all the available "physical world" services.']}),"\n",(0,o.jsxs)(n.p,{children:["Use the above example program to initiate the hardware, instantiate the ",(0,o.jsx)(n.code,{children:"duelink"})," object, and then use any of the available APIs, such as `duelink.Sound.Beep('p', 500, 1000)' to generate a beep using the on-board peizo buzzer with a frequency of 500Hz for 1000ms"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},63112:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/python-9db06d846909f80880c5664fc9868707.png"},28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>s});var i=t(96540);const o={},r=i.createContext(o);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);