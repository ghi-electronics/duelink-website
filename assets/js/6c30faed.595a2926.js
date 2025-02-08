"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[7867],{49575:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"api/neopixel","title":"NeoPixel","description":"---","source":"@site/docs/api/neopixel.mdx","sourceDirName":"api","slug":"/api/neopixel","permalink":"/docs/api/neopixel","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/api/neopixel.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"LED","permalink":"/docs/api/led"},"next":{"title":"Pulse","permalink":"/docs/api/pulse"}}');var o=r(74848),l=r(28453);const i={},s="NeoPixel",d={},c=[{value:"Python",id:"python",level:2},{value:"JavaScript",id:"javascript",level:2},{value:".NET",id:"net",level:2}];function a(e){const n={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"neopixel",children:"NeoPixel"})}),"\n",(0,o.jsx)(n.hr,{}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Neo.Clear()"})," - Clears all LEDs (in memory). Needs ",(0,o.jsx)(n.code,{children:"Neo.Show()"})," to see the affect"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Neo.SetColor(int index, uint color)"})," - Sets a specific LED to a color. Needs ",(0,o.jsx)(n.code,{children:"Neo.Show()"})," to see affect",(0,o.jsx)(n.br,{}),"\n",(0,o.jsx)(n.strong,{children:"index:"})," The LED index where 0 is first one and supporting up to 1024 LEDs",(0,o.jsx)(n.br,{}),"\n",(0,o.jsx)(n.strong,{children:"color:"})," Color levels, 32 bit format"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Neo.SetRGB(int index, byte red, byte green, byte blue)"})," - Sets a specific LED to a color. Needs ",(0,o.jsx)(n.code,{children:"Neo.Show()"})," to see affect",(0,o.jsx)(n.br,{}),"\n",(0,o.jsx)(n.strong,{children:"index:"})," The LED index where 0 is first one and supporting up to 1024 LEDs",(0,o.jsx)(n.br,{}),"\n",(0,o.jsx)(n.strong,{children:"red, green, blue:"})," Color levels, 0 to 255"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Neo.SetMultiple(int pin, uint[] color)"})," - Sets multiple leds with color array. No need ",(0,o.jsx)(n.code,{children:"Neo.Show()"})," to see affect",(0,o.jsx)(n.br,{}),"\n",(0,o.jsx)(n.strong,{children:"pin:"})," Pin connected to NeoPixel",(0,o.jsx)(n.br,{}),"\n",(0,o.jsx)(n.strong,{children:"color:"})," Array of color levels, 32 bit format"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"NeoShow(pin, count)"})," - All NeoPixel code is held internally until show is called",(0,o.jsx)(n.br,{}),"\n",(0,o.jsx)(n.strong,{children:"pin:"})," Pin connected to NeoPixel",(0,o.jsx)(n.br,{}),"\n",(0,o.jsx)(n.strong,{children:"count:"})," The count of LEDs to update and show"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"python",children:(0,o.jsx)(n.a,{href:"#tab/py",children:"Python"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-py",children:"duelink.Neo.Clear() # Clear\r\n            \r\nduelink.Neo.SetColor(0, 0xFFFFFF)# Set first led to white\r\nduelink.Neo.Show(6, 1) # show first led on pin 6\r\n\r\nduelink.Neo.SetRGB(1,0xFF,0x00,0x00) # Set second led to red\r\nduelink.Neo.Show(6, 2)# show first 2 leds on pin 6\r\n\r\n#set first three leds to red, green, blue. SetMultiple call show internally, no need to call show\r\nduelink.Neo.SetMultiple(6, [0xff0000, 0x00FF00, 0x0000FF])\n"})}),"\n",(0,o.jsx)(n.h2,{id:"javascript",children:(0,o.jsx)(n.a,{href:"#tab/js",children:"JavaScript"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:"await duelink.Neo.Clear() // Clear\r\n            \r\nawait duelink.Neo.SetColor(0, 0xFFFFFF)// Set first led to white\r\nawait duelink.Neo.Show(6, 1) // show first led on pin 6\r\n\r\nawait duelink.Neo.SetRGB(1,0xFF,0x00,0x00) // Set second led to red\r\nawait duelink.Neo.Show(6, 2)// show first 2 leds on pin 6\r\n\r\n//set first three leds to red, green, blue. SetMultiple call show internally, no need to call show\r\nawait duelink.Neo.SetMultiple(6, [ 0xff0000, 0x00FF00, 0x0000FF ])\n"})}),"\n",(0,o.jsx)(n.h2,{id:"net",children:(0,o.jsx)(n.a,{href:"#tab/net",children:".NET"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-cs",children:"duelink.Neo.Clear(); // Clear\r\n            \r\nduelink.Neo.SetColor(0, 0xFFFFFF);// Set first led to white\r\nduelink.Neo.Show(6, 1); // show first led on pin 6\r\n\r\nduelink.Neo.SetRGB(1,0xFF,0x00,0x00); // Set second led to red\r\nduelink.Neo.Show(6, 2);// show first 2 leds on pin 6\r\n\r\n//set first three leds to red, green, blue. SetMultiple call show internally, no need to call show\r\nduelink.Neo.SetMultiple(6, new uint[] { 0xff0000, 0x00FF00, 0x0000FF });\n"})}),"\n",(0,o.jsx)(n.hr,{})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(a,{...e})}):a(e)}},28453:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>s});var t=r(96540);const o={},l=t.createContext(o);function i(e){const n=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);