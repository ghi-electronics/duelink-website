"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[945],{360:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>h,frontMatter:()=>l,metadata:()=>s,toc:()=>o});const s=JSON.parse('{"id":"api/systemfunctions","title":"System Functions","description":"---","source":"@site/docs/api/systemfunctions.mdx","sourceDirName":"api","slug":"/api/systemfunctions","permalink":"/duelink-website/docs/api/systemfunctions","draft":false,"unlisted":false,"editUrl":"https://ghi-electronics.github.io/duelink-website/docs/api/systemfunctions.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"SPI","permalink":"/duelink-website/docs/api/spi"},"next":{"title":"Temperature and Humidity","permalink":"/duelink-website/docs/api/temp-humidity"}}');var i=t(4848),r=t(8453);const l={},d="System Functions",c={},o=[{value:"Python",id:"python",level:2},{value:"JavaScript",id:"javascript",level:2},{value:".NET",id:"net",level:2}];function a(e){const n={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"system-functions",children:"System Functions"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"System.Print(text)"}),"  - Prints the value of the argument to the console on the same line",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"text:"})," String or variable"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"System.Println(text)"}),"  - Prints the value of the argument to the console then moves to the next line",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"text:"})," String or variable"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"System.Reset(loader)"})," - Resets the board",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"loader:"})," 0 = system reset,  1 = reset and stay in loader mode"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"System.GetTickMilliseconds()"})," - Read system ticks in milliseconds"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"System.GetTickMicroseconds()"})," - Read system ticks microseconds"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"System.Wait(duration)"})," - Holds program from running",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"duration:"})," Duration in milliseconds"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"System.Version"}),"  - Returns the current firmware version",(0,i.jsx)(n.br,{}),"\n","The last character returned in Version is board"]}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Board"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Character"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"DUElink Spider"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"D"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Pulse"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"P"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Edge"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"E"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Flea"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"F"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Pico"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"I"})]})]})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.h2,{id:"python",children:(0,i.jsx)(n.a,{href:"#tab/py",children:"Python"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-py",children:'# print "Hello world"\r\nduelink.System.Print("Hello world")\r\n\r\n#  print "Hello world" and add new line\r\nduelink.System.Println("Hello world")\r\n\r\n#  Check version number\r\nprint(duelink.System.Version)\r\n\r\n#  Get device tick in millisecond\r\nprint(duelink.System.GetTickMilliseconds())\r\n\r\n#  Get device tick in microsecond\r\nprint(duelink.System.GetTickMicroseconds())\r\n\r\n#  Delay 1 second\r\nduelink.System.Wait(1000)\r\n\r\n#  Reset the device\r\nduelink.System.Reset(0)\n'})}),"\n",(0,i.jsx)(n.h2,{id:"javascript",children:(0,i.jsx)(n.a,{href:"#tab/js",children:"JavaScript"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'// print "Hello world"\r\nawait duelink.System.Print("Hello world")\r\n\r\n// print "Hello world" and add new line\r\nawait duelink.System.Println("Hello world")\r\n\r\n// Check version number\r\nconsole.log(duelink.System.Version)\r\n\r\n// Get device tick in millisecond\r\nconsole.log(await duelink.System.GetTickMilliseconds())\r\n\r\n// Get device tick in microsecond\r\nconsole.log(await duelink.System.GetTickMicroseconds())\r\n\r\n// Delay 1 second\r\nawait duelink.System.Wait(1000)\r\n\r\n// Reset the device\r\nawait duelink.System.Reset(0)\n'})}),"\n",(0,i.jsx)(n.h2,{id:"net",children:(0,i.jsx)(n.a,{href:"#tab/net",children:".NET"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-cs",children:'// print "Hello world"\r\nduelink.System.Print("Hello world");\r\n\r\n// print "Hello world" and add new line\r\nduelink.System.Println("Hello world");\r\n\r\n// Check version number\r\nConsole.WriteLine(duelink.System.Version);\r\n\r\n// Get device tick in millisecond\r\nConsole.WriteLine(duelink.System.GetTickMilliseconds());\r\n\r\n// Get device tick in microsecond\r\nConsole.WriteLine(duelink.System.GetTickMicroseconds());\r\n\r\n// Delay 1 second\r\nduelink.System.Wait(1000);\r\n\r\n// Reset the device\r\nduelink.System.Reset(0);\n'})}),"\n",(0,i.jsx)(n.hr,{})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>d});var s=t(6540);const i={},r=s.createContext(i);function l(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);