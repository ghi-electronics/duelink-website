"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[4378],{3217:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>t,toc:()=>o});const t=JSON.parse('{"id":"api/pulse","title":"Pulse","description":"---","source":"@site/docs/api/pulse.mdx","sourceDirName":"api","slug":"/api/pulse","permalink":"/duelink-website/docs/api/pulse","draft":false,"unlisted":false,"editUrl":"https://ghi-electronics.github.io/duelink-website/docs/api/pulse.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"NeoPixel","permalink":"/duelink-website/docs/api/neopixel"},"next":{"title":"Script","permalink":"/duelink-website/docs/api/script"}}');var i=s(4848),l=s(8453);const r={},a="Pulse",c={},o=[{value:"Python",id:"python",level:2},{value:"JavaScript",id:"javascript",level:2},{value:".NET",id:"net",level:2}];function u(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"pulse",children:"Pulse"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.p,{children:"Generate pulses with delay. This feature is great for controlling stepper motors."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Pulse.Set(pin, pulseCount, pulseDuration)"})," - Generate pulses"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"pin:"}),"  Pin number"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"pulseCount:"})," Count of pulse will be generated"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"pulseDuration"})," Length of pulse, in microsecond"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"The example below generate 400 pulses (step) on pin 6. Each pulse has 1000us (500us high and 500us low)"}),"\n",(0,i.jsx)(n.h2,{id:"python",children:(0,i.jsx)(n.a,{href:"#tab/py",children:"Python"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-py",children:"duelink.Pulse.Set(6, 400, 1000)\n"})}),"\n",(0,i.jsx)(n.h2,{id:"javascript",children:(0,i.jsx)(n.a,{href:"#tab/js",children:"JavaScript"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"await duelink.Pulse.Set(6, 400, 1000)\n"})}),"\n",(0,i.jsx)(n.h2,{id:"net",children:(0,i.jsx)(n.a,{href:"#tab/net",children:".NET"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-cs",children:"duelink.Pulse.Set(6, 400, 1000);\n"})}),"\n",(0,i.jsx)(n.hr,{})]})}function d(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>a});var t=s(6540);const i={},l=t.createContext(i);function r(e){const n=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);