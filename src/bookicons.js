/* ✨ Hand-drawn 3D-style icons for words that have no true emoji (an emoji would show the wrong thing,
   e.g. a chair for "Table"). Soft gradients + highlight + ground shadow, to sit next to the Fluent 3D emoji. */
const BK_SVG=(()=>{
 const W=(id,body,defs="")=>`<svg viewBox="0 0 64 64" aria-hidden="true"><defs>${defs}</defs><ellipse cx="32" cy="58" rx="20" ry="3.5" fill="#000" opacity=".14"/>${body}</svg>`;
 const lg=(id,a,b,x2="0",y2="1")=>`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
 const rg=(id,a,b,cx=".35",cy=".3")=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r=".75"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
 const shine=(x,y,rx,ry,r=0)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".45" transform="rotate(${r} ${x} ${y})"/>`;
 return {
  Table:W("tb",`<path d="M8 24 32 15 56 24 32 33Z" fill="url(#tbT)"/><path d="M8 24v3l24 9 24-9v-3L32 33Z" fill="#9a5a2a"/>
   <rect x="11" y="27" width="4" height="25" rx="1.5" fill="url(#tbL)"/><rect x="49" y="27" width="4" height="25" rx="1.5" fill="url(#tbL)"/><rect x="30" y="35" width="4" height="20" rx="1.5" fill="url(#tbL)"/>
   <path d="M14 24 32 18 50 24" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.6" stroke-linecap="round"/>`,lg("tbT","#e7a96a","#b86f35")+lg("tbL","#b8743d","#7a4220","1","0")),
  Stomach:W("st",`<path d="M20 8c-2 10-8 16-8 28 0 13 9 20 20 20s20-7 20-20c0-12-6-18-8-28Z" fill="url(#stB)"/>
   <path d="M24 30c4 3 12 3 16 0" fill="none" stroke="#c97e5a" stroke-width="2" stroke-linecap="round"/><circle cx="32" cy="40" r="2.6" fill="#b86a47"/>${shine(22,24,4,9,-12)}`,lg("stB","#ffcfa8","#e39a6c")),
  Neck:W("nk",`<circle cx="32" cy="17" r="11" fill="url(#nkH)"/><rect x="26" y="25" width="12" height="16" rx="5" fill="url(#nkN)"/><path d="M12 56c0-12 9-17 20-17s20 5 20 17Z" fill="url(#nkS)"/>
   <path d="M26 32h12" stroke="#ff7a1a" stroke-width="3" stroke-linecap="round"/>${shine(28,13,3,4)}`,rg("nkH","#ffd9b8","#e8a476")+lg("nkN","#ffd0aa","#e19a6a","1","0")+lg("nkS","#6ec6ff","#2f8fd8")),
  Beetroot:W("bt",`<path d="M30 14c-6-6-12-6-14-2 6 0 10 3 12 6Zm4 0c6-6 12-6 14-2-6 0-10 3-12 6Z" fill="#43a047"/><path d="M31 8h2v10h-2z" fill="#2e7d32"/>
   <path d="M32 18c11 0 18 8 18 18 0 9-8 15-18 22-10-7-18-13-18-22 0-10 7-18 18-18Z" fill="url(#btB)"/>${shine(25,28,4,7,-20)}`,rg("btB","#d14a7a","#7a1236")),
  Okra:W("ok",`<path d="M44 10c3 1 4 4 3 6L22 56c-2 3-7 1-6-3L39 13c1-3 3-4 5-3Z" fill="url(#okB)"/><path d="M41 12 20 52M46 15 24 54" stroke="#2e7d32" stroke-opacity=".55" stroke-width="1.2"/>
   <path d="M43 9c1-3 4-4 6-3-1 2-2 3-5 4Z" fill="#558b2f"/>${shine(36,20,2,8,28)}`,lg("okB","#9ccc65","#4c8a2b","1","1")),
  Turmeric:W("tu",`<path d="M10 40c2-9 12-12 20-10 4-6 12-8 18-4 7 4 7 13 1 17-6 5-14 3-19 2-7 3-22 4-20-5Z" fill="url(#tuB)"/>
   <path d="M18 38c3-1 6-1 9 0M36 30c3 0 5 1 7 3" stroke="#a65d00" stroke-width="1.4" stroke-linecap="round" fill="none"/><ellipse cx="46" cy="37" rx="5" ry="4" fill="#ffb300" stroke="#e08a00"/>${shine(22,33,5,2,-8)}`,lg("tuB","#d7a15a","#9c6223")),
  Cloves:W("cl",`${[[16,18,-20],[32,14,0],[48,18,20]].map(([x,y,r])=>`<g transform="rotate(${r} ${x} ${y+18})"><rect x="${x-2.5}" y="${y+6}" width="5" height="30" rx="2.5" fill="url(#clS)"/><circle cx="${x}" cy="${y+4}" r="6" fill="url(#clH)"/><path d="M${x-5} ${y+7}l5 3 5-3" stroke="#3e1f0f" stroke-width="1.2" fill="none"/></g>`).join("")}`,lg("clS","#8d4f2a","#4e2510","1","0")+rg("clH","#a9653a","#4e2510")),
  Cumin:W("cu",`${[[18,30,-35],[28,22,-10],[38,30,20],[26,40,40],[44,42,-25],[34,46,5],[16,46,15]].map(([x,y,r])=>`<g transform="rotate(${r} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="3.2" ry="9" fill="url(#cuS)"/><path d="M${x} ${y-8}v16" stroke="#6d4c2a" stroke-width=".9"/></g>`).join("")}`,lg("cuS","#d4b483","#8a6a3d","1","0")),
  "Black Pepper":W("bp",`${[[20,30],[32,26],[44,30],[26,40],[38,40],[32,50],[16,44],[48,44]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="url(#bpC)"/><path d="M${x-3} ${y-1}q3-3 6 0M${x-2} ${y+2}q2-1 4 0" stroke="#000" stroke-opacity=".5" stroke-width=".8" fill="none"/>${shine(x-2,y-2.5,1.6,1)}`).join("")}`,rg("bpC","#6d5a4a","#1d1712")),
  Litchi:W("li",`<path d="M32 10c1-4 4-5 7-4" stroke="#558b2f" stroke-width="2" fill="none"/><circle cx="32" cy="35" r="19" fill="url(#liB)"/>
   ${Array.from({length:16},(_,i)=>{const a=i*2.4,x=32+Math.cos(a)*(6+i%3*5),y=35+Math.sin(a)*(6+i%3*5);return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.6" fill="#8e1c2b" opacity=".55"/>`;}).join("")}${shine(25,26,5,4,-20)}`,rg("liB","#ff6b7d","#b3192e")),
  Jackfruit:W("jf",`<path d="M32 6c2 0 3 2 3 4" stroke="#6d4c2a" stroke-width="2.5" fill="none"/><ellipse cx="32" cy="34" rx="18" ry="23" fill="url(#jfB)"/>
   ${Array.from({length:22},(_,i)=>{const x=18+(i%5)*7+(Math.floor(i/5)%2)*3.5,y=16+Math.floor(i/5)*8;return `<path d="M${x} ${y}l2-3 2 3-2 2Z" fill="#7c9a1e" opacity=".7"/>`;}).join("")}${shine(24,24,4,9,-15)}`,rg("jfB","#d6e05a","#7d9a1a")),
  Papaya:W("pp",`<path d="M32 8c13 0 18 12 18 24 0 14-8 24-18 24S14 46 14 32C14 20 19 8 32 8Z" fill="url(#ppB)"/><path d="M32 16c7 0 10 8 10 16 0 9-4 15-10 15s-10-6-10-15c0-8 3-16 10-16Z" fill="url(#ppI)"/>
   ${[[30,26],[34,30],[29,34],[35,36],[31,40],[33,24],[28,30]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.9" fill="#2b1a12"/>`).join("")}`,lg("ppB","#8bc34a","#e8a32a","1","1")+rg("ppI","#ffb066","#ff7a2a",".5",".45")),
  Guava:W("gu",`<path d="M33 8c2-3 6-3 8-1" stroke="#558b2f" stroke-width="2" fill="none"/><path d="M32 10c12 2 20 12 20 25 0 12-9 21-20 21S12 47 12 35c0-13 8-23 20-25Z" fill="url(#guB)"/>${shine(24,24,5,8,-25)}`,rg("guB","#c5e17a","#5f9b2c")),
  Pomegranate:W("pg",`<path d="M26 10h12l-2 6h-8Z" fill="#a31f2c"/><path d="M26 10l2-4 2 4 2-4 2 4 2-4 2 4" fill="#c62828"/><circle cx="32" cy="36" r="20" fill="url(#pgB)"/>${shine(24,27,5,6,-25)}`,rg("pgB","#ff5a5f","#8e0f1f")),
  Raspberry:W("rb",`<path d="M24 12c4-4 12-4 16 0-5 2-11 2-16 0Z" fill="#43a047"/>${Array.from({length:19},(_,i)=>{const row=[3,4,5,4,3],r=row.findIndex((n,k)=>i<row.slice(0,k+1).reduce((a,b)=>a+b,0)),k=i-row.slice(0,r).reduce((a,b)=>a+b,0),x=32+(k-(row[r]-1)/2)*7,y=20+r*7;return `<circle cx="${x}" cy="${y}" r="4.4" fill="url(#rbD)"/><circle cx="${x-1.3}" cy="${y-1.4}" r="1.1" fill="#fff" opacity=".55"/>`;}).join("")}`,rg("rbD","#ff4f7b","#a3123c")),
  Yogurt:W("yo",`<path d="M14 24h36l-4 28c0 3-3 5-6 5H24c-3 0-6-2-6-5Z" fill="url(#yoC)"/><ellipse cx="32" cy="24" rx="18" ry="5" fill="#fff"/><ellipse cx="32" cy="24" rx="15" ry="3.5" fill="#f3efe6"/>
   <path d="M28 22c2-4 6-4 8-1" stroke="#fff" stroke-width="4" stroke-linecap="round"/><rect x="18" y="34" width="28" height="8" rx="2" fill="#6ec6ff" opacity=".8"/>${shine(20,40,1.5,8)}`,lg("yoC","#ffffff","#dfe8ee")),
  Swordfish:W("sf",`<path d="M4 32 26 30c4-6 14-8 22-4l8-8-2 11 6 3-6 3 2 11-8-8c-8 4-18 2-22-4Z" fill="url(#sfB)"/><path d="M30 24l6-10 4 11Z" fill="#2f6fb0"/>
   <circle cx="30" cy="31" r="2" fill="#0d2a44"/><circle cx="29.4" cy="30.4" r=".6" fill="#fff"/>${shine(38,30,8,2)}`,lg("sfB","#7fb6e8","#2c5f92"))
 };})();
