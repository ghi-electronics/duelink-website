"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[6755],{33683:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>u,contentTitle:()=>o,default:()=>h,frontMatter:()=>c,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"api/script","title":"Script","description":"---","source":"@site/docs/api/script.mdx","sourceDirName":"api","slug":"/api/script","permalink":"/docs/api/script","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/api/script.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Pulse","permalink":"/docs/api/pulse"},"next":{"title":"Servo Motor","permalink":"/docs/api/servo"}}');var a=n(74848),l=n(28453),i=n(65537),s=n(79329);const c={},o="Script",u={},d=[];function p(e){const r={br:"br",code:"code",h1:"h1",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.header,{children:(0,a.jsx)(r.h1,{id:"script",children:"Script"})}),"\n",(0,a.jsx)(r.hr,{}),"\n",(0,a.jsx)(r.p,{children:"These methods allow developers to control DUE Scripts right from within Python, JavaScript or .NET"}),"\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Script.New()"})," - Clears the program stored in flash"]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Script.Load(script)"})," - Loads the line into internal buffer",(0,a.jsx)(r.br,{}),"\n",(0,a.jsx)(r.strong,{children:"script:"})," Line to load into internal buffer"]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Script.Record()"})," - Sends the internal buffer to the device, overwriting any previous programs"]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Script.Read()"})," - Read the program stored in flash and return as string"]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Script.Execute(script)"})," - Executes the single line of code immediately",(0,a.jsx)(r.br,{}),"\n",(0,a.jsx)(r.strong,{children:"script:"})," Script to be executed"]}),"\n"]}),"\n",(0,a.jsx)(r.p,{children:"This is an example to execute a single line in immediate mode. This does not modify the application stored in flash."}),"\n",(0,a.jsxs)(i.A,{groupid:"language",queryString:"show",defaultValue:"python",values:[{label:"Python",value:"python"},{label:"JavaScript",value:"javascript"},{label:".NET",value:"csharp"}],children:[(0,a.jsx)(s.A,{value:"python",children:(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-py",children:'duelink.Script.Execute("LED(200,200,10)")\n'})})}),(0,a.jsx)(s.A,{value:"javascript",children:(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-js",children:'await duelink.Script.Execute("LED(200,200,10)")\n'})})}),(0,a.jsx)(s.A,{value:"csharp",children:(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-cs",children:'duelink.Script.Execute("LED(200,200,10)");\n'})})})]}),"\n",(0,a.jsx)(r.hr,{}),"\n",(0,a.jsx)(r.p,{children:"This example will check any script stored in flash, and clear them if program found."}),"\n",(0,a.jsxs)(i.A,{groupid:"language",queryString:"show",defaultValue:"python",values:[{label:"Python",value:"python"},{label:"JavaScript",value:"javascript"},{label:".NET",value:"csharp"}],children:[(0,a.jsx)(s.A,{value:"python",children:(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-py",children:'\r\ncurrentScript = duelink.Script.Read()\r\n\r\nif (currentScript != ""):\r\n    duelink.Script.New()\n'})})}),(0,a.jsx)(s.A,{value:"javascript",children:(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-js",children:'let currentScript = await duelink.Script.Read()\r\n\r\nif (currentScript != "")\r\n    await duelink.Script.New();\n'})})}),(0,a.jsx)(s.A,{value:"csharp",children:(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-cs",children:'var currentScript = duelink.Script.Read();\r\n\r\nif (currentScript != "")\r\n    duelink.Script.New();\n'})})})]}),"\n",(0,a.jsx)(r.hr,{}),"\n",(0,a.jsxs)(r.p,{children:["This example will load a simple program line by line and then record it. Variable ",(0,a.jsx)(r.code,{children:"c"})," is used to indicate how many times the LED will blink for, which is 10 in this case."]}),"\n",(0,a.jsxs)(i.A,{groupid:"language",queryString:"show",defaultValue:"python",values:[{label:"Python",value:"python"},{label:"JavaScript",value:"javascript"},{label:".NET",value:"csharp"}],children:[(0,a.jsx)(s.A,{value:"python",children:(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-py",children:'duelink.Script.Load("c = 10")\r\nduelink.Script.Load("@Blink")\r\nduelink.Script.Load("Led(100,100,c)")\r\nduelink.Script.Record()\n'})})}),(0,a.jsx)(s.A,{value:"javascript",children:(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-js",children:'await duelink.Script.Load("c = 10")\r\nawait duelink.Script.Load("@Blink")\r\nawait duelink.Script.Load("Led(100,100,c)")\r\nawait duelink.Script.Record()\n'})})}),(0,a.jsx)(s.A,{value:"csharp",children:(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-cs",children:'duelink.Script.Load("c = 10");\r\nduelink.Script.Load("@Blink");\r\nduelink.Script.Load("Led(100,100,c)");\r\nduelink.Script.Record();\n'})})})]}),"\n",(0,a.jsx)(r.hr,{}),"\n",(0,a.jsxs)(r.p,{children:["You can then access a previously recorder program using goto (to label) or by calling a function that has a return. This example calls the recorded program above by executing a single line that contains two commands. The first one sets ",(0,a.jsx)(r.code,{children:"c"})," to 5 and the second will send execution to ",(0,a.jsx)(r.code,{children:"@Blink"}),", which will cause the LED to blink 5 times."]}),"\n",(0,a.jsxs)(i.A,{groupid:"language",queryString:"show",defaultValue:"python",values:[{label:"Python",value:"python"},{label:"JavaScript",value:"javascript"},{label:".NET",value:"csharp"}],children:[(0,a.jsx)(s.A,{value:"python",children:(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-py",children:'duelink.Script.Execute("c=5:goto Blink")\n'})})}),(0,a.jsx)(s.A,{value:"javascript",children:(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-js",children:'await duelink.Script.Execute("c=5:goto Blink")\n'})})}),(0,a.jsx)(s.A,{value:"csharp",children:(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-cs",children:'duelink.Script.Execute("c=5:goto Blink");\n'})})})]})]})}function h(e={}){const{wrapper:r}={...(0,l.R)(),...e.components};return r?(0,a.jsx)(r,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},79329:(e,r,n)=>{n.d(r,{A:()=>i});n(96540);var t=n(34164);const a={tabItem:"tabItem_Ymn6"};var l=n(74848);function i(e){let{children:r,hidden:n,className:i}=e;return(0,l.jsx)("div",{role:"tabpanel",className:(0,t.A)(a.tabItem,i),hidden:n,children:r})}},65537:(e,r,n)=>{n.d(r,{A:()=>y});var t=n(96540),a=n(34164),l=n(65627),i=n(56347),s=n(50372),c=n(30604),o=n(11861),u=n(78749);function d(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:r}=e;return!!r&&"object"==typeof r&&"value"in r}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:r,children:n}=e;return(0,t.useMemo)((()=>{const e=r??function(e){return d(e).map((e=>{let{props:{value:r,label:n,attributes:t,default:a}}=e;return{value:r,label:n,attributes:t,default:a}}))}(n);return function(e){const r=(0,o.XI)(e,((e,r)=>e.value===r.value));if(r.length>0)throw new Error(`Docusaurus error: Duplicate values "${r.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[r,n])}function h(e){let{value:r,tabValues:n}=e;return n.some((e=>e.value===r))}function x(e){let{queryString:r=!1,groupId:n}=e;const a=(0,i.W6)(),l=function(e){let{queryString:r=!1,groupId:n}=e;if("string"==typeof r)return r;if(!1===r)return null;if(!0===r&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:r,groupId:n});return[(0,c.aZ)(l),(0,t.useCallback)((e=>{if(!l)return;const r=new URLSearchParams(a.location.search);r.set(l,e),a.replace({...a.location,search:r.toString()})}),[l,a])]}function g(e){const{defaultValue:r,queryString:n=!1,groupId:a}=e,l=p(e),[i,c]=(0,t.useState)((()=>function(e){let{defaultValue:r,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(r){if(!h({value:r,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${r}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return r}const t=n.find((e=>e.default))??n[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:r,tabValues:l}))),[o,d]=x({queryString:n,groupId:a}),[g,m]=function(e){let{groupId:r}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(r),[a,l]=(0,u.Dv)(n);return[a,(0,t.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:a}),f=(()=>{const e=o??g;return h({value:e,tabValues:l})?e:null})();(0,s.A)((()=>{f&&c(f)}),[f]);return{selectedValue:i,selectValue:(0,t.useCallback)((e=>{if(!h({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);c(e),d(e),m(e)}),[d,m,l]),tabValues:l}}var m=n(9136);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=n(74848);function b(e){let{className:r,block:n,selectedValue:t,selectValue:i,tabValues:s}=e;const c=[],{blockElementScrollPositionUntilNextRender:o}=(0,l.a_)(),u=e=>{const r=e.currentTarget,n=c.indexOf(r),a=s[n].value;a!==t&&(o(r),i(a))},d=e=>{let r=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;r=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;r=c[n]??c[c.length-1];break}}r?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":n},r),children:s.map((e=>{let{value:r,label:n,attributes:l}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:t===r?0:-1,"aria-selected":t===r,ref:e=>{c.push(e)},onKeyDown:d,onClick:u,...l,className:(0,a.A)("tabs__item",f.tabItem,l?.className,{"tabs__item--active":t===r}),children:n??r},r)}))})}function j(e){let{lazy:r,children:n,selectedValue:l}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(r){const e=i.find((e=>e.props.value===l));return e?(0,t.cloneElement)(e,{className:(0,a.A)("margin-top--md",e.props.className)}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:i.map(((e,r)=>(0,t.cloneElement)(e,{key:r,hidden:e.props.value!==l})))})}function S(e){const r=g(e);return(0,v.jsxs)("div",{className:(0,a.A)("tabs-container",f.tabList),children:[(0,v.jsx)(b,{...r,...e}),(0,v.jsx)(j,{...r,...e})]})}function y(e){const r=(0,m.A)();return(0,v.jsx)(S,{...e,children:d(e.children)},String(r))}},28453:(e,r,n)=>{n.d(r,{R:()=>i,x:()=>s});var t=n(96540);const a={},l=t.createContext(a);function i(e){const r=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function s(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),t.createElement(l.Provider,{value:r},e.children)}}}]);