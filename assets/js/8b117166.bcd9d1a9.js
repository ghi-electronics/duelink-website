"use strict";(self.webpackChunkduelink=self.webpackChunkduelink||[]).push([[6035],{80440:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>o,contentTitle:()=>i,default:()=>x,frontMatter:()=>s,metadata:()=>a,toc:()=>l});const a=JSON.parse('{"id":"api/i2c","title":"I2C","description":"---","source":"@site/docs/api/i2c.mdx","sourceDirName":"api","slug":"/api/i2c","permalink":"/docs/api/i2c","draft":false,"unlisted":false,"editUrl":"https://github.com/ghi-electronics/duelink-website/tree/dev/docs/api/i2c.mdx","tags":[],"version":"current","frontMatter":{}}');var t=n(74848),d=n(28453);const s={},i="I2C",o={},l=[{value:"Python",id:"python",level:2},{value:"JavaScript",id:"javascript",level:2},{value:".NET",id:"net",level:2}];function c(e){const r={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,d.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.header,{children:(0,t.jsx)(r.h1,{id:"i2c",children:"I2C"})}),"\n",(0,t.jsx)(r.hr,{}),"\n",(0,t.jsx)(r.p,{children:"I2C is one of the protocols that is used widely in most sensors."}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"I2c.Write(address, arrayWrite, indexWrite, writeCount)"})," - Write an array of data to an I2C slave",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"address:"})," I2C slave address",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"arrayWrite:"})," Array to send",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"indexWrite:"})," Index of data in the array (optional, default is 0).",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"writeCount:"})," The number of bytes to write (optional, default is length of array)"]}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"I2c.Read(address, arrayRead, indexRead, readCount)"})," - Read data from an I2C slave",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"address:"})," I2C slave address",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"arrayRead:"})," Array to read",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"indexRead:"})," Index of data in the array (optional, default is 0)",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"readCount:"})," The number of bytes to read (optional, default is length of array)"]}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"I2c.WriteRead(address, arrayWrite, indexWrite, writeCount, arrayRead, indexRead, readCount)"})," - Write and read data",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"address:"})," I2C slave address",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"arrayWrite:"})," Array to send",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"indexWrite:"})," Index of data in the array",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"writeCount:"})," The number of bytes to write",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"arrayRead:"})," Array to read",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"indexRead:"})," Index of data in the array",(0,t.jsx)(r.br,{}),"\n",(0,t.jsx)(r.strong,{children:"readCount:"})," The number of bytes to read"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"python",children:(0,t.jsx)(r.a,{href:"#tab/py",children:"Python"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-py",children:"# Write 11 and 22 to a slave at address 0x2C\r\ndataWrite = [11,22]\r\nduelink.I2c.Write(0x2C, dataWrite)\r\n\r\n# Read 2 bytes from address 0x2C\r\ndataRead = [0]*2\r\nduelink.I2c.Read(0x2C, dataRead)\r\n\r\n# WriteRead from address 0x2C\r\nduelink.I2c.WriteRead(0x2C, dataWrite, 0, len(dataWrite), dataRead, 0, len(dataRead))\n"})}),"\n",(0,t.jsx)(r.h2,{id:"javascript",children:(0,t.jsx)(r.a,{href:"#tab/js",children:"JavaScript"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-js",children:"let dataWrite = [11,22]\r\nlet data = new Uint8Array(2)\r\n\r\n// Write 11 and 22 to a slave at address 0x2C\r\nawait duelink.I2c.Write(0x2C, dataWrite)\r\n\r\n// Read 2 bytes from address 0x2C\r\nawait duelink.I2c.Read(0x2C, dataRead)\r\n\r\n// WriteRead from address 0x2C\r\nawait duelink.I2c.WriteRead(0x2C, dataWrite, 0, dataWrite.length, dataRead, 0, dataRead.length)\n"})}),"\n",(0,t.jsx)(r.h2,{id:"net",children:(0,t.jsx)(r.a,{href:"#tab/net",children:".NET"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-cs",children:"var dataWrite = new byte[] {11, 22};\r\nvar dataRead = new byte[2];\r\n\r\n// Write 11 and 22 to a slave at address 0x2C\r\nduelink.I2c.Write(0x2C, dataWrite);\r\n\r\n// Read 2 bytes from address 0x2C\r\nduelink.I2c.Read(0x2C, dataRead);\r\n\r\n// WriteRead from address 0x2C\r\nduelink.I2c.WriteRead(0x2C, dataWrite, 0, dataWrite.Length, dataRead, 0, dataRead.Length);\n"})}),"\n",(0,t.jsx)(r.hr,{})]})}function x(e={}){const{wrapper:r}={...(0,d.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},28453:(e,r,n)=>{n.d(r,{R:()=>s,x:()=>i});var a=n(96540);const t={},d=a.createContext(t);function s(e){const r=a.useContext(d);return a.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),a.createElement(d.Provider,{value:r},e.children)}}}]);