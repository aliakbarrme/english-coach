/* ================= profiles ================= */
const AVATARS=["🧑🏽‍💻","👨🏽","👩🏽","🧔🏽","👩🏽‍🦱","👧🏽","👦🏽","👶🏽","🧒🏽","👵🏽","👴🏽","🦁","🐯","🐼","🦊","🐰","🐱","🐶","🦄","🐸","🐧","🦋","🚀","⭐"];
const AGES=[["kid","Kid","3–7 বছর","🧸","Picture + awaj diye khela, porte lagbe na"],["teen","Teen","8–15 বছর","🎒","School, bondhu, daily kotha"],["adult","Adult","16+","💼","Kaj, family, everyday kotha"]];
const GOALS=[["family","Family & home","ঘরে পরিবারের সাথে","🏡"],["client","Work & clients","কাজ ও ক্লায়েন্ট","💼"],["everyday","Everyday talk","সবার সাথে কথা","☕"],["kids","Teach my little kids","ছোটদের শেখাতে","🧸"]];
let PROFILES=[], PID=null;
const prof=()=>PROFILES.find(p=>p.id===PID)||null;
const isKid=()=>prof()?.age==="kid";
const myName=()=>prof()?.name||"Friend";
function myTracks(){const p=prof();if(!p)return TRACKS;if(p.age==="kid")return TRACKS.filter(t=>t[0]==="kids");
  const g=p.goals&&p.goals.length?p.goals:["everyday"];return TRACKS.filter(t=>g.includes(t[0]));}
function warmAllowed(){return prof()?.age!=="kid";}
function weekKey(d){d=d?new Date(d):new Date();const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const dn=(t.getUTCDay()+6)%7;t.setUTCDate(t.getUTCDate()-dn);return t.toISOString().slice(0,10);}
function weekXP(st){const wk=weekKey();let x=0;for(const [k,v] of Object.entries(st.days||{}))if(weekKey(k+"T12:00:00")===wk)x+=v.xp||0;return x;}

/* ================= daily quests ================= */
const QUESTS={
 adult:[
  {id:"l2",ic:"📘",t:"2 ta lesson ba practice shesh koro",n:2,v:d=>d.lessons+d.practice},
  {id:"c15",ic:"🎯",t:"15 ta uttor thik dao",n:15,v:d=>d.c},
  {id:"sp5",ic:"🎤",t:"5 ta sentence jore jore bolo",n:5,v:d=>d.speak||0},
  {id:"st1",ic:"🎧",t:"Ekta story shono ba poro",n:1,v:d=>d.story||0},
  {id:"xp",ic:"⚡",t:"Ajker XP goal puron koro",n:()=>S.goal,v:d=>d.xp},
  {id:"wu",ic:"👄",t:"Mouth warm-up koro",n:1,v:d=>d.warm?1:0}],
 kid:[
  {id:"kl1",ic:"⭐",t:"1 ta lesson khelo",n:1,v:d=>d.lessons+d.practice},
  {id:"kc10",ic:"🖼️",t:"10 ta chobi khuje bar koro",n:10,v:d=>d.c},
  {id:"ks3",ic:"🎤",t:"3 ta word jore bolo",n:3,v:d=>d.speak||0},
  {id:"kst",ic:"📖",t:"Ekta golpo shono",n:1,v:d=>d.story||0},
  {id:"kcard",ic:"🃏",t:"Picture card dekho",n:1,v:d=>d.cards||0}]
};
function questsToday(){
  const pool=isKid()?QUESTS.kid:QUESTS.adult.filter(q=>q.id!=="wu"||warmAllowed());
  const seed=+today().replace(/-/g,"");const picks=[];let k=seed;
  while(picks.length<3&&picks.length<pool.length){k=(k*9301+49297)%233280;const q=pool[k%pool.length];if(!picks.includes(q))picks.push(q);}
  const d=day();return picks.map(q=>{const n=typeof q.n==="function"?q.n():q.n;const v=Math.min(n,q.v(d));return {...q,n,v,done:v>=n};});
}
function questCard(){
  const qs=questsToday(), all=qs.every(q=>q.done), d=day();
  return `<div class="card quests"><div class="row between"><h3>Ajker quest</h3><span class="chip">${qs.filter(q=>q.done).length}/3</span></div>
   ${qs.map(q=>`<div class="quest ${q.done?"done":""}"><span class="qic">${q.ic}</span><div class="grow"><span class="small">${esc(q.t)}</span><span class="qbar"><i style="width:${Math.round(q.v/q.n*100)}%"></i></span></div><span class="tiny muted num">${q.v}/${q.n}</span></div>`).join("")}
   ${all&&!d.chest?`<button class="btn wide gold" data-act="openChest">🎁 Reward kholo (+10 XP)</button>`:d.chest?`<p class="tiny muted">Ajker reward neya hoyeche. Kal notun quest!</p>`:""}</div>`;
}

/* ================= badges ================= */
const BADGES=[
 {id:"first",ic:"🌱",t:"First step",d:"Prothom lesson",ok:()=>Object.keys(S.done).length>=1},
 {id:"s3",ic:"🔥",t:"On fire",d:"3 din streak",ok:()=>(S.best||0)>=3||streak()>=3},
 {id:"s7",ic:"🏆",t:"One week",d:"7 din streak",ok:()=>(S.best||0)>=7||streak()>=7},
 {id:"x100",ic:"⚡",t:"100 XP",d:"Total 100 XP",ok:()=>S.xp>=100},
 {id:"x500",ic:"💎",t:"500 XP",d:"Total 500 XP",ok:()=>S.xp>=500},
 {id:"story",ic:"📖",t:"Storyteller",d:"Prothom story shesh",ok:()=>Object.values(S.storyDone).some(x=>x.read)},
 {id:"speak",ic:"🎤",t:"Speaker",d:"20 ta sentence bolecho",ok:()=>(S.speakTotal||0)>=20},
 {id:"perfect",ic:"✨",t:"Perfect",d:"Kono bhul chara lesson",ok:()=>(S.perfect||0)>=1},
 {id:"unit",ic:"🎓",t:"Unit master",d:"Ekta unit puro shesh",ok:()=>allUnits().some(u=>u.lessons.length&&u.lessons.every((l,i)=>S.done[u.id+":"+i])&&S.storyDone[u.id]?.read)},
 {id:"warm7",ic:"👄",t:"Warm voice",d:"7 din warm-up",ok:()=>(S.warmCount||0)>=7},
 {id:"quest",ic:"🎁",t:"Quest hero",d:"Shob quest ek dine",ok:()=>Object.values(S.days).some(x=>x.chest)}
];
function checkBadges(){
  S.badges=S.badges||[];const fresh=BADGES.filter(b=>!S.badges.includes(b.id)&&b.ok());
  if(!fresh.length)return;fresh.forEach(b=>S.badges.push(b.id));Store.save();
  setTimeout(()=>{SND.play("done");confetti();toast(`${fresh[0].ic} Notun badge: ${fresh[0].t}!`);},600);
}
function badgeGrid(){
  const got=S.badges||[];
  return `<div class="badges">${BADGES.map(b=>`<div class="badge ${got.includes(b.id)?"on":""}" title="${esc(b.d)}"><span>${b.ic}</span><b>${esc(b.t)}</b><i>${esc(b.d)}</i></div>`).join("")}</div>`;
}

/* ================= family league (profiles on this device) ================= */
function leagueCard(){
  if(PROFILES.length<2)return `<div class="card"><h3>Family league</h3><p class="small muted">Poribarer onno kauke profile banate dao (wife, bachchara). Prottek shoptaho ke beshi XP pay, ekhane dekhabe.</p><button class="btn sm ghost" data-act="addProfile">+ Profile jog koro</button></div>`;
  const wk=weekKey();const rows=PROFILES.map(p=>({p,x:p.id===PID?weekXP(S):(p.wk&&p.wk[wk])||0})).sort((a,b)=>b.x-a.x);
  return `<div class="card"><div class="row between"><h3>Family league</h3><span class="tiny muted">ei shoptaho</span></div><div class="league">${rows.map((r,i)=>`<div class="lrow ${r.p.id===PID?"me":""}"><span class="lpos">${["🥇","🥈","🥉"][i]||i+1}</span><span class="av sm">${esc(r.p.avatar)}</span><b class="grow">${esc(r.p.name)}</b><span class="num">${r.x} XP</span></div>`).join("")}</div></div>`;
}

/* ================= kid stickers ================= */
function stickerBook(){
  const st=S.stickers||[];
  return `<div class="card"><div class="row between"><h3>Sticker book</h3><span class="chip">${st.length}</span></div>${st.length?`<div class="stickers">${st.map(x=>`<span>${x}</span>`).join("")}</div>`:`<p class="small muted">Lesson shesh korle notun sticker pabe!</p>`}</div>`;
}

/* ================= confetti ================= */
function confetti(n=60){
  if(RM.matches||!document.body.animate)return;
  const cols=["#4fbf93","#e08a2e","#7c62d4","#d6516b","#3a7fcc","#f2c94c"];const W=innerWidth,H=innerHeight;
  for(let i=0;i<n;i++){const p=document.createElement("i");p.className="confetto";p.style.background=cols[i%cols.length];p.style.left=(W/2)+"px";p.style.top=(H*.35)+"px";
   if(i%3===0)p.style.borderRadius="50%";document.body.append(p);
   const ang=Math.random()*Math.PI*2,sp=120+Math.random()*260,dx=Math.cos(ang)*sp,dy=Math.sin(ang)*sp-160;
   const a=p.animate([{transform:"translate(-50%,-50%) rotate(0)",opacity:1},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) rotate(${Math.random()*540}deg)`,opacity:1,offset:.45},{transform:`translate(calc(-50% + ${dx*1.2}px),calc(-50% + ${dy+H*.6}px)) rotate(${Math.random()*900}deg)`,opacity:0}],{duration:1600+Math.random()*900,easing:"cubic-bezier(.2,.7,.4,1)"});
   a.onfinish=()=>p.remove();}
}

/* ================= welcome, onboarding, profile picker ================= */
function viewWelcome(){
  return `<main class="welcome"><div class="wl-hero"><div class="floaters" aria-hidden="true"><span>💬</span><span>🎧</span><span>🎤</span><span>📖</span><span>⭐</span><span>🧸</span></div>
   <div class="wl-mark">${IC.learn}</div><span class="eyebrow">English Coach</span><h1>English বলো আত্মবিশ্বাসে, প্রতিদিন</h1>
   <p class="muted bn">ছোট-বড় সবার জন্য: বাচ্চারা ছবি আর খেলায়, বড়রা কাজ, পরিবার আর দৈনন্দিন কথায়। প্রতিদিন ১০–২০ মিনিট।</p></div>
   <div class="method">${[["👄","Warm-up","মুখ আর জিভ রেডি"],["🧩","Learn","ছোট ছোট লেসন, গেমের মতো"],["🎤","Speak","বলো, অ্যাপ শুনে মিলিয়ে দেখে"],["📖","Story","গল্প শুনে নিজে বলো"]].map(([i,t,b],k)=>`<div class="mstep"><span class="mic">${i}</span><b>${k+1}. ${t}</b><span class="tiny bn muted">${b}</span></div>`).join("")}</div>
   <button class="btn wide xl" data-act="onbStart">Shuru kori</button>
   <p class="tiny muted center">Account lagbe na. Progress ei device e thake, backup neya jay.</p></main>`;
}
function viewOnb(){
  const O=APP.onb,d=O.draft,steps=d.age==="kid"?["name","avatar","age","goal","done"]:["name","avatar","age","goals","goal","warm","done"];
  const st=steps[O.step];const pct=Math.round(O.step/(steps.length-1)*100);
  let body="",can=true,nextLbl="Continue";
  if(st==="name"){body=`<span class="onb-ic">👋</span><h1>Tomar naam ki?</h1><p class="muted">Bachchar jonno banale tar naam likho.</p><input type="text" id="onb-name" maxlength="20" value="${esc(d.name||"")}" placeholder="Naam" autocomplete="off">`;}
  if(st==="avatar"){body=`<span class="onb-ic">${esc(d.avatar||"🙂")}</span><h1>Ekta avatar baco</h1><div class="avgrid">${AVATARS.map(a=>`<button class="avpick" data-act="onbSet" data-k="avatar" data-v="${a}" aria-pressed="${d.avatar===a}">${a}</button>`).join("")}</div>`;can=!!d.avatar;}
  if(st==="age"){body=`<span class="onb-ic">🎂</span><h1>${esc(d.name)} er boyosh?</h1><div class="opts">${AGES.map(([v,l,bn,ic,sub])=>`<button class="opt big" data-act="onbSet" data-k="age" data-v="${v}" aria-pressed="${d.age===v}"><span class="oic">${ic}</span><span class="grow"><b>${l} <span class="bn muted">· ${bn}</span></b><span class="small muted">${sub}</span></span></button>`).join("")}</div>`;can=!!d.age;}
  if(st==="goals"){body=`<span class="onb-ic">🎯</span><h1>Ki jonno English shikhbe?</h1><p class="muted">Ek ba ekadhik baco.</p><div class="opts">${GOALS.map(([v,l,bn,ic])=>`<button class="opt big" data-act="onbGoal" data-v="${v}" aria-pressed="${(d.goals||[]).includes(v)}"><span class="oic">${ic}</span><span class="grow"><b>${l}</b><span class="small bn muted">${bn}</span></span></button>`).join("")}</div>`;can=(d.goals||[]).length>0;}
  if(st==="goal"){const opts=d.age==="kid"?[[10,"5 min","Ektu ektu"],[20,"10 min","Protidin"],[30,"15 min","Beshi"]]:[[20,"10 min","Casual"],[30,"15 min","Regular"],[50,"20 min","Serious"],[80,"30 min","Intense"]];
    body=`<span class="onb-ic">⏱️</span><h1>Protidin koto shomoy?</h1><div class="opts">${opts.map(([v,l,s])=>`<button class="opt big" data-act="onbSet" data-k="goal" data-v="${v}" aria-pressed="${+d.goal===v}"><span class="oic">⚡</span><span class="grow"><b>${l}</b><span class="small muted">${s} · ${v} XP/din</span></span></button>`).join("")}</div>`;can=!!d.goal;}
  if(st==="warm"){body=`<span class="onb-ic">👄</span><h1>Lesson er age mouth warm-up?</h1><p class="muted">Jibh ar thot er exercise, tongue twister ar pen-reading. Uccharon e boro parthokko ane.</p><div class="opts">${[["full","Full warm-up (10–15 min)","Recommended for clear speaking"],["quick","Quick warm-up (5 min)","Busy dine er jonno"],["off","Ekhon na","Pore Settings theke chalu kora jabe"]].map(([v,l,s])=>`<button class="opt big" data-act="onbSet" data-k="warm" data-v="${v}" aria-pressed="${d.warm===v}"><span class="grow"><b>${l}</b><span class="small muted">${s}</span></span></button>`).join("")}</div>`;can=!!d.warm;}
  if(st==="done"){const tr=d.age==="kid"?["kids"]:d.goals;body=`<span class="onb-ic big">${esc(d.avatar)}</span><h1>${esc(d.name)} er plan ready!</h1>
    <div class="card plan">${tr.map(t=>{const T=TRACKS.find(x=>x[0]===t);return `<div class="row"><span class="chip trk ${t}">${T[1]}</span><span class="small bn muted">${T[2]}</span></div>`;}).join("")}
     <p class="small">${d.age==="kid"?"Chobi dekhe, awaj shune, khela kore word shikhbe. Protita lesson e notun sticker!":`Protidin: ${d.warm!=="off"?"warm-up → ":""}lesson → bolar practice → golpo. Bhul gula app nije mone rakhe ar shomoy moto abar ane.`}</p>
     <p class="tiny muted">Daily goal: ${d.goal} XP · ${d.age==="kid"?"Kids mode":"Adult/teen mode"}</p></div>`;nextLbl="Shuru!";}
  return `<main class="onb"><div class="onb-head">${O.step>0||PROFILES.length?`<button class="icon-btn" data-act="onbBack" aria-label="Back">${IC.back}</button>`:"<span></span>"}<div class="pbar"><i style="width:${pct}%"></i></div></div>
   <div class="onb-body">${body}</div>
   <div class="onb-foot"><button class="btn wide xl" data-act="onbNext" ${can?"":"disabled"}>${nextLbl}</button></div></main>`;
}
function viewPicker(){
  return `<main class="picker"><span class="eyebrow">English Coach</span><h1>Ke shikhbe?</h1>
   <div class="pgrid">${PROFILES.map(p=>`<button class="pcard" data-act="pickProfile" data-id="${esc(p.id)}"><span class="av xl">${esc(p.avatar)}</span><b>${esc(p.name)}</b><span class="tiny muted">${p.age==="kid"?"Kids":p.age==="teen"?"Teen":"Adult"}</span></button>`).join("")}
    <button class="pcard add" data-act="addProfile"><span class="av xl">＋</span><b>Profile jog koro</b><span class="tiny muted">wife, bachcha…</span></button></div></main>`;
}
