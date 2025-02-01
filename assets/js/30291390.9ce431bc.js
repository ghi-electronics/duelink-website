"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[118],{91388:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>d,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>c});const a=JSON.parse('{"id":"api/can","title":"CAN","description":"---","source":"@site/docs/api/can.mdx","sourceDirName":"api","slug":"/api/can","permalink":"/docs/api/can","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/api/can.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Buttons","permalink":"/docs/api/button"},"next":{"title":"Digital","permalink":"/docs/api/digital"}}');var r=s(74848),i=s(28453);const t={},d="CAN",l={},c=[{value:"CanMessage",id:"canmessage",level:2},{value:"Python",id:"python",level:2},{value:"JavaScript",id:"javascript",level:2},{value:".NET",id:"net",level:2}];function o(e){const n={a:"a",admonition:"admonition",br:"br",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"can",children:"CAN"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Can.Initialize(baudrate)"})," - Initialize CAN with special baudrate",(0,r.jsx)(n.br,{}),"\n",(0,r.jsx)(n.strong,{children:"baudrate:"}),"  Accepts 125000, 250000, 500000, 1000000"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Can.InitializeExt(phase1, phase2, prescaler, synchronizationJumpWidth)"})," - User defined baudrate. Max 1000000 (1Mbs)",(0,r.jsx)(n.br,{}),"\n",(0,r.jsx)(n.strong,{children:"phase1"}),": Time segment 1. Max is 15",(0,r.jsx)(n.br,{}),"\n",(0,r.jsx)(n.strong,{children:"phase2"}),": Time segment 2. Max is 7",(0,r.jsx)(n.br,{}),"\n",(0,r.jsx)(n.strong,{children:"prescaler"}),": Baudrate prescaler, this value defines the length of a time quanta. Max is 1023",(0,r.jsx)(n.br,{}),"\n",(0,r.jsx)(n.strong,{children:"synchronizationJumpWidth"}),": Synchronization jump width. Max is 3"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Can.Available()"})," - Count",(0,r.jsx)(n.br,{}),"\n",(0,r.jsx)(n.strong,{children:"Returns:"})," How many messages have been buffered and ready to be read"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Can.Write(message)"})," - Write message",(0,r.jsx)(n.br,{}),"\n",(0,r.jsx)(n.strong,{children:"message:"})," Message to send on CAN"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Can.Read()"})," - Read message",(0,r.jsx)(n.br,{}),"\n",(0,r.jsx)(n.strong,{children:"Return:"})," Message from CAN"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsx)(n.p,{children:"CAN peripheral clock is 80MHz"})}),"\n",(0,r.jsx)(n.h2,{id:"canmessage",children:"CanMessage"}),"\n",(0,r.jsx)(n.p,{children:"To send or received a message, CanMessage class is used"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Id"})," - CAN id"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Extended"})," - Extended flag"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"RemoteRequest"})," - RemoteRequest flag"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Length"})," - Length of data, max is 8"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Data"})," - Array, max 8 bytes"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"The example below initialize CAN at 500Kbs, check any message available, read, increase ID by 1 and write it back to sender"}),"\n",(0,r.jsx)(n.h2,{id:"python",children:(0,r.jsx)(n.a,{href:"#tab/py",children:"Python"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-py",children:'duelink.Can.Initialize(500000)\r\n\r\nwhile True :\r\n    if (duelink.Can.Available() > 0):    \r\n        message = duelink.Can.Read()\r\n\r\n        # print received message detail\r\n        print(f"id: {message.Id}, ext: {message.Extended}, rtr: {message.RemoteRequest}, data: {message.Data[0]}, {message.Data[1]}, {message.Data[2]}, {message.Data[3]}, {message.Data[4]}, {message.Data[5]}, {message.Data[6]}, {message.Data[7]}")\r\n        \r\n        # Increase message.Id by 1\r\n        message.Id = message.Id + 1\r\n        \r\n        # send back to sender\r\n        duelink.Can.Write(message)\r\n    \r\n    time.sleep(1)\n'})}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.p,{children:["To use CanMessage class, need to import:",(0,r.jsx)(n.br,{}),"\n",(0,r.jsx)(n.code,{children:"from DUELink.Can import CanMessage"})]})}),"\n",(0,r.jsx)(n.h2,{id:"javascript",children:(0,r.jsx)(n.a,{href:"#tab/js",children:"JavaScript"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"await duelink.Can.Initialize(500000)\r\n\r\nwhile (true) {\r\n    if (await duelink.Can.Available() > 0){\r\n        let message = await duelink.Can.Read()\r\n       \r\n        // print received message detail\r\n        console.log(`id: ${message.Id}, ext: ${message.Extended}, rtr: ${message.RemoteRequest}, data: ${message.Data[0]}, ${message.Data[1]}, ${message.Data[2]}, ${message.Data[3]}, ${message.Data[4]}, ${message.Data[5]}, ${message.Data[6]}, ${message.Data[7]}`)\r\n\r\n        // Increase message.Id by 1\r\n        message.Id += 1\r\n\r\n        // send back to sender\r\n        await duelink.Can.Write(message)\r\n    }\r\n    await Util.sleep(1000)\r\n}\n"})}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.p,{children:["To use CanMessage class, need to import:",(0,r.jsx)(n.br,{}),"\n",(0,r.jsx)(n.code,{children:"import { CanMessage } from './duelink.js'"})]})}),"\n",(0,r.jsx)(n.h2,{id:"net",children:(0,r.jsx)(n.a,{href:"#tab/net",children:".NET"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-cs",children:'duelink.Can.Initialize(500000);\r\n\r\nwhile (true) {\r\n    if (duelink.Can.Available() > 0){\r\n        var message = duelink.Can.Read();\r\n\r\n        // print received message detail\r\n        Console.WriteLine($"id: {read.Id}, ext: {read.Extended}, rtr: {read.RemoteRequest}, data: {read.Data[0]}, {read.Data[1]}, {read.Data[2]}, {read.Data[3]}, {read.Data[4]}, {read.Data[5]}, {read.Data[6]}, {read.Data[7]}");\r\n        \r\n        // Increase message.Id by 1\r\n        message.Id += 1\r\n\r\n        // send back to sender\r\n        duelink.Can.Write(message);\r\n    }\r\n    Thread.Sleep(1000);\r\n}\n'})}),"\n",(0,r.jsx)(n.hr,{})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>d});var a=s(96540);const r={},i=a.createContext(r);function t(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);