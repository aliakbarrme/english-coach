/* ================= progress report: course level, skills, weekly report ================= */
const LEVELS=[["Pre-A1","স্টার্টার"],["A1","বিগিনার"],["A2","এলিমেন্টারি"],["B1","ইন্টারমিডিয়েট"],["B2","আপার-ইন্টারমিডিয়েট"]];
const UNIT_LV={k:0,f:1,e1:1,e2:1,e3:2,e4:2,e5:2,c1:2,c2:2,c3:3,c4:3,c5:3};
function unitLevel(u){if(UNIT_LV[u.id]!=null)return UNIT_LV[u.id];if(UNIT_LV[u.id[0]]!=null)return UNIT_LV[u.id[0]];return null;}
const SKILLS=[["listen","শুনে বোঝা","🎧"],["vocab","শব্দ ও অর্থ","📚"],["write","বাক্য গঠন","✍️"],["speak","বলা","🎤"]];
const EX_SKILL={meaning:"vocab",fill:"vocab",match:"vocab",listen:"listen",kpick:"listen",kfind:"listen",build:"write",type:"write",speak:"speak",ksay:"speak"};
function skillHit(t,ok){const k=EX_SKILL[t];if(!k)return;S.skill=S.skill||{};const r=S.skill[k]||(S.skill[k]={c:0,t:0});r.t++;if(ok)r.c++;const d=day();d.sk=d.sk||{};const q=d.sk[k]||(d.sk[k]={c:0,t:0});q.t++;if(ok)q.c++;}
function addMinutes(m){const d=day();d.mins=Math.round(((d.mins||0)+m)*10)/10;}

function courseLevel(){
  const tracks=myTracks().map(t=>t[0]);
  const lessons=[];allUnits().filter(u=>tracks.includes(u.track)).forEach(u=>{const lv=unitLevel(u);if(lv==null)return;u.lessons.forEach((l,i)=>{const d=S.done[u.id+":"+i];lessons.push({lv,done:!!d&&(d.acc==null||d.acc>=60)});});});
  const levels=[...new Set(lessons.map(x=>x.lv))].sort((a,b)=>a-b);
  let cur=-1;for(const lv of levels){const at=lessons.filter(x=>x.lv===lv);if(at.length&&at.filter(x=>x.done).length/at.length>=.6)cur=lv;else break;}
  const next=levels.find(lv=>lv>cur);
  const nextAt=next==null?[]:lessons.filter(x=>x.lv===next);
  const pct=nextAt.length?Math.round(nextAt.filter(x=>x.done).length/nextAt.length/.6*100):100;
  return {cur,next,pct:Math.min(100,pct),levels,done:lessons.filter(x=>x.done).length,total:lessons.length};
}
function kidLevel(){const n=Object.keys(S.done).filter(k=>k[0]==="k").length;const st=[["🌱","বীজ"],["🌿","চারা"],["🌸","ফুল"],["🌳","গাছ"],["⭐","তারা"]];const i=Math.min(4,Math.floor(n/5));return {i,ic:st[i][0],name:st[i][1],next:st[i+1],pct:i>=4?100:Math.round((n%5)/5*100),n};}
function levelChip(){
  if(isKid()){const k=kidLevel();return `<button class="lvchip" data-act="tab" data-v="me">${k.ic} ${k.name}<span class="lvbar"><i style="width:${k.pct}%"></i></span></button>`;}
  const c=courseLevel();const name=c.cur<0?"শুরু":LEVELS[c.cur][0];
  return `<button class="lvchip" data-act="tab" data-v="me" title="Progress report">📈 ${name}${c.next!=null?`<span class="lvbar"><i style="width:${c.pct}%"></i></span><span class="tiny muted">${LEVELS[c.next][0]}</span>`:""}</button>`;
}
function weekDays(){const out=[];for(let i=6;i>=0;i--){const k=addDays(-i);const r=S.days[k]||{};out.push({k,lbl:new Date(k+"T12:00:00").toLocaleDateString("en-GB",{weekday:"narrow"}),xp:r.xp||0,mins:r.mins||0,les:(r.lessons||0)+(r.practice||0),c:r.c||0,t:r.t||0,warm:!!r.warm});}return out;}
function skillRows(){
  return SKILLS.map(([k,l,ic])=>{const r=(S.skill||{})[k]||{c:0,t:0};const p=r.t?Math.round(r.c/r.t*100):null;
    return `<div class="skrow"><span class="skic">${ic}</span><div class="grow"><div class="row between"><b class="small">${l}</b><span class="tiny muted num">${r.t>=5?p+"%":r.t?"অল্প ডেটা":"এখনো নেই"}</span></div><span class="skbar ${p!=null&&p<60?"low":""}"><i style="width:${r.t>=5?p:0}%"></i></span></div></div>`;}).join("");
}
function advice(){
  const out=[];const sk=S.skill||{};const pct=k=>sk[k]&&sk[k].t>=5?sk[k].c/sk[k].t:null;
  const due=dueItems().length;if(due)out.push(`🔁 ${due}টা বাক্য রিভিশন বাকি, Practice-এ ৫ মিনিট দাও।`);
  const weak=SKILLS.filter(([k])=>pct(k)!=null&&pct(k)<.7).sort((a,b)=>pct(a[0])-pct(b[0]))[0];
  if(weak)out.push(`${weak[2]} ${weak[1]} দুর্বল (${Math.round(pct(weak[0])*100)}%)। ${weak[0]==="speak"?"প্রতিদিন ৫টা বাক্য জোরে বলো।":weak[0]==="listen"?"অডিও আগে শোনো, তারপর লেখা দেখো।":weak[0]==="write"?"বাক্য সাজানোর আগে পুরোটা একবার মনে মনে বলো।":"নতুন শব্দ কার্ডে দেখে মুখে বলো।"}`);
  if(!(sk.speak&&sk.speak.t))out.push("🎤 এখনো বলার অনুশীলন হয়নি। লেসনের মাইক বাটনে চেপে বলো।");
  if(warmAllowed()&&S.warmReq&&!warmToday())out.push("👄 আজকের warm-up বাকি।");
  const w=weekDays();if(w.filter(x=>x.les>0).length<3)out.push("📅 সপ্তাহে অন্তত ৫ দিন অল্প করে শেখো, একদিনে অনেক নয়।");
  return out.slice(0,3);
}
function progressReport(){
  const w=weekDays(),max=Math.max(10,...w.map(x=>x.xp)),wxp=w.reduce((a,x)=>a+x.xp,0),wmin=Math.round(w.reduce((a,x)=>a+x.mins,0)),wles=w.reduce((a,x)=>a+x.les,0);
  const wc=w.reduce((a,x)=>a+x.c,0),wt=w.reduce((a,x)=>a+x.t,0);
  let head;
  if(isKid()){const k=kidLevel();head=`<div class="lvhero kid"><span class="lvbig">${k.ic}</span><div class="grow"><span class="eyebrow">এখনকার লেভেল</span><h2>${k.name}</h2><span class="lvbar big"><i style="width:${k.pct}%"></i></span><span class="tiny muted">${k.next?`আরো ${5-(k.n%5)}টা লেসন করলে ${k.next[0]} ${k.next[1]}`:"সব লেভেল শেষ! দারুণ!"}</span></div></div>`;}
  else{const c=courseLevel();const cur=c.cur<0?["শুরু","প্রথম লেভেলের দিকে"]:LEVELS[c.cur];
    head=`<div class="lvhero"><span class="lvbig">${esc(cur[0])}</span><div class="grow"><span class="eyebrow">কোর্স লেভেল</span><h2>${esc(cur[1])}</h2>
     ${c.next!=null?`<span class="lvbar big"><i style="width:${c.pct}%"></i></span><span class="tiny muted">${LEVELS[c.next][0]} ${LEVELS[c.next][1]}-এর দিকে ${c.pct}% · ${c.done}/${c.total} লেসন শেষ</span>`:`<span class="tiny muted">তোমার বাছাই করা ট্র্যাকের সব লেভেল শেষ। নতুন ট্র্যাক যোগ করো (Edit)।</span>`}
     ${ASSESS&&PID==="ali"?`<span class="tiny muted">Placement test: ${esc(ASSESS.level)} (আনুমানিক)</span>`:""}</div></div>
     <div class="lvladder">${c.levels.map(lv=>`<span class="${lv<=c.cur?"on":""} ${lv===c.next?"next":""}">${LEVELS[lv][0]}</span>`).join("")}</div>`;}
  return `<div class="card report"><div class="row between"><h3>Progress report</h3><span class="tiny muted">অ্যাপের কোর্স অনুযায়ী, অফিশিয়াল পরীক্ষা নয়</span></div>${head}
   <div class="rgrid"><div><span class="eyebrow">দক্ষতা (প্রথম চেষ্টায় সঠিক)</span><div class="skills">${skillRows()}</div></div>
    <div><span class="eyebrow">এই সপ্তাহ</span><div class="wkbars">${w.map(x=>`<div class="wk ${x.k===today()?"today":""}" title="${x.k}: ${x.xp} XP"><span style="height:${Math.round(x.xp/max*100)}%"></span><i>${x.lbl}</i></div>`).join("")}</div>
     <div class="wkstats"><div><b class="num">${wxp}</b><span class="tiny muted">XP</span></div><div><b class="num">${wmin}</b><span class="tiny muted">মিনিট</span></div><div><b class="num">${wles}</b><span class="tiny muted">লেসন</span></div><div><b class="num">${wt?Math.round(wc/wt*100)+"%":"—"}</b><span class="tiny muted">সঠিক</span></div></div></div></div>
   ${advice().length?`<div class="advice"><span class="eyebrow">এরপর কী করবে</span>${advice().map(a=>`<p class="small">${a}</p>`).join("")}</div>`:""}</div>`;
}

function progressMini(){
  let head;
  if(isKid()){const k=kidLevel();head=`<div class="lvhero kid sm"><span class="lvbig">${k.ic}</span><div class="grow"><b>${k.name}</b><span class="lvbar big"><i style="width:${k.pct}%"></i></span></div></div>`;}
  else{const c=courseLevel();const cur=c.cur<0?["শুরু",""]:LEVELS[c.cur];head=`<div class="lvhero sm"><span class="lvbig">${esc(cur[0])}</span><div class="grow"><b>${c.next!=null?`${LEVELS[c.next][0]}-এর দিকে ${c.pct}%`:"সব লেভেল শেষ"}</b><span class="lvbar big"><i style="width:${c.next!=null?c.pct:100}%"></i></span></div></div>`;}
  return `<div class="card"><div class="row between"><h3>আমার লেভেল</h3><button class="linkbtn" data-act="tab" data-v="me">পুরো রিপোর্ট →</button></div>${head}${isKid()?"":`<div class="skills">${skillRows()}</div>`}</div>`;
}
