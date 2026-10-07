import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';
const tmp='.prerender';
await build({build:{ssr:'src/prerender.jsx',outDir:tmp,emptyOutDir:true,minify:false},logLevel:'warn'});
const {render}=await import(pathToFileURL(path.resolve(tmp,'prerender.js')).href);
const data=JSON.parse(fs.readFileSync('landing.data.json','utf8'));
const url='https://walkermetzker.com.br/';
const graph=[{'@type':'WebSite','@id':url+'#website',url,name:data.project.displayName,inLanguage:'pt-BR'},{'@type':'LegalService','@id':url+'#office',name:data.project.displayName,url,telephone:'+'+data.contact.whatsapp,email:data.contact.email,sameAs:[data.contact.instagram],image:url+'assets/marca.webp',logo:url+'assets/logo-pt.png'},{'@type':'Person',name:data.professional.name},{'@type':'FAQPage',mainEntity:data.faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}];
let html=fs.readFileSync('dist/index.html','utf8').replace('<div id="root"></div>','<div id="root">'+render()+'</div>');
html=html.replace('</head>','<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\u003c')+'</script></head>');
fs.writeFileSync('dist/index.html',html);
fs.rmSync(tmp,{recursive:true,force:true});


