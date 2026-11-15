/* ================= 🔤 Letter Friends: one hub, five sections (original feature) =================
   Hub: A → Z map + "Up next" talking letter + sections: Meet & trace · Write it · Word Town · Play room · Stickers.
   The letters talk: the mouth moves while the voice plays and the eyes blink. Letter sounds come from the licensed
   Phonicademy pack (LSOUND "pa:"). Music, art and games here are our own (Web Audio, SVG, Fluent 3D emoji).
   Letters are drawn from the stroke paths below (viewBox 0 0 100 120), so the same data makes the friend and the tracing guide. */
const LP_STROKES={
 a:["M50 12 L18 108","M50 12 L82 108","M30 72 L70 72"],b:["M24 12 L24 108","M24 12 C70 12 70 58 24 58","M24 58 C80 58 80 108 24 108"],
 c:["M80 30 C60 2 16 14 16 60 C16 106 60 118 80 90"],d:["M24 12 L24 108","M24 12 C96 12 96 108 24 108"],
 e:["M24 12 L24 108","M24 12 L76 12","M24 60 L68 60","M24 108 L76 108"],f:["M24 12 L24 108","M24 12 L76 12","M24 60 L66 60"],
 g:["M80 30 C60 2 16 14 16 60 C16 106 62 118 82 92 L82 64 L56 64"],h:["M22 12 L22 108","M78 12 L78 108","M22 60 L78 60"],
 i:["M50 12 L50 108","M30 12 L70 12","M30 108 L70 108"],j:["M64 12 L64 82 C64 114 26 114 22 86","M44 12 L84 12"],
 k:["M24 12 L24 108","M78 12 L24 64","M40 50 L80 108"],l:["M26 12 L26 108 L78 108"],m:["M16 108 L16 12 L50 76 L84 12 L84 108"],
 n:["M20 108 L20 12 L80 108 L80 12"],o:["M50 12 C8 12 8 108 50 108 C92 108 92 12 50 12"],p:["M24 12 L24 108","M24 12 C80 12 80 62 24 62"],
 q:["M50 12 C8 12 8 108 50 108 C92 108 92 12 50 12","M60 84 L86 110"],r:["M24 12 L24 108","M24 12 C80 12 80 62 24 62","M44 62 L80 108"],
 s:["M78 28 C62 4 20 10 22 38 C24 62 78 58 78 84 C78 114 30 114 20 90"],t:["M50 12 L50 108","M16 12 L84 12"],
 u:["M20 12 L20 76 C20 118 80 118 80 76 L80 12"],v:["M16 12 L50 108 L84 12"],w:["M10 12 L30 108 L50 40 L70 108 L90 12"],
 x:["M20 12 L80 108","M80 12 L20 108"],y:["M18 12 L50 60","M82 12 L50 60 L50 108"],z:["M18 12 L82 12 L18 108 L82 108"]};
const LP_FACE={a:[50,74],b:[36,60],e:[30,60],f:[30,48],h:[50,60],i:[50,60],j:[62,56],k:[30,60],l:[30,66],p:[36,38],r:[36,38],t:[50,58],y:[50,80],m:[50,96],n:[50,60],w:[50,90],x:[50,60],z:[50,60],v:[50,84]};
const LP_COL=["#4f86f7","#ff6b8b","#ffa62b","#2fbf8f","#9b6bff","#ff7a3d"];
const LP_STROKE_COL=["#ff5c6c","#ffa62b","#4f86f7","#2fbf8f"];
const LP_LETTERS="abcdefghijklmnopqrstuvwxyz".split("");
const lpCol=c=>LP_COL[LP_LETTERS.indexOf(c)%LP_COL.length];
const lpWord=c=>ABC.find(a=>a[0]===c);
function LPST(){const p=S.pals||(S.pals={});p.l=p.l||{};p.w=p.w||{};p.t=p.t||{};p.g=p.g||{};return p;}
const lpNext=()=>LP_LETTERS.find(c=>!LPST().l[c])||"a";
const lpShuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
/* ---------- what the letters say (all pre-made voice clips) ---------- */
const LP_HI=c=>`Hi! I am ${LETTER[c]}.`;
const LP_IS=c=>`${LETTER[c]} is for ${lpWord(c)[1]}.`;
const LP_PRAISE=["Good job!","Great!","Super!","Well done!"];
const LP_DIR_OVR={j0:"Go down and curve.",u0:"Go down, around and up.",l0:"Go down, then across.",s0:"Curve like a snake.",g0:"Go around, then in."};
function lpDir(c,i){const o=LP_DIR_OVR[c+i];if(o)return o;const p=LP_STROKES[c][i];if(/C/.test(p))return "Go around.";
 const n=p.match(/[\d.]+/g).map(Number);if(n.length>4)return "Follow the dots.";const dx=n[2]-n[0],dy=n[3]-n[1];
 if(Math.abs(dx)<8)return dy>0?"Go straight down.":"Go straight up.";if(Math.abs(dy)<8)return "Go across.";
 return dy>0?(dx<0?"Slant down to the left.":"Slant down to the right."):(dx>0?"Slant up to the right.":"Slant up to the left.");}
/* ---------- Word Town: 8 places to look, listen and find ---------- */
const LP_TOWN=[
 {id:"home",n:"Home",bn:"বাড়ি",ic:"🏠",bg:["#fff1e3","#ffd9b8"],it:[["bed","🛏️"],["chair","🪑"],["door","🚪"],["window","🪟"],["clock","⏰"],["sofa","🛋️"],["bath","🛁"],["key","🔑"],["box","📦"],["phone","📱"],["TV","📺"],["teddy bear","🧸"]]},
 {id:"kitchen",n:"Kitchen",bn:"রান্নাঘর",ic:"🍳",bg:["#fff8de","#ffe7a3"],it:[["apple","🍎"],["banana","🍌"],["bread","🍞"],["milk","🥛"],["egg","🥚"],["cake","🍰"],["spoon","🥄"],["cup","☕"],["carrot","🥕"],["cheese","🧀"],["rice","🍚"],["grapes","🍇"]]},
 {id:"me",n:"Me",bn:"আমি",ic:"🙂",bg:["#ffe9f0","#ffc9da"],it:[["eye","👁️"],["ear","👂"],["nose","👃"],["mouth","👄"],["hand","✋"],["foot","🦶"],["tooth","🦷"],["shirt","👕"],["cap","🧢"],["shoe","👟"],["socks","🧦"],["dress","👗"]]},
 {id:"people",n:"People",bn:"মানুষ",ic:"👪",bg:["#eee9ff","#d6ccff"],it:[["baby","👶"],["boy","👦"],["girl","👧"],["man","👨"],["woman","👩"],["grandpa","👴"],["grandma","👵"],["doctor","🧑‍⚕️"],["teacher","🧑‍🏫"],["cook","🧑‍🍳"],["farmer","🧑‍🌾"],["police officer","👮"]]},
 {id:"animals",n:"Animals",bn:"প্রাণী",ic:"🐾",bg:["#e9f8e2","#c4ebb5"],it:[["cat","🐱"],["dog","🐶"],["cow","🐮"],["duck","🦆"],["hen","🐔"],["horse","🐴"],["fish","🐟"],["bird","🐦"],["lion","🦁"],["elephant","🐘"],["monkey","🐵"],["frog","🐸"]]},
 {id:"park",n:"Park",bn:"পার্ক",ic:"🌳",bg:["#e3f5ff","#c8efc6"],it:[["tree","🌳"],["flower","🌸"],["sun","☀️"],["cloud","☁️"],["ball","⚽"],["kite","🪁"],["bike","🚲"],["butterfly","🦋"],["bee","🐝"],["leaf","🍃"],["rainbow","🌈"],["snail","🐌"]]},
 {id:"town",n:"Town",bn:"শহর",ic:"🏙️",bg:["#e6efff","#c9dbff"],it:[["car","🚗"],["bus","🚌"],["train","🚆"],["truck","🚚"],["plane","✈️"],["boat","⛵"],["taxi","🚕"],["school","🏫"],["hospital","🏥"],["shop","🏪"],["traffic light","🚦"],["bridge","🌉"]]},
 {id:"colors",n:"Colors & shapes",bn:"রং ও আকার",ic:"🎨",bg:["#fff0f7","#e3eeff"],it:[["red","#e8433a"],["blue","#2f7bea"],["green","#2fb457"],["yellow","#ffcc1f"],["orange","#ff8a1f"],["purple","#8a4fd8"],["pink","#ff7eb6"],["circle","circle"],["square","square"],["triangle","triangle"],["star","star"],["heart","heart"]]}];
const lpPlace=id=>LP_TOWN.find(t=>t.id===id);
const lpFindText=(t,x)=>t.id==="colors"&&x[1][0]==="#"?`Find ${x[0]}!`:`Find the ${x[0]}!`;
const LP_SHAPES={circle:'<circle cx="32" cy="33" r="22"/>',square:'<rect x="11" y="12" width="42" height="42" rx="6"/>',triangle:'<path d="M32 8 L57 53 H7 Z" stroke-linejoin="round"/>',
 star:'<path d="M32 6l7.6 15.4 17 2.5-12.3 12 2.9 16.9L32 44.8 16.8 52.8l2.9-16.9-12.3-12 17-2.5z" stroke-linejoin="round"/>',heart:'<path d="M32 55C14 42 7 32 7 22 7 14 13 8 20.5 8c5 0 9 3 11.5 7 2.5-4 6.5-7 11.5-7C51 8 57 14 57 22c0 10-7 20-25 33z"/>'};
function lpPic(p){if(!p)return "";if(p[0]==="#")return `<svg class="lp-shape" viewBox="0 0 64 64" aria-hidden="true"><g transform="rotate(-38 32 32)"><path d="M6 25h38l13 7-13 7H6a3 3 0 0 1-3-3V28a3 3 0 0 1 3-3z" fill="${p}"/><path d="M44 25l13 7-13 7z" fill="#000" opacity=".2"/><rect x="12" y="25" width="22" height="14" fill="#fff" opacity=".32"/><path d="M12 25v14M34 25v14" stroke="#0003" stroke-width="1.5"/><path d="M7 28.5h37" stroke="#fff" stroke-opacity=".55" stroke-width="2.5" stroke-linecap="round"/></g></svg>`;
 if(LP_SHAPES[p])return `<svg class="lp-shape" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="lpsg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cdd6e4"/></linearGradient></defs><g fill="url(#lpsg)" stroke="#55657d" stroke-width="3.2">${LP_SHAPES[p]}</g></svg>`;
 return p;}
/* ---------- Play room ---------- */
const LP_BUILD=[["cat","🐱"],["dog","🐶"],["sun","☀️"],["bus","🚌"],["hen","🐔"],["pig","🐷"],["cup","☕"],["bed","🛏️"],["fox","🦊"],["box","📦"],["hat","🎩"],["van","🚐"],["egg","🥚"],["ant","🐜"],["bat","🦇"],["pen","🖊️"],["bag","👜"],["map","🗺️"],["frog","🐸"],["drum","🥁"],["crab","🦀"],["nest","🪺"],["web","🕸️"]];
function PALS_TEXTS(){const out=["Start at the dot.","Yay! You did it!","Now write it by yourself!","Pop the letter",...LP_PRAISE];
 LP_LETTERS.forEach(c=>{out.push(LP_HI(c),LP_IS(c),LETTER[c],lpWord(c)[1]);LP_STROKES[c].forEach((_,i)=>out.push(lpDir(c,i)));});
 LP_TOWN.forEach(t=>t.it.forEach(x=>out.push(x[0],lpFindText(t,x))));LP_BUILD.forEach(w=>out.push(w[0]));
 return [...new Set(out)];}
/* ---------- the letter as a friendly character: blinking eyes, a mouth that moves while it talks ---------- */
function lpChar(c,mood,talk){const col=lpCol(c),[fx,fy]=LP_FACE[c]||[50,62],d=LP_STROKES[c],b=mood==="open"?2:mood==="yum"?3:0,bd=(LP_LETTERS.indexOf(c)*.73%3.6).toFixed(2);
 return `<svg class="lp-char ${talk?"lp-talk":""}" data-m="${b}" data-b="${b}" style="--bd:-${bd}s" viewBox="0 0 100 124" aria-hidden="true"><ellipse cx="50" cy="118" rx="30" ry="4" fill="#000" opacity=".12"/>
  ${d.map(p=>`<path d="${p}" fill="none" stroke="${col}" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>`).join("")}
  ${d.map(p=>`<path d="${p}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="2.4" stroke-linecap="round" stroke-dasharray=".1 6"/>`).join("")}
  <g class="lp-face"><ellipse cx="${fx}" cy="${fy}" rx="14.5" ry="11.5" fill="#fff"/>
   <g class="lp-eyes"><ellipse cx="${fx-5}" cy="${fy-2.2}" rx="2.2" ry="2.8" fill="#2a2140"/><ellipse cx="${fx+5}" cy="${fy-2.2}" rx="2.2" ry="2.8" fill="#2a2140"/><circle cx="${fx-4.3}" cy="${fy-3.2}" r=".8" fill="#fff"/><circle cx="${fx+5.7}" cy="${fy-3.2}" r=".8" fill="#fff"/></g>
   <circle cx="${fx-9.5}" cy="${fy+3}" r="2.5" fill="#ff9fb5" opacity=".8"/><circle cx="${fx+9.5}" cy="${fy+3}" r="2.5" fill="#ff9fb5" opacity=".8"/>
   <path class="lp-m m0" d="M${fx-4.5} ${fy+3.5}q4.5 4.6 9 0" stroke="#3a2a4a" stroke-width="1.9" fill="none" stroke-linecap="round"/>
   <ellipse class="lp-m m1" cx="${fx}" cy="${fy+5}" rx="2.3" ry="2.7" fill="#7a2e3a"/>
   <g class="lp-m m2"><ellipse cx="${fx}" cy="${fy+5.2}" rx="4" ry="4.6" fill="#7a2e3a"/><ellipse cx="${fx}" cy="${fy+7.7}" rx="2.6" ry="1.5" fill="#ff8a9a"/></g>
   <path class="lp-m m3" d="M${fx-5.5} ${fy+3}q5.5 7.5 11 0z" fill="#7a2e3a"/></g></svg>`;}
/* lip-sync: while any voice clip plays, the talking letter's mouth keeps changing shape */
const LP_LIP={t:0,start(){if(this.t)return;this.t=setInterval(()=>{if(!APP.pals){clearInterval(this.t);this.t=0;return;}
 const on=document.documentElement.classList.contains("is-speaking");
 document.querySelectorAll(".lp-char.lp-talk").forEach(s=>{const m=on?(Math.random()<.16?"0":String(1+Math.floor(Math.random()*3))):(s.dataset.b||"0");if(s.getAttribute("data-m")!==m)s.setAttribute("data-m",m);});},115);}};
/* our own gentle music-box tune while tracing and writing (C major pentatonic, no audio files) */
const LP_MEL=[[659,784,880,784,659,0,587,0],[523,587,659,784,659,0,0,0],[440,523,587,659,784,659,587,0],[523,0,659,0,523,0,0,0]],LP_BASS=[130.8,110,87.3,98];
const LP_MUSIC={on:false,timer:null,
 start(){this.stop();if(!SND.on()||LPST().mu===false)return;const c=BK_MUSIC.ctx();if(!c)return;this.on=true;const e=60/104/2;let i=0,t0=c.currentTime+.15;
  const sched=()=>{if(!this.on)return;while(t0<c.currentTime+1){const bar=Math.floor(i/8)%4,s=i%8,n=LP_MEL[bar][s];
    if(n){BK_MUSIC.note(n,t0,e*1.9,{type:"triangle",gain:.04});BK_MUSIC.note(n*2,t0,e*1.1,{type:"sine",gain:.01});}
    if(s===0||s===4)BK_MUSIC.note(LP_BASS[bar],t0,e*3.6,{type:"sine",gain:.06});i++;t0+=e;}
   if(BK_MUSIC.nodes.length>300)BK_MUSIC.nodes.splice(0,200);this.timer=setTimeout(sched,250);};sched();},
 stop(){this.on=false;clearTimeout(this.timer);BK_MUSIC.stop();}};
function lpTop(back,title,right){return `<div class="lp-top"><button class="icon-btn" data-act="${back}" aria-label="Back">${back==="palsClose"?IC.close:IC.back}</button><b class="lp-title">${title}</b><span class="lp-right">${right||""}</span></div>`;}
const lpDots=(n,i)=>`<span class="lp-step">${Array.from({length:n},(_,k)=>`<i class="${k<i?"on":k===i?"cur":""}"></i>`).join("")}</span>`;
const lpMuBtn=()=>`<button class="lp-round mu ${LPST().mu===false?"off":""}" data-act="palsMusic" aria-label="Music">🎵</button>`;
function lpStickerCount(){const P=LPST();return LP_LETTERS.filter(c=>P.l[c]).length+LP_LETTERS.filter(c=>P.w[c]).length+LP_TOWN.filter(t=>P.t[t.id]).length+(P.g.build?1:0)+(P.g.pop?1:0);}
function viewPals(){
 const A=APP.pals,P=LPST();LP_LIP.start();
 if(A.scr==="home"){const next=lpNext(),c=A.c||next,a=lpWord(c),U=c.toUpperCase(),traced=!!P.l[c],met=LP_LETTERS.filter(x=>P.l[x]).length,nSt=lpStickerCount(),places=LP_TOWN.filter(t=>P.t[t.id]).length;
  const subs=[["palsMeet","✏️","Meet & trace","দেখা করো, আঙুলে লেখো",P.l[c]?"⭐".repeat(P.l[c]):"",false],
   ["palsWrite","✍️","Write it",traced?"দাগ ছাড়া নিজে লেখো":"আগে Trace করো, তারপর খুলবে",P.w[c]?"⭐".repeat(P.w[c]):"",!traced],
   ["palsTown","🏘️","Word Town","৮টা জায়গায় ছবি দেখো, শব্দ খোঁজো",`${places}/8`,false],
   ["palsPlay","🧸","Play room","শব্দ বানাও, অক্ষরের বাবল ফাটাও","",false],
   ["palsStickers","🌟","Stickers","তোমার স্টিকার বই",String(nSt),false]];
  return `<main class="view palsview lp-hub">${lpTop("palsClose","🔤 Letter Friends",`<span class="lp-stars">🌟 <b>${nSt}</b></span>`)}
   <div class="lp-hubgrid"><section class="lp-panel" id="lp-panel" style="--c:${lpCol(c)}">
    <div class="lp-up"><span class="lp-uplab">${c===next?"UP NEXT":"YOUR LETTER"}</span>
     <div class="lp-uprow"><button class="lp-upchar" data-act="palsHello" aria-label="Say hello">${lpChar(c,"",true)}</button>
      <button class="lp-upcard" data-act="palsWord"><span class="lp-uppic">${a[2]}</span><b><i>${esc(a[1][0])}</i>${esc(a[1].slice(1))}</b></button></div>
     <button class="lp-uphi" data-act="palsHello"><i>${IC.speak}</i>Hi! I am ${U}.</button></div>
    <div class="lp-subs">${subs.map(([act,ic,t,s,badge,lock],i)=>`<button class="lp-sub ${lock?"lock":""}" style="--d:${i*.05}s" data-act="${act}"><span class="lp-subic">${ic}</span><span class="grow"><b>${t}</b><span class="tiny bn">${s}</span></span>${lock?`<span class="lp-lock">🔒</span>`:badge?`<span class="lp-badge">${badge}</span>`:`<span class="lp-chev">➜</span>`}</button>`).join("")}</div>
   </section>
   <section class="lp-mapwrap"><h3 class="lp-h3">A → Z <span class="tiny muted bn">${met}/26 বন্ধু · অক্ষরে চাপো</span></h3>
    <div class="lp-map">${LP_LETTERS.map((x,i)=>{const s=P.l[x],w=lpWord(x);return `<button class="lp-tile ${s?"done":x===next?"now":""} ${x===c?"sel":""}" style="--c:${lpCol(x)};--d:${i*.02}s" data-act="palsPick" data-c="${x}">
     <b>${x.toUpperCase()}</b>${s?`<span class="lp-tpic">${w[2]}</span><span class="lp-tst">${"⭐".repeat(s)}${P.w[x]?"✍️":""}</span>`:x===next?`<span class="lp-now">✏️ NOW</span>`:""}</button>`;}).join("")}</div></section></div></main>`;}
 const c=A.c||"a",U=c.toUpperCase(),a=lpWord(c),strokes=LP_STROKES[c];
 if(A.scr==="meet")return `<main class="view palsview lp-run">${lpTop("palsHome","Meet "+U)}
   <div class="lp-meet"><div class="lp-meetcol"><span class="lp-bubble">Hi! I am <b style="color:${lpCol(c)}">${U}</b>.</span><button class="lp-meetchar" data-act="palsHello" aria-label="Say hello">${lpChar(c,"",true)}</button></div>
    <button class="lp-card" data-act="palsWord"><span class="lp-cpic">${a[2]}</span><span class="lp-cw"><i>${esc(a[1][0])}</i>${esc(a[1].slice(1))}</span></button></div>
   <p class="lp-hint bn">অক্ষর বা ছবিতে চাপলে শোনা যায় 🔊</p>
   <button class="btn good wide lp-go" data-act="palsTrace">✏️ Let's trace!</button></main>`;
 if(A.scr==="trace"){const si=A.si||0,cur=strokes[si],m=cur.match(/M\s*([\d.]+)\s+([\d.]+)/),col=LP_STROKE_COL[si%LP_STROKE_COL.length];
  return `<main class="view palsview lp-run">${lpTop("palsMeet","Trace "+U,lpDots(strokes.length,si))}
   <div class="lp-guiderow"><span class="lp-minichar">${lpChar(c,"",true)}</span><span class="lp-bubble left">${si===0?"Start at the dot. ":""}<b>${lpDir(c,si)}</b><small class="bn">গোল বিন্দু থেকে দাগ ধরে আঙুল টানো 👆</small></span></div>
   <div class="lp-pad"><svg viewBox="-6 -4 112 128">
     ${strokes.map(p=>`<path d="${p}" class="lp-ghost"/>`).join("")}
     ${strokes.slice(0,si).map((p,k)=>`<path d="${p}" class="lp-done" stroke="${LP_STROKE_COL[k%LP_STROKE_COL.length]}"/>`).join("")}
     <path d="${cur}" class="lp-guide"/><path id="lp-cur" d="${cur}" class="lp-prog" stroke="${col}" stroke-dasharray="0 9999"/>
     <circle class="lp-dot" cx="${m[1]}" cy="${m[2]}" r="7" fill="${col}"/><text class="lp-num" x="${m[1]}" y="${+m[2]+3.6}" text-anchor="middle">${si+1}</text>
     <circle id="lp-finger" class="lp-finger" cx="${m[1]}" cy="${m[2]}" r="9" stroke="${col}"/></svg></div>
   <div class="row center lp-ctl"><button class="btn ghost" data-act="palsRedo">↺ আবার</button><button class="lp-round" data-act="palsDirSay" aria-label="Listen">${IC.speak}</button>${lpMuBtn()}</div></main>`;}
 if(A.scr==="won")return `<main class="view palsview lp-run">${lpTop("palsHome","Trace "+U)}
   <div class="lp-won"><button class="lp-is" data-act="palsIsFor"><b style="color:${lpCol(c)}">${U}</b> is for ${esc(a[1][0].toUpperCase()+a[1].slice(1))} <i>${IC.speak}</i></button>
    <div class="lp-wonrow"><div class="lp-wonchar">${lpChar(c,"yum",true)}</div><span class="lp-wonpic">${a[2]}</span></div><p class="lp-bigstars">⭐⭐⭐</p></div>
   <button class="btn good wide" data-act="palsWrite">✍️ Now write it!</button>
   <div class="row center lp-ctl"><button class="btn bk-candy" data-act="palsFeed">🍎 Feed me!</button><button class="btn ghost" data-act="palsNext">পরের অক্ষর ➜</button></div></main>`;
 if(A.scr==="write"){const ink=A.ink||[];
  return `<main class="view palsview lp-run">${lpTop("palsHome","Write "+U,P.w[c]?`<span class="lp-stars">${"⭐".repeat(P.w[c])}</span>`:"")}
   <div class="lp-guiderow"><span class="lp-minichar">${lpChar(c,"",true)}</span><span class="lp-bubble left"><b>Now write it by yourself!</b><small class="bn">দাগ ছাড়া নিজে নিজে ${U} লেখো ✍️</small></span></div>
   <div class="lp-pad wr"><svg viewBox="-6 -4 112 128">
     ${strokes.map(p=>`<path d="${p}" class="lp-ghost faint"/>`).join("")}
     ${A.demo?strokes.map((p,k)=>`<path d="${p}" pathLength="100" class="lp-demo" style="--i:${k}" stroke="${LP_STROKE_COL[k%LP_STROKE_COL.length]}"/>`).join(""):""}
     <g id="lp-ink">${ink.map((s,k)=>`<path d="${lpInkD(s)}" class="lp-ink" stroke="${LP_STROKE_COL[k%LP_STROKE_COL.length]}"/>`).join("")}</g></svg></div>
   <div class="row center lp-ctl"><button class="btn ghost" data-act="palsClear">↺ মুছে ফেলো</button><button class="btn ghost" data-act="palsShow">👀 দেখাও</button>${lpMuBtn()}</div></main>`;}
 if(A.scr==="wwon")return `<main class="view palsview lp-run">${lpTop("palsHome","Write "+U)}
   <div class="lp-won"><h1 class="lp-wtitle">Super writer! ✍️</h1><div class="lp-wonrow"><div class="lp-wonchar">${lpChar(c,"yum",true)}</div><div class="lp-written"><svg viewBox="-6 -4 112 128">${(A.ink||[]).map((s,k)=>`<path d="${lpInkD(s)}" class="lp-ink" stroke="${LP_STROKE_COL[k%LP_STROKE_COL.length]}"/>`).join("")}</svg></div></div><p class="lp-bigstars">⭐⭐⭐</p></div>
   <button class="btn good wide" data-act="palsNext">পরের অক্ষর ➜</button><button class="linkbtn" data-act="palsHome">সব অক্ষর</button></main>`;
 if(A.scr==="feed"){const F=A.f,done=F.round>=F.rounds.length,r=F.rounds[Math.min(F.round,F.rounds.length-1)];
  if(done){const nx=LP_LETTERS[(LP_LETTERS.indexOf(c)+1)%26];return `<main class="view palsview lp-run">${lpTop("palsHome","Feed me!")}
   <div class="lp-won"><div class="lp-wonchar big">${lpChar(c,"yum",true)}</div><h1>Yummy! 🎉</h1><p class="bn">${U} খুব খুশি! তুমি দারুণ খেলেছ।</p><p class="lp-bigstars">⭐⭐⭐</p></div>
   <button class="btn good wide" data-act="palsGo" data-c="${nx}">পরের বন্ধু: ${nx.toUpperCase()} ➜</button><button class="linkbtn" data-act="palsHome">সব অক্ষর</button></main>`;}
  return `<main class="view palsview lp-run">${lpTop("palsHome","Feed me!",lpDots(F.rounds.length,F.round))}
   <p class="lp-hint bn">${U} কী খেতে চায়? "${U}" দিয়ে শুরু ছবিটা দাও! <button class="lp-round sm" data-act="palsFeedSay" aria-label="Listen">${IC.speak}</button></p>
   <div class="lp-feed"><div class="lp-feedchar ${F.yum?"yum":""}">${lpChar(c,F.yum?"yum":"open",true)}</div>
    <div class="lp-foods">${r.opts.map(o=>`<button class="lp-food ${F.miss===o[1]?"miss":""} ${F.yum&&o[0]===c?"eaten":""}" data-act="palsEat" data-w="${esc(o[1])}"><span>${o[2]}</span><b>${esc(o[1])}</b></button>`).join("")}</div></div></main>`;}
 if(A.scr==="town")return `<main class="view palsview lp-run lp-wide">${lpTop("palsHome","🏘️ Word Town")}
   <p class="lp-hint bn">একটা জায়গা বেছে নাও: ছবিতে চাপলে নাম শুনবে, তারপর খোঁজার খেলা! 🔍</p>
   <div class="lp-places">${LP_TOWN.map((t,i)=>`<button class="lp-place ${P.t[t.id]?"done":""}" style="--a:${t.bg[0]};--b:${t.bg[1]};--d:${i*.05}s" data-act="palsPlace" data-p="${t.id}"><span class="lp-plic">${t.ic}</span><b>${esc(t.n)}</b><span class="tiny bn">${t.bn}</span><span class="lp-plmini">${t.it.slice(0,4).map(x=>`<i>${lpPic(x[1])}</i>`).join("")}</span>${P.t[t.id]?`<span class="lp-plst">🌟</span>`:""}</button>`).join("")}</div></main>`;
 if(A.scr==="place"){const T=lpPlace(A.pl),F=A.tf,find=F.mode==="find",tg=find?T.it[F.order[Math.min(F.i,F.order.length-1)]]:null;
  return `<main class="view palsview lp-run lp-wide">${lpTop("palsTown",`${T.ic} ${esc(T.n)}`,find?lpDots(F.order.length,F.i):"")}
   ${find?`<div class="lp-ask"><span class="lp-minichar">${lpChar(tg[0][0].toLowerCase(),"",true)}</span><button class="lp-askb" data-act="palsAsk">🔍 ${esc(lpFindText(T,tg).replace(/!$/,""))}! <i>${IC.speak}</i></button></div>`
    :`<div class="lp-ask look"><span class="bn">👂 ছবিতে চাপো, নাম শোনো</span><button class="btn bk-candy" data-act="palsFind">🔍 Find it!</button></div>`}
   <div class="lp-scene ${find?"find":"look"}" style="--a:${T.bg[0]};--b:${T.bg[1]}">${T.it.map((x,j)=>`<button class="lp-thing ${F.found.includes(j)?"got":""} ${F.miss===j?"miss":""}" style="--r:${(j*37)%11-5}deg;--d:${j*.03}s" data-act="palsThing" data-j="${j}" aria-label="${find?"picture":esc(x[0])}"><span class="lp-tp">${lpPic(x[1])}</span>${!find||F.found.includes(j)?`<b>${esc(x[0])}</b>`:""}</button>`).join("")}</div></main>`;}
 if(A.scr==="placewon"){const T=lpPlace(A.pl);return `<main class="view palsview lp-run">${lpTop("palsTown","🏘️ Word Town")}
   <div class="lp-won"><h1 class="lp-wtitle">You found them all! 🎉</h1><div class="lp-sticker big" style="--a:${T.bg[0]};--b:${T.bg[1]}"><span>${T.ic}</span><b>${esc(T.n)}</b></div><p class="bn">নতুন স্টিকার পেয়েছ! 🌟</p></div>
   <button class="btn good wide" data-act="palsTown">🏘️ আরেকটা জায়গা</button><button class="linkbtn" data-act="palsPlace" data-p="${T.id}">আবার খেলো</button></main>`;}
 if(A.scr==="play")return `<main class="view palsview lp-run">${lpTop("palsHome","🧸 Play room")}
   <div class="lp-games"><button class="lp-game g1" data-act="palsBuild"><span class="lp-gic">🧩</span><b>Build a word</b><span class="tiny bn">ছবির নাম শুনে অক্ষর সাজাও</span>${P.g.build?`<span class="lp-badge">🏅 ${P.g.build}</span>`:""}</button>
    <button class="lp-game g2" data-act="palsPop"><span class="lp-gic">🫧</span><b>Letter Pop</b><span class="tiny bn">ঠিক অক্ষরের বাবল ফাটাও</span>${P.g.pop?`<span class="lp-badge">🏅 ${P.g.pop}</span>`:""}</button></div></main>`;
 if(A.scr==="build"){const B=A.b,w=B.words[Math.min(B.i,B.words.length-1)],word=w[0];
  return `<main class="view palsview lp-run">${lpTop("palsPlay","🧩 Build a word",lpDots(B.words.length,B.i))}
   <button class="lp-bpic ${B.win?"win":""}" data-act="palsBSay" aria-label="Listen"><span>${w[1]}</span><i>${IC.speak}</i></button>
   <div class="lp-slots ${B.win?"win":""}">${[...word].map((ch,k)=>`<span class="lp-slot ${k<B.got?"on":""} ${k===B.got&&!B.win?"cur":""}" style="--c:${lpCol(ch)}">${k<B.got?ch:""}</span>`).join("")}</div>
   <div class="lp-tiles">${B.tiles.map((t,j)=>`<button class="lp-ltile ${t.used?"used":""} ${B.miss===j?"miss":""}" style="--c:${lpCol(t.ch)}" data-act="palsBTap" data-j="${j}">${t.ch}</button>`).join("")}</div>
   <p class="lp-hint bn">ছবিতে চাপলে নাম শুনবে, তারপর অক্ষরগুলো সাজাও 🔤</p></main>`;}
 if(A.scr==="pop"){const Q=A.p,T=Q.t[Math.min(Q.r,Q.t.length-1)];
  return `<main class="view palsview lp-run">${lpTop("palsPlay","🫧 Letter Pop",lpDots(Q.t.length,Q.r))}
   <div class="lp-ask"><span class="lp-minichar">${lpChar(T,"",true)}</span><button class="lp-askb" data-act="palsPSay">Pop <b style="color:${lpCol(T)}">${T.toUpperCase()} ${T}</b>! <i>${IC.speak}</i></button></div>
   <div class="lp-pond">${Q.bub.map((b,j)=>`<button class="lp-bub ${b.pop?"pop":""} ${Q.miss===j?"miss":""}" style="--h:${b.h};--fd:${b.fd}s;--dl:${b.dl}s" data-act="palsPTap" data-j="${j}" ${b.pop?"disabled":""}>${b.up?b.ch.toUpperCase():b.ch}</button>`).join("")}</div>
   <p class="lp-hint bn">বড় হাতের আর ছোট হাতের দুটোই ফাটাও! 🫧</p></main>`;}
 if(A.scr==="playwon"){const g=A.gm;return `<main class="view palsview lp-run">${lpTop("palsPlay","🧸 Play room")}
   <div class="lp-won"><h1 class="lp-wtitle">${g==="build"?"Word builder! 🧩":"Bubble popper! 🫧"}</h1><div class="lp-sticker big g-${g}"><span>${g==="build"?"🧩":"🫧"}</span><b>🏅 ${P.g[g]||1}</b></div><p class="bn">দারুণ খেলেছ! 🎉</p></div>
   <button class="btn good wide" data-act="${g==="build"?"palsBuild":"palsPop"}">আবার খেলো</button><button class="linkbtn" data-act="palsPlay">Play room</button></main>`;}
 if(A.scr==="stickers"){const n=lpStickerCount();
  return `<main class="view palsview lp-run lp-wide">${lpTop("palsHome","🌟 Stickers",`<span class="lp-stars">🌟 <b>${n}</b></span>`)}
   <h3 class="lp-h3">Letter friends <span class="tiny muted bn">Trace করলে স্টিকার, লিখলে ✍️</span></h3>
   <div class="lp-stk">${LP_LETTERS.map(x=>P.l[x]?`<div class="lp-st on" style="--c:${lpCol(x)}">${lpChar(x)}${P.w[x]?`<i>✍️</i>`:""}</div>`:`<div class="lp-st"><b>${x.toUpperCase()}</b></div>`).join("")}</div>
   <h3 class="lp-h3">Word Town</h3>
   <div class="lp-stk town">${LP_TOWN.map(t=>`<div class="lp-st ${P.t[t.id]?"on":""}" style="--a:${t.bg[0]};--b:${t.bg[1]}"><span>${t.ic}</span><small>${esc(t.n)}</small></div>`).join("")}</div>
   <h3 class="lp-h3">Play room</h3>
   <div class="lp-stk town"><div class="lp-st ${P.g.build?"on":""}"><span>🧩</span><small>Word builder</small></div><div class="lp-st ${P.g.pop?"on":""}"><span>🫧</span><small>Bubble popper</small></div></div></main>`;}
 return "";
}
/* ---------- tracing and free writing with the finger ---------- */
const LP={drag:false,len:0},LPW={drag:false,cur:null,el:null};
function lpInkD(s){if(!s.length)return "";const [x,y]=s[0];return `M${x.toFixed(1)} ${y.toFixed(1)}`+(s.length<2?" l.01 0":s.slice(1).map(p=>`L${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(""));}
function lpPt(e){const svg=document.querySelector(".lp-pad svg");if(!svg)return null;const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}
function lpPaint(){const g=document.getElementById("lp-cur"),f=document.getElementById("lp-finger");if(!g)return;g.setAttribute("stroke-dasharray",LP.len+" 9999");const q=g.getPointAtLength(LP.len);if(f){f.setAttribute("cx",q.x);f.setAttribute("cy",q.y);}}
function lpDown(e){const A=APP.pals;if(!A||!e.target.closest||!e.target.closest(".lp-pad"))return;const pt=lpPt(e);if(!pt)return;
 if(A.scr==="write"){e.preventDefault();LPW.drag=true;LPW.cur=[[pt.x,pt.y]];(A.ink=A.ink||[]).push(LPW.cur);const g=document.getElementById("lp-ink");
  if(g){LPW.el=document.createElementNS("http://www.w3.org/2000/svg","path");LPW.el.setAttribute("class","lp-ink");LPW.el.setAttribute("stroke",LP_STROKE_COL[(A.ink.length-1)%LP_STROKE_COL.length]);LPW.el.setAttribute("d",lpInkD(LPW.cur));g.appendChild(LPW.el);}return;}
 if(A.scr!=="trace")return;const g=document.getElementById("lp-cur");if(!g)return;
 const q=g.getPointAtLength(LP.len);if(Math.hypot(q.x-pt.x,q.y-pt.y)<22){LP.drag=true;e.preventDefault();lpMove(e);}}
function lpMove(e){const A=APP.pals;if(!A)return;
 if(LPW.drag&&A.scr==="write"){const pt=lpPt(e);if(!pt)return;const l=LPW.cur[LPW.cur.length-1];if(Math.hypot(pt.x-l[0],pt.y-l[1])>1.2){LPW.cur.push([pt.x,pt.y]);LPW.el&&LPW.el.setAttribute("d",lpInkD(LPW.cur));}return;}
 if(!LP.drag||A.scr!=="trace")return;const g=document.getElementById("lp-cur"),pt=lpPt(e);if(!g||!pt)return;const total=g.getTotalLength();
 let adv=true;while(adv&&LP.len<total){adv=false;const q=g.getPointAtLength(Math.min(total,LP.len+3));if(Math.hypot(q.x-pt.x,q.y-pt.y)<17){LP.len=Math.min(total,LP.len+3);adv=true;}}
 lpPaint();if(LP.len>=total-.5)lpStrokeDone();}
function lpUp(){LP.drag=false;if(LPW.drag){LPW.drag=false;LPW.el=null;lpWCheck();}}
function lpStrokeDone(){const A=APP.pals,n=LP_STROKES[A.c].length;LP.drag=false;LP.len=0;A.si=(A.si||0)+1;
 if(A.si>=n){const P=LPST();P.l[A.c]=3;addXP(5);Store.save();LP_MUSIC.stop();A.scr="won";A.k=Date.now();render();SND.play("done");confetti(60);setTimeout(()=>APP.pals?.scr==="won"&&lpPlay(["Yay! You did it!",LP_IS(A.c)]),450);}
 else{SND.play("pair");render();lpPlay([LP_PRAISE[(A.si-1)%LP_PRAISE.length],lpDir(A.c,A.si)]);}}
/* free writing passes when every stroke of the letter is mostly covered and most of the ink sits on the letter */
function lpWCheck(){const A=APP.pals;if(!A||A.scr!=="write")return;const pts=(A.ink||[]).flat();const gs=[...document.querySelectorAll(".lp-pad.wr .lp-ghost")];if(!gs.length||pts.length<5)return;
 const near=(q,r)=>pts.some(p=>Math.hypot(p[0]-q.x,p[1]-q.y)<r);let ok=true,letterLen=0;const sm=[];
 for(const g of gs){const L=g.getTotalLength();letterLen+=L;let n=0,cov=0;for(let s=0;s<=L;s+=4){const q=g.getPointAtLength(s);sm.push(q);n++;if(near(q,11))cov++;}if(cov/n<.75)ok=false;}
 const inkLen=(A.ink||[]).reduce((t,s)=>t+s.slice(1).reduce((u,p,i)=>u+Math.hypot(p[0]-s[i][0],p[1]-s[i][1]),0),0);
 const onLetter=pts.filter(p=>sm.some(q=>Math.hypot(p[0]-q.x,p[1]-q.y)<13)).length/pts.length;
 if(ok&&onLetter>=.75&&inkLen<=letterLen*2.2){const P=LPST();P.w[A.c]=3;addXP(5);Store.save();LP_MUSIC.stop();A.scr="wwon";A.k=Date.now();render();SND.play("done");confetti(70);setTimeout(()=>APP.pals?.scr==="wwon"&&lpPlay(["Yay! You did it!",LP_IS(A.c)]),450);}
 else SND.play("tap");}
document.addEventListener("pointerdown",lpDown,{passive:false});document.addEventListener("pointermove",lpMove);document.addEventListener("pointerup",lpUp);document.addEventListener("pointercancel",lpUp);
/* ---------- actions ---------- */
const lpRate=()=>typeof isKid==="function"&&isKid()?.72:undefined;
const lpSay=t=>TTS.say(t,lpRate());
const lpPlay=list=>TTS.play(list,lpRate());
function lpGo(scr,extra){const A=APP.pals;TTS.stop();Object.assign(A,{scr,k:Date.now()},extra||{});if(scr==="trace"||scr==="write")LP_MUSIC.start();else LP_MUSIC.stop();render();window.scrollTo(0,0);}
function lpFeedRounds(c){const others=()=>{const o=[];for(const a of lpShuffle(ABC)){if(a[0]!==c&&a[1][0]!==c&&o.length<2)o.push(a);}return o;};
 return [0,1].map(()=>({opts:lpShuffle([lpWord(c),...others()])}));}
function lpBuildTiles(word){const extra=lpShuffle(LP_LETTERS.filter(x=>!word.includes(x))).slice(0,2);return lpShuffle([...word,...extra]).map(ch=>({ch,used:false}));}
function lpPopRound(T){const others=lpShuffle(LP_LETTERS.filter(x=>x!==T)).slice(0,8),hues=[200,330,40,150,270,10,180,300];
 return lpShuffle([{ch:T,up:true},{ch:T,up:false},{ch:T,up:true},{ch:T,up:false},...others.map(ch=>({ch,up:T==="l"&&ch==="i"?false:T==="i"&&ch==="l"?true:Math.random()<.5}))]).map((b,i)=>Object.assign(b,{pop:false,h:hues[i%8],fd:(2.4+Math.random()*1.6).toFixed(2),dl:(-Math.random()*2).toFixed(2)}));}
const PALS_ACT={
 palsOpen(){APP.pals={scr:"home",c:lpNext(),k:Date.now()};render();window.scrollTo(0,0);setTimeout(()=>PALS_ACT.palsHello(),450);},
 palsClose(){TTS.stop();LP_MUSIC.stop();APP.pals=null;render();},
 palsHome(){const c=APP.pals?.c;APP.pals={scr:"home",c:c||lpNext(),k:Date.now()};TTS.stop();LP_MUSIC.stop();render();window.scrollTo(0,0);},
 palsPick(el){const A=APP.pals;A.c=el.dataset.c;render();PALS_ACT.palsHello();
  if(innerWidth<900){const p=document.getElementById("lp-panel");p&&p.scrollIntoView({behavior:"smooth",block:"start"});}},
 palsGo(el){APP.pals={scr:"meet",c:el.dataset.c,k:Date.now()};LP_MUSIC.stop();TTS.stop();render();window.scrollTo(0,0);setTimeout(()=>PALS_ACT.palsHello(),350);},
 palsMeet(){const A=APP.pals,fromHub=A.scr==="home";lpGo("meet");if(fromHub)setTimeout(()=>PALS_ACT.palsHello(),350);},
 palsHello(){const A=APP.pals;if(!A||!A.c)return;const c=A.c;lpPlay([LP_HI(c),LSOUND[c],LSOUND[c],LP_IS(c)]);},
 palsWord(){lpSay(lpWord(APP.pals.c)[1]);},
 palsTrace(){LP.len=0;LP.drag=false;lpGo("trace",{si:0});lpPlay(["Start at the dot.",lpDir(APP.pals.c,0)]);},
 palsDirSay(){const A=APP.pals;lpPlay([(A.si||0)===0?"Start at the dot.":LP_PRAISE[0],lpDir(A.c,A.si||0)]);},
 palsRedo(){const A=APP.pals;A.si=0;LP.len=0;LP.drag=false;A.k=Date.now();render();lpPlay(["Start at the dot.",lpDir(A.c,0)]);},
 palsIsFor(){lpSay(LP_IS(APP.pals.c));},
 palsWrite(){const A=APP.pals,c=A.c;if(!LPST().l[c]){toast("আগে "+c.toUpperCase()+" Trace করো ✏️, তারপর Write it খুলবে");SND.play("no");return;}
  LPW.drag=false;lpGo("write",{ink:[],demo:0});lpSay("Now write it by yourself!");},
 palsClear(){const A=APP.pals;A.ink=[];A.demo=0;render();},
 palsShow(){const A=APP.pals;A.demo=0;render();A.demo=Date.now();render();const my=A.demo;setTimeout(()=>{if(APP.pals?.demo===my){APP.pals.demo=0;render();}},LP_STROKES[A.c].length*1000+1400);},
 palsMusic(){const P=LPST();P.mu=P.mu===false;Store.save();if(P.mu===false)LP_MUSIC.stop();else LP_MUSIC.start();render();},
 palsFeed(){const A=APP.pals;lpGo("feed",{f:{round:0,rounds:lpFeedRounds(A.c),miss:null,yum:false}});setTimeout(()=>PALS_ACT.palsFeedSay(),300);},
 palsFeedSay(){lpSay(LSOUND[APP.pals.c]);},
 palsEat(el){const A=APP.pals,F=A.f,c=A.c,w=el.dataset.w;if(F.yum)return;
  if(w===lpWord(c)[1]){F.yum=true;F.miss=null;SND.play("ok");render();lpSay(w);setTimeout(()=>{if(APP.pals?.f!==F)return;F.yum=false;F.round++;if(F.round>=F.rounds.length){SND.play("done");confetti(70);}render();if(F.round<F.rounds.length)PALS_ACT.palsFeedSay();},1500);}
  else{F.miss=w;SND.play("no");render();lpSay(w);}},
 palsNext(){const c=APP.pals.c,nx=LP_LETTERS[(LP_LETTERS.indexOf(c)+1)%26];PALS_ACT.palsGo({dataset:{c:nx}});},
 /* Word Town */
 palsTown(){lpGo("town");},
 palsPlace(el){lpGo("place",{pl:el.dataset.p,tf:{mode:"look",order:[],i:0,found:[],miss:-1}});},
 palsFind(){const A=APP.pals,T=lpPlace(A.pl);A.tf={mode:"find",order:lpShuffle(T.it.map((_,j)=>j)).slice(0,5),i:0,found:[],miss:-1};A.k=Date.now();render();PALS_ACT.palsAsk();},
 palsAsk(){const A=APP.pals,T=lpPlace(A.pl),F=A.tf;if(F.mode!=="find"||F.i>=F.order.length)return;lpSay(lpFindText(T,T.it[F.order[F.i]]));},
 palsThing(el){const A=APP.pals,T=lpPlace(A.pl),F=A.tf,j=+el.dataset.j,x=T.it[j];
  if(F.mode!=="find"){F.miss=-1;lpSay(x[0]);el.classList.remove("tap");void el.offsetWidth;el.classList.add("tap");return;}
  if(F.found.includes(j)){lpSay(x[0]);return;}
  if(j===F.order[F.i]){F.found.push(j);F.miss=-1;F.i++;SND.play("ok");render();lpSay(x[0]);
   if(F.i>=F.order.length){const P=LPST();P.t[T.id]=1;addXP(5);Store.save();setTimeout(()=>{if(APP.pals?.tf!==F)return;A.scr="placewon";A.k=Date.now();render();SND.play("done");confetti(80);lpSay("Yay! You did it!");},1300);}
   else setTimeout(()=>{if(APP.pals?.tf===F)PALS_ACT.palsAsk();},1200);}
  else{F.miss=j;SND.play("no");render();lpSay(x[0]);setTimeout(()=>{if(APP.pals?.tf===F&&F.miss===j){F.miss=-1;render();}},700);}},
 /* Play room */
 palsPlay(){lpGo("play");},
 palsBuild(){const words=lpShuffle(LP_BUILD).slice(0,5);lpGo("build",{gm:"build",b:{words,i:0,got:0,tiles:lpBuildTiles(words[0][0]),miss:-1,win:false}});setTimeout(()=>PALS_ACT.palsBSay(),300);},
 palsBSay(){const B=APP.pals.b;lpSay(B.words[Math.min(B.i,B.words.length-1)][0]);},
 palsBTap(el){const A=APP.pals,B=A.b,j=+el.dataset.j,t=B.tiles[j],word=B.words[B.i][0];if(t.used||B.win)return;
  if(t.ch===word[B.got]){t.used=true;B.got++;B.miss=-1;
   if(B.got>=word.length){B.win=true;SND.play("ok");render();confetti(25);lpPlay([LSOUND[t.ch],word]);
    setTimeout(()=>{if(APP.pals?.b!==B)return;B.i++;if(B.i>=B.words.length){const P=LPST();P.g.build=(P.g.build||0)+1;addXP(5);Store.save();A.scr="playwon";A.k=Date.now();render();SND.play("done");confetti(80);lpSay("Yay! You did it!");return;}
     B.got=0;B.win=false;B.tiles=lpBuildTiles(B.words[B.i][0]);A.k=Date.now();render();PALS_ACT.palsBSay();},1900);}
   else{SND.play("pair");render();lpSay(LSOUND[t.ch]);}}
  else{B.miss=j;SND.play("no");render();lpSay(LSOUND[t.ch]);setTimeout(()=>{if(APP.pals?.b===B&&B.miss===j){B.miss=-1;render();}},600);}},
 palsPop(){const t=lpShuffle(LP_LETTERS).slice(0,3);lpGo("pop",{gm:"pop",p:{t,r:0,bub:lpPopRound(t[0]),miss:-1}});setTimeout(()=>PALS_ACT.palsPSay(),300);},
 palsPSay(){const Q=APP.pals.p,T=Q.t[Math.min(Q.r,Q.t.length-1)];lpPlay(["Pop the letter",LETTER[T],LSOUND[T]]);},
 palsPTap(el){const A=APP.pals,Q=A.p,j=+el.dataset.j,b=Q.bub[j],T=Q.t[Q.r];if(!b||b.pop)return;
  if(b.ch===T){b.pop=true;Q.miss=-1;SND.play("pair");render();lpSay(LSOUND[T]);
   if(Q.bub.filter(x=>x.ch===T&&!x.pop).length===0){SND.play("ok");confetti(30);
    setTimeout(()=>{if(APP.pals?.p!==Q)return;Q.r++;if(Q.r>=Q.t.length){const P=LPST();P.g.pop=(P.g.pop||0)+1;addXP(5);Store.save();A.scr="playwon";A.k=Date.now();render();SND.play("done");confetti(80);lpSay("Yay! You did it!");return;}
     Q.bub=lpPopRound(Q.t[Q.r]);A.k=Date.now();render();PALS_ACT.palsPSay();},1100);}}
  else{Q.miss=j;SND.play("no");render();lpPlay([LETTER[b.ch]]);setTimeout(()=>{if(APP.pals?.p===Q&&Q.miss===j){Q.miss=-1;render();}},600);}},
 palsStickers(){lpGo("stickers");}
};
function palsCTA(){const n=LP_LETTERS.filter(c=>LPST().l[c]).length;return `<button class="palscta" data-act="palsOpen"><span class="pc-char">${lpChar("a","",false)}</span><span class="grow"><b>Letter Friends</b><span class="tiny bn">ABC শোনা, আঙুলে লেখা, Word Town আর Play room · ${n}/26</span></span><span class="sc-go">➜</span></button>`;}
