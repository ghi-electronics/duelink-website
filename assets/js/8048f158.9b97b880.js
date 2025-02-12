"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[4395],{8472:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"interface/downstream","title":"Downstream","description":"---","source":"@site/docs/interface/downstream.mdx","sourceDirName":"interface","slug":"/interface/downstream","permalink":"/docs/interface/downstream","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/interface/downstream.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"SPI","permalink":"/docs/interface/spi"},"next":{"title":"Wireless","permalink":"/docs/interface/wireless"}}');var s=t(74848),o=t(28453);const a={},i="Downstream",c={},d=[];function l(e){const n={a:"a",h1:"h1",header:"header",hr:"hr",p:"p",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"downstream",children:"Downstream"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsxs)(n.p,{children:["The Downstream socket found on every single DUELink module is used to connect to the next Upstream socket on the next module. The DUELink software magically handles the data going across the entire ",(0,s.jsx)(n.a,{href:"../engine/daisylink",children:"Daisylink"})," stream of connected modules."]}),"\n",(0,s.jsxs)(n.p,{children:["There will be no signal degradation along the wires as data is repeated on every Downstream socket. In cases power is dropping after several modules, a ",(0,s.jsx)(n.a,{href:"../catalog/accessory/power-inject",children:"Power Inject"})," module can be used. This is not necessary in most modules as they are very low power. However, some modules, like large displays and motor drivers, do require decent amount of power."]})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>i});var r=t(96540);const s={},o=r.createContext(s);function a(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);