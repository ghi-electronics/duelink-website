"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[6854],{10486:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>a,frontMatter:()=>c,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"engine/scheduler","title":"Scheduler","description":"---","source":"@site/docs/engine/scheduler.mdx","sourceDirName":"engine","slug":"/engine/scheduler","permalink":"/docs/engine/scheduler","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/engine/scheduler.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Scripting Language","permalink":"/docs/engine/scripting"},"next":{"title":"Interrupts","permalink":"/docs/engine/interrupt"}}');var s=t(74848),i=t(28453);const c={},o="Scheduler",d={},l=[];function u(e){const n={code:"code",h1:"h1",header:"header",hr:"hr",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"scheduler",children:"Scheduler"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsxs)(n.p,{children:["DUELink Engine includes a scheduler to help execute tasks repeatedly. Use ",(0,s.jsx)(n.code,{children:"SStart"})," to start scheduling a function. The arguments are ",(0,s.jsx)(n.code,{children:"SStart(func, time, count)"}),", where 'func' is the function to schedule, ",(0,s.jsx)(n.code,{children:"time"})," is the delay between executions, and finally ",(0,s.jsx)(n.code,{children:"count"})," is for the scheduler count."]}),"\n",(0,s.jsxs)(n.p,{children:["You can check the current status of a scheduler using ",(0,s.jsx)(n.code,{children:"SStat(func)"}),". The returned value shows remaining count for the scheduler will still need to run for."]}),"\n",(0,s.jsxs)(n.p,{children:["It is possible to to abort a schedule at any time using ",(0,s.jsx)(n.code,{children:"SAbort(func)"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-py",children:'_i = 0\r\n_b = 0\r\nSStart("Blink", 100, 50)\r\n\r\nwhile 1\r\n  if (_i % 10) = 0: PrintLn("stat: ", SStat("Blink")) :_i=_i+1 :end\r\n  # If button is pressed, SAbort("Blink")\r\nwend\r\n\r\nfn Blink()\r\n  DWrite(20, _i&1)# status LED is always on pin 20\r\n  _b=_b+1\r\nfend\n'})})]})}function a(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>o});var r=t(96540);const s={},i=r.createContext(s);function c(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);