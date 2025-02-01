"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[3225],{95194:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>l,frontMatter:()=>d,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"console","title":"Console","description":"---","source":"@site/docs/console.mdx","sourceDirName":".","slug":"/console","permalink":"/docs/console","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/console.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Samples","permalink":"/docs/engine/samples"},"next":{"title":"Loader","permalink":"/docs/loader"}}');var i=s(74848),o=s(28453);const d={},r="Console",a={},c=[{value:"Immediate Window",id:"immediate-window",level:2},{value:"Log &amp; History Windows",id:"log--history-windows",level:2},{value:"Connect",id:"connect",level:2},{value:"Record",id:"record",level:2},{value:"Play",id:"play",level:2},{value:"Stop",id:"stop",level:2},{value:"List",id:"list",level:2},{value:"Download",id:"download",level:2},{value:"Load",id:"load",level:2},{value:"Zoom",id:"zoom",level:2},{value:"Docs",id:"docs",level:2},{value:"Demos",id:"demos",level:2},{value:"Firmware",id:"firmware",level:2},{value:"Theme",id:"theme",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",img:"img",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"console",children:"Console"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsxs)(n.p,{children:["The DUELink Console provides many functionalities. It is a great start to verify the device is functioning properly. It is also a great place to learn about and use ",(0,i.jsx)(n.a,{href:"/docs/engine/scripting",children:"DUELink Scripts"}),"."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://console.duelink.com/",children:(0,i.jsx)(n.strong,{children:"console.duelink.com"})})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"DUELink Console",src:s(57226).A+"",width:"994",height:"736"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"immediate-window",children:"Immediate Window"}),"\n",(0,i.jsxs)(n.p,{children:["The immediate text box sends and runs the code immediately on the DUELink hardware as soon as the ",(0,i.jsx)(n.code,{children:"Enter"})," key or ",(0,i.jsx)(n.code,{children:"arrow"})," button is pressed."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"DUELink immediate window",src:s(6990).A+"",width:"1000",height:"148"})}),"\n",(0,i.jsxs)(n.p,{children:["Try ",(0,i.jsx)(n.code,{children:"DWrite('L',1)"})," to run the LED on and then ",(0,i.jsx)(n.code,{children:"DWrite('L',0)"})," to turn it off."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"log--history-windows",children:"Log & History Windows"}),"\n",(0,i.jsxs)(n.p,{children:["The DUELink Log window is where DUELink hardware will talk back to the console. ",(0,i.jsx)(n.code,{children:"Log()"})," functions appear directly in this window.  The History windows provides a history of your DUELink session. The ",(0,i.jsx)(n.code,{children:"eraser"})," button clears the windows."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-basic",children:'Log("This is where log outputs appear")\n'})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"DUELink console output",src:s(62353).A+"",width:"1000",height:"474"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"connect",children:"Connect"}),"\n",(0,i.jsx)(n.p,{children:"Select the connect button to connect to the DUELink hardware."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Connect Button",src:s(88571).A+"",width:"1000",height:"297"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"record",children:"Record"}),"\n",(0,i.jsx)(n.p,{children:"Sends the script in the editor window to the DUELink hardware's flash."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Record Button",src:s(76734).A+"",width:"1000",height:"297"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"play",children:"Play"}),"\n",(0,i.jsx)(n.p,{children:"Runs the code that is stored in flash."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Play Button",src:s(64655).A+"",width:"1000",height:"297"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"stop",children:"Stop"}),"\n",(0,i.jsx)(n.p,{children:"Stops the program running on the DUELink hardware."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Stop Button",src:s(26973).A+"",width:"1000",height:"297"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"list",children:"List"}),"\n",(0,i.jsx)(n.p,{children:"The List button loads the program currently stored in flash into the editor window."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"List Button",src:s(57937).A+"",width:"1000",height:"297"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"download",children:"Download"}),"\n",(0,i.jsx)(n.p,{children:"Saves the code in the consoles editor window to a text file."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Download Button",src:s(72398).A+"",width:"1000",height:"297"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"load",children:"Load"}),"\n",(0,i.jsx)(n.p,{children:"Loads a saved program into the editor."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Download Button",src:s(15733).A+"",width:"1000",height:"297"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"zoom",children:"Zoom"}),"\n",(0,i.jsx)(n.p,{children:"Zooms the edit window in and out."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Download Button",src:s(81192).A+"",width:"1000",height:"297"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"docs",children:"Docs"}),"\n",(0,i.jsx)(n.p,{children:"Links to the DUELink Script Documentation."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Theme Button",src:s(42852).A+"",width:"1000",height:"297"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"demos",children:"Demos"}),"\n",(0,i.jsx)(n.p,{children:"Select from pre-built DUELink Script Demos that load into the edit window."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Theme Button",src:s(56829).A+"",width:"1000",height:"297"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"firmware",children:"Firmware"}),"\n",(0,i.jsx)(n.p,{children:"Select and load the appropriate firmware to your device."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Theme Button",src:s(93474).A+"",width:"1000",height:"297"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"theme",children:"Theme"}),"\n",(0,i.jsx)(n.p,{children:"Changes the consoles theme to Light or Dark."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Theme Button",src:s(44458).A+"",width:"1000",height:"297"})}),"\n",(0,i.jsx)(n.hr,{})]})}function l(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},62353:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/console-output-de6781241c653e830c9be2b94449e296.png"},88571:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/due-connect-3382a02579756a2fcc58256aeae16afb.png"},57226:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/due-console-0f96b230750f9436937c918023f9ebd4.png"},56829:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/due-demos-e26cc002d357323ea79dcd55bba496e8.png"},42852:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/due-docs-9db4a2bf79097d2378787b61bd2d01f9.png"},93474:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/due-firmware-eaac47d6f5dfbe22d876233fe7ccf605.png"},57937:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/due-list-b948661ea08d68148ca4c4ca9c4df518.png"},15733:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/due-load-001002646f6fc73c7206876434bba057.png"},64655:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/due-play-37efe38f000020cda070074392909e15.png"},76734:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/due-record-16b85399d75c75c05debf912a45da61d.png"},72398:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/due-save-0c446790e3923a34b00d4bfed6b90aab.png"},26973:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/due-stop-d8ae80f2489e6ba67855ff6f291a62f8.png"},44458:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/due-theme-9e94851f6424c3f9a6a2a944183bca1a.png"},81192:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/due-zoom-8e7793af6b4363283b3b5f755a8f01e5.png"},6990:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/immediate-window-273df70b93b51899a2dcd0deb55d375d.png"},28453:(e,n,s)=>{s.d(n,{R:()=>d,x:()=>r});var t=s(96540);const i={},o=t.createContext(i);function d(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);