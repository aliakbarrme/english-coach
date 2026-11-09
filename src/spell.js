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

