/** Deterministic brand covers. Original marks are embedded; they are never redrawn. */
import sharp from 'sharp';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root='content/thumbnails-2026-10-25',out='public/thumbnails';
await mkdir(out+'/blog',{recursive:true});await mkdir(out+'/compare',{recursive:true});await mkdir(out+'/brands',{recursive:true});
const xml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const entries=JSON.parse(await readFile(root+'/editorial.json'));
let brands={};try{brands=JSON.parse(await readFile(root+'/brand-assets.json'));}catch(e){if(e.code!=='ENOENT')throw e;}
const fixed=[
 ['WhatFlow','public/logo.svg'],
 ['WhatsApp','public/meta-brand-assets/whatsapp-brand-assets/03_Stacked/01_Digital RGB/03_SVG/Digital_Stacked_Green_RGB_2026.svg'],
 ['Shopify','public/shopify-brand-assets/02-glyph/svg/glyph-color.svg'],
];
for(const [name,path]of fixed){const bytes=await sharp(path,{limitInputPixels:16000000}).trim().resize(256,256,{fit:'inside'}).png().toBuffer();const target=`${out}/brands/${name.toLowerCase()}.png`;await writeFile(target,bytes);brands[name]={path:target,source:path,verified:true};}
const cache=new Map();
async function logo(name){
 const key=name?.startsWith('WhatFlow')?'WhatFlow':name;
 const asset=brands[key];if(!asset?.verified)return null;
 if(!cache.has(key)){const b=await readFile(asset.path);cache.set(key,{uri:'data:image/png;base64,'+b.toString('base64'),key,source:asset.source});}
 return cache.get(key);
}
const paths={
 conversation:'M18 24h92v64H62l-22 18V88H18z M36 44h54 M36 62h38',
 inbox:'M20 38l16-18h56l16 18v66H20z M20 74h25l9 12h20l9-12h25 M44 42h40 M44 58h30',
 cart:'M14 22h16l12 57h57l12-41H34 M49 99h1 M91 99h1',
 pricing:'M24 20h80v88H24z M40 38h48 M40 56h22 M40 74h48 M40 92h22',
 review:'M64 15l14 30 33 4-25 23 7 33-29-16-29 16 7-33-25-23 33-4z',
 shipping:'M15 35h60v60H15z M75 55h22l16 18v22H75 M36 102h1 M94 102h1 M20 20h43',
 automation:'M18 18h30v30H18z M80 18h30v30H80z M49 82h30v30H49z M48 33h32 M95 48v17H64v17 M33 48v17h31',
 integration:'M18 18h32v32H18z M78 18h32v32H78z M48 80h32v32H48z M50 34h28 M34 50v14h30v16 M94 50v14H64',
 growth:'M20 106V76h22v30 M53 106V52h22v54 M86 106V28h22v78 M20 54l28-21 22 6 32-25 M84 14h18v18',
};
const colors={conversation:'#D9F8E6',inbox:'#E5E9FD',cart:'#FFF0C8',pricing:'#F8E3DA',review:'#FFF0C8',shipping:'#DAF0F2',automation:'#D9F8E6',integration:'#E5E9FD',growth:'#D9F8E6'};
const image=(asset,x,y,w,h)=>asset?`<image href="${asset.uri}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/>`:'';
const records=[];
for(const e of entries){
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug))throw Error('Unsafe slug');
 const wf=await logo('WhatFlow'),shopify=await logo('Shopify'),wa=await logo('WhatsApp');
 const second=e.secondaryBrandLabel?await logo(e.secondaryBrandLabel):null;
 let size=e.lines.length===4?49:56;
 for(;;){const widths=await Promise.all(e.lines.map(t=>sharp({text:{text:xml(t),font:`Arial Bold ${size}`,rgba:true}}).metadata().then(m=>m.width)));if(Math.max(...widths)<=690||size<=36)break;size--;}
 const lineHeight=Math.round(size*1.13),startY=e.lines.length===4?225:245;
 const headline=e.lines.map((line,i)=>`<text x="62" y="${startY+i*lineHeight}" font-size="${size}" font-weight="800" letter-spacing="-1.8">${xml(line)}</text>`).join('');
 const secondary=e.secondaryBrandLabel;
 let visual;
 if(secondary){
  const labels=secondary.length>20?secondary.split(/\s+/).reduce((lines,w)=>{if((lines.at(-1)+' '+w).trim().length>23)lines.push(w);else lines[lines.length-1]=(lines.at(-1)+' '+w).trim();return lines;},['']):[secondary];
  visual=`<path d="M872 278C1028 278 900 392 1054 392" fill="none" stroke="#00A34C" stroke-width="5" stroke-dasharray="10 8"/>
  <rect x="802" y="177" width="208" height="172" rx="24" fill="#091E17"/>
  <rect x="794" y="169" width="208" height="172" rx="24" fill="white" stroke="#091E17" stroke-width="2.5"/>
  ${image(wf,859,184,78,83)}
  <text x="898" y="296" text-anchor="middle" font-size="16" font-weight="700">${e.primaryBrandLabel==='WhatFlow Business API'?'Business API':'WhatFlow'}</text>
  <rect x="934" y="327" width="208" height="174" rx="24" fill="#091E17"/>
  <rect x="926" y="319" width="208" height="174" rx="24" fill="white" stroke="#091E17" stroke-width="2.5"/>
  ${image(second,979,335,102,82)}
  ${!second?`<g transform="translate(998 340) scale(.52)" fill="none" stroke="#0A6B56" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[e.motif]}"/></g>`:''}
  ${labels.map((l,i)=>`<text x="1030" y="${448+i*20}" text-anchor="middle" font-size="15" font-weight="700">${xml(l)}</text>`).join('')}
  <rect x="957" y="287" width="54" height="38" rx="19" fill="#091E17"/><text x="984" y="312" text-anchor="middle" fill="white" font-size="14" font-weight="700">${secondary.startsWith('Shopify')?'＋':'VS'}</text>`;
 }else{
  visual=`<rect x="833" y="210" width="270" height="260" rx="30" fill="#091E17"/><rect x="824" y="201" width="270" height="260" rx="30" fill="white" stroke="#091E17" stroke-width="2.5"/>
  <circle cx="959" cy="321" r="88" fill="${colors[e.motif]}"/>
  <g transform="translate(896 255)" fill="none" stroke="#091E17" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[e.motif]}"/></g>
  <rect x="1020" y="399" width="94" height="94" rx="23" fill="white" stroke="#091E17" stroke-width="2.5"/>${image(shopify,1043,414,48,62)}
  <rect x="796" y="168" width="92" height="92" rx="23" fill="white" stroke="#091E17" stroke-width="2.5"/>${image(wa,809,178,67,70)}`;
 }
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#0A6B56" opacity=".17"/></pattern><clipPath id="right"><rect x="770" y="100" width="420" height="425"/></clipPath></defs>
 <rect width="1200" height="630" rx="26" fill="#091E17"/><rect x="8" y="8" width="1184" height="614" rx="21" fill="#FAF7F0"/>
 <g clip-path="url(#right)"><circle cx="1130" cy="240" r="310" fill="${colors[e.motif]}"/><rect x="780" y="106" width="410" height="420" fill="url(#grid)"/></g>
 <g font-family="Arial, sans-serif" fill="#091E17">${image(wf,56,35,54,62)}<text x="122" y="78" font-size="30" font-weight="800" letter-spacing="-1">WHATFLOW</text>
 <rect x="918" y="43" width="220" height="39" rx="19.5" fill="#091E17"/><text x="1028" y="69" text-anchor="middle" fill="white" font-size="13" font-weight="700" letter-spacing="1.4">${e.collection==='blog'?'THE SHOPIFY PLAYBOOK':'THE COMPARISON SERIES'}</text>
 <path d="M62 120H1138" stroke="#091E17" stroke-width="1.5"/>
 <rect x="62" y="157" width="7" height="19" rx="3.5" fill="#00D261"/><text x="84" y="172" font-size="14" font-weight="700" letter-spacing="1.6">${xml(e.eyebrow.toUpperCase())}</text>
 ${headline}${visual}
 <path d="M62 535H1138" stroke="#091E17" stroke-width="1.5"/>
 <circle cx="70" cy="577" r="7" fill="#00D261"/><text x="91" y="582" font-size="14" font-weight="700" letter-spacing="1.4">SHOPIFY. WHATSAPP. WHATFLOW.</text>
 <text x="1138" y="582" text-anchor="end" font-size="13" letter-spacing="1.4">${e.collection==='blog'?'PRACTICAL GUIDES':'PRICING · WORKFLOWS · FIT'}</text></g></svg>`;
 const folder=e.collection==='blog'?'blog':'compare',file=`${out}/${folder}/${e.slug}.webp`;
 const bytes=await sharp(Buffer.from(svg)).webp({quality:90,effort:5}).toBuffer();await writeFile(file,bytes);
 records.push({...e,path:file,url:`/thumbnails/${folder}/${e.slug}.webp`,width:1200,height:630,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),fontSize:size,originalLogos:[wf,second,...(!secondary?[wa,shopify]:[])].filter(Boolean).map(a=>({brand:a.key,source:a.source})),secondaryLogo:secondary?(second?'verified original asset':'named platform; thematic illustration, no invented mark'):null,alt:`${e.title} — WhatFlow ${e.collection==='blog'?'guide':'comparison'} cover`,caption:'Illustrated cover by WhatFlow. App screenshots and examples appear in the guide.'});
}
await writeFile(root+'/manifest.json',JSON.stringify({createdAt:new Date().toISOString(),system:'WhatFlow editorial covers v1',format:'WebP 1200×630',renderer:'Code-native SVG rendered by Sharp; original logos embedded without redrawing',count:records.length,records},null,2));
console.log(JSON.stringify({thumbnails:records.length,totalBytes:records.reduce((n,r)=>n+r.bytes,0),verifiedSecondaryLogos:records.filter(r=>r.secondaryLogo==='verified original asset').length}));
