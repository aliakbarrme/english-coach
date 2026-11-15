/* round 2: a different picture for every word that used to share one (5 fish, birds, big cats, greens, days …) */
Object.assign(BK_SVG,(()=>{
 const W=(body,defs="")=>`<svg viewBox="0 0 64 64" aria-hidden="true"><defs>${defs}</defs><ellipse cx="32" cy="58" rx="20" ry="3.5" fill="#000" opacity=".14"/>${body}</svg>`;
 const lg=(id,a,b,x2="0",y2="1")=>`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
 const rg=(id,a,b,cx=".35",cy=".3")=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r=".75"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
 const shine=(x,y,rx,ry,r=0)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".45" transform="rotate(${r} ${x} ${y})"/>`;
 /* fish: body colours, belly, extra markings, length */
 const fish=(id,a,b,belly,mark="",len=1)=>W(`<g transform="translate(32 34) scale(${len} 1) translate(-32 -34)"><path d="M8 34c6-12 20-16 34-12l10-8-2 20 2 20-10-8c-14 4-28 0-34-12Z" fill="url(#${id})"/>
  <path d="M14 38c10 6 22 7 30 3" stroke="${belly}" stroke-width="5" stroke-linecap="round" opacity=".75" fill="none"/>${mark}
  <path d="M26 22l8-8 4 8Z" fill="${b}"/><circle cx="16" cy="31" r="2.6" fill="#10202c"/><circle cx="15.3" cy="30.3" r=".8" fill="#fff"/></g>${shine(28,28,8,2,-6)}`,lg(id,a,b));
 /* bird: body, wing, breast, beak, extra, tail */
 const bird=(id,body,wing,breast,beak="#f4a300",extra="",tail="")=>W(`${tail}<ellipse cx="30" cy="36" rx="16" ry="13" fill="url(#${id})"/><path d="M22 34c6-4 16-4 22 4-6 6-16 6-22-4Z" fill="${wing}"/>
  <ellipse cx="22" cy="40" rx="9" ry="8" fill="${breast}"/><circle cx="18" cy="24" r="10" fill="url(#${id})"/><path d="M9 25l-6 2 6 2Z" fill="${beak}"/>
  <circle cx="16" cy="22" r="2.2" fill="#111"/><circle cx="15.4" cy="21.4" r=".7" fill="#fff"/><path d="M26 50l-2 6M32 50l1 6" stroke="#8d6e63" stroke-width="2" stroke-linecap="round"/>${extra}${shine(14,18,3,2)}`,rg(id,body,wing));
 /* big-cat face with its own coat */
 const cat=(id,fur,dark,spots)=>W(`<path d="M14 22 18 8l10 9M50 22 46 8l-10 9" fill="url(#${id})" stroke="${dark}" stroke-width="1.5"/><circle cx="32" cy="32" r="21" fill="url(#${id})"/>${spots}
  <ellipse cx="32" cy="42" rx="10" ry="7" fill="#fff5e6"/><path d="M29 38h6l-3 4Z" fill="#3a2418"/><path d="M32 42v3M28 46q4 3 8 0" stroke="#3a2418" stroke-width="1.4" fill="none"/>
  <circle cx="24" cy="29" r="3" fill="#2b2b2b"/><circle cx="40" cy="29" r="3" fill="#2b2b2b"/><circle cx="23.2" cy="28.2" r="1" fill="#fff"/><circle cx="39.2" cy="28.2" r="1" fill="#fff"/>`,rg(id,fur,dark));
 const spot=(pts,col,ring)=>pts.map(([x,y,r])=>ring?`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${col}" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="${r*.35}" fill="${col}"/>`:`<circle cx="${x}" cy="${y}" r="${r}" fill="${col}"/>`).join("");
 /* calendar page with the day's short name */
 const day=(txt,col)=>W(`<rect x="12" y="12" width="40" height="40" rx="8" fill="#fff" stroke="#dfe4ea" stroke-width="1.5"/><path d="M12 20a8 8 0 0 1 8-8h24a8 8 0 0 1 8 8v4H12Z" fill="${col}"/>
  <rect x="21" y="8" width="4" height="9" rx="2" fill="#546e7a"/><rect x="39" y="8" width="4" height="9" rx="2" fill="#546e7a"/><text x="32" y="44" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="14" fill="${col}">${txt}</text>`);
 const leaf=(id,a,b)=>W(`<path d="M32 56C14 46 10 26 20 12c8 4 12 10 12 10s4-6 12-10c10 14 6 34-12 44Z" fill="url(#${id})"/><path d="M32 56V22" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>
  <path d="M32 44l-8-6M32 36l-7-6M32 44l8-6M32 36l7-6" stroke="#fff" stroke-opacity=".45" stroke-width="1.4"/><path d="M14 30q-4 4 0 8M50 30q4 4 0 8M20 14q-3-3 1-5M44 14q3-3-1-5" stroke="${b}" stroke-width="3" fill="none" stroke-linecap="round"/>`,lg(id,a,b,"1","1"));
 return {
  Chili:W(`<path d="M20 14c-4 0-6 3-5 6l3 3" stroke="#3e7d1e" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M18 20c8-2 14 4 18 12s10 18 20 22c-14 2-26-6-32-16-3-6-6-14-6-18Z" fill="url(#chG)"/>${shine(26,26,2,7,-35)}`,lg("chG","#8bd34a","#2e7d32","1","1")),
  Cabbage:W(`<circle cx="32" cy="34" r="20" fill="url(#cbB)"/><path d="M32 14c-6 8-6 32 0 40M20 22c4 6 4 18 0 26M44 22c-4 6-4 18 0 26" stroke="#9ccc65" stroke-width="2" fill="none"/>
   <path d="M12 34c4-12 14-18 20-18" stroke="#c5e1a5" stroke-width="3" fill="none"/>${shine(24,26,5,4,-30)}`,rg("cbB","#d4f0a8","#6aa83a")),
  Spinach:W(`<path d="M30 56C18 50 8 36 14 18c10 2 16 14 16 38Z" fill="url(#spA)"/><path d="M34 56c12-6 22-20 16-38-10 2-16 14-16 38Z" fill="url(#spA)"/><path d="M30 56c-4-14-8-24-14-34M34 56c4-14 8-24 14-34" stroke="#a5d6a7" stroke-width="1.6" fill="none"/>`,lg("spA","#43a047","#1b5e20","1","1")),
  Kale:leaf("klA","#558b2f","#1e4d1a"),
  Cauliflower:W(`<path d="M10 40c2-10 10-12 22-12s20 2 22 12c-6 10-38 10-44 0Z" fill="#7cb342"/>${[[22,28,9],[32,24,10],[42,28,9],[26,36,8],[38,36,8],[32,32,8]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#cfW)"/>`).join("")}`,rg("cfW","#fffdf2","#e3dcc0")),
  Zucchini:W(`<path d="M10 42c4-8 30-26 44-22 4 2 2 8-2 10-14 10-30 18-38 18-4 0-6-3-4-6Z" fill="url(#zuB)"/><path d="M50 18c3-3 6-3 7-1" stroke="#7a5c2a" stroke-width="3" fill="none"/>${[18,26,34,42].map(x=>`<path d="M${x} 40q6-6 12-10" stroke="#9ccc65" stroke-width="1.4" fill="none" stroke-dasharray="2 3"/>`).join("")}`,lg("zuB","#4caf50","#1b5e20","1","1")),
  Knee:W(`<path d="M18 8h12l2 22c1 4 0 8-2 10l-6 16h-9l5-18c-3-4-4-8-4-12Z" fill="url(#knS)"/><circle cx="25" cy="34" r="7" fill="url(#knK)"/><path d="M14 56h12" stroke="#8d6e63" stroke-width="4" stroke-linecap="round"/>`,lg("knS","#ffcfa8","#e39a6c","1","0")+rg("knK","#ffe0c8","#f0a878")),
  "Water Lily":W(`<ellipse cx="32" cy="46" rx="24" ry="8" fill="#43a047"/><path d="M32 46 52 42" stroke="#2e7d32" stroke-width="2"/>${[-60,-30,0,30,60].map(a=>`<path d="M32 42c-4-6-4-16 0-22 4 6 4 16 0 22Z" fill="url(#wlP)" transform="rotate(${a} 32 42)"/>`).join("")}<circle cx="32" cy="38" r="3.5" fill="#ffca28"/>`,lg("wlP","#ffffff","#f8bbd0")),
  Jasmine:W(`${[[22,24],[42,22],[32,38]].map(([x,y])=>`<g>${[0,72,144,216,288].map(a=>`<ellipse cx="${x}" cy="${y-6}" rx="3.6" ry="7" fill="url(#jsP)" transform="rotate(${a} ${x} ${y})"/>`).join("")}<circle cx="${x}" cy="${y}" r="2.4" fill="#fff59d"/></g>`).join("")}<path d="M32 46v8M22 32l6 16M42 30l-6 18" stroke="#558b2f" stroke-width="2"/>`,lg("jsP","#ffffff","#e8eaf6")),
  Jaguar:cat("jgF","#f2b24c","#8a5410",spot([[18,26,3],[46,26,3],[32,18,3.4],[22,40,2.6],[42,40,2.6],[30,26,2]],"#4a2a0a",true)),
  Cheetah:cat("ctF","#f6c86a","#b07a2a",spot([[18,26,1.6],[46,26,1.6],[32,16,1.6],[24,18,1.4],[40,18,1.4],[20,36,1.4],[44,36,1.4]],"#2b1a0a")+`<path d="M24 32q-2 6-6 10M40 32q2 6 6 10" stroke="#2b1a0a" stroke-width="2" fill="none"/>`),
  Blackbird:bird("bbB","#3b3b3b","#151515","#262626","#ffa000",`<circle cx="16" cy="22" r="3.6" fill="none" stroke="#ffa000" stroke-width="1.4"/>`),
  Robin:bird("rbB","#8d6e63","#5d4037","#ff7043"),
  Magpie:bird("mpB","#2a2a2a","#1a237e","#ffffff","#333","",`<path d="M44 38l18-6-2 6-16 6Z" fill="#1a237e"/>`),
  Hummingbird:bird("hbB","#26c6a0","#00796b","#b2dfdb","#424242",`<path d="M9 25 0 26" stroke="#424242" stroke-width="1.6"/><path d="M24 34c4-14 12-22 24-24-4 10-12 18-24 24Z" fill="#4dd0e1" opacity=".7"/>`),
  Kingfisher:bird("kfB","#1e88e5","#0d47a1","#ff8f00","#222",`<path d="M9 25 1 27l8 1Z" fill="#222"/>`),
  Seabird:bird("sgB","#ffffff","#90a4ae","#ffffff","#fbc02d",`<path d="M22 34c8-10 22-14 34-10-10 4-20 10-34 10Z" fill="#b0bec5"/>`),
  Pigeon:bird("pgnB","#9fa8b8","#607085","#c5a3c9","#4e4e4e",`<path d="M10 30q8 4 14 0" stroke="#4db6ac" stroke-width="3" fill="none"/>`),
  Falcon:bird("fcB","#a1887f","#4e342e","#f5e6d3","#ffb300",`<path d="M14 28q-2 6 2 10" stroke="#3e2723" stroke-width="2.4" fill="none"/>`),
  Vulture:W(`<ellipse cx="34" cy="40" rx="18" ry="13" fill="url(#vuB)"/><path d="M20 32c4-2 8-2 10 0" stroke="#efebe9" stroke-width="5" stroke-linecap="round"/><path d="M22 30q-4-10 0-14" stroke="#f3b7a0" stroke-width="5" stroke-linecap="round" fill="none"/>
   <circle cx="20" cy="16" r="7" fill="#f3b7a0"/><path d="M13 17l-5 3 5 1Z" fill="#5d4037"/><circle cx="18" cy="14" r="1.8" fill="#111"/><path d="M28 52l-2 5M38 52l1 5" stroke="#8d6e63" stroke-width="2" stroke-linecap="round"/>`,rg("vuB","#6d4c41","#2e1f1a")),
  Grapefruit:W(`<circle cx="32" cy="34" r="21" fill="#ffb74d"/><circle cx="32" cy="34" r="18" fill="#fff3e0"/><circle cx="32" cy="34" r="16" fill="url(#gfI)"/>${[0,40,80,120,160,200,240,280,320].map(a=>`<path d="M32 34 32 19" stroke="#fff" stroke-width="1.6" transform="rotate(${a} 32 34)"/>`).join("")}<circle cx="32" cy="34" r="2" fill="#fff"/>`,rg("gfI","#ff8a80","#e53950",".5",".5")),
  Tuna:fish("tuF","#2c3e70","#0f1d3a","#cfd8dc",`<path d="M40 44l4 4 3-4M36 46l3 4 3-4" fill="#ffd54f"/>`,1.05),
  Salmon:fish("saF","#ff8a65","#c2185b","#ffe0d0",[[30,30],[36,28],[42,30],[34,24]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.2" fill="#6d1b3a"/>`).join("")),
  Sardine:fish("sdF","#90caf9","#37578a","#eceff1",`<path d="M14 34h34" stroke="#1e3a6a" stroke-width="2" stroke-dasharray="3 2"/>`,.85),
  Mackerel:fish("mkF","#43a39b","#0b4f4a","#e0f2f1",[24,30,36,42].map(x=>`<path d="M${x} 24q3 4 0 8" stroke="#06302d" stroke-width="2" fill="none"/>`).join("")),
  Trout:fish("trF","#a5b56b","#5b6b2a","#f3e5d0",`<path d="M14 34c10 2 22 2 32-2" stroke="#ec407a" stroke-width="3" opacity=".8" fill="none"/>`+[[24,28],[32,26],[40,28],[28,40],[38,40]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.3" fill="#2e3a12"/>`).join("")),
  Saturday:day("SAT","#ef5350"),Sunday:day("SUN","#ff9800"),Monday:day("MON","#42a5f5"),Tuesday:day("TUE","#66bb6a"),Wednesday:day("WED","#ab47bc"),Thursday:day("THU","#26a69a"),Friday:day("FRI","#ec407a")
 };})());
