/* ================= 3D emoji images (Fluent, bundled in e/) ================= */
const EMOJI_SET=new Set(/*__EMOJI__*/[]);
const ART_OK=/*__ART__*/false;
const art=(n,cls="")=>ART_OK?`<img class="art ${cls}" src="i/${n}.webp" alt="" loading="lazy" draggable="false">`:"";
const EMO_RE=/\p{Extended_Pictographic}(?:\uFE0F|\u20E3|\p{Emoji_Modifier}|\u200D\p{Extended_Pictographic}\uFE0F?\p{Emoji_Modifier}?)*|[0-9]\uFE0F\u20E3/gu;
const ekey=e=>[...e].map(c=>c.codePointAt(0).toString(16)).filter(h=>h!=="fe0f").join("-");
function emojify(html){
  if(!EMOJI_SET.size)return html;
  const parts=html.split(/(<[^>]*>)/);let skip=0;
  for(let i=0;i<parts.length;i++){const p=parts[i];if(!p)continue;
    if(p[0]==="<"){if(/^<(option|textarea|title|text)\b/i.test(p))skip++;else if(/^<\/(option|textarea|title|text)\b/i.test(p))skip=Math.max(0,skip-1);continue;}
    if(skip)continue;
    parts[i]=p.replace(EMO_RE,e=>{const k=ekey(e);return EMOJI_SET.has(k)?`<img class="emo" src="e/${k}.webp" alt="${e}" draggable="false">`:e;});}
  return parts.join("");
}

/* ================= theme, sidebar, avatar photo ================= */
const UI={get(k){try{return localStorage.getItem("aec4:"+k);}catch(e){return null;}},set(k,v){try{localStorage.setItem("aec4:"+k,v);}catch(e){}}};
function isDark(){const t=document.documentElement.dataset.theme;return t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;}
function setTheme(t){if(t==="system"){delete document.documentElement.dataset.theme;UI.set("theme","system");}else{document.documentElement.dataset.theme=t;UI.set("theme",t);}
  document.querySelectorAll('meta[name="theme-color"]').forEach(m=>m.content=isDark()?"#0b1312":"#eef2ef");}
function themeMode(){return UI.get("theme")||"system";}
function avatarHTML(p,cls=""){if(!p)return `<span class="av ${cls}">🙂</span>`;return p.photo?`<span class="av photo ${cls}"><img src="${p.photo}" alt=""></span>`:`<span class="av ${cls}">${esc(p.avatar||"🙂")}</span>`;}
function readPhoto(file){return new Promise((res,rej)=>{const fr=new FileReader();fr.onerror=rej;fr.onload=()=>{const im=new Image();im.onerror=rej;im.onload=()=>{const s=Math.min(im.width,im.height),c=document.createElement("canvas");c.width=c.height=256;
  c.getContext("2d").drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,256,256);res(c.toDataURL("image/jpeg",.84));};im.src=fr.result;};fr.readAsDataURL(file);});}
function navFoot(){
  const P=prof();if(!P)return "";const d=day(),g=S.goal||30,pct=Math.min(100,Math.round(d.xp/g*100));
  return `<div class="nf-links"><button class="nf-link" data-act="goSettings">${IC.settings}<span>Settings</span></button><button class="nf-link" data-act="openHelp">${IC.help}<span>Help</span></button>${CLOUD.user?`<button class="nf-link" data-act="googleSignOut">${IC.close}<span>Log out</span></button>`:""}
    <button class="nf-link" data-act="toggleTheme" aria-label="Dark mode">${isDark()?IC.sun:IC.moon}<span>${isDark()?"Light mode":"Dark mode"}</span><i class="nf-sw ${isDark()?"on":""}"></i></button></div>
   <div class="nf-goal" title="আজকের লক্ষ্য"><div class="row between"><span class="small">🌱 আজ <b>${d.xp}</b> of ${g} XP</span><span class="tiny">${streak()}🔥</span></div><span class="nf-bar"><i style="width:${pct}%"></i></span></div>
   <button class="nf-me" data-act="switchProfile" title="প্রোফাইল বদলাও">${avatarHTML(P)}<span class="grow"><b>${esc(P.name)}</b><span class="tiny">${P.age==="kid"?"Kids":P.age==="teen"?"Teen":"Adult"} · ${myTracks().map(t=>t[1]).join(", ")}</span></span>${IC.updown}</button>`;
}
function helpModal(){
  return `<div class="modal" data-act="closeModal"><div class="card helpcard"><h2>কীভাবে শিখবে</h2>
   <ol class="helpsteps"><li><b>Warm-up</b> — মুখ আর জিভের ব্যায়াম (ছবি দেখে)।</li><li><b>Learn</b> — ছোট লেসন: শোনো, মেলাও, সাজাও, লেখো।</li><li><b>Speak</b> — মাইকে বলো, অ্যাপ শব্দ মিলিয়ে দেখে।</li><li><b>Story</b> — গল্প শোনো, জোরে পড়ো, রেকর্ড করো।</li><li><b>Practice</b> — ভুলগুলো সময়মতো আবার আসে।</li></ol>
   <p class="small muted">মাইক কাজ না করলে Chrome/Edge বা ফোনে খোলো, তারপর মাইকের অনুমতি দাও। অগ্রগতি অন্য ডিভাইসে নিতে Me → Backup।</p>
   <button class="btn wide" data-act="closeModal">বুঝেছি</button></div></div>`;
}

/* ================= profiles ================= */
const AVATARS=["🧑🏽‍💻","👨🏽","👩🏽","🧔🏽","👩🏽‍🦱","👧🏽","👦🏽","👶🏽","🧒🏽","👵🏽","👴🏽","🦁","🐯","🐼","🦊","🐰","🐱","🐶","🦄","🐸","🐧","🦋","🚀","⭐"];
const AGES=[["kid","Kid","3–7 বছর","🧸","ছবি আর আওয়াজে খেলা, পড়তে হবে না"],["teen","Teen","8–15 বছর","🎒","স্কুল, বন্ধু, প্রতিদিনের কথা"],["adult","Adult","16+","💼","কাজ, পরিবার, প্রতিদিনের কথা"]];
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
  {id:"l2",ic:"📘",t:"২টা লেসন বা প্র্যাকটিস শেষ করো",n:2,v:d=>d.lessons+d.practice},
  {id:"c15",ic:"🎯",t:"১৫টা উত্তর ঠিক দাও",n:15,v:d=>d.c},
  {id:"sp5",ic:"🎤",t:"৫টা বাক্য জোরে জোরে বলো",n:5,v:d=>d.speak||0},
  {id:"st1",ic:"🎧",t:"একটা গল্প শোনো বা পড়ো",n:1,v:d=>d.story||0},
  {id:"xp",ic:"⚡",t:"আজকের XP লক্ষ্য পূরণ করো",n:()=>S.goal,v:d=>d.xp},
  {id:"wu",ic:"👄",t:"মুখের warm-up করো",n:1,v:d=>d.warm?1:0}],
 kid:[
  {id:"kl1",ic:"⭐",t:"১টা লেসন খেলো",n:1,v:d=>d.lessons+d.practice},
  {id:"kc10",ic:"🖼️",t:"১০টা ছবি খুঁজে বের করো",n:10,v:d=>d.c},
  {id:"ks3",ic:"🎤",t:"৩টা শব্দ জোরে বলো",n:3,v:d=>d.speak||0},
  {id:"kst",ic:"📖",t:"একটা গল্প শোনো",n:1,v:d=>d.story||0},
  {id:"kcard",ic:"🃏",t:"ছবির কার্ড দেখো",n:1,v:d=>d.cards||0}]
};
function questsToday(){
  const pool=isKid()?QUESTS.kid:QUESTS.adult.filter(q=>q.id!=="wu"||warmAllowed());
  const seed=+today().replace(/-/g,"");const picks=[];let k=seed;
  while(picks.length<3&&picks.length<pool.length){k=(k*9301+49297)%233280;const q=pool[k%pool.length];if(!picks.includes(q))picks.push(q);}
  const d=day();return picks.map(q=>{const n=typeof q.n==="function"?q.n():q.n;const v=Math.min(n,q.v(d));return {...q,n,v,done:v>=n};});
}
function qOpen(){if(APP.qOpen!=null)return APP.qOpen;try{const v=localStorage.getItem("aec4:qopen");if(v!=null)return v==="1";}catch(e){}return innerWidth>=1180;}
function questCard(){
  const qs=questsToday(), all=qs.every(q=>q.done), d=day(), n=qs.filter(q=>q.done).length, open=qOpen();
  const C=2*Math.PI*15;
  return `<div class="card quests ${open?"open":""}"><button class="qhead" data-act="toggleQuests" aria-expanded="${open}"><span class="qring"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" class="qr0"/><circle cx="18" cy="18" r="15" class="qr1" stroke-dasharray="${(C*n/3).toFixed(1)} ${C.toFixed(1)}"/></svg><span>${qs.map(q=>q.done?"":q.ic)[qs.findIndex(q=>!q.done)]||"🎁"}</span></span>
    <span class="grow"><b>আজকের quest</b><span class="tiny muted">${all?(d.chest?"সব শেষ! কাল নতুন quest":"সব শেষ! পুরস্কার নাও"):`${n}/3 শেষ · ${esc(qs.find(q=>!q.done)?.t||"")}`}</span></span>
    <svg class="ddchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button>
   ${open?`<div class="qlist">${qs.map(q=>`<div class="quest ${q.done?"done":""}"><span class="qic">${q.ic}</span><div class="grow"><span class="small">${esc(q.t)}</span><span class="qbar"><i style="width:${Math.round(q.v/q.n*100)}%"></i></span></div><span class="tiny muted num">${q.v}/${q.n}</span></div>`).join("")}</div>`:""}
   ${all&&!d.chest?`<button class="btn wide gold" data-act="openChest">🎁 পুরস্কার খোলো (+১০ XP)</button>`:""}</div>`;
}

/* ================= badges ================= */
const BADGES=[
 {id:"first",ic:"🌱",t:"First step",d:"প্রথম লেসন",ok:()=>Object.keys(S.done).length>=1},
 {id:"s3",ic:"🔥",t:"On fire",d:"৩ দিনের streak",ok:()=>(S.best||0)>=3||streak()>=3},
 {id:"s7",ic:"🏆",t:"One week",d:"৭ দিনের streak",ok:()=>(S.best||0)>=7||streak()>=7},
 {id:"x100",ic:"⚡",t:"100 XP",d:"মোট ১০০ XP",ok:()=>S.xp>=100},
 {id:"x500",ic:"💎",t:"500 XP",d:"মোট ৫০০ XP",ok:()=>S.xp>=500},
 {id:"story",ic:"📖",t:"Storyteller",d:"প্রথম গল্প শেষ",ok:()=>Object.values(S.storyDone).some(x=>x.read)},
 {id:"speak",ic:"🎤",t:"Speaker",d:"২০টা বাক্য বলেছ",ok:()=>(S.speakTotal||0)>=20},
 {id:"perfect",ic:"✨",t:"Perfect",d:"কোনো ভুল ছাড়া লেসন",ok:()=>(S.perfect||0)>=1},
 {id:"unit",ic:"🎓",t:"Unit master",d:"একটা ইউনিট পুরো শেষ",ok:()=>allUnits().some(u=>u.lessons.length&&u.lessons.every((l,i)=>S.done[u.id+":"+i])&&S.storyDone[u.id]?.read)},
 {id:"warm7",ic:"👄",t:"Warm voice",d:"৭ দিন warm-up",ok:()=>(S.warmCount||0)>=7},
 {id:"quest",ic:"🎁",t:"Quest hero",d:"এক দিনে সব quest",ok:()=>Object.values(S.days).some(x=>x.chest)}
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
  if(PROFILES.length<2)return `<div class="card"><h3>পরিবারের লিগ</h3><p class="small muted">পরিবারের অন্যদের প্রোফাইল বানাতে দাও (স্ত্রী, বাচ্চারা)। প্রতি সপ্তাহে কে বেশি XP পায়, এখানে দেখাবে।</p><button class="btn sm ghost" data-act="addProfile">+ প্রোফাইল যোগ করো</button></div>`;
  const wk=weekKey();const rows=PROFILES.map(p=>({p,x:p.id===PID?weekXP(S):(p.wk&&p.wk[wk])||0})).sort((a,b)=>b.x-a.x);
  return `<div class="card"><div class="row between"><h3>পরিবারের লিগ</h3><span class="tiny muted">এই সপ্তাহে</span></div><div class="league">${rows.map((r,i)=>`<div class="lrow ${r.p.id===PID?"me":""}"><span class="lpos">${["🥇","🥈","🥉"][i]||i+1}</span>${avatarHTML(r.p,"sm")}<b class="grow">${esc(r.p.name)}</b><span class="num">${r.x} XP</span></div>`).join("")}</div></div>`;
}

/* ================= kid stickers ================= */
function stickerBook(){
  const st=S.stickers||[];
  return `<div class="card"><div class="row between"><h3>স্টিকারের বই</h3><span class="chip">${st.length}</span></div>${st.length?`<div class="stickers">${st.map(x=>`<span>${x}</span>`).join("")}</div>`:`<p class="small muted">লেসন শেষ করলে নতুন স্টিকার পাবে!</p>`}</div>`;
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
  return `<main class="welcome"><div class="wl-hero">${ART_OK?"":`<div class="floaters" aria-hidden="true"><span>💬</span><span>🎧</span><span>🎤</span><span>📖</span><span>⭐</span><span>🧸</span></div>`}
   ${ART_OK?art("hero-family","wl-hero-img"):`<div class="wl-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h14a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-8l-4.5 3.2c-.5.4-1.2 0-1.2-.6V17.5H5a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3z" fill="#fff"/><rect x="7.3" y="9" width="2.4" height="5" rx="1.2" fill="#e8782a"/><rect x="10.8" y="7.4" width="2.4" height="8.2" rx="1.2" fill="#f2b632"/><rect x="14.3" y="9" width="2.4" height="5" rx="1.2" fill="#e8782a"/></svg></div>`}<span class="eyebrow">Bolo English · Speak English, every day</span><h1>English বলো আত্মবিশ্বাসে, প্রতিদিন</h1>
   <p class="muted bn">ছোট-বড় সবার জন্য: বাচ্চারা ছবি আর খেলায়, বড়রা কাজ, পরিবার আর দৈনন্দিন কথায়। প্রতিদিন ১০–২০ মিনিট।</p></div>
   <div class="method">${[["👄","Warm-up","মুখ আর জিভ রেডি","m-warm"],["🧩","Learn","ছোট ছোট লেসন, গেমের মতো","m-learn"],["🎤","Speak","বলো, অ্যাপ শুনে মিলিয়ে দেখে","m-speak"],["📖","Story","গল্প শুনে নিজে বলো","m-story"]].map(([i,t,b,a],k)=>`<div class="mstep">${ART_OK?art(a,"mart"):`<span class="mic">${i}</span>`}<b>${k+1}. ${t}</b><span class="tiny bn muted">${b}</span></div>`).join("")}</div>
   <button class="btn wide xl" data-act="onbStart">শুরু করি</button>
   ${CLOUD.avail()&&!CLOUD.user?`<div class="orline"><span>অথবা</span></div>${gBtn("Continue with Google","wide")}${CLOUD.err?`<p class="warnbox small">${esc(CLOUD.err)}</p>`:""}`:""}
   <p class="tiny muted center">লগইন ছাড়াও চলে। Google দিয়ে লগইন করলে সব ডিভাইসে একই অগ্রগতি থাকবে।</p></main>`;
}
function viewOnb(){
  const O=APP.onb,d=O.draft,steps=d.age==="kid"?["name","avatar","age","goal","done"]:["name","avatar","age","goals","goal","warm","done"];
  const st=steps[O.step];const pct=Math.round(O.step/(steps.length-1)*100);
  let body="",can=true,nextLbl="Continue";
  if(st==="name"){body=`<span class="onb-ic">👋</span><h1>তোমার নাম কী?</h1><p class="muted">বাচ্চার জন্য বানালে তার নাম লেখো।</p><input type="text" id="onb-name" maxlength="20" value="${esc(d.name||"")}" placeholder="Naam" autocomplete="off">`;}
  if(st==="avatar"){body=`<span class="onb-ic">${d.photo?`<span class="av xl photo"><img src="${d.photo}" alt=""></span>`:esc(d.avatar||"🙂")}</span><h1>একটা অবতার বাছো</h1><label class="btn ghost photobtn">${IC.cam} নিজের ছবি দাও<input type="file" id="onbPhoto" accept="image/*" hidden></label>${d.photo?`<p class="small okbox">ছবি যোগ হয়েছে ✓</p>`:""}<div class="avgrid">${AVATARS.map(a=>`<button class="avpick" data-act="onbSet" data-k="avatar" data-v="${a}" aria-pressed="${d.avatar===a}">${a}</button>`).join("")}</div>`;can=!!(d.avatar||d.photo);}
  if(st==="age"){body=`<span class="onb-ic">🎂</span><h1>${esc(d.name)}-এর বয়স?</h1><div class="opts">${AGES.map(([v,l,bn,ic,sub])=>`<button class="opt big" data-act="onbSet" data-k="age" data-v="${v}" aria-pressed="${d.age===v}"><span class="oic">${ic}</span><span class="grow"><b>${l} <span class="bn muted">· ${bn}</span></b><span class="small muted">${sub}</span></span></button>`).join("")}</div>`;can=!!d.age;}
  if(st==="goals"){body=`<span class="onb-ic">🎯</span><h1>কী জন্য ইংরেজি শিখবে?</h1><p class="muted">এক বা একাধিক বাছো।</p><div class="opts">${GOALS.map(([v,l,bn,ic])=>`<button class="opt big" data-act="onbGoal" data-v="${v}" aria-pressed="${(d.goals||[]).includes(v)}"><span class="oic">${ic}</span><span class="grow"><b>${l}</b><span class="small bn muted">${bn}</span></span></button>`).join("")}</div>`;can=(d.goals||[]).length>0;}
  if(st==="goal"){const opts=d.age==="kid"?[[10,"৫ মিনিট","একটু একটু"],[20,"১০ মিনিট","প্রতিদিন"],[30,"১৫ মিনিট","বেশি"]]:[[20,"১০ মিনিট","হালকা"],[30,"১৫ মিনিট","নিয়মিত"],[50,"২০ মিনিট","সিরিয়াস"],[80,"৩০ মিনিট","খুব সিরিয়াস"]];
    body=`<span class="onb-ic">⏱️</span><h1>প্রতিদিন কত সময়?</h1><div class="opts">${opts.map(([v,l,s])=>`<button class="opt big" data-act="onbSet" data-k="goal" data-v="${v}" aria-pressed="${+d.goal===v}"><span class="oic">⚡</span><span class="grow"><b>${l}</b><span class="small muted">${s} · দিনে ${v} XP</span></span></button>`).join("")}</div>`;can=!!d.goal;}
  if(st==="warm"){body=`<span class="onb-ic">👄</span><h1>লেসনের আগে মুখের warm-up?</h1><p class="muted">জিভ আর ঠোঁটের ব্যায়াম, tongue twister আর কলম-মুখে পড়া। উচ্চারণে বড় পার্থক্য আনে।</p><div class="opts">${[["full","পুরো warm-up (১০–১৫ মিনিট)","স্পষ্ট উচ্চারণের জন্য সবচেয়ে ভালো"],["quick","ছোট warm-up (৫ মিনিট)","ব্যস্ত দিনের জন্য"],["off","এখন না","পরে Settings থেকে চালু করা যাবে"]].map(([v,l,s])=>`<button class="opt big" data-act="onbSet" data-k="warm" data-v="${v}" aria-pressed="${d.warm===v}"><span class="grow"><b>${l}</b><span class="small muted">${s}</span></span></button>`).join("")}</div>`;can=!!d.warm;}
  if(st==="done"){const tr=d.age==="kid"?["kids"]:d.goals;body=`<span class="onb-ic big">${d.photo?`<span class="av xl photo"><img src="${d.photo}" alt=""></span>`:esc(d.avatar)}</span><h1>${esc(d.name)}-এর প্ল্যান তৈরি!</h1>
    <div class="card plan">${tr.map(t=>{const T=TRACKS.find(x=>x[0]===t);return `<div class="row"><span class="chip trk ${t}">${T[1]}</span><span class="small bn muted">${T[2]}</span></div>`;}).join("")}
     <p class="small">${d.age==="kid"?"ছবি দেখে, আওয়াজ শুনে, খেলতে খেলতে শব্দ শিখবে। প্রতিটা লেসনে নতুন স্টিকার!":`প্রতিদিন: ${d.warm!=="off"?"warm-up → ":""}লেসন → বলার অনুশীলন → গল্প। ভুলগুলো অ্যাপ মনে রাখে আর সময়মতো আবার আনে।`}</p>
     <p class="tiny muted">দৈনিক লক্ষ্য: ${d.goal} XP · ${d.age==="kid"?"Kids mode":"Adult/teen mode"}</p></div>`;nextLbl="Shuru!";}
  return `<main class="onb"><div class="onb-head">${O.step>0||PROFILES.length?`<button class="icon-btn" data-act="onbBack" aria-label="Back">${IC.back}</button>`:"<span></span>"}<div class="pbar"><i style="width:${pct}%"></i></div></div>
   <div class="onb-body">${body}</div>
   <div class="onb-foot"><button class="btn wide xl" data-act="onbNext" ${can?"":"disabled"}>${nextLbl}</button></div></main>`;
}
const PK_OUT='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-3"/><path d="M9 8l-4 4 4 4M5 12h10"/></svg>';
const PK_DEL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>';
const PICK_ACT={
 pkLogout(){logoutAll();},
 pkDel(el){const p=PROFILES.find(x=>x.id===el.dataset.id);if(!p)return;
  APP.modal=`<div class="modal" data-act="closeModal"><div class="card pk-ask" role="alertdialog" aria-labelledby="pkq"><span class="pk-askic nm ring light"><span class="nm-well">${PK_DEL}</span></span>
   <h3 id="pkq">Are you sure you want to delete this profile?</h3><p class="small muted"><b>${esc(p.name)}</b>-এর সব অগ্রগতি মুছে যাবে, আর ফেরানো যাবে না।</p>
   <div class="row pk-askbtns"><button class="btn ghost" data-act="closeModal">No</button><button class="btn bad" data-act="pkDelYes" data-id="${esc(p.id)}">Yes, delete</button></div></div></div>`;render();},
 async pkDelYes(el){const id=el.dataset.id;el.disabled=true;
  await Store.delProfile(id);CLOUD.removeProfile(id);PROFILES=PROFILES.filter(p=>p.id!==id);
  if(PID===id){PID=null;S=defaultState();CUSTOM={};MARKS={};}
  APP.modal=null;await Store.saveProfiles();APP.picker=PROFILES.length>0;APP.welcome=!PROFILES.length;render();toast("প্রোফাইল মুছে ফেলা হয়েছে");}
};
function viewPicker(){
  const h=new Date().getHours(),g=h<5?"Good night":h<12?"Good morning":h<17?"Good afternoon":"Good evening";
  const role=p=>p.age==="kid"?"Kids · 3–7":p.age==="teen"?"Teen":"Adult";
  const last=p=>!p.last?"New":p.last===today()?"Today":p.last===addDays(-1)?"Yesterday":"";
  return `<main class="picker2"><div class="pk-glow" aria-hidden="true"></div>${CLOUD.avail()&&CLOUD.user?`<button class="pk-out nm" data-act="pkLogout" aria-label="Log out" title="Log out"><span class="nm-well">${PK_OUT}</span></button>`:""}
   <div class="pk-top"><span class="pk-logo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h14a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-8l-4.5 3.2c-.5.4-1.2 0-1.2-.6V17.5H5a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3z" fill="#fff"/><rect x="7.3" y="9" width="2.4" height="5" rx="1.2" fill="#e8782a"/><rect x="10.8" y="7.4" width="2.4" height="8.2" rx="1.2" fill="#f2b632"/><rect x="14.3" y="9" width="2.4" height="5" rx="1.2" fill="#e8782a"/></svg></span><span class="pk-brand">Bolo English</span></div>
   <div class="pk-head"><span class="pk-hi"><i></i>${g}</span><h1>Who's learning today?</h1><p>Choose your profile. Everyone keeps their own progress.</p></div>
   <div class="pk-grid">${PROFILES.map(p=>`<div class="pk-cell"><button class="pk-del nm ring round" data-act="pkDel" data-id="${esc(p.id)}" aria-label="Delete ${esc(p.name)}" title="Delete profile"><span class="nm-well">${PK_DEL}</span></button><button class="pk-card ${p.age==="kid"?"kid":""}" data-act="pickProfile" data-id="${esc(p.id)}">
      ${last(p)?`<span class="pk-last ${p.last===today()?"live":""}">${last(p)}</span>`:""}
      <span class="pk-ring">${avatarHTML(p,"xl")}</span>
      <b class="pk-name">${esc(p.name)}</b><span class="pk-role">${role(p)}</span>
      <span class="pk-stats"><span><em>${p.streak||0}</em>Streak</span><span><em>${p.xp||0}</em>XP</span></span></button></div>`).join("")}</div>
   <button class="pk-add" data-act="addProfile"><span class="pk-plus"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span><span class="grow"><b>Add a profile</b><small>Partner, kids, anyone</small></span><span class="pk-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 7l5 5-5 5"/></svg></span></button><p class="pk-copy">© 2026 Ali Akbar · BD Webhut</p></main>`;
}
