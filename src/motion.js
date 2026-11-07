/* ================= sound: soft synthesized UI sounds (no files) ================= */
const SND={
 ctx:null,out:null,
 on(){return !(typeof S!=="undefined"&&S&&S.sound===false);},
 ac(){
  if(!this.ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;
    this.ctx=new C();const lp=this.ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=2600;lp.Q.value=.4;
    const g=this.ctx.createGain();g.gain.value=.9;lp.connect(g);g.connect(this.ctx.destination);this.out=lp;}
  if(this.ctx.state==="suspended")this.ctx.resume().catch(()=>{});
  return this.ctx;
 },
 tone(f,dur,{type="sine",gain=.05,at=0,to=null,attack=.004}={}){
  const c=this.ac();if(!c)return;const t=c.currentTime+.005+at;
  const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t);
  if(to)o.frequency.exponentialRampToValueAtTime(to,t+dur);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+attack);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g);g.connect(this.out);o.start(t);o.stop(t+dur+.02);
 },
 play(name){
  if(!this.on())return;
  try{
   switch(name){
    case "tap": this.tone(520,.07,{to:400,gain:.06});break;
    case "select": this.tone(660,.08,{to:900,gain:.05});break;
    case "nav": this.tone(440,.09,{to:560,gain:.045});this.tone(880,.05,{gain:.012,at:.01});break;
    case "ok": this.tone(784,.22,{type:"triangle",gain:.06});this.tone(1175,.3,{type:"triangle",gain:.055,at:.08});vib(12);break;
    case "no": this.tone(330,.16,{gain:.06,to:300});this.tone(247,.24,{gain:.06,at:.1,to:220});vib([18,40,18]);break;
    case "pair": this.tone(988,.12,{type:"triangle",gain:.045});break;
    case "done": [523,659,784,1046].forEach((f,i)=>this.tone(f,.32,{type:"triangle",gain:.05,at:i*.09}));vib([10,30,10,30,20]);break;
    case "recOn": this.tone(440,.14,{to:880,gain:.05});break;
    case "recOff": this.tone(700,.16,{to:330,gain:.05});break;
    case "toggle": this.tone(600,.06,{to:720,gain:.045});break;
    case "tick": this.tone(1200,.03,{gain:.02});break;
   }
  }catch(e){}
 }
};
function vib(p){try{if(SND.on()&&navigator.vibrate)navigator.vibrate(p);}catch(e){}}
const ACT_SOUND={choose:"select",tile:"select",untile:"select",mL:"select",mR:"select",track:"select",node:"select",tab:"nav",
  check:null,recStart:"recOn",recStop:"recOff",rep:"select",warmToggle:"toggle",closeModal:null,say:"tap",saySlow:"tap"};

/* ================= motion: WAAPI choreography modelled on the reference (power3/power4 out, back.out pops) ================= */
const RM=matchMedia("(prefers-reduced-motion: reduce)");
const EZ={out3:"cubic-bezier(.215,.61,.355,1)",out4:"cubic-bezier(.165,.84,.44,1)",back:"cubic-bezier(.34,1.56,.64,1)",back2:"cubic-bezier(.3,1.9,.5,1)",inOut:"cubic-bezier(.65,0,.35,1)"};
const IND=typeof CSS!=="undefined"&&CSS.supports&&CSS.supports("translate","1px 1px");
function tf(x,y,s,r){ // keyframe that composes with any inline transform
  const k={};if(IND){k.translate=`${x||0}px ${y||0}px`;if(s!=null)k.scale=String(s);if(r!=null)k.rotate=r+"deg";}
  else k.transform=`translate(${x||0}px,${y||0}px)${s!=null?` scale(${s})`:""}${r!=null?` rotate(${r}deg)`:""}`;return k;}
function anim(el,from,to,o){if(!el||!el.animate||RM.matches)return null;try{return el.animate([from,to],Object.assign({fill:"backwards"},o));}catch(e){return null;}}
function rise(els,{y=34,x=0,scale=.985,dur=900,stagger=70,delay=0,ease=EZ.out3,max=14}={}){
  [...els].forEach((el,i)=>{const d=delay+Math.min(i,max)*stagger;anim(el,Object.assign({opacity:0},tf(x,y,scale)),Object.assign({opacity:1},tf(0,0,1)),{duration:dur,delay:d,easing:ease});});}
function popIn(els,{from=.6,stagger=50,delay=0,max=12}={}){
  [...els].forEach((el,i)=>anim(el,Object.assign({opacity:0},tf(0,0,from)),Object.assign({opacity:1},tf(0,0,1)),{duration:600,delay:delay+Math.min(i,max)*stagger,easing:EZ.back2}));}
function tilt(els,{stagger=60,delay=0}={}){
  [...els].forEach((el,i)=>anim(el,Object.assign({opacity:0},tf(0,40,.94,i%2?3:-3)),Object.assign({opacity:1},tf(0,0,1,0)),{duration:800,delay:delay+i*stagger,easing:EZ.back}));}
function splitHead(h){
  if(!h||h.dataset.split||h.children.length)return [];
  const ws=h.textContent.trim().split(/\s+/);h.dataset.split="1";
  h.innerHTML=ws.map(w=>`<span class="sw"><span>${esc(w)}</span></span>`).join(" ");
  return h.querySelectorAll(".sw>span");}
function revealHead(h,delay=0){
  const ws=splitHead(h);
  [...ws].forEach((w,i)=>anim(w,{transform:"translateY(115%) rotate(6deg)"},{transform:"translateY(0) rotate(0deg)"},{duration:850,delay:delay+i*45,easing:EZ.out4}));}
function countUp(root){
  if(RM.matches)return;
  root.querySelectorAll("[data-count]").forEach((el,i)=>{
    const to=+el.dataset.count;if(!isFinite(to)||to===0)return;const t0=performance.now()+i*60,dur=1300;
    const step=now=>{const p=Math.min(1,Math.max(0,(now-t0)/dur));const e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e);if(p<1)requestAnimationFrame(step);};
    el.textContent="0";requestAnimationFrame(step);});}
function floatUp(el,text){
  if(!el)return;const r=el.getBoundingClientRect();const f=document.createElement("div");f.className="floatup";f.textContent=text;f.setAttribute("aria-hidden","true");
  f.style.left=(r.left+r.width/2)+"px";f.style.top=r.top+"px";document.body.append(f);
  if(!f.animate||RM.matches){setTimeout(()=>f.remove(),900);return;}
  const a=f.animate([{opacity:0,transform:"translate(-50%,6px) scale(.9)"},{opacity:1,transform:"translate(-50%,-14px) scale(1)",offset:.3},{opacity:1,transform:"translate(-50%,-18px)",offset:.7},{opacity:0,transform:"translate(-50%,-44px)"}],{duration:1500,easing:EZ.out3});
  a.onfinish=()=>f.remove();}

/* entrance choreography when the whole view changes */
function enterView(root,first){
  const main=root.querySelector("main.view"), player=root.querySelector(".player"), solo=root.querySelector("main.welcome,main.onb,main.picker,main.picker2");
  if(solo){revealHead(solo.querySelector("h1"),80);rise([...solo.querySelectorAll(".onb-body>*:not(h1),.wl-hero>*:not(h1),.method>*,.pgrid>*,.pk-grid>*,.pk-top,.pk-hi,.pk-head p,.pk-add,main>.btn,.onb-foot,.onb-head")],{delay:120,stagger:60});}
  if(main){
    if(first)rise(main.querySelectorAll(".topbar>*"),{y:-12,dur:600,stagger:50,scale:1});
    revealHead(main.querySelector("h1"),first?120:40);
    const blocks=[...main.children].flatMap(el=>el.classList.contains("maincol")||el.classList.contains("sidecol")?[...el.children]:[el]).filter(el=>!el.classList.contains("topbar")&&el.offsetParent!==null);
    rise(blocks,{delay:first?100:30,dur:first?750:600,stagger:first?55:40,max:7});
    popIn(main.querySelectorAll(".node"),{delay:260,stagger:40});
    rise(main.querySelectorAll(".list .item,.warmstep"),{y:12,dur:550,stagger:45,delay:220,scale:1});
  }
  if(player){
    if(player.querySelector(".done-hero")){
      popIn(player.querySelectorAll(".done-hero"),{from:.3});revealHead(player.querySelector("h1"),150);
      tilt(player.querySelectorAll(".metric"),{delay:260});rise(player.querySelectorAll(".body>.card,.body>.okbox,.body>.btn"),{delay:520});
    }else{
      rise(player.querySelectorAll(".head>*"),{y:-10,dur:500,stagger:60,scale:1});
      enterSub(root);
    }
  }
  countUp(root);
}
/* smaller choreography when only the step inside a view changes */
function enterSub(root){
  const body=root.querySelector(".player .body");
  if(body){rise(body.children,{x:28,y:0,scale:1,dur:520,stagger:55,ease:EZ.out3});
    rise(body.querySelectorAll(".tile,.opt"),{y:10,dur:480,stagger:30,delay:120,scale:.96,max:12});return;}
  const ob=root.querySelector(".onb-body");if(ob){revealHead(ob.querySelector("h1"));rise([...ob.children].filter(x=>x.tagName!=="H1"),{x:26,y:0,scale:1,dur:520,stagger:50});popIn(ob.querySelectorAll(".avpick"),{stagger:18,max:24});return;}
  const main=root.querySelector("main.view");if(!main)return;
  const k=main.querySelector(".kidcard");if(k){tilt([k]);return;}
  const path=main.querySelectorAll(".unitban,.nodewrap");
  if(path.length){rise(main.querySelectorAll(".unitban"),{y:18,dur:650,stagger:80});popIn(main.querySelectorAll(".node"),{delay:80,stagger:35});return;}
  rise([...main.children].slice(1),{x:24,y:0,scale:1,dur:520,stagger:55});
}

/* ================= DOM morph: patch in place so taps keep state, scroll and transitions ================= */
function sameNode(a,b){
  if(a.nodeType!==b.nodeType||a.nodeName!==b.nodeName)return false;
  if(a.nodeType!==1)return true;
  if(a.id!==b.id)return false;
  if(a.getAttribute("data-key")!==b.getAttribute("data-key"))return false;
  const fc=/^(INPUT|TEXTAREA|SELECT)$/.test(a.nodeName);
  if(fc&&a.outerHTML!==b.outerHTML)return false; // re-render form controls only when their markup changed
  return true;
}
function patchAttrs(a,b){
  for(const {name} of [...a.attributes])if(!b.hasAttribute(name)&&name!=="data-split")a.removeAttribute(name);
  for(const {name,value} of [...b.attributes])if(a.getAttribute(name)!==value)a.setAttribute(name,value);
  if(a.nodeName==="BUTTON")a.disabled=b.hasAttribute("disabled");
}
function patchChildren(a,b,quiet,fresh){
  const an=[...a.childNodes],bn=[...b.childNodes];
  bn.forEach((y,i)=>{
    const x=an[i];
    if(!x){a.appendChild(y);if(!quiet&&y.nodeType===1)fresh.push(y);return;}
    if(sameNode(x,y)){
      if(x.nodeType===1){
        if(x.dataset.split&&x.textContent.replace(/\s+/g," ").trim()===y.textContent.replace(/\s+/g," ").trim())return; // keep split headline
        patchAttrs(x,y);if(/^(INPUT|TEXTAREA|SELECT)$/.test(x.nodeName))return;patchChildren(x,y,quiet,fresh);
      }else if(x.nodeValue!==y.nodeValue)x.nodeValue=y.nodeValue;
    }else{a.replaceChild(y,x);if(!quiet&&y.nodeType===1)fresh.push(y);}
  });
  for(let i=an.length-1;i>=bn.length;i--)an[i].remove();
}
function morph(root,html,quiet){
  const t=document.createElement("template");t.innerHTML=html;const fresh=[];
  patchChildren(root,t.content,quiet,fresh);
  fresh.filter(el=>!el.classList.contains("modal")&&!el.closest(".modal")).slice(0,10)
   .forEach((el,i)=>anim(el,Object.assign({opacity:0},tf(0,8,.97)),Object.assign({opacity:1},tf(0,0,1)),{duration:420,delay:i*30,easing:EZ.back}));
}

/* sliding pills (bottom nav + track switcher) */
function placePill(pill,target,instant){
  if(!pill||!target)return;
  if(instant)pill.style.transition="none";
  pill.style.width=target.offsetWidth+"px";pill.style.height=target.offsetHeight+"px";
  pill.style.transform=`translate(${target.offsetLeft}px,${target.offsetTop}px)`;
  if(instant){pill.offsetWidth;pill.style.transition="";}
}
