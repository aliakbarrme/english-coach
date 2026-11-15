/* ================= 🔤 Letter Friends: meet, trace and feed talking letters (original feature) =================
   A → Z map · Meet (name, sound, picture word) · Trace with the finger, stroke by stroke · "Feed me!" game · stars.
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
function LPST(){const p=S.pals||(S.pals={l:{}});p.l=p.l||{};return p;}
function PALS_TEXTS(){return LP_LETTERS.map(c=>{const a=ABC.find(z=>z[0]===c);return `${c.toUpperCase()} is for ${a[1]}.`;});}
/* the letter as a friendly character */
function lpChar(c,mood){const col=lpCol(c),[fx,fy]=LP_FACE[c]||[50,62],d=LP_STROKES[c];
 const mouth=mood==="open"?`<ellipse cx="${fx}" cy="${fy+5}" rx="4" ry="5" fill="#7a2e3a"/>`:mood==="yum"?`<path d="M${fx-5} ${fy+3}q5 8 10 0Z" fill="#7a2e3a"/>`:`<path d="M${fx-4} ${fy+4}q4 4 8 0" stroke="#3a2a4a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
 return `<svg class="lp-char ${mood||""}" viewBox="0 0 100 124" aria-hidden="true"><ellipse cx="50" cy="118" rx="30" ry="4" fill="#000" opacity=".12"/>
  ${d.map(p=>`<path d="${p}" fill="none" stroke="${col}" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>`).join("")}
  ${d.map(p=>`<path d="${p}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="2.4" stroke-linecap="round" stroke-dasharray=".1 6"/>`).join("")}
  <g class="lp-face"><ellipse cx="${fx}" cy="${fy}" rx="14" ry="11" fill="#fff"/><circle cx="${fx-5}" cy="${fy-2}" r="2.1" fill="#2a2140"/><circle cx="${fx+5}" cy="${fy-2}" r="2.1" fill="#2a2140"/>
   <circle cx="${fx-9}" cy="${fy+3}" r="2.4" fill="#ff9fb5" opacity=".8"/><circle cx="${fx+9}" cy="${fy+3}" r="2.4" fill="#ff9fb5" opacity=".8"/>${mouth}</g></svg>`;}
function lpTop(back,title,right){return `<div class="lp-top"><button class="icon-btn" data-act="${back}" aria-label="Back">${back==="palsClose"?IC.close:IC.back}</button><b class="lp-title">${title}</b><span class="lp-right">${right||""}</span></div>`;}
function viewPals(){
 const A=APP.pals,P=LPST();
 if(A.scr==="home"){const met=LP_LETTERS.filter(c=>P.l[c]).length,next=LP_LETTERS.find(c=>!P.l[c])||"a",stars=Object.values(P.l).reduce((a,b)=>a+b,0);
  return `<main class="view palsview">${lpTop("palsClose","🔤 Letter Friends",`<span class="lp-stars">⭐ <b>${stars}</b></span>`)}
   <div class="lp-hero"><div class="lp-herochar">${lpChar(next)}</div><div class="grow"><h1>${met} / 26 বন্ধু</h1><p class="bn">অক্ষরের সাথে দেখা করো, আঙুল দিয়ে লেখো, আর খাওয়াও! 🍎</p>
    <button class="btn bk-candy" data-act="palsGo" data-c="${next}">▶ ${next.toUpperCase()} দিয়ে খেলো</button></div></div>
   <div class="lp-map">${LP_LETTERS.map((c,i)=>{const s=P.l[c],a=lpWord(c);return `<button class="lp-tile ${s?"done":c===next?"now":""}" style="--c:${lpCol(c)};--d:${i*.02}s" data-act="palsGo" data-c="${c}">
     <b>${c.toUpperCase()}</b>${s?`<span class="lp-tpic">${a[2]}</span><span class="lp-tst">${"⭐".repeat(s)}</span>`:c===next?`<span class="lp-now">✏️ NOW</span>`:""}</button>`;}).join("")}</div></main>`;}
 const c=A.c,U=c.toUpperCase(),a=lpWord(c),strokes=LP_STROKES[c];
 if(A.scr==="meet")return `<main class="view palsview lp-run">${lpTop("palsHome","Meet "+U)}
   <div class="lp-meet"><button class="lp-meetchar" data-act="palsHello">${lpChar(c)}</button>
    <button class="lp-card" data-act="palsWord"><span class="lp-cpic">${a[2]}</span><span class="lp-cw"><i>${esc(a[1][0])}</i>${esc(a[1].slice(1))}</span></button></div>
   <p class="lp-hint bn">অক্ষর বা ছবিতে চাপলে শোনা যায় 🔊</p>
   <button class="btn good wide lp-go" data-act="palsTrace">✏️ Let's trace!</button></main>`;
 if(A.scr==="trace"){const si=A.si||0,cur=strokes[si],m=cur.match(/M\s*([\d.]+)\s+([\d.]+)/),col=LP_STROKE_COL[si%LP_STROKE_COL.length];
  return `<main class="view palsview lp-run">${lpTop("palsMeet","Trace "+U,`<span class="lp-step">${strokes.map((_,k)=>`<i class="${k<si?"on":k===si?"cur":""}"></i>`).join("")}</span>`)}
   <p class="lp-hint bn">গোল বিন্দু থেকে শুরু করো, দাগ ধরে আঙুল টানো 👆</p>
   <div class="lp-pad"><svg viewBox="-6 -4 112 128">
     ${strokes.map(p=>`<path d="${p}" class="lp-ghost"/>`).join("")}
     ${strokes.slice(0,si).map((p,k)=>`<path d="${p}" class="lp-done" stroke="${LP_STROKE_COL[k%LP_STROKE_COL.length]}"/>`).join("")}
     <path d="${cur}" class="lp-guide"/><path id="lp-cur" d="${cur}" class="lp-prog" stroke="${col}" stroke-dasharray="0 9999"/>
     <circle class="lp-dot" cx="${m[1]}" cy="${m[2]}" r="7" fill="${col}"/><text class="lp-num" x="${m[1]}" y="${+m[2]+3.6}" text-anchor="middle">${si+1}</text>
     <circle id="lp-finger" class="lp-finger" cx="${m[1]}" cy="${m[2]}" r="9" stroke="${col}"/></svg></div>
   <div class="row center"><button class="btn ghost" data-act="palsRedo">↺ আবার</button><button class="lp-round" data-act="palsHello" aria-label="Listen">${IC.speak}</button></div></main>`;}
 if(A.scr==="won")return `<main class="view palsview lp-run">${lpTop("palsHome","Trace "+U)}
   <div class="lp-won"><button class="lp-is" data-act="palsIsFor"><b style="color:${lpCol(c)}">${U}</b> is for ${esc(a[1][0].toUpperCase()+a[1].slice(1))} <i>${IC.speak}</i></button>
    <div class="lp-wonrow"><div class="lp-wonchar">${lpChar(c,"yum")}</div><span class="lp-wonpic">${a[2]}</span></div><p class="lp-bigstars">⭐⭐⭐</p></div>
   <button class="btn bk-candy wide" data-act="palsFeed">🎮 Let's play!</button><button class="linkbtn" data-act="palsNext">পরের অক্ষর ➜</button></main>`;
 if(A.scr==="feed"){const F=A.f,done=F.round>=F.rounds.length,r=F.rounds[Math.min(F.round,F.rounds.length-1)];
  if(done){const nx=LP_LETTERS[(LP_LETTERS.indexOf(c)+1)%26];return `<main class="view palsview lp-run">${lpTop("palsHome","Feed me!")}
   <div class="lp-won"><div class="lp-wonchar big">${lpChar(c,"yum")}</div><h1>Yummy! 🎉</h1><p class="bn">${U} খুব খুশি! তুমি দারুণ খেলেছ।</p><p class="lp-bigstars">⭐⭐⭐</p></div>
   <button class="btn good wide" data-act="palsGo" data-c="${nx}">পরের বন্ধু: ${nx.toUpperCase()} ➜</button><button class="linkbtn" data-act="palsHome">সব অক্ষর</button></main>`;}
  return `<main class="view palsview lp-run">${lpTop("palsHome","Feed me!",`<span class="lp-step">${F.rounds.map((_,k)=>`<i class="${k<F.round?"on":k===F.round?"cur":""}"></i>`).join("")}</span>`)}
   <p class="lp-hint bn">${U} কী খেতে চায়? "${U}" দিয়ে শুরু ছবিটা দাও! <button class="lp-round sm" data-act="palsFeedSay" aria-label="Listen">${IC.speak}</button></p>
   <div class="lp-feed"><div class="lp-feedchar ${F.yum?"yum":""}">${lpChar(c,F.yum?"yum":"open")}</div>
    <div class="lp-foods">${r.opts.map(o=>`<button class="lp-food ${F.miss===o[1]?"miss":""} ${F.yum&&o[0]===c?"eaten":""}" data-act="palsEat" data-w="${esc(o[1])}"><span>${o[2]}</span><b>${esc(o[1])}</b></button>`).join("")}</div></div></main>`;}
 return "";
}
/* ---------- tracing with the finger ---------- */
const LP={drag:false,len:0};
function lpPt(e){const svg=document.querySelector(".lp-pad svg");if(!svg)return null;const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}
function lpPaint(){const g=document.getElementById("lp-cur"),f=document.getElementById("lp-finger");if(!g)return;g.setAttribute("stroke-dasharray",LP.len+" 9999");const q=g.getPointAtLength(LP.len);if(f){f.setAttribute("cx",q.x);f.setAttribute("cy",q.y);}}
function lpDown(e){const A=APP.pals;if(!A||A.scr!=="trace"||!e.target.closest||!e.target.closest(".lp-pad"))return;const g=document.getElementById("lp-cur"),pt=lpPt(e);if(!g||!pt)return;
 const q=g.getPointAtLength(LP.len);if(Math.hypot(q.x-pt.x,q.y-pt.y)<22){LP.drag=true;e.preventDefault();lpMove(e);}}
function lpMove(e){const A=APP.pals;if(!LP.drag||!A||A.scr!=="trace")return;const g=document.getElementById("lp-cur"),pt=lpPt(e);if(!g||!pt)return;const total=g.getTotalLength();
 let adv=true;while(adv&&LP.len<total){adv=false;const q=g.getPointAtLength(Math.min(total,LP.len+3));if(Math.hypot(q.x-pt.x,q.y-pt.y)<17){LP.len=Math.min(total,LP.len+3);adv=true;}}
 lpPaint();if(LP.len>=total-.5)lpStrokeDone();}
function lpUp(){LP.drag=false;}
function lpStrokeDone(){const A=APP.pals,n=LP_STROKES[A.c].length;LP.drag=false;LP.len=0;A.si=(A.si||0)+1;
 if(A.si>=n){const P=LPST();P.l[A.c]=3;addXP(5);Store.save();A.scr="won";A.k=Date.now();render();SND.play("done");confetti(60);setTimeout(()=>PALS_ACT.palsIsFor(),500);}
 else{SND.play("pair");render();}}
document.addEventListener("pointerdown",lpDown,{passive:false});document.addEventListener("pointermove",lpMove);document.addEventListener("pointerup",lpUp);document.addEventListener("pointercancel",lpUp);
/* ---------- actions ---------- */
const lpSay=(t)=>typeof bkSay==="function"?bkSay(t):TTS.say(t);
function lpFeedRounds(c){const others=()=>{const o=[];for(const a of ABC.slice().sort(()=>Math.random()-.5)){if(a[0]!==c&&a[1][0]!==c&&o.length<2)o.push(a);}return o;};
 return [0,1].map(()=>({opts:[lpWord(c),...others()].sort(()=>Math.random()-.5)}));}
const PALS_ACT={
 palsOpen(){APP.pals={scr:"home",k:Date.now()};render();window.scrollTo(0,0);},
 palsClose(){TTS.stop();APP.pals=null;render();},
 palsHome(){TTS.stop();APP.pals={scr:"home",k:Date.now()};render();window.scrollTo(0,0);},
 palsGo(el){APP.pals={scr:"meet",c:el.dataset.c,k:Date.now()};render();window.scrollTo(0,0);setTimeout(()=>PALS_ACT.palsHello(),350);},
 palsMeet(){const c=APP.pals.c;APP.pals={scr:"meet",c,k:Date.now()};render();},
 async palsHello(){const A=APP.pals;if(!A||!A.c)return;const c=A.c,tok=A.tok=Date.now();await lpSay(LETTER[c]);if(APP.pals?.tok!==tok)return;await new Promise(r=>setTimeout(r,250));await lpSay(LSOUND[c]);if(APP.pals?.tok!==tok)return;await new Promise(r=>setTimeout(r,250));lpSay(lpWord(c)[1]);},
 palsWord(){lpSay(lpWord(APP.pals.c)[1]);},
 palsTrace(){const A=APP.pals;TTS.stop();A.scr="trace";A.si=0;A.k=Date.now();LP.len=0;LP.drag=false;render();window.scrollTo(0,0);},
 palsRedo(){const A=APP.pals;A.si=0;LP.len=0;LP.drag=false;A.k=Date.now();render();},
 palsIsFor(){const c=APP.pals.c;lpSay(`${c.toUpperCase()} is for ${lpWord(c)[1]}.`);},
 palsFeed(){const A=APP.pals;TTS.stop();A.scr="feed";A.f={round:0,rounds:lpFeedRounds(A.c),miss:null,yum:false};A.k=Date.now();render();window.scrollTo(0,0);setTimeout(()=>PALS_ACT.palsFeedSay(),300);},
 palsFeedSay(){lpSay(LSOUND[APP.pals.c]);},
 palsEat(el){const A=APP.pals,F=A.f,c=A.c,w=el.dataset.w;if(F.yum)return;
  if(w===lpWord(c)[1]){F.yum=true;F.miss=null;SND.play("ok");render();lpSay(w);setTimeout(()=>{if(APP.pals?.f!==F)return;F.yum=false;F.round++;if(F.round>=F.rounds.length){SND.play("done");confetti(70);}render();if(F.round<F.rounds.length)PALS_ACT.palsFeedSay();},1500);}
  else{F.miss=w;SND.play("no");render();lpSay(w);}},
 palsNext(){const c=APP.pals.c,nx=LP_LETTERS[(LP_LETTERS.indexOf(c)+1)%26];PALS_ACT.palsGo({dataset:{c:nx}});}
};
function palsCTA(){const n=LP_LETTERS.filter(c=>LPST().l[c]).length;return `<button class="palscta" data-act="palsOpen"><span class="pc-char">${lpChar("a")}</span><span class="grow"><b>Letter Friends</b><span class="tiny bn">অক্ষরের সাথে দেখা, আঙুলে লেখা আর খেলা · ${n}/26</span></span><span class="sc-go">➜</span></button>`;}
