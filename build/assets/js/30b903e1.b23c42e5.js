"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[9292],{7918:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>u,frontMatter:()=>a,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"api/temp-humidity","title":"Temperature and Humidity","description":"---","source":"@site/docs/api/temp-humidity.mdx","sourceDirName":"api","slug":"/api/temp-humidity","permalink":"/docs/api/temp-humidity","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/temp-humidity.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"System Functions","permalink":"/docs/api/systemfunctions"},"next":{"title":"Touch","permalink":"/docs/api/touch"}}');var i=r(4848),s=r(8453);const a={},d="Temperature and Humidity",c={},l=[{value:"Python",id:"python",level:2},{value:"JavaScript",id:"javascript",level:2},{value:".NET",id:"net",level:2}];function o(e){const n={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"temperature-and-humidity",children:"Temperature and Humidity"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.p,{children:"Works with the DHT line of low-cost temperature & humidity sensors."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Temperature.Read(pin, type)"})," - Reads sensor temperature data on connected pin",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"pin:"})," Pin number",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"type:"})," DHT11 = 11, DHT12 = 12, DHT22 = 22, DHT21 = 21",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"Returns:"})," Temperature in Celsius."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Humidity.Read(pin, type)"})," - Reads sensor humidity data on connected pin",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"pin:"})," Pin number",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"type:"})," DHT11 = 11, DHT12 = 12, DHT22 = 22, DHT21 = 21",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"Returns:"})," Humidity level 0 to 100."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"This example reads temperature and humidity every one second, using DHT11 sensor and connected to pin 0."}),"\n",(0,i.jsx)(n.h2,{id:"python",children:(0,i.jsx)(n.a,{href:"#tab/py",children:"Python"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-basic",children:"while True:\r\n    print(duelink.Humidity.Read(0, 11))\r\n    print(duelink.Temperature.Read(0, 11))\r\n\r\n    time.sleep(1)\n"})}),"\n",(0,i.jsx)(n.h2,{id:"javascript",children:(0,i.jsx)(n.a,{href:"#tab/js",children:"JavaScript"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-basic",children:"while (true){\r\n    console.log(await duelink.Humidity.Read(0, 11))\r\n    console.log(await duelink.Temperature.Read(0, 11))\r\n\r\n    await Util.sleep(1000)\r\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"net",children:(0,i.jsx)(n.a,{href:"#tab/net",children:".NET"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-basic",children:"while (true){\r\n    Console.WriteLine(duelink.Humidity.Read(0, 11));\r\n    Console.WriteLine(duelink.Temperature.Read(0, 11));\r\n\r\n    Thread.Sleep(1000);\r\n}\n"})}),"\n",(0,i.jsx)(n.hr,{})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>a,x:()=>d});var t=r(6540);const i={},s=t.createContext(i);function a(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);