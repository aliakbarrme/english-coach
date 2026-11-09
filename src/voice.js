/* ================= voice: neural clips (Kokoro, pre-generated) with best-device-voice fallback ================= */
const AUDIO_SET=new Set(/*__AUDIO__*/[]);
function h32(s){let h=0x811c9dc5;const b=unescape(encodeURIComponent(s));for(let i=0;i<b.length;i++){h^=b.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}return h.toString(16).padStart(8,"0");}
const akey=t=>h32(String(t).replace(/\s+/g," ").trim());
function splitSentences(t){return String(t).split(/\n+/).flatMap(p=>p.trim().split(/(?<=[.!?]["”]?)\s+/)).map(s=>s.trim()).filter(Boolean);}
const TTS={
 ok:true, el:null, run:0, onState:null,
 dev:"speechSynthesis" in window,
 clip(t){return AUDIO_SET.has(akey(t));},
 voice(){
  try{const vs=(speechSynthesis.getVoices()||[]).filter(v=>/^en[-_]/i.test(v.lang));
   const score=v=>(/natural|neural/i.test(v.name)?50:0)+(/online/i.test(v.name)?20:0)+(/ava|aria|jenny|emma|andrew|brian|samantha|google us english|google uk english female/i.test(v.name)?15:0)+(/en[-_]us/i.test(v.lang)?5:0)+(v.localService?0:3);
   return vs.sort((a,b)=>score(b)-score(a))[0]||null;}catch(e){return null;}},
 rateFor(rate){const r=rate||S?.rate||.9;return r;},
 /* play a list of sentences; onIdx(i) fires as each starts; resolves when finished or stopped */
 play(list,rate,onIdx){
  this.stop();const my=++this.run;const r=this.rateFor(rate);
  const one=(t)=>new Promise(res=>{
   if(my!==this.run)return res();
   if(/^pa:/.test(t)){
    PA.url(t.slice(3)).then(u=>{if(my!==this.run)return res();if(!u)return this.devSay(t,r).then(res);
     const a=this.el||(this.el=new Audio());let done=false,cut=null;const fin=()=>{if(done)return;done=true;clearTimeout(cut);a.onplaying=null;res();};
     const end=PA.end(t.slice(3));a.src=u;a.playbackRate=1;a.onended=a.onerror=fin;
     a.onplaying=()=>{if(end){clearTimeout(cut);cut=setTimeout(()=>{try{if(my===this.run)a.pause();}catch(e){}fin();},end*1000-(a.currentTime*1000||0));}};
     a.play().catch(()=>{if(!done){done=true;this.devSay(t,r).then(res);}});});
    return;
   }
   if(this.clip(t)){
    const a=this.el||(this.el=new Audio());a.src=(window.AUDIO_BASE||"a/")+akey(t)+".mp3";a.preservesPitch=true;
    a.playbackRate=r>=1?1:r<=.65?.78:r<=.75?.86:.95;
    a.onended=a.onerror=()=>res();a.play().catch(()=>this.devSay(t,r).then(res));
   }else this.devSay(t,r).then(res);
  });
  this.speaking(true);
  return (async()=>{for(let i=0;i<list.length;i++){if(my!==this.run)break;onIdx&&onIdx(i);await one(list[i]);}
   if(my===this.run){this.speaking(false);onIdx&&onIdx(-1);}})();
 },
 devSay(t,r){if(/^p[ha]:/.test(t))t=(typeof PHFB!=="undefined"&&PHFB[t])||t.slice(3);return new Promise(res=>{
  if(!this.dev){res();return;}
  try{const u=new SpeechSynthesisUtterance(t);const v=this.voice();if(v)u.voice=v;u.lang=v?.lang||"en-US";u.rate=r;
   let done=false;const fin=()=>{if(!done){done=true;res();}};u.onend=fin;u.onerror=fin;
   speechSynthesis.speak(u);setTimeout(fin,Math.max(4000,t.length*160/r));}catch(e){res();}});},
 speaking(on){document.documentElement.classList.toggle("is-speaking",on);this.onState&&this.onState(on);},
 say(t,rate){return this.play([t],rate);},
 sayLong(t,rate,onEnd,onIdx){return this.play(splitSentences(t),rate,onIdx).then(()=>onEnd&&onEnd());},
 stop(){this.run++;try{if(this.el){this.el.pause();this.el.onended=null;}}catch(e){}try{if(this.dev)speechSynthesis.cancel();}catch(e){}this.speaking(false);},
 utter(t,rate){const u=new SpeechSynthesisUtterance(t);const v=this.voice();if(v)u.voice=v;u.lang=v?.lang||"en-US";u.rate=rate||.9;return u;},
 label(){return AUDIO_SET.size?"Natural neural voice (offline clips)":(this.voice()?.name||"Device voice");}
};
TTS.ok=TTS.dev||AUDIO_SET.size>0;

/* ================= listening: browser speech recognition, word-level match (not a pronunciation score) ================= */
const SRC=window.SpeechRecognition||window.webkitSpeechRecognition;
function wordMatch(target,heard){
  const disp=words(target), tw=disp.map(w=>norm(w).replace(/\s+/g,"")), hw=norm(heard).split(" ").filter(Boolean);
  const eq=(a,b)=>a===b||(a.length>4&&lev(a,b)<=1)||(a.replace(/'/g,"")===b.replace(/'/g,""));
  const m=tw.length,n=hw.length,dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
  for(let i=m-1;i>=0;i--)for(let j=n-1;j>=0;j--)dp[i][j]=eq(tw[i],hw[j])?1+dp[i+1][j+1]:Math.max(dp[i+1][j],dp[i][j+1]);
  const ok=new Array(m).fill(false);let i=0,j=0;
  while(i<m&&j<n){if(eq(tw[i],hw[j])){ok[i]=true;i++;j++;}else if(dp[i+1][j]>=dp[i][j+1])i++;else j++;}
  return {words:disp.map((w,k)=>({w,ok:ok[k]})),score:m?ok.filter(Boolean).length/m:0};
}
const HEAR={
 on:false,rec:null,
 avail(){return !!SRC&&!ENV.claude&&window.isSecureContext;},
 start(target,{onInterim,onDone}){
  this.stop();const r=new SRC();this.rec=r;r.lang="en-US";r.interimResults=true;r.maxAlternatives=4;r.continuous=false;
  let best={score:-1,text:""};let finished=false;
  const fin=(err)=>{if(finished)return;finished=true;this.on=false;this.rec=null;onDone&&onDone(err,best);};
  r.onresult=e=>{for(let k=e.resultIndex;k<e.results.length;k++){const res=e.results[k];
    for(let a=0;a<res.length;a++){const t=res[a].transcript;const sc=wordMatch(target,t).score;if(sc>best.score||(sc===best.score&&res.isFinal))best={score:sc,text:t};}}
    onInterim&&onInterim(best);};
  r.onerror=e=>fin(e.error||"error");r.onend=()=>fin(null);
  try{r.start();this.on=true;}catch(e){fin("start");}
  setTimeout(()=>{if(this.rec===r)try{r.stop();}catch(e){}},12000);
 },
 stop(){if(this.rec){try{this.rec.abort();}catch(e){}this.rec=null;}this.on=false;}
};
function hearErr(e){return e==="not-allowed"||e==="service-not-allowed"?"মাইক্রোফোন বন্ধ আছে। কিছু অ্যাপের ভেতরের ব্রাউজারে মাইক চলে না, তাই Chrome/Edge বা Bolo English অ্যাপে খোলো। আগে Block করে থাকলে অ্যাড্রেস বারের লক আইকন → Microphone → Allow। এখনকার মতো Skip চাপতে পারো।":e==="no-speech"?"কিছু শোনা যায়নি। মাইকের কাছে জোরে বলো।":e==="network"?"Speech recognition-এর জন্য ইন্টারনেট লাগবে।":e==="audio-capture"?"Microphone pawa jay ni.":"শুনতে পারলাম না, আবার চেষ্টা করো।";}
