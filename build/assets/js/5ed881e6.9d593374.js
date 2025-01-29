"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[5241],{8814:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>d,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>c});const a=JSON.parse('{"id":"api/infrared","title":"Infrared","description":"---","source":"@site/docs/api/infrared.mdx","sourceDirName":"api","slug":"/api/infrared","permalink":"/docs/api/infrared","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/infrared.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"I2C","permalink":"/docs/api/i2c"},"next":{"title":"LCD","permalink":"/docs/api/lcd"}}');var i=r(4848),s=r(8453);const t={},d="Infrared",l={},c=[{value:"Python",id:"python",level:2},{value:"JavaScript",id:"javascript",level:2},{value:".NET",id:"net",level:2}];function o(e){const n={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"infrared",children:"Infrared"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.p,{children:"IR decoder is fixed to pin 2 and 8."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Infrared.Enable(pin, enable)"})," - Enables pin for IR signal capture",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"pin:"})," Pin number",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"enable:"})," True = enable, false = disable"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Infrared.Read()"})," - Reads the value from the IR enabled pin",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"Return:"})," Tracks the past 16 key presses and returns them. -1 if none."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"This example will enable and read IR code from pin 2."}),"\n",(0,i.jsx)(n.h2,{id:"python",children:(0,i.jsx)(n.a,{href:"#tab/py",children:"Python"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-py",children:"duelink.Infrared.Enable(2, True)\r\n\r\nwhile True:\r\n    x = duelink.Infrared.Read()\r\n    if x >= 0:\r\n        print (x)\r\n        \r\n    time.sleep(1)\n"})}),"\n",(0,i.jsx)(n.h2,{id:"javascript",children:(0,i.jsx)(n.a,{href:"#tab/js",children:"JavaScript"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"await duelink.Infrared.Enable(2, true)\r\n\r\nwhile (true){\r\n    let x = await duelink.Infrared.Read()\r\n\r\n    if (x >=0)                \r\n        console.log(x)\r\n\r\n     await Util.sleep(1000)               \r\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"net",children:(0,i.jsx)(n.a,{href:"#tab/net",children:".NET"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-cs",children:"duelink.Infrared.Enable(2, true);\r\n\r\nwhile (true){\r\n    var x = duelink.Infrared.Read();\r\n\r\n    if (x >=0)                \r\n        Console.WriteLine(x);\r\n\r\n    Thread.Sleep(1000);                \r\n}\n"})}),"\n",(0,i.jsx)(n.hr,{})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>t,x:()=>d});var a=r(6540);const i={},s=a.createContext(i);function t(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);