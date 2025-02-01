"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[6755],{33683:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"api/script","title":"Script","description":"---","source":"@site/docs/api/script.mdx","sourceDirName":"api","slug":"/api/script","permalink":"/docs/api/script","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/api/script.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Pulse","permalink":"/docs/api/pulse"},"next":{"title":"Servo Motor","permalink":"/docs/api/servo"}}');var t=i(74848),c=i(28453);const l={},s="Script",a={},d=[{value:"Python",id:"python",level:2},{value:"JavaScript",id:"javascript",level:2},{value:".NET",id:"net",level:2},{value:"Python",id:"python-1",level:2},{value:"JavaScript",id:"javascript-1",level:2},{value:".NET",id:"net-1",level:2},{value:"Python",id:"python-2",level:2},{value:"JavaScript",id:"javascript-2",level:2},{value:".NET",id:"net-2",level:2},{value:"Python",id:"python-3",level:2},{value:"JavaScript",id:"javascript-3",level:2},{value:".NET",id:"net-3",level:2}];function o(e){const n={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"script",children:"Script"})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.p,{children:"These methods allow developers to control DUE Scripts right from within Python, JavaScript or .NET"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Script.New()"})," - Clears the program stored in flash"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Script.Load(script)"})," - Loads the line into internal buffer",(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.strong,{children:"script:"})," Line to load into internal buffer"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Script.Record()"})," - Sends the internal buffer to the device, overwriting any previous programs"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Script.Read()"})," - Read the program stored in flash and return as string"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Script.Execute(script)"})," - Executes the single line of code immediately",(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.strong,{children:"script:"})," Script to be executed"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"This is an example to execute a single line in immediate mode. This does not modify the application stored in flash."}),"\n",(0,t.jsx)(n.h2,{id:"python",children:(0,t.jsx)(n.a,{href:"#tab/py",children:"Python"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-py",children:'duelink.Script.Execute("LED(200,200,10)")\n'})}),"\n",(0,t.jsx)(n.h2,{id:"javascript",children:(0,t.jsx)(n.a,{href:"#tab/js",children:"JavaScript"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'await duelink.Script.Execute("LED(200,200,10)")\n'})}),"\n",(0,t.jsx)(n.h2,{id:"net",children:(0,t.jsx)(n.a,{href:"#tab/net",children:".NET"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-cs",children:'duelink.Script.Execute("LED(200,200,10)");\n'})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.p,{children:"This example will check any script stored in flash, and clear them if program found."}),"\n",(0,t.jsx)(n.h2,{id:"python-1",children:(0,t.jsx)(n.a,{href:"#tab/py",children:"Python"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-py",children:'\r\ncurrentScript = duelink.Script.Read()\r\n\r\nif (currentScript != ""):\r\n    duelink.Script.New()\n'})}),"\n",(0,t.jsx)(n.h2,{id:"javascript-1",children:(0,t.jsx)(n.a,{href:"#tab/js",children:"JavaScript"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'let currentScript = await duelink.Script.Read()\r\n\r\nif (currentScript != "")\r\n    await duelink.Script.New();\n'})}),"\n",(0,t.jsx)(n.h2,{id:"net-1",children:(0,t.jsx)(n.a,{href:"#tab/net",children:".NET"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-cs",children:'var currentScript = duelink.Script.Read();\r\n\r\nif (currentScript != "")\r\n    duelink.Script.New();\n'})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsxs)(n.p,{children:["This example will load a simple program line by line and then record it. Variable ",(0,t.jsx)(n.code,{children:"c"})," is used to indicate how many times the LED will blink for, which is 10 in this case."]}),"\n",(0,t.jsx)(n.h2,{id:"python-2",children:(0,t.jsx)(n.a,{href:"#tab/py",children:"Python"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-py",children:'duelink.Script.Load("c = 10")\r\nduelink.Script.Load("@Blink")\r\nduelink.Script.Load("Led(100,100,c)")\r\nduelink.Script.Record()\n'})}),"\n",(0,t.jsx)(n.h2,{id:"javascript-2",children:(0,t.jsx)(n.a,{href:"#tab/js",children:"JavaScript"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'await duelink.Script.Load("c = 10")\r\nawait duelink.Script.Load("@Blink")\r\nawait duelink.Script.Load("Led(100,100,c)")\r\nawait duelink.Script.Record()\n'})}),"\n",(0,t.jsx)(n.h2,{id:"net-2",children:(0,t.jsx)(n.a,{href:"#tab/net",children:".NET"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-cs",children:'duelink.Script.Load("c = 10");\r\nduelink.Script.Load("@Blink");\r\nduelink.Script.Load("Led(100,100,c)");\r\nduelink.Script.Record();\n'})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsxs)(n.p,{children:["You can then access a previously recorder program using goto (to label) or by calling a function that has a return. This example calls the recorded program above by executing a single line that contains two commands. The first one sets ",(0,t.jsx)(n.code,{children:"c"})," to 5 and the second will send execution to ",(0,t.jsx)(n.code,{children:"@Blink"}),", which will cause the LED to blink 5 times."]}),"\n",(0,t.jsx)(n.h2,{id:"python-3",children:(0,t.jsx)(n.a,{href:"#tab/py",children:"Python"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-py",children:'duelink.Script.Execute("c=5:goto Blink")\n'})}),"\n",(0,t.jsx)(n.h2,{id:"javascript-3",children:(0,t.jsx)(n.a,{href:"#tab/js",children:"JavaScript"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'await duelink.Script.Execute("c=5:goto Blink")\n'})}),"\n",(0,t.jsx)(n.h2,{id:"net-3",children:(0,t.jsx)(n.a,{href:"#tab/net",children:".NET"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-cs",children:'duelink.Script.Execute("c=5:goto Blink");\n'})}),"\n",(0,t.jsx)(n.hr,{})]})}function h(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>s});var r=i(96540);const t={},c=r.createContext(t);function l(e){const n=r.useContext(c);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(c.Provider,{value:n},e.children)}}}]);