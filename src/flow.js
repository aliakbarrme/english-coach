/* ================= path flow: land on the current lesson, jump button, chests, tile flight, dictation ================= */
function curNodeEl(){return document.querySelector(".path .node.cur")||[...document.querySelectorAll(".path .node.done")].pop()||null;}
function scrollToCur(smooth,pulse){
  const el=curNodeEl();if(!el)return;
  const r=el.getBoundingClientRect(),top=Math.max(0,window.scrollY+r.top+r.height/2-window.innerHeight*.48);
  window.scrollTo({top,behavior:smooth&&!RM.matches?"smooth":"auto"});
  if(pulse&&el.animate&&!RM.matches)setTimeout(()=>{try{el.animate([{transform:"scale(1)"},{transform:"scale(1.18)"},{transform:"scale(.96)"},{transform:"scale(1)"}],{duration:700,easing:EZ.out3});}catch(e){}SND.play&&SND.play("pop");},smooth?650:420);
}
/* floating "back to my lesson" button: visible on the path whenever the current lesson is off-screen */
const JUMP=(()=>{const b=document.createElement("button");b.className="jumpcur";b.hidden=true;b.setAttribute("aria-label","Go to current lesson");
  b.innerHTML='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>';
  b.addEventListener("click",()=>{SND.play&&SND.play("tap");scrollToCur(true,true);});
  const add=()=>document.body.append(b);document.body?add():addEventListener("DOMContentLoaded",add);return b;})();
let jumpRAF=0;
function jumpUpdate(){
  jumpRAF=0;const el=viewKey()==="tab:learn"?curNodeEl():null;
  if(!el){JUMP.hidden=true;return;}
  const r=el.getBoundingClientRect(),off=r.bottom<70?"up":r.top>window.innerHeight-90?"down":"";
  JUMP.hidden=!off;JUMP.classList.toggle("up",off==="up");
}
const jumpSoon=()=>{if(!jumpRAF)jumpRAF=setTimeout(jumpUpdate,90);};
addEventListener("scroll",jumpSoon,{passive:true});addEventListener("resize",jumpSoon);
/* called by render() after every paint */
function flowAfter(key,prev){
  const tb=document.querySelector(".topbar");if(tb)document.documentElement.style.setProperty("--tbh",tb.offsetHeight+"px");
  if(key==="tab:learn"&&prev!=="tab:learn"){
    const back=prev==="L:done"||prev==="L";
    scrollToCur(false,back);requestAnimationFrame(()=>{scrollToCur(false);jumpUpdate();});
  }
  jumpUpdate();navHop();
}
/* a word tile glides from where it was tapped to its new place */
function flyTile(fromRect,el){
  if(!fromRect||!el||!el.animate||RM.matches)return;
  const r=el.getBoundingClientRect(),dx=fromRect.left-r.left,dy=fromRect.top-r.top;
  try{el.animate([{transform:`translate(${dx}px,${dy}px) scale(1.04)`,boxShadow:"0 14px 26px -12px #10231f66"},{transform:"translate(0,0) scale(1)"}],{duration:420,easing:EZ.out3});}catch(e){}
}
/* unit treasure chest: opens once the unit is finished */
function chestHTML(u,allDone){
  const open=!!(S.chests&&S.chests[u.id]);
  const st=open?"opened":allDone?"ready":"lock";
  return `<div class="nodewrap chestwrap"><button class="chest ${st}" data-act="chest" data-id="${esc(u.id)}" aria-label="Unit reward (${st})"><span class="chest-ic">${open?"✨":"🎁"}</span><span class="lbl">${open?"Collected":allDone?"Open reward":"Unit reward"}</span></button></div>`;
}
function openChest(el){
  const id=el.dataset.id,u=unitById(id);if(!u)return;
  S.chests=S.chests||{};
  if(S.chests[id]){toast("এই পুরস্কার আগেই নেওয়া হয়েছে।");return;}
  const done=nodeStates(u.track).filter(n=>n.u.id===id).every(n=>n.st==="done");
  if(!done){SND.play("no");toast("ইউনিটের সব লেসন শেষ করলে এটা খুলবে।");if(el.animate)el.animate([{transform:"rotate(0)"},{transform:"rotate(-8deg)"},{transform:"rotate(8deg)"},{transform:"rotate(0)"}],{duration:400});return;}
  S.chests[id]=today();addXP(15);Store.save();
  const r=el.getBoundingClientRect();SND.play("done");confetti();render();
  const f=document.createElement("div");f.className="floatup";f.textContent="+15 XP";f.style.left=(r.left+r.width/2)+"px";f.style.top=r.top+"px";document.body.append(f);
  if(f.animate)f.animate([{opacity:0,transform:"translate(-50%,6px)"},{opacity:1,transform:"translate(-50%,-20px)",offset:.3},{opacity:0,transform:"translate(-50%,-60px)"}],{duration:1500,easing:EZ.out3}).onfinish=()=>f.remove();else setTimeout(()=>f.remove(),1200);
}
/* speak instead of typing on "type" exercises */
function dictate(){
  const e=cur();if(L.fb||!HEAR.avail())return;
  if(L.dict){HEAR.stop();L.dict=false;render();return;}
  L.dict=true;L.dictErr=null;render();
  HEAR.start(e.it.en,{onInterim:b=>{if(cur()!==e)return;const ta=$("#typein");if(ta&&b.text){const t=b.text.charAt(0).toUpperCase()+b.text.slice(1);ta.value=t;L.typed=t;const c=document.querySelector('.foot [data-act="check"]');if(c)c.disabled=false;}},
    onDone:(err)=>{if(cur()!==e)return;L.dict=false;if(err&&err!=="aborted")L.dictErr=hearErr(err);render();}});
}
/* mid-lesson cheer: after a good run, a short pause before the second half */
function maybeCheer(){
  if(L.cheered||L.done||L.ex.length<8)return;
  if(L.i>=Math.ceil(L.ex.length/2)&&(L.combo||0)>=3){L.cheered=true;L.cheer=true;}
}
function viewCheer(){
  const kid=isKid(),n=L.combo||0;
  return `<div class="player"><div class="body cheer"><div class="cheer-hero"><span class="cheer-em">${kid?"🌟":"🚀"}</span><span class="cheer-ring"></span></div>
    <div class="bubble"><b>${kid?"Super star! You're on fire!":"দারুণ চলছে!"}</b><span>${kid?`${n} right in a row! Keep going!`:`টানা ${n}টা ঠিক। এবার বাকিগুলো একটু কঠিন, চলো দেখি!`}</span></div></div>
    <div class="foot"><div class="in"><button class="btn good wide" data-act="cheerGo">Continue</button></div></div></div>`;
}
const WAVE='<span class="wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';

/* path buddies: a 3D character floats beside each unit's path; tap it to hear a word */
const PALS={family:["🏡","🧸","🎂","🌸"],client:["💼","🤝","🏆","🎯"],everyday:["☕","🍎","🎧","🌈"]};
function palHTML(u,ui,off){
  let em,say;
  if(u.track==="kids"){const it=(u.lessons[0]&&u.lessons[0].items[1])||[];em=it[2]||"🌟";say=it[0]?fill(it[0]):u.title;}
  else{const l=PALS[u.track]||PALS.everyday;em=l[ui%l.length];say=u.title;}
  const x=off>=0?-128:128;
  return `<div class="palrow" aria-hidden="false"><button class="pathpal ${x<0?"l":"r"}" style="--x:${x}px;--d:${(ui%4)*.6}s" data-act="palTap" data-t="${esc(say)}" aria-label="${esc(say)}"><span class="palbody">${em}</span><span class="palshadow"></span></button></div>`;
}
function palTap(el){
  const b=el.querySelector(".palbody");TTS.say(el.dataset.t);SND.play&&SND.play("pop");
  if(b&&b.animate&&!RM.matches)b.animate([{transform:"translateY(0) scale(1)"},{transform:"translateY(4px) scale(1.12,.86)",offset:.18},{transform:"translateY(-26px) scale(.92,1.1) rotate(-8deg)",offset:.5},{transform:"translateY(2px) scale(1.06,.94)",offset:.82},{transform:"none"}],{duration:750,easing:"cubic-bezier(.3,.7,.4,1)"});
}
/* bottom-nav / sidebar icon hops when its tab becomes active */
let NAVCUR=null;
function navHop(){
  const b=document.querySelector("nav.tabs button[aria-current] svg");const v=APP.tab;
  if(NAVCUR!==null&&v!==NAVCUR&&b&&b.animate&&!RM.matches)b.animate([{transform:"none"},{transform:"translateY(-6px) scale(1.18) rotate(-8deg)",offset:.35},{transform:"translateY(1px) scale(.95)",offset:.7},{transform:"none"}],{duration:560,easing:EZ.out3});
  NAVCUR=v;
}

/* kids: a burst of stars and sparkles from the right answer */
function kidBurst(el){
  if(!el||RM.matches)return;const r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  const set=["⭐","✨","🎉","💖","🌟","🎈"];
  for(let i=0;i<12;i++){const s=document.createElement("span");s.className="kburst";s.textContent=set[i%set.length];s.style.left=cx+"px";s.style.top=cy+"px";document.body.append(s);
    const ang=(i/12)*Math.PI*2+Math.random()*.4,d=70+Math.random()*60,dx=Math.cos(ang)*d,dy=Math.sin(ang)*d-30;
    const a=s.animate([{transform:"translate(-50%,-50%) scale(.3)",opacity:1},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1.1) rotate(${(Math.random()-.5)*90}deg)`,opacity:1,offset:.6},{transform:`translate(calc(-50% + ${dx*1.15}px),calc(-50% + ${dy+40}px)) scale(.6)`,opacity:0}],{duration:900+Math.random()*300,easing:"cubic-bezier(.2,.8,.3,1)"});
    a.onfinish=()=>s.remove();}
  try{el.animate([{transform:"scale(1)"},{transform:"scale(1.18,.86)"},{transform:"scale(.92,1.1)"},{transform:"scale(1.08)"}],{duration:520,easing:"ease-out"});}catch(e){}
}
