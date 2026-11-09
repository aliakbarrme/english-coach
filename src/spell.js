/* ================= Play cards: extra decks (Spices, Vegetables), vertical swipe; Spelling Fun ================= */

/* ---- hand-drawn pictures for items that have no emoji ---- */
const ART={};
(function(){
  let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};
  const svg=(body,defs="")=>`<svg class="vart" viewBox="0 0 100 100" aria-hidden="true"><defs>${defs}</defs>${body}</svg>`;
  const shade=(id,a,b)=>`<radialGradient id="${id}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
  /* a wooden bowl heaped with something */
  const bowl=(heap,id)=>svg(`<ellipse cx="50" cy="88" rx="34" ry="5" fill="#0002"/>
    <path d="M14 56 Q50 60 86 56 Q84 84 50 86 Q16 84 14 56Z" fill="url(#bw${id})"/>
    ${heap}<ellipse cx="50" cy="56" rx="36" ry="7" fill="none" stroke="#7a4a22" stroke-width="3"/>`,
    `<linearGradient id="bw${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c98a4b"/><stop offset="1" stop-color="#8a5226"/></linearGradient>`);
  const mound=(c1,c2,id)=>`<defs>${shade("m"+id,c1,c2)}</defs><path d="M16 56 Q24 30 50 26 Q76 30 84 56Z" fill="url(#m${id})"/>`;
  const seeds=(n,draw)=>{let s="";for(let i=0;i<n;i++){const a=rnd()*Math.PI,r=rnd();const x=50+Math.cos(a)*30*r*1.1,y=54-Math.sin(a)*24*r;s+=draw(x,y,rnd()*180);}return s;};
  ART.turmeric=bowl(mound("#ffd54a","#e08a00","t")+`<path d="M66 70 q10 -6 20 -2 q6 3 2 8 q-4 4 -10 2 q-8 4 -12 -8z" fill="#d9822b" stroke="#a85a14" stroke-width="1.5"/><path d="M74 66 q2 -5 6 -6" stroke="#a85a14" stroke-width="2" fill="none"/>`,"t");
  ART.cumin=bowl(mound("#d6b27a","#9a7240","c")+seeds(46,(x,y,r)=>`<ellipse cx="${x}" cy="${y}" rx="3.6" ry="1.3" transform="rotate(${r} ${x} ${y})" fill="#7a5426"/>`),"c");
  ART.coriander=bowl(mound("#e2c48f","#b48a52","k")+seeds(34,(x,y)=>`<circle cx="${x}" cy="${y}" r="3.2" fill="#c49a5a" stroke="#8a6230" stroke-width=".8"/><circle cx="${x-1}" cy="${y-1}" r=".9" fill="#f2dcb0"/>`),"k");
  ART.pepper=bowl(mound("#4a4a4a","#1b1b1b","p")+seeds(36,(x,y)=>`<circle cx="${x}" cy="${y}" r="3.3" fill="#2a2a2a"/><circle cx="${x-1.1}" cy="${y-1.1}" r="1" fill="#888"/>`),"p");
  ART.mustard=bowl(mound("#f0c64a","#c9921a","s")+seeds(70,(x,y)=>`<circle cx="${x}" cy="${y}" r="1.7" fill="#b9801a"/>`),"s");
  ART.nigella=bowl(mound("#3a3a3a","#111","n")+seeds(60,(x,y,r)=>`<path d="M${x} ${y} l2 -1.2 l-.6 2.6z" transform="rotate(${r} ${x} ${y})" fill="#000"/>`),"n");
  ART.fenugreek=bowl(mound("#e8b84e","#b8801c","f")+seeds(50,(x,y,r)=>`<rect x="${x}" y="${y}" width="2.6" height="2" rx=".5" transform="rotate(${r} ${x} ${y})" fill="#9a6414"/>`),"f");
  const stick=(x,y,r)=>`<g transform="rotate(${r} ${x} ${y})"><rect x="${x-34}" y="${y-6}" width="68" height="12" rx="5" fill="url(#cin)"/><path d="M${x-34} ${y-6} q-6 6 0 12" fill="#7a3d16"/><path d="M${x+34} ${y-6} a6 6 0 1 1 0 12 a3.5 3.5 0 1 1 0 -7" fill="none" stroke="#5a2a0c" stroke-width="2"/><path d="M${x-20} ${y-3} h36" stroke="#e0a36a" stroke-width="1.5" opacity=".6"/></g>`;
  ART.cinnamon=svg(`<ellipse cx="50" cy="84" rx="38" ry="5" fill="#0002"/>${stick(50,40,-12)}${stick(50,56,4)}${stick(52,70,-4)}`,`<linearGradient id="cin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c97a3d"/><stop offset="1" stop-color="#8a4519"/></linearGradient>`);
  const pod=(x,y,r)=>`<g transform="rotate(${r} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="11" ry="17" fill="url(#cd)"/><path d="M${x} ${y-16} q-4 16 0 32 M${x-6} ${y-12} q-3 12 0 25 M${x+6} ${y-12} q3 12 0 25" stroke="#4f7a1e" stroke-width="1.4" fill="none"/><path d="M${x} ${y-17} l0 -5" stroke="#6b8f2e" stroke-width="2.5" stroke-linecap="round"/></g>`;
  ART.cardamom=svg(`<ellipse cx="50" cy="86" rx="34" ry="5" fill="#0002"/>${pod(32,56,-25)}${pod(66,54,22)}${pod(50,46,0)}`,shade("cd","#b7d86a","#5f8f24"));
  const clove=(x,y,r)=>`<g transform="rotate(${r} ${x} ${y})"><path d="M${x} ${y} l-2 30 q2 3 4 0 z" fill="#6b3518"/><circle cx="${x}" cy="${y-3}" r="7" fill="#7a3d1c"/><circle cx="${x-5}" cy="${y-1}" r="3.5" fill="#5a2a12"/><circle cx="${x+5}" cy="${y-1}" r="3.5" fill="#5a2a12"/><circle cx="${x}" cy="${y-8}" r="3.5" fill="#8a4a24"/><circle cx="${x-1.5}" cy="${y-5}" r="1.4" fill="#c4834f"/></g>`;
  ART.clove=svg(`<ellipse cx="50" cy="86" rx="32" ry="5" fill="#0002"/>${clove(30,40,-20)}${clove(52,34,8)}${clove(72,44,28)}${clove(44,56,-6)}`);
  ART.bayleaf=svg(`<ellipse cx="50" cy="88" rx="30" ry="4" fill="#0002"/><g transform="rotate(-30 50 50)"><path d="M50 8 Q80 40 50 92 Q20 40 50 8Z" fill="url(#bl)"/><path d="M50 12 V90" stroke="#5c6b2a" stroke-width="2"/>${[24,36,48,60,72].map(y=>`<path d="M50 ${y} l-12 -8 M50 ${y} l12 -8" stroke="#5c6b2a" stroke-width="1.2" opacity=".7"/>`).join("")}</g>`,shade("bl","#b6c46a","#6f7f2f"));
  /* vegetables without emoji */
  ART.cauliflower=svg(`<ellipse cx="50" cy="88" rx="34" ry="5" fill="#0002"/><path d="M10 62 Q20 44 36 58 Q30 76 50 86 Q70 76 64 58 Q80 44 90 62 Q86 84 50 90 Q14 84 10 62Z" fill="#4f9a3a"/>
    ${[[34,44,13],[52,38,14],[68,46,12],[42,56,12],[60,56,12],[50,48,11]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#cf)"/>`).join("")}`,shade("cf","#fffdf2","#e3dcc0"));
  ART.cabbage=svg(`<ellipse cx="50" cy="88" rx="34" ry="5" fill="#0002"/><circle cx="50" cy="52" r="34" fill="url(#cb)"/><path d="M50 18 Q30 40 34 84 M50 18 Q70 40 66 84 M22 40 Q50 52 78 40" stroke="#5a9a3a" stroke-width="2.5" fill="none" opacity=".7"/><path d="M18 56 Q30 30 50 26" stroke="#e8ffd0" stroke-width="3" fill="none" opacity=".5"/>`,shade("cb","#c9f0a0","#5fae3c"));
  ART.gourd=svg(`<ellipse cx="50" cy="90" rx="30" ry="4" fill="#0002"/><g transform="rotate(-18 50 50)"><path d="M46 8 h8 v8 h-8z" fill="#6b8f2e"/><path d="M44 14 Q38 30 34 48 Q22 66 32 82 Q50 96 68 82 Q78 66 66 48 Q62 30 56 14Z" fill="url(#gd)"/><path d="M40 52 Q34 66 40 78" stroke="#fff" stroke-width="3" opacity=".35" fill="none"/></g>`,shade("gd","#d8f2a8","#7cb84a"));
  const okra=(x,y,r)=>`<g transform="rotate(${r} ${x} ${y})"><path d="M${x-4} ${y-30} h8 v6 h-8z" fill="#4d7a22"/><path d="M${x-7} ${y-24} Q${x} ${y+30} ${x} ${y+34} Q${x} ${y+30} ${x+7} ${y-24}Z" fill="url(#ok)"/><path d="M${x-2} ${y-22} Q${x} ${y+10} ${x} ${y+30}" stroke="#3f6f1c" stroke-width="1.2" fill="none"/></g>`;
  ART.okra=svg(`<ellipse cx="50" cy="88" rx="30" ry="4" fill="#0002"/>${okra(34,50,-20)}${okra(52,46,4)}${okra(68,52,24)}`,`<linearGradient id="ok" x1="0" x2="1"><stop offset="0" stop-color="#9fd25a"/><stop offset="1" stop-color="#4f8f24"/></linearGradient>`);
  ART.bittergourd=svg(`<ellipse cx="50" cy="90" rx="34" ry="4" fill="#0002"/><g transform="rotate(-35 50 50)"><path d="M46 6 h8 v8 h-8z" fill="#4d7a22"/><path d="M50 12 Q68 30 64 60 Q60 86 50 94 Q40 86 36 60 Q32 30 50 12Z" fill="url(#bg)"/>${seeds(26,(x,y)=>`<circle cx="${50+(x-50)*.4}" cy="${(y-30)*1.6+20}" r="2.2" fill="#3f7a1e"/>`)}</g>`,shade("bg","#b5e070","#4f8f24"));
  ART.radish=svg(`<ellipse cx="50" cy="92" rx="22" ry="3" fill="#0002"/><path d="M50 30 Q36 10 28 14 Q40 20 46 32 M50 30 Q52 6 60 4 Q58 18 54 32 M50 30 Q70 12 76 18 Q64 22 54 34" fill="#4f9a3a" stroke="#3a7a2a" stroke-width="3"/><path d="M38 34 Q50 26 62 34 Q66 60 52 92 Q50 96 48 92 Q34 60 38 34Z" fill="url(#rd)"/>`,shade("rd","#ffffff","#dfe3e6"));
  const potol=(x,y,r)=>`<g transform="rotate(${r} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="11" ry="20" fill="#5f9f2e"/>${[-6,0,6].map(d=>`<path d="M${x+d} ${y-17} Q${x+d*1.5} ${y} ${x+d} ${y+17}" stroke="#e6f5c8" stroke-width="2.4" fill="none"/>`).join("")}<path d="M${x} ${y-20} v-5" stroke="#3f6f1c" stroke-width="3" stroke-linecap="round"/></g>`;
  ART.pointedgourd=svg(`<ellipse cx="50" cy="88" rx="30" ry="4" fill="#0002"/>${potol(36,54,-18)}${potol(62,52,16)}`);
  ART.redamaranth=svg(`<ellipse cx="50" cy="90" rx="26" ry="4" fill="#0002"/><path d="M44 90 L50 60 L56 90" stroke="#7a2a4a" stroke-width="4" fill="none"/>${[[30,40,-30],[50,28,0],[70,40,30],[38,58,-20],[62,58,20]].map(([x,y,r])=>`<path d="M${x} ${y} q-12 -14 0 -26 q12 12 0 26z" transform="rotate(${r} ${x} ${y})" fill="url(#ra)"/><path d="M${x} ${y} v-22" transform="rotate(${r} ${x} ${y})" stroke="#4f9a3a" stroke-width="1.5"/>`).join("")}`,shade("ra","#e0457a","#8a1a4a"));
})();
const DECKS=[
 {id:"dspice",track:"kids",deck:true,title:"Spices",bn:"মসলা",lessons:[{title:"Spices",items:[
  ["chilli","মরিচ","🌶️"],["turmeric","হলুদ",ART.turmeric],["ginger","আদা","🫚"],["garlic","রসুন","🧄"],["onion","পেঁয়াজ","🧅"],["cumin","জিরা",ART.cumin],
  ["coriander","ধনে",ART.coriander],["cinnamon","দারুচিনি",ART.cinnamon],["cardamom","এলাচ",ART.cardamom],["clove","লবঙ্গ",ART.clove],["black pepper","গোলমরিচ",ART.pepper],
  ["bay leaf","তেজপাতা",ART.bayleaf],["mustard seeds","সরিষা",ART.mustard],["black cumin","কালোজিরা",ART.nigella],["fenugreek","মেথি",ART.fenugreek],["salt","লবণ","🧂"]]}]},
 {id:"dveg",track:"kids",deck:true,title:"Vegetables",bn:"শাকসবজি",lessons:[{title:"Vegetables",items:[
  ["potato","আলু","🥔"],["tomato","টমেটো","🍅"],["eggplant","বেগুন","🍆"],["carrot","গাজর","🥕"],["cucumber","শসা","🥒"],["cauliflower","ফুলকপি",ART.cauliflower],
  ["cabbage","বাঁধাকপি",ART.cabbage],["pumpkin","মিষ্টি কুমড়া","🎃"],["bottle gourd","লাউ",ART.gourd],["okra","ঢেঁড়স",ART.okra],["bitter gourd","করলা",ART.bittergourd],
  ["spinach","পালং শাক","🥬"],["red amaranth","লাল শাক",ART.redamaranth],["radish","মুলা",ART.radish],["pointed gourd","পটল",ART.pointedgourd],["green chilli","কাঁচা মরিচ","🌶️"],
  ["peas","মটরশুঁটি","🫛"],["corn","ভুট্টা","🌽"],["capsicum","ক্যাপসিকাম","🫑"],["broccoli","ব্রকলি","🥦"],["sweet potato","মিষ্টি আলু","🍠"]]}]}
];
function deckById(id){return DECKS.find(d=>d.id===id);}
function cardUnit(id){return unitById(id)||deckById(id);}
function cardUnits(track){return allUnits().filter(x=>x.track===track).concat(track==="kids"?DECKS:[]);}

/* ---- vertical swipe on the flash card (mobile touch, mouse drag, trackpad/wheel) ---- */
let CSW=null,CWHEEL=0;
/* the current card is lifted off the deck as a floating copy, so the page itself never re-animates */
function cardSnap(){
  const f=document.querySelector(".cardsview .deck .flip");if(!f||RM.matches||!f.animate)return null;
  const r=f.getBoundingClientRect(),c=f.cloneNode(true);
  c.classList.add("cardghost");c.removeAttribute("data-act");
  Object.assign(c.style,{position:"fixed",left:r.left+"px",top:r.top+"px",width:r.width+"px",height:r.height+"px",margin:"0",zIndex:"30",pointerEvents:"none",transition:"none",minHeight:"0"});
  return {c,from:f.style.transform||"none"};
}
function cardSwap(dir,snap){
  const f=document.querySelector(".cardsview .deck .flip");
  if(!snap||!f){return;}
  document.body.append(snap.c);const g=snap.c,up=dir==="up";
  setTimeout(()=>g.remove(),1000);
  const E="cubic-bezier(.22,.8,.3,1)";
  if(up){
    g.animate([{transform:snap.from,opacity:1,zIndex:30,offset:0},{transform:"translateY(-62%) rotate(-6deg) scale(1.03)",opacity:1,zIndex:30,offset:.42},{transform:"translateY(-40%) rotate(-3deg) scale(.95)",opacity:1,zIndex:1,offset:.5},{transform:"translateY(22px) scale(.88)",opacity:0,zIndex:1}],{duration:720,easing:E}).onfinish=()=>g.remove();
    f.animate([{transform:"translateY(18px) scale(.93)",filter:"brightness(.96)"},{transform:"translateY(10px) scale(.96)",offset:.4},{transform:"none",filter:"none"}],{duration:620,easing:"cubic-bezier(.3,1.3,.5,1)"});
  }else{
    g.style.zIndex="1";
    g.animate([{transform:snap.from,opacity:1},{transform:"translateY(18px) scale(.93)",opacity:0}],{duration:560,easing:E}).onfinish=()=>g.remove();
    f.animate([{transform:"translateY(-70%) rotate(-5deg) scale(1.02)",opacity:0},{transform:"translateY(-20%) rotate(-2deg)",opacity:1,offset:.45},{transform:"none",opacity:1}],{duration:620,easing:"cubic-bezier(.3,1.25,.5,1)"});
  }
}
function cardSlide(){}
function cardGo(dir){const C=APP.cards;if(!C)return;
  if(dir==="up"){ACT.cardNext();}else{if(!C.i){const f=document.querySelector(".cardsview .deck .flip");const from=f&&f.style.transform||"none";if(f){f.style.transform="";f.animate&&f.animate([{transform:from},{transform:"translateY(14px)"},{transform:"none"}],{duration:380,easing:EZ.out3});}return;}ACT.cardPrev();}
}
document.addEventListener("pointerdown",e=>{
  const d=e.target.closest&&e.target.closest(".cardsview .deck");if(!d||e.target.closest(".cardspk"))return;
  const fl=d.querySelector(".flip");if(!fl)return;CSW={y:e.clientY,x:e.clientX,d:fl,moved:false,id:e.pointerId};
});
document.addEventListener("pointermove",e=>{
  if(!CSW||e.pointerId!==CSW.id)return;const dy=e.clientY-CSW.y,dx=e.clientX-CSW.x;
  if(!CSW.moved&&Math.abs(dy)>8&&Math.abs(dy)>Math.abs(dx))CSW.moved=true;
  if(CSW.moved){CSW.d.style.transition="none";CSW.d.style.transform=`translateY(${dy*.6}px) rotate(${dy*.025}deg)`;}
});
const cswEnd=e=>{
  if(!CSW||e.pointerId!==CSW.id)return;const dy=e.clientY-CSW.y,d=CSW.d,moved=CSW.moved;CSW=null;
  if(!moved)return;window._swiped=Date.now();
  if(Math.abs(dy)>60){if(dy>0&&!APP.cards.i){cardGo("down");return;}cardGo(dy<0?"up":"down");}
  else{const from=d.style.transform;d.style.transform="";d.style.transition="";d.animate&&d.animate([{transform:from},{transform:"none"}],{duration:380,easing:"cubic-bezier(.3,1.4,.5,1)"});}
};
document.addEventListener("pointerup",cswEnd);document.addEventListener("pointercancel",cswEnd);
document.addEventListener("wheel",e=>{
  if(!APP.cards||!e.target.closest||!e.target.closest(".cardsview .deck"))return;
  e.preventDefault();const now=Date.now();if(now-CWHEEL<550||Math.abs(e.deltaY)<25)return;CWHEEL=now;cardGo(e.deltaY>0?"up":"down");
},{passive:false});

/* ================= Spelling Fun ================= */
const SPELL=[
 {lv:1,name:"2-letter words",bn:"২ অক্ষরের শব্দ",badge:"🐣",color:"#ff7eb0",words:[["up","⬆️","উপরে"],["on","💡","চালু"],["in","📦","ভেতরে"],["at","📍","এখানে"],["go","🚦","যাও"],["no","🙅","না"],["hi","👋","হাই"],["ox","🐂","ষাঁড়"],["me","🙋","আমি"],["we","👭","আমরা"]]},
 {lv:2,name:"3-letter words",bn:"৩ অক্ষরের শব্দ",badge:"🦊",color:"#ffa62b",words:[["cat","🐱","বিড়াল"],["dog","🐶","কুকুর"],["sun","☀️","সূর্য"],["pen","🖊️","কলম"],["bus","🚌","বাস"],["cup","☕","কাপ"],["hat","👒","টুপি"],["bed","🛏️","বিছানা"],["egg","🥚","ডিম"],["box","📦","বাক্স"],["pig","🐷","শূকর"],["ant","🐜","পিঁপড়া"],["fox","🦊","শিয়াল"],["cow","🐮","গরু"],["bag","👜","ব্যাগ"]]},
 {lv:3,name:"4-letter words",bn:"৪ অক্ষরের শব্দ",badge:"🦄",color:"#9b6bff",words:[["fish","🐟","মাছ"],["book","📖","বই"],["tree","🌳","গাছ"],["milk","🥛","দুধ"],["cake","🎂","কেক"],["ball","⚽","বল"],["duck","🦆","হাঁস"],["frog","🐸","ব্যাঙ"],["star","⭐","তারা"],["moon","🌙","চাঁদ"],["bird","🐦","পাখি"],["shoe","👟","জুতা"],["door","🚪","দরজা"],["kite","🪁","ঘুড়ি"],["rain","🌧️","বৃষ্টি"]]}
];
const LETTER={a:"ay",b:"bee",c:"see",d:"dee",e:"ee",f:"ef",g:"jee",h:"aitch",i:"eye",j:"jay",k:"kay",l:"el",m:"em",n:"en",o:"oh",p:"pee",q:"cue",r:"ar",s:"ess",t:"tee",u:"you",v:"vee",w:"double you",x:"ex",y:"why",z:"zee"};
const LCOL=["#ff5c8a","#ff9a3c","#2fbf71","#3a9bff","#9b6bff","#ff6b5c"];
function SP(){const s=S.spell||(S.spell={lv:{},w:{},stars:0,badges:[]});SPELL.forEach(L=>{s.lv[L.lv]=s.lv[L.lv]||{learned:[],games:0,quiz:false};});return s;}
function spLevel(n){return SPELL.find(x=>x.lv===n);}
function spUnlocked(n){return n===1||SP().lv[n-1].quiz;}
/* what this level needs next: learn → game after every 5 → revision quiz → done */
function spNext(n){
  const L=spLevel(n),st=SP().lv[n],N=L.words.length,batches=Math.ceil(N/5),k=st.learned.length;
  if(st.games<Math.floor(k/5)||(k===N&&st.games<batches))return {t:"game",batch:st.games};
  if(k<N)return {t:"learn",i:k};
  if(!st.quiz)return {t:"quiz"};
  return {t:"done"};
}
function spWordsOf(n,list){const L=spLevel(n);return (list||L.words.map(w=>w[0])).map(w=>L.words.find(x=>x[0]===w)).filter(Boolean);}
function spShuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function spRounds(n,words){
  const types=n===1?["pic","word","miss"]:n===2?["pic","word","miss","build"]:["build","miss","pic","build","word"];
  let last="";return spShuffle(words).map((w,k)=>{let t=types[(k+Math.floor(Math.random()*types.length))%types.length];if(t===last)t=types[(types.indexOf(t)+1)%types.length];last=t;return spMakeRound(n,w,t);});
}
function spMakeRound(n,w,t){
  const L=spLevel(n),others=spShuffle(L.words.filter(x=>x[0]!==w[0])).slice(0,2);
  const r={t,w,tries:0,wrong:[]};
  if(t==="pic"||t==="word")r.opts=spShuffle([w,...others]);
  if(t==="miss"){r.gap=Math.floor(Math.random()*w[0].length);const right=w[0][r.gap];const pool=spShuffle("abcdefghijklmnoprstuwy".split("").filter(c=>c!==right)).slice(0,2);r.opts=spShuffle([right,...pool]);}
  if(t==="build"){const extra=n>=3?2:1;const pool=spShuffle("abcdefghiklmnoprstuw".split("").filter(c=>!w[0].includes(c))).slice(0,extra);r.tiles=spShuffle([...w[0].split(""),...pool]);r.sel=[];}
  return r;
}
function spStartGame(n,kind,words){
  const S2={scr:"game",lv:n,kind,rounds:spRounds(n,words),i:0,stars:0,k:Date.now()};APP.spell=S2;render();spSayRound();
}
function spGo(n){
  const nx=spNext(n);
  if(nx.t==="learn"){APP.spell={scr:"learn",lv:n,i:nx.i,k:Date.now()};render();spAnimate();return;}
  if(nx.t==="game"){const L=spLevel(n),ws=L.words.slice(nx.batch*5,nx.batch*5+5);APP.spell={scr:"intro",lv:n,next:()=>spStartGame(n,"game",ws),k:Date.now(),title:"Game time!",sub:"৫টা নতুন শব্দ শিখেছ! এবার একটা মজার খেলা 🎮"};render();SND.play("done");return;}
  if(nx.t==="quiz"){APP.spell={scr:"intro",lv:n,next:()=>spStartGame(n,"quiz",spLevel(n).words),k:Date.now(),title:"Revision time!",sub:"সব শব্দ একবার করে দেখি, তারপর নতুন লেভেল খুলবে! 🔓"};render();SND.play("done");return;}
  APP.spell={scr:"home",k:Date.now()};render();
}
/* letter-by-letter: C → A → T → CAT */
async function spAnimate(){
  const sp=APP.spell;if(!sp||sp.scr!=="learn")return;const tok=sp.k=Date.now();
  const L=spLevel(sp.lv),w=L.words[sp.i][0];
  const els=[...document.querySelectorAll(".sp-letters .spl")];els.forEach(e=>e.classList.remove("on"));document.querySelector(".sp-letters")?.classList.remove("whole");
  await new Promise(r=>setTimeout(r,450));
  for(let k=0;k<w.length;k++){
    if(!APP.spell||APP.spell.k!==tok)return;
    const el=document.querySelectorAll(".sp-letters .spl")[k];if(el){el.classList.add("on");SND.play("pop");}
    await Promise.race([TTS.say(LETTER[w[k]]||w[k]),new Promise(r=>setTimeout(r,1100))]);
    await new Promise(r=>setTimeout(r,180));
  }
  if(!APP.spell||APP.spell.k!==tok)return;
  document.querySelector(".sp-letters")?.classList.add("whole");
  await TTS.say(w);
}
function spSayRound(){const sp=APP.spell;if(!sp||sp.scr!=="game")return;const r=sp.rounds[sp.i];if(!r)return;if(r.t!=="pic")setTimeout(()=>{if(APP.spell===sp&&sp.rounds[sp.i]===r)TTS.say(r.w[0]);},380);}
function spRight(el){
  const sp=APP.spell,r=sp.rounds[sp.i],s=SP(),w=r.w[0];
  const rec=s.w[w]||(s.w[w]={ok:0,bad:0});rec.ok++;
  if(!r.tries){sp.stars++;s.stars++;}
  r.done=true;SND.play("ok");TTS.say(w);render();kidBurst(el||document.querySelector(".sp-right"));
  Store.save();setTimeout(()=>{if(APP.spell===sp&&sp.rounds[sp.i]===r)spAdvance();},1300);
}
function spWrong(el){
  const sp=APP.spell,r=sp.rounds[sp.i],s=SP(),w=r.w[0];
  r.tries++;const rec=s.w[w]||(s.w[w]={ok:0,bad:0});rec.bad++;SND.play("no");
  if(!r.requeued){r.requeued=true;sp.rounds.push(spMakeRound(sp.lv,r.w,r.t));}
  if(el&&el.animate)el.animate([{transform:"none"},{transform:"translateX(-9px) rotate(-4deg)"},{transform:"translateX(9px) rotate(4deg)"},{transform:"translateX(-5px)"},{transform:"none"}],{duration:420});
  Store.save();
}
function spAdvance(){
  const sp=APP.spell;sp.i++;
  if(sp.i<sp.rounds.length){render();spSayRound();return;}
  const s=SP(),st=s.lv[sp.lv];
  if(sp.kind==="game")st.games++;
  let badge=null;
  if(sp.kind==="quiz"){st.quiz=true;const L=spLevel(sp.lv);if(!s.badges.includes(sp.lv)){s.badges.push(sp.lv);badge=L;}addXP(15);}
  else addXP(sp.kind==="game"?5:3);
  Store.save();APP.spell={scr:"result",lv:sp.lv,kind:sp.kind,stars:sp.stars,total:new Set(sp.rounds.map(r=>r.w[0])).size,badge,k:Date.now()};render();
  SND.play("done");confetti(badge?120:60);
}
/* ---- views ---- */
function spPic(em,cls=""){return `<span class="sp-pic ${cls}">${em}</span>`;}
function spLetters(w,show){return `<div class="sp-letters">${w.split("").map((c,k)=>`<span class="spl ${show?"on":""}" style="--lc:${LCOL[k%LCOL.length]};--k:${k}">${c.toUpperCase()}</span>`).join("")}</div>`;}
function viewSpell(){
  const sp=APP.spell,s=SP(),name=esc(myName());
  const bar=(back)=>`<div class="sptop"><button class="icon-btn" data-act="${back}" aria-label="Back">${back==="spellClose"?IC.close:IC.back}</button><span class="sp-stars">⭐ <b>${s.stars}</b></span></div>`;
  if(sp.scr==="home"){
    const lv=SPELL.map(L=>{const st=s.lv[L.lv],N=L.words.length,k=st.learned.length,open=spUnlocked(L.lv),done=st.quiz;
      const p=Math.round((k+(done?1:0))/(N+1)*100);
      return `<div class="sp-level ${open?"":"locked"} ${done?"done":""}" style="--lc:${L.color}">
        <div class="sp-lvtop"><span class="sp-lvbadge">${open?L.badge:"🔒"}</span><div class="grow"><span class="sp-lvk">LEVEL ${L.lv}</span><b>${L.name}</b><span class="tiny bn muted">${L.bn} · ${k}/${N} শব্দ${done?" · ✅ শেষ":""}</span></div></div>
        <div class="sp-prog"><i style="width:${p}%"></i></div>
        <div class="sp-lvbtns">${open?`<button class="btn" data-act="spellLevel" data-n="${L.lv}" style="--c:${L.color}">${done?"আবার খেলো":k?"চালিয়ে যাও":"শুরু করো"}</button>${k>=3?`<button class="btn ghost" data-act="spellRevise" data-n="${L.lv}">↻ Revise</button>`:""}`:`<p class="tiny muted">আগের লেভেল শেষ করলে খুলবে</p>`}</div></div>`;}).join("");
    const tricky=Object.entries(s.w).filter(([w,r])=>r.bad>0).sort((a,b)=>b[1].bad-a[1].bad).slice(0,6);
    const learned=SPELL.reduce((a,L)=>a+s.lv[L.lv].learned.length,0),ok=Object.values(s.w).reduce((a,r)=>a+r.ok,0),bad=Object.values(s.w).reduce((a,r)=>a+r.bad,0);
    return `<main class="view spellview">${bar("spellClose")}
      <div class="sp-hero"><span class="sp-heroem">🔤</span><h1>${name}'s Spelling</h1><p class="muted">শব্দ দেখো, শোনো, বানাও, খেলো!</p></div>
      <div class="sp-statrow"><div><b>${learned}</b><span>শেখা শব্দ</span></div><div><b>${ok}</b><span>ঠিক উত্তর</span></div><div><b>${bad}</b><span>আবার চেষ্টা</span></div></div>
      <div class="sp-badges">${SPELL.map(L=>`<span class="sp-badge ${s.badges.includes(L.lv)?"got":""}" title="${L.name}">${L.badge}</span>`).join("")}</div>
      ${lv}
      ${tricky.length?`<div class="card"><h3>আরেকটু অনুশীলন</h3><div class="revchips">${tricky.map(([w])=>`<button class="revchip" data-act="say" data-t="${esc(w)}">${IC.speak}<span>${esc(w)}</span></button>`).join("")}</div></div>`:""}</main>`;
  }
  const L=spLevel(sp.lv);
  if(sp.scr==="learn"){
    const w=L.words[sp.i],inBatch=sp.i%5;
    return `<main class="view spellview sp-run">${bar("spellHome")}
      <div class="sp-dots">${[0,1,2,3,4].filter(d=>Math.floor(sp.i/5)*5+d<L.words.length).map(d=>`<i class="${d<inBatch?"done":d===inBatch?"on":""}"></i>`).join("")}</div>
      <div class="sp-card" style="--lc:${L.color}" data-key="w${sp.i}"><span class="sp-newtag">NEW WORD</span>${spPic(w[1],"big")}${spLetters(w[0])}<span class="bn muted">${esc(w[2])}</span>
        <div class="row center"><button class="sp-round" data-act="say" data-t="${esc(w[0])}" aria-label="Listen">${IC.speak}</button><button class="sp-round alt" data-act="spellReplay" aria-label="Spell again">🔤</button></div></div>
      <div class="sp-foot"><button class="btn good wide" data-act="spellLearned">${inBatch===4||sp.i===L.words.length-1?"খেলতে চলো! 🎮":"পরের শব্দ ➜"}</button></div></main>`;
  }
  if(sp.scr==="intro")return `<main class="view spellview sp-run"><div class="sp-intro"><span class="sp-introem">${sp.title.startsWith("Game")?"🎮":"🧠"}</span><h1>${sp.title}</h1><p class="bn">${sp.sub}</p><button class="btn good wide" data-act="spellIntroGo">Let's play!</button><button class="linkbtn" data-act="spellHome">পরে খেলব</button></div></main>`;
  if(sp.scr==="game"){
    const r=sp.rounds[sp.i],w=r.w;let q="",body="";
    const fixedTotal=sp.rounds.length;
    if(r.t==="pic"){q="ছবির নামটা কোনটা?";body=`${spPic(w[1],"mid")}<div class="sp-opts">${r.opts.map(o=>`<button class="sp-opt word ${r.done&&o[0]===w[0]?"sp-right":""}" data-act="spellPick" data-v="${esc(o[0])}" ${r.wrong.includes(o[0])||r.done?"disabled":""}>${o[0].toUpperCase()}</button>`).join("")}</div>`;}
    if(r.t==="word"){q="শোনো, তারপর ছবিটা বেছে নাও";body=`<button class="sp-wordbig" data-act="say" data-t="${esc(w[0])}">${IC.speak}<span>${w[0].toUpperCase()}</span></button><div class="sp-opts pics">${r.opts.map(o=>`<button class="sp-opt pic ${r.done&&o[0]===w[0]?"sp-right":""}" data-act="spellPick" data-v="${esc(o[0])}" ${r.wrong.includes(o[0])||r.done?"disabled":""}>${o[1]}</button>`).join("")}</div>`;}
    if(r.t==="miss"){q="কোন অক্ষরটা নেই?";body=`${spPic(w[1],"mid")}<div class="sp-letters show">${w[0].split("").map((c,k)=>k===r.gap&&!r.done?`<span class="spl on gap" style="--lc:#c8d0cc">?</span>`:`<span class="spl on ${k===r.gap?"sp-right":""}" style="--lc:${LCOL[k%LCOL.length]}">${c.toUpperCase()}</span>`).join("")}</div><div class="sp-opts">${r.opts.map(c=>`<button class="sp-opt letter" data-act="spellMiss" data-v="${c}" ${r.wrong.includes(c)||r.done?"disabled":""}>${c.toUpperCase()}</button>`).join("")}</div>`;}
    if(r.t==="build"){q="অক্ষর সাজিয়ে শব্দ বানাও";body=`${spPic(w[1],"mid")}<div class="sp-slots ${r.done?"sp-right":""}">${w[0].split("").map((c,k)=>`<span class="sp-slot ${r.sel[k]!=null?"full":""}" style="--lc:${LCOL[k%LCOL.length]}">${r.sel[k]!=null?r.tiles[r.sel[k]].toUpperCase():""}</span>`).join("")}</div><div class="sp-tiles">${r.tiles.map((c,ti)=>`<button class="sp-tile ${r.sel.includes(ti)?"used":""}" data-act="spellTile" data-i="${ti}" ${r.sel.includes(ti)||r.done?"disabled":""}>${c.toUpperCase()}</button>`).join("")}</div><button class="sp-hear" data-act="say" data-t="${esc(w[0])}">${IC.speak} শোনো</button>`;}
    return `<main class="view spellview sp-run">${bar("spellHome")}<div class="sp-gamebar"><span class="sp-gtag">${sp.kind==="quiz"?"🧠 Revision":sp.kind==="revise"?"↻ Revise":"🎮 Game"}</span><div class="pbar"><i style="width:${Math.round((sp.i+(r.done?1:0))/fixedTotal*100)}%"></i></div><span class="sp-gst">⭐ ${sp.stars}</span></div>
      <div class="sp-game" data-key="r${sp.i}"><p class="sp-q">${q}</p>${body}${r.tries&&!r.done?`<p class="sp-try">আবার চেষ্টা করো, তুমি পারবে! 💪</p>`:""}</div></main>`;
  }
  if(sp.scr==="result"){
    const s2=sp.badge;const next=spNext(sp.lv);
    const nextLv=sp.badge&&spLevel(sp.lv+1);
    return `<main class="view spellview sp-run"><div class="sp-result">${s2?`<div class="sp-bigbadge" style="--lc:${s2.color}">${s2.badge}</div><h1>New badge!</h1><p class="bn">${esc(s2.name)} শেষ! দারুণ, ${name}! 🎉${nextLv?` এবার Level ${nextLv.lv} খুলে গেছে!`:" তুমি সব লেভেল শেষ করেছ! 🏆"}</p>`
      :`<div class="sp-resem">${sp.stars>=sp.total?"🏆":"🌟"}</div><h1>${["Great job!","Super star!","You did it!","Amazing!"][Math.floor(Math.random()*4)]}</h1><p class="bn">${sp.total}টা শব্দ খেললে।</p>`}
      <div class="sp-earn">${Array.from({length:Math.min(sp.stars,10)},(_,k)=>`<span style="--k:${k}">⭐</span>`).join("")}</div><p class="small muted">+${sp.stars} star</p>
      <button class="btn good wide" data-act="${sp.kind==="revise"||next.t==="done"?"spellHome":"spellLevel"}" data-n="${nextLv?nextLv.lv:sp.lv}">${sp.kind==="revise"||next.t==="done"?(nextLv?"পরের লেভেল দেখো":"ঠিক আছে"):"চালিয়ে যাও ➜"}</button></div></main>`;
  }
  return "";
}
/* ---- actions ---- */
const SPELL_ACT={
 spellOpen(){SP();APP.spell={scr:"home",k:Date.now()};render();window.scrollTo(0,0);},
 spellClose(){TTS.stop();APP.spell=null;render();},
 spellHome(){TTS.stop();APP.spell={scr:"home",k:Date.now()};render();window.scrollTo(0,0);},
 spellLevel(el){const n=+el.dataset.n;if(!spUnlocked(n)){toast("আগের লেভেল শেষ করো 🔒");return;}const nx=spNext(n);if(nx.t==="done"){spStartGame(n,"revise",spLevel(n).words);return;}spGo(n);},
 spellRevise(el){const n=+el.dataset.n,s=SP(),learned=s.lv[n].learned;const ws=spWordsOf(n,learned);const tricky=ws.filter(w=>(s.w[w[0]]||{}).bad).concat(spShuffle(ws)).filter((w,i,a)=>a.indexOf(w)===i).slice(0,8);spStartGame(n,"revise",tricky);},
 spellReplay(){spAnimate();},
 spellLearned(){const sp=APP.spell,L=spLevel(sp.lv),st=SP().lv[sp.lv],w=L.words[sp.i][0];TTS.stop();if(!st.learned.includes(w))st.learned.push(w);Store.save();spGo(sp.lv);},
 spellIntroGo(){const f=APP.spell.next;f&&f();},
 spellPick(el){const r=APP.spell.rounds[APP.spell.i];if(r.done)return;const v=el.dataset.v;if(v===r.w[0])spRight(el);else{r.wrong.push(v);spWrong(el);render();}},
 spellMiss(el){const r=APP.spell.rounds[APP.spell.i];if(r.done)return;const v=el.dataset.v;if(v===r.w[0][r.gap])spRight(document.querySelector(".sp-letters .gap"));else{r.wrong.push(v);spWrong(el);render();}},
 spellTile(el){const sp=APP.spell,r=sp.rounds[sp.i];if(r.done)return;const ti=+el.dataset.i,need=r.w[0][r.sel.length];
   if(r.tiles[ti]!==need){spWrong(el);TTS.say(LETTER[need]||need);return;}
   const from=el.getBoundingClientRect();r.sel.push(ti);TTS.say(LETTER[need]||need);render();
   const slot=document.querySelectorAll(".sp-slot")[r.sel.length-1];flyTile(from,slot);
   if(r.sel.length===r.w[0].length)setTimeout(()=>spRight(document.querySelector(".sp-slots")),350);}
};
