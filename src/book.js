/* ================= 📘 My English Book (Nirjhar Education) =================
   The book's own text is private: it is never in this public code. It comes from
   (1) BOOK_EMBED in the private Claude artifact, or (2) the account's Firestore doc users/{uid}/p/_book
   (added once by the parent with "Import book file"), cached on this device until logout.
   Flow per chapter: 📘 Book page → 🔁 Revision → 📝 Quiz → 🎮 Game → 🎵 Rhyme → ⭐ Done → next chapter unlocks.
   Everything that is not the book is labelled "✨ Extra". */
const BOOK_EMBED=/*__BOOK_EMBED__*/null;
const BOOK={data:null,state:"idle",err:null,
 async load(){
  if(this.data)return this.data;
  if(BOOK_EMBED){this.data=BOOK_EMBED;this.state="ready";return this.data;}
  try{const c=localStorage.getItem("aec4:bookdata");if(c){this.data=JSON.parse(c);this.state="ready";return this.data;}}catch(e){}
  if(CLOUD.avail()&&CLOUD.user){
   this.state="loading";render();
   try{const {fs}=await CLOUD.load();const d=await fs.getDoc(CLOUD.ref("p","_book"));
    if(d.exists()&&d.data().json){this.data=JSON.parse(d.data().json);this.cache();this.state="ready";}else this.state="none";}
   catch(e){this.state="none";this.err="বই লোড হয়নি ("+((e&&e.code)||"error")+")।";}
   render();return this.data;}
  this.state="none";return null;
 },
 cache(){try{localStorage.setItem("aec4:bookdata",JSON.stringify(this.data));}catch(e){}},
 valid(d){return d&&Array.isArray(d.levels)&&d.levels.every(l=>Array.isArray(l.chapters));},
 async importFile(file){
  this.err=null;
  try{const d=JSON.parse(await file.text());if(!this.valid(d))throw new Error("bad");
   this.data=d;this.cache();this.state="ready";
   if(CLOUD.avail()&&CLOUD.user){const {fs}=await CLOUD.load();await fs.setDoc(CLOUD.ref("p","_book"),{json:JSON.stringify(d),v:d.v||1,updated:Date.now()});toast("📘 বই যোগ হয়েছে, সব ডিভাইসে পাবে");}
   else toast("📘 বই যোগ হয়েছে");
  }catch(e){this.err=e&&e.message==="bad"?"এটা বইয়ের ফাইল না (book.json দাও)।":"বই যোগ হয়নি ("+((e&&e.code)||"error")+")।";}
  render();
 },
 ch(id){for(const l of (this.data?.levels||[]))for(const c of l.chapters)if(c.id===id)return c;return null;},
 levelOf(id){return (this.data?.levels||[]).find(l=>l.chapters.some(c=>c.id===id));}
};
function BK(){const b=S.book||(S.book={c:{},stars:0});b.c=b.c||{};return b;}
function bkSt(id){const b=BK();return b.c[id]||(b.c[id]={step:0,stars:0,done:false});}
function bkOpen(c,lv){if(!c.ready)return false;const i=lv.chapters.indexOf(c);if(i<=0)return true;const p=lv.chapters[i-1];return !!(BK().c[p.id]&&BK().c[p.id].done);}
const bkShuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const bkWait=ms=>new Promise(r=>setTimeout(r,ms));
const BK_STEPS=[["📘","বই"],["🔁","রিভিশন"],["📝","কুইজ"],["🎮","খেলা"],["🎵","ছড়া"],["⭐","শেষ"]];
let BK_RUN=0;
/* letter name for a capital letter, using the same voice clips as the ABC board */
const bkLetterSay=c=>(typeof LETTER!=="undefined"&&LETTER[c.toLowerCase()])||c;
const bkSoundOf=w=>{const c=w[0].toLowerCase();return c==="p"?"P":c==="t"?"T":(c==="k"||c==="c")?"K":null;};

/* ✨ Extra rhymes (not from the book): a traditional public-domain rhyme or an original chant */
const BK_RHYME={
 L1C1:{title:"The Alphabet Song",src:"Traditional rhyme (public domain)",letters:[["A","B","C","D","E","F","G"],["H","I","J","K","L","M","N","O","P"],["Q","R","S","T","U","V"],["W","X","Y","and","Z"]],
  end:["Now I know my A B C,","next time won't you sing with me!"]},
 L1C2:{title:"Puff, Tap and Kick!",src:"Original chant · Bolo English",
  lines:["Puff for P: pen, pan, potato!","Tap for T: table, tiger, tomato!","Kick for K: kite, king, cat. Hooray!","P, T, K — say them every day!"]}
};
function BOOK_TEXTS(){const out=[];for(const r of Object.values(BK_RHYME)){(r.end||[]).forEach(t=>out.push(t));(r.lines||[]).forEach(t=>out.push(t));}return out;}

/* ---------- views ---------- */
function bkTop(back,label){return `<div class="bk-top"><button class="icon-btn" data-act="${back}" aria-label="Back">${back==="bookClose"?IC.close:IC.back}</button><span class="bk-toplbl">${label}</span><span class="bk-stars">⭐ <b>${BK().stars||0}</b></span></div>`;}
function viewBook(){
 const A=APP.book;
 if(!BOOK.data&&BOOK.state!=="ready"){
  if(BOOK.state==="idle")setTimeout(()=>BOOK.load().then(()=>render()),0);
  return `<main class="view bookview">${bkTop("bookClose","📘 My English Book")}
   ${BOOK.state==="loading"||BOOK.state==="idle"?`<div class="bk-empty"><span class="bk-spin"></span><p>বই খোলা হচ্ছে…</p></div>`
   :`<div class="bk-empty card"><span class="bk-bigem">📘</span><h2>বইটা এখনো যোগ করা হয়নি</h2>
    <p class="small muted">বাবা/মা একবার <b>book.json</b> ফাইলটা যোগ করলেই হবে। এটা শুধু তোমার অ্যাকাউন্টে থাকবে, অন্য কেউ দেখতে পাবে না।</p>
    ${BOOK.err?`<p class="warnbox small">${esc(BOOK.err)}</p>`:""}
    <label class="btn good bk-import">📂 বইয়ের ফাইল যোগ করো<input type="file" id="bkFile" accept=".json,application/json" hidden></label></div>`}</main>`;}
 if(A.scr==="ch")return viewBookChapter();
 const D=BOOK.data,b=BK();
 const done=D.levels.reduce((n,l)=>n+l.chapters.filter(c=>b.c[c.id]?.done).length,0),total=D.levels.reduce((n,l)=>n+l.chapters.length,0);
 return `<main class="view bookview">${bkTop("bookClose","📘 My English Book")}
  <div class="bk-hero"><div class="grow"><span class="bk-pub">${esc(D.publisher||"")}</span><h1>${esc(myName())}'s Book</h1><p class="bn">প্রতি চ্যাপ্টার: বই → রিভিশন → কুইজ → খেলা → ছড়া → ⭐</p>
   <div class="pbar"><i style="width:${Math.round(done/Math.max(1,total)*100)}%"></i></div><span class="tiny muted">${done}/${total} চ্যাপ্টার শেষ</span></div><span class="bk-heroem">📘</span></div>
  ${D.levels.map(l=>`<section class="bk-level"><h2>${esc(l.title)} <small>${esc(l.sub||"")}</small></h2><div class="bk-path">
   ${l.chapters.map((c,i)=>{const st=b.c[c.id],open=bkOpen(c,l),cur=open&&!st?.done;
    const cls=st?.done?"done":!c.ready?"soon":open?"cur":"lock";
    return `<button class="bk-node ${cls}" data-act="bookCh" data-id="${esc(c.id)}" ${cls==="lock"||cls==="soon"?"aria-disabled=\"true\"":""}>
     <span class="bk-num">${st?.done?"✓":c.no}</span><span class="grow"><b>Chapter ${c.no}</b><span class="bk-ct">${esc(c.title)}</span></span>
     <span class="bk-nstate">${st?.done?"⭐".repeat(st.stars||1):cls==="soon"?"শীঘ্রই":cls==="lock"?"🔒":`<i class="bk-go">শুরু ➜</i>`}</span></button>`;}).join("")}
  </div></section>`).join("")}
  <p class="tiny muted center">📘 = বইয়ের লেখা · ✨ = মজার বাড়তি কাজ (বইয়ের বাইরে)</p></main>`;
}
function bkStepper(st,step){return `<div class="bk-steps">${BK_STEPS.map(([ic,lb],i)=>`<button class="bk-step ${i<step?"ok":i===step?"on":""}" data-act="bookStep" data-n="${i}" ${i>Math.max(st.step,step)?"disabled":""}><i>${ic}</i><span>${lb}</span></button>`).join("")}</div>`;}
function viewBookChapter(){
 const A=APP.book,c=BOOK.ch(A.id),st=bkSt(A.id);if(!c)return `<main class="view"><p>Chapter পাওয়া যায়নি।</p></main>`;
 const body=[bkPage,bkRevise,bkQuiz,bkGame,bkRhyme,bkDone][A.step](c,st,A);
 return `<main class="view bookview bk-run">${bkTop("bookHome",`Chapter ${c.no}`)}${bkStepper(st,A.step)}${body}</main>`;
}
const bkSrc=p=>`<span class="bk-src">📘 বই থেকে · পৃষ্ঠা ${Array.isArray(p)?p.join("–"):p}</span>`;
const bkExtra=t=>`<span class="bk-extra">✨ Extra · ${t}</span>`;
const bkNext=(lbl)=>`<button class="btn good wide bk-next" data-act="bookNext">${lbl} ➜</button>`;
function bkPage(c,st){
 if(c.kind==="letters")return `<div class="bk-paper">${bkSrc(c.pages)}<h2 class="bk-h">${esc(c.title)}</h2>
   <p class="small muted bn">অক্ষরে চাপো, শোনো আর বলো।</p>
   <div class="bk-letters">${c.items.map((it,i)=>`<button class="bk-let" data-act="bookSay" data-l="${esc(it.en)}" data-i="${i}"><b>${esc(it.en)}</b><span class="bn">(${esc(it.pr)})</span></button>`).join("")}</div>
   <div class="row center"><button class="btn" data-act="bookPlayAll">▶ সব শোনো</button></div></div>${bkNext("পরের ধাপ: রিভিশন")}`;
 if(c.kind==="sounds")return `<div class="bk-paper">${bkSrc(c.pages)}<h2 class="bk-h">${esc(c.title)}</h2>
   ${c.sounds.map(s=>`<section class="bk-sec"><h3><span class="bk-snd">${s.sound}</span> ${esc(s.title)}</h3><p class="bn">${esc(s.intro)}</p>
    <table class="bk-tb"><thead><tr>${s.cols.map(h=>`<th>${esc(h)}</th>`).join("")}<th></th></tr></thead><tbody>${s.rows.map(r=>`<tr data-act="bookSay" data-t="${esc(r.en)}"><td><b>${esc(r.en)}</b></td><td class="bn">${esc(r.pr)}</td><td class="bn">${esc(r.bn)}</td><td class="bk-spk">${IC.speak}</td></tr>`).join("")}</tbody></table></section>`).join("")}
   <section class="bk-sec"><h3>${esc(c.mixed.title)}</h3><p class="bn">${esc(c.mixed.intro)}</p>
    <div class="bk-mix">${c.mixed.rows.flat().map(w=>`<button class="bk-w" data-act="bookSay" data-t="${esc(w)}">${esc(w)}</button>`).join("")}</div></section>
   ${(c.after||[]).map(t=>`<p class="bn small">${esc(t)}</p>`).join("")}</div>${bkNext("পরের ধাপ: রিভিশন")}`;
 return `<p>শীঘ্রই আসছে।</p>`;
}
function bkRevise(c,st,A){
 const it=c.items,i=Math.min(A.ri||0,it.length-1),x=it[i],last=i>=it.length-1;
 return `<div class="bk-card-wrap">${bkExtra("রিভিশন (বইয়ের শব্দ দিয়ে)")}
  <div class="bk-flash" data-k="${i}"><span class="bk-fen">${esc(x.en)}</span><span class="bn bk-fpr">${esc(x.pr)}</span>${x.bn?`<span class="bn bk-fbn">${esc(x.bn)}</span>`:""}
   <button class="bk-round" data-act="bookSayCur" aria-label="Listen">${IC.speak}</button></div>
  <div class="dots bk-dots"><span class="tiny muted">${i+1} / ${it.length}</span></div>
  <div class="row center"><button class="btn ghost" data-act="bookRev" data-d="-1" ${i?"":"disabled"}>${IC.back} আগের</button>
   ${last?`<button class="btn good" data-act="bookNext">কুইজে যাও ➜</button>`:`<button class="btn" data-act="bookRev" data-d="1">পরেরটা ➜</button>`}</div>
  <p class="small muted center bn">শোনো, তারপর জোরে জোরে ২ বার বলো।</p></div>`;
}
function bkMakeQuiz(c){
 const it=c.items,qs=[];
 if(c.kind==="letters"){
  bkShuf(it).slice(0,4).forEach(x=>qs.push({t:"listen",say:bkLetterSay(x.en),q:"শোনো, কোন অক্ষর?",ans:x.en,opts:bkShuf([x.en,...bkShuf(it.filter(y=>y!==x)).slice(0,3).map(y=>y.en)])}));
  bkShuf(it).slice(0,4).forEach(x=>qs.push({t:"pr",q:`"${x.en}" কীভাবে বলে?`,big:x.en,ans:x.pr,opts:bkShuf([x.pr,...bkShuf(it.filter(y=>y!==x)).slice(0,3).map(y=>y.pr)])}));
 }else{
  const S3=bkShuf(it);
  S3.slice(0,3).forEach(x=>qs.push({t:"listen",say:x.en,q:"শোনো, কোন শব্দ?",ans:x.en,opts:bkShuf([x.en,...bkShuf(it.filter(y=>y!==x)).slice(0,3).map(y=>y.en)])}));
  S3.slice(3,6).forEach(x=>qs.push({t:"mean",q:`"${x.en}" মানে কী?`,big:x.en,say:x.en,ans:x.bn,opts:bkShuf([x.bn,...bkShuf(it.filter(y=>y.bn!==x.bn)).slice(0,3).map(y=>y.bn)])}));
  S3.slice(6,8).forEach(x=>qs.push({t:"snd",q:`"${x.en}" কোন আওয়াজ দিয়ে শুরু?`,big:x.en,say:x.en,ans:bkSoundOf(x.en),opts:["P","T","K"]}));
 }
 return bkShuf(qs).map(q=>Object.assign(q,{opts:[...new Set(q.opts)]}));
}
function bkQuiz(c,st,A){
 const Q=A.q||(A.q={qs:bkMakeQuiz(c),i:0,ok:0,pick:null});
 if(Q.i>=Q.qs.length){const n=Q.qs.length,pass=Q.ok>=Math.ceil(n*.6),stars=Q.ok===n?3:Q.ok>=Math.ceil(n*.75)?2:1;
  return `<div class="bk-res">${bkExtra("কুইজ")}<span class="bk-bigem">${pass?"🎉":"💪"}</span><h2>${Q.ok} / ${n}</h2><p class="bk-qstars">${pass?"⭐".repeat(stars):""}</p>
   <p class="bn">${pass?"দারুণ! এবার একটা খেলা!":"আরেকবার চেষ্টা করো, তুমি পারবে!"}</p>
   ${pass?`<button class="btn good wide" data-act="bookNext" data-stars="${stars}">খেলায় চলো ➜</button>`:`<button class="btn wide" data-act="bookQuizAgain">আবার কুইজ</button><button class="linkbtn" data-act="bookStep" data-n="1">আগে রিভিশন করি</button>`}</div>`;}
 const q=Q.qs[Q.i];
 return `<div class="bk-quiz">${bkExtra("কুইজ")}<div class="pbar"><i style="width:${Q.i/Q.qs.length*100}%"></i></div>
  <p class="bk-q bn">${esc(q.q)}</p>
  ${q.big?`<div class="bk-qbig">${esc(q.big)}${q.say?`<button class="bk-round sm" data-act="bookSayQ" aria-label="Listen">${IC.speak}</button>`:""}</div>`:`<button class="bk-bigear" data-act="bookSayQ" aria-label="Listen">${IC.speak}</button>`}
  <div class="bk-opts ${q.t==="snd"?"three":""}">${q.opts.map(o=>{const s=Q.pick==null?"":o===q.ans?"right":o===Q.pick?"wrong":"dim";
   return `<button class="bk-opt ${s} ${/[ঀ-৿]/.test(o)?"bn":""}" data-act="bookAns" data-v="${esc(o)}" ${Q.pick!=null?"disabled":""}>${esc(o)}</button>`;}).join("")}</div></div>`;
}
function bkMakeGame(c){
 if(c.kind==="letters"){const L=c.items.map(x=>x.en);return {kind:"pop",rounds:bkShuf(L).slice(0,8).map(t=>({t,opts:bkShuf([t,...bkShuf(L.filter(y=>y!==t)).slice(0,5)])})),i:0,score:0,miss:null};}
 const words=[...new Set([...c.mixed.rows.flat(),...c.items.map(x=>x.en)])].filter(bkSoundOf);
 return {kind:"sort",rounds:bkShuf(words).slice(0,10).map(w=>({t:w,ans:bkSoundOf(w)})),i:0,score:0,miss:null};
}
function bkGame(c,st,A){
 const G=A.g||(A.g=bkMakeGame(c));
 if(G.i>=G.rounds.length)return `<div class="bk-res">${bkExtra("খেলা")}<span class="bk-bigem">🏆</span><h2>${G.score} / ${G.rounds.length}</h2><p class="bn">খুব ভালো খেলেছ! এবার একটা ছড়া।</p>${bkNext("ছড়া শুনি")}</div>`;
 const r=G.rounds[G.i];
 if(G.kind==="pop")return `<div class="bk-game">${bkExtra("খেলা · Letter Pop")}<div class="pbar"><i style="width:${G.i/G.rounds.length*100}%"></i></div>
  <p class="bk-q bn">শোনো আর ঠিক বেলুনটা ফাটাও! <button class="bk-round sm" data-act="bookSayG" aria-label="Listen">${IC.speak}</button></p>
  <div class="bk-pop">${r.opts.map((o,i)=>`<button class="bk-bal ${G.miss===o?"miss":""}" style="--h:${(i*57+20)%360};--d:${(i%3)*.4}s" data-act="bookPop" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div></div>`;
 return `<div class="bk-game">${bkExtra("খেলা · Sound Baskets")}<div class="pbar"><i style="width:${G.i/G.rounds.length*100}%"></i></div>
  <p class="bk-q bn">শব্দটা কোন ঝুড়িতে যাবে? প্রথম আওয়াজ শোনো।</p>
  <div class="bk-qbig ${G.miss?"shake":""}" data-k="${G.i}">${esc(r.t)}<button class="bk-round sm" data-act="bookSayG" aria-label="Listen">${IC.speak}</button></div>
  <div class="bk-baskets">${["P","T","K"].map(s=>`<button class="bk-bas ${G.miss===s?"miss":""}" data-act="bookSort" data-v="${s}"><b>${s}</b><span>🧺</span></button>`).join("")}</div></div>`;
}
function bkRhyme(c){
 const R=BK_RHYME[c.id];if(!R)return bkNext("শেষ করি");
 const body=R.letters?`<div class="bk-rh">${R.letters.map((ln,li)=>`<p>${ln.map((w,wi)=>`<span class="bk-rw" id="rw${li}-${wi}">${w}</span>`).join(" ")}</p>`).join("")}${R.end.map((t,i)=>`<p class="bk-rl" id="rl${i}">${esc(t)}</p>`).join("")}</div>`
  :`<div class="bk-rh">${R.lines.map((t,i)=>`<p class="bk-rl" id="rl${i}">${esc(t)}</p>`).join("")}</div>`;
 return `<div class="bk-rhyme">${bkExtra(R.src)}<h2 class="bk-h">🎵 ${esc(R.title)}</h2>${body}
  <div class="row center"><button class="btn" data-act="bookRhyme">▶ শোনো আর সাথে বলো</button></div>${bkNext("চ্যাপ্টার শেষ করি")}</div>`;
}
function bkDone(c,st){
 const L=BOOK.levelOf(c.id),i=L.chapters.indexOf(c),nx=L.chapters[i+1];
 return `<div class="bk-res bk-final"><span class="bk-bigem">🏅</span><h1>Chapter ${c.no} শেষ!</h1><p class="bk-qstars">${"⭐".repeat(st.stars||1)}</p>
  <p class="bn">${esc(c.title)}</p><span class="bk-badge">📘 Book · Chapter ${c.no}</span>
  ${nx?(nx.ready?`<button class="btn good wide" data-act="bookCh" data-id="${esc(nx.id)}">Chapter ${nx.no} খুলে গেছে ➜</button>`:`<p class="small muted">Chapter ${nx.no} শীঘ্রই আসছে।</p>`):""}
  <button class="linkbtn" data-act="bookHome">বইয়ের সব চ্যাপ্টার</button></div>`;
}

/* ---------- actions ---------- */
function bkGo(step){const A=APP.book;TTS.stop();BK_RUN++;A.step=step;A.k=Date.now();delete A.q;delete A.g;A.ri=0;const st=bkSt(A.id);st.step=Math.max(st.step,step);Store.save();render();window.scrollTo(0,0);bkEnter();}
function bkEnter(){const A=APP.book;if(!A||A.scr!=="ch")return;const c=BOOK.ch(A.id);
 if(A.step===1)setTimeout(()=>TTS.say(c.kind==="letters"?bkLetterSay(c.items[A.ri||0].en):c.items[A.ri||0].en),250);
 if(A.step===2||A.step===3)setTimeout(()=>ACT.bookSayQ&&(A.step===2?ACT.bookSayQ():ACT.bookSayG()),300);}
const BOOK_ACT={
 bookOpen(){APP.book={scr:"home",k:Date.now()};render();window.scrollTo(0,0);if(!BOOK.data)BOOK.load().then(()=>render());},
 bookClose(){TTS.stop();BK_RUN++;APP.book=null;render();},
 bookHome(){TTS.stop();BK_RUN++;APP.book={scr:"home",k:Date.now()};render();window.scrollTo(0,0);},
 bookCh(el){const c=BOOK.ch(el.dataset.id),L=BOOK.levelOf(el.dataset.id);
  if(!c.ready){toast("এই চ্যাপ্টার শীঘ্রই আসছে");return;}
  if(!bkOpen(c,L)){toast("🔒 আগের চ্যাপ্টারটা আগে শেষ করো");SND.play("no");return;}
  const st=bkSt(c.id);APP.book={scr:"ch",id:c.id,step:st.done?0:Math.min(st.step,4),k:Date.now()};render();window.scrollTo(0,0);bkEnter();},
 bookStep(el){const n=+el.dataset.n,st=bkSt(APP.book.id);if(n<=st.step)bkGo(n);},
 bookNext(el){const A=APP.book,st=bkSt(A.id);
  if(A.step===2&&el.dataset.stars)st.stars=Math.max(st.stars||0,+el.dataset.stars);
  if(A.step===4){const first=!st.done;st.done=true;st.at=today();if(first){BK().stars=(BK().stars||0)+(st.stars||1);addXP(15);}
   bkGo(5);SND.play("done");confetti(90);return;}
  bkGo(A.step+1);},
 bookSay(el){const t=el.dataset.l?bkLetterSay(el.dataset.l):el.dataset.t;el.classList.add("on");setTimeout(()=>el.classList.remove("on"),700);TTS.say(t);},
 async bookPlayAll(){const my=++BK_RUN,c=BOOK.ch(APP.book.id);
  for(let i=0;i<c.items.length;i++){if(my!==BK_RUN)return;const b=document.querySelector(`.bk-let[data-i="${i}"]`);b&&b.classList.add("on");b&&b.scrollIntoView({block:"nearest",behavior:"smooth"});
   await Promise.race([TTS.say(bkLetterSay(c.items[i].en)),bkWait(1500)]);await bkWait(250);b&&b.classList.remove("on");}},
 bookRev(el){const A=APP.book,c=BOOK.ch(A.id);A.ri=Math.max(0,Math.min(c.items.length-1,(A.ri||0)+ +el.dataset.d));render();bkEnter();},
 bookSayCur(){const A=APP.book,c=BOOK.ch(A.id),x=c.items[A.ri||0];TTS.say(c.kind==="letters"?bkLetterSay(x.en):x.en);},
 bookSayQ(){const q=APP.book.q?.qs[APP.book.q.i];if(q&&q.say)TTS.say(q.say);},
 bookAns(el){const Q=APP.book.q,q=Q.qs[Q.i];if(Q.pick!=null)return;Q.pick=el.dataset.v;const ok=Q.pick===q.ans;
  if(ok){Q.ok++;SND.play("ok");}else{SND.play("no");if(q.t!=="pr"&&q.t!=="mean")setTimeout(()=>TTS.say(q.t==="listen"&&BOOK.ch(APP.book.id).kind==="letters"?bkLetterSay(q.ans):q.say||q.ans),300);}
  render();setTimeout(()=>{if(APP.book?.q!==Q)return;Q.i++;Q.pick=null;render();ACT.bookSayQ();},ok?800:1700);},
 bookQuizAgain(){delete APP.book.q;APP.book.k=Date.now();render();ACT.bookSayQ();},
 bookSayG(){const G=APP.book.g,r=G&&G.rounds[G.i];if(!r)return;TTS.say(G.kind==="pop"?bkLetterSay(r.t):r.t);},
 bookPop(el){const G=APP.book.g,r=G.rounds[G.i];
  if(el.dataset.v===r.t){if(G.miss==null)G.score++;G.miss=null;SND.play("pair");el.classList.add("popped");setTimeout(()=>{G.i++;render();ACT.bookSayG();},420);}
  else{G.miss=el.dataset.v;SND.play("no");render();setTimeout(()=>ACT.bookSayG(),250);}},
 bookSort(el){const G=APP.book.g,r=G.rounds[G.i];
  if(el.dataset.v===r.ans){if(G.miss==null)G.score++;G.miss=null;SND.play("pair");el.classList.add("got");setTimeout(()=>{G.i++;render();ACT.bookSayG();},450);}
  else{G.miss=el.dataset.v;SND.play("no");render();}},
 async bookRhyme(){const my=++BK_RUN,R=BK_RHYME[APP.book.id];const hi=(id,on)=>{const e=document.getElementById(id);e&&e.classList.toggle("on",on);};
  if(R.letters){for(let li=0;li<R.letters.length;li++)for(let wi=0;wi<R.letters[li].length;wi++){if(my!==BK_RUN)return;const w=R.letters[li][wi];hi(`rw${li}-${wi}`,true);
    await Promise.race([TTS.say(w==="and"?"and":bkLetterSay(w)),bkWait(1400)]);await bkWait(120);hi(`rw${li}-${wi}`,false);}
   for(let i=0;i<R.end.length;i++){if(my!==BK_RUN)return;hi("rl"+i,true);await TTS.say(R.end[i]);hi("rl"+i,false);}}
  else for(let i=0;i<R.lines.length;i++){if(my!==BK_RUN)return;hi("rl"+i,true);await TTS.say(R.lines[i]);await bkWait(250);hi("rl"+i,false);}}
};
document.addEventListener("change",e=>{if(e.target&&e.target.id==="bkFile"&&e.target.files[0])BOOK.importFile(e.target.files[0]);});
function bookCTA(){return `<button class="bookcta" data-act="bookOpen"><span class="bc-em">📘</span><span class="grow"><b>${esc(myName())}'s English Book</b><span class="tiny bn">বইয়ের পড়া, কুইজ, খেলা আর ছড়া${BK().stars?` · ⭐ ${BK().stars}`:""}</span></span><span class="sc-go">➜</span></button>`;}
