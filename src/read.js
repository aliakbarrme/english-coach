/* ================= 📖 Read words: a phonics reading course inside Letter Friends (original feature) =================
   Order follows how good phonics teachers build reading (systematic synthetic phonics, e.g. UFLI / Jolly Phonics routines):
   short a → i → o → u → e word families (onset + rime blending) → all-vowel review → two letters, one sound (sh ch th ck ng)
   → special families (ill ell all ind old ost).
   Every lesson is short: quick review → meet the family → blend sound by sound → read the family list
   → a check game (read the word, pick the picture / hear it, build it) → read a sentence. Words go into a spaced
   review (1, 2, 4, 7, 14, 30 days) so they are not forgotten. Letter sounds use the licensed Phonicademy pack. */
/* hand-drawn 3D icons for words that have no emoji */
const RD_SVG={
 mat:'<svg class="rd-svg" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="rdgm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9965a"/><stop offset="1" stop-color="#a5683a"/></linearGradient></defs><ellipse cx="32" cy="53" rx="27" ry="4" fill="#000" opacity=".15"/><path d="M10 20h44l6 28H4z" fill="url(#rdgm)"/><path d="M9 27h46M7.5 34h49M6 41h52" stroke="#7d4a22" stroke-width="2.4" opacity=".55"/><path d="M10 20h44" stroke="#f0c28c" stroke-width="2.5" stroke-linecap="round"/><path d="M8 48v5M14 48v5M20 48v5M26 48v5M32 48v5M38 48v5M44 48v5M50 48v5M56 48v5" stroke="#c48a52" stroke-width="2.2" stroke-linecap="round"/><rect x="22" y="26" width="20" height="14" rx="3" fill="#fff" opacity=".18"/></svg>',
 rug:'<svg class="rd-svg" viewBox="0 0 64 64" aria-hidden="true"><defs><radialGradient id="rdgr" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#ff8a7a"/><stop offset="1" stop-color="#d9433a"/></radialGradient></defs><ellipse cx="32" cy="50" rx="28" ry="5" fill="#000" opacity=".15"/><ellipse cx="32" cy="38" rx="28" ry="13" fill="url(#rdgr)"/><ellipse cx="32" cy="38" rx="20" ry="9" fill="none" stroke="#ffd36b" stroke-width="2.6"/><ellipse cx="32" cy="38" rx="11" ry="5" fill="#ffd36b" opacity=".9"/><ellipse cx="32" cy="38" rx="5" ry="2.2" fill="#d9433a"/><path d="M10 31q22-9 44 0" stroke="#fff" stroke-width="2" opacity=".35" fill="none" stroke-linecap="round"/></svg>',
 fig:'<svg class="rd-svg" viewBox="0 0 64 64" aria-hidden="true"><defs><radialGradient id="rdgf" cx=".38" cy=".4" r=".75"><stop offset="0" stop-color="#b57ad6"/><stop offset="1" stop-color="#5b2b7a"/></radialGradient></defs><ellipse cx="32" cy="57" rx="16" ry="3" fill="#000" opacity=".15"/><path d="M32 12c4 0 5 6 9 12 6 8 9 13 9 19 0 9-8 14-18 14s-18-5-18-14c0-6 3-11 9-19 4-6 5-12 9-12z" fill="url(#rdgf)"/><path d="M32 13V7" stroke="#6b8e23" stroke-width="3" stroke-linecap="round"/><path d="M33 9c4-5 11-5 14-2-4 3-10 4-14 2z" fill="#7cc242"/><ellipse cx="25" cy="34" rx="4" ry="7" fill="#fff" opacity=".28"/></svg>',
 lid:'<svg class="rd-svg" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="rdgl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef2f6"/><stop offset="1" stop-color="#9aa6b4"/></linearGradient></defs><ellipse cx="32" cy="50" rx="27" ry="5" fill="#000" opacity=".15"/><path d="M6 44c0-13 12-22 26-22s26 9 26 22z" fill="url(#rdgl)"/><ellipse cx="32" cy="44" rx="27" ry="4.5" fill="#8a96a5"/><rect x="26" y="13" width="12" height="9" rx="4" fill="#3b3f4a"/><path d="M14 36c3-6 9-9 15-10" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7" fill="none"/></svg>',
 mud:'<svg class="rd-svg" viewBox="0 0 64 64" aria-hidden="true"><defs><radialGradient id="rdgd" cx=".45" cy=".35" r=".8"><stop offset="0" stop-color="#9b6a42"/><stop offset="1" stop-color="#5a3a1f"/></radialGradient></defs><path d="M8 44c-4-6 4-12 10-11 2-7 12-9 16-4 6-5 16-2 16 5 7 0 10 7 5 11-3 4-11 5-18 5H19c-6 0-9-2-11-6z" fill="url(#rdgd)"/><ellipse cx="26" cy="36" rx="6" ry="2.5" fill="#fff" opacity=".25"/><ellipse cx="42" cy="40" rx="4" ry="1.8" fill="#fff" opacity=".2"/><circle cx="14" cy="24" r="3" fill="#7a5130"/><circle cx="50" cy="22" r="2.4" fill="#7a5130"/><circle cx="33" cy="17" r="2" fill="#7a5130"/></svg>'};
const RD_UNITS=[
 {id:"a",v:"a",name:"Short a",bn:"ছোট a: /a/ আওয়াজ",col:"#ff6b6b",lessons:[
  {id:"at",rime:"at",w:"cat🐱 hat🎩 bat🦇 rat🐀 mat@mat sat~🧘 fat~🐡 pat~🫳",s:"The cat sat on a mat.",sp:"🐱"},
  {id:"an",rime:"an",w:"can🥫 fan🪭 man👨 pan🍳 van🚐 ran~🏃‍♀️ tan~🟫",s:"A man ran to the van.",sp:"👨🚐"},
  {id:"ap",rime:"ap",w:"cap🧢 map🗺️ tap🚰 nap😴 lap~🧑‍💻 gap~↔️ sap~🌲",s:"Dad has a cap and a map.",sp:"🧢🗺️"},
  {id:"ad",rime:"ad",w:"dad👨‍👧 sad😢 mad😠 pad🗒️ lad👦 bad~👎",s:"Dad is sad.",sp:"👨‍👧😢"},
  {id:"ag",rime:"ag",w:"bag👜 tag🏷️ rag🧻 wag~🐕 sag~📉",s:"The bag has a tag.",sp:"👜🏷️"},
  {id:"am",rime:"am",w:"ham🍖 ram🐏 yam🍠 jam🫙 dam~🦫",s:"Sam has ham and jam.",sp:"🍖🫙"},
  {id:"rev",rev:1,alien:"zat vap jad kag yan pab",s:"The fat cat has a map in a bag.",sp:"🐱🗺️👜"}]},
 {id:"i",v:"i",name:"Short i",bn:"ছোট i: /i/ আওয়াজ",col:"#4f86f7",lessons:[
  {id:"it",rime:"it",w:"kit🧰 pit🕳️ sit🪑 hit~🥊 bit~🍪 fit~💪 lit~🕯️",s:"I can sit in it.",sp:"🧰"},
  {id:"in",rime:"in",w:"pin📌 bin🗑️ win🏆 fin🦈 kin~👨‍👩‍👧",s:"Put the pin in the bin.",sp:"📌🗑️"},
  {id:"ip",rime:"ip",w:"lip👄 sip🥤 dip🫕 rip~👖 hip~🕺 tip~💁",s:"I sip and dip.",sp:"🥤"},
  {id:"ig",rime:"ig",w:"pig🐷 dig⛏️ wig👩‍🦱 fig@fig big~🐘 jig~💃",s:"The big pig can dig.",sp:"🐷⛏️"},
  {id:"ix",rime:"ix",w:"six6️⃣ mix🥣 fix🔧",s:"I can mix and fix.",sp:"🥣🔧"},
  {id:"id",rime:"id",w:"kid🧒 hid🙈 lid@lid bid~🔨 did~✅",s:"The kid hid the lid.",sp:"🧒🙈"},
  {id:"rev",rev:1,alien:"zib vit zid nim fip jix",s:"The big pig hid in a bin.",sp:"🐷🗑️"}]},
 {id:"o",v:"o",name:"Short o",bn:"ছোট o: /o/ আওয়াজ",col:"#ffa62b",lessons:[
  {id:"ot",rime:"ot",w:"hot🔥 pot🍲 dot⚫ cot🛌 got~🎁 not~🚫 lot~🅿️",s:"The pot is hot.",sp:"🍲🔥"},
  {id:"op",rime:"op",w:"mop🧹 hop🐇 pop🎈 top🔝 cop👮",s:"Hop on top, Bob!",sp:"🐇🔝"},
  {id:"og",rime:"og",w:"dog🐶 log🪵 fog🌫️ hog🐗 jog~👟",s:"The dog sat on a log.",sp:"🐶🪵"},
  {id:"ox",rime:"ox",w:"box📦 fox🦊 ox🐂",s:"A fox is in a box.",sp:"🦊📦"},
  {id:"ob",rime:"ob",w:"job💼 cob🌽 rob🦹 sob~😭 mob~👥",s:"Bob has a job.",sp:"💼"},
  {id:"rev",rev:1,alien:"zot vop yog kob jox lom",s:"The dog and the fox hop on a log.",sp:"🐶🦊🪵"}]},
 {id:"u",v:"u",name:"Short u",bn:"ছোট u: /u/ আওয়াজ",col:"#2fbf8f",lessons:[
  {id:"ug",rime:"ug",w:"bug🐛 hug🤗 jug🏺 rug@rug tug~🪢 dug~⛏️",s:"A bug is on the jug.",sp:"🐛🏺"},
  {id:"un",rime:"un",w:"sun☀️ run🏃 fun🎉 bun🥯",s:"Run in the sun.",sp:"🏃☀️"},
  {id:"ut",rime:"ut",w:"cut✂️ hut🛖 nut🥜",s:"Cut the nut.",sp:"✂️🥜"},
  {id:"ub",rime:"ub",w:"tub🛁 cub🐻 sub🥪 rub~🧼",s:"The cub is in the tub.",sp:"🐻🛁"},
  {id:"up",rime:"up",w:"cup☕ up⬆️ pup🐩",s:"The pup has a cup.",sp:"☕"},
  {id:"ud",rime:"ud",w:"bud🌱 mud@mud dud~💣",s:"The bud is in the mud.",sp:"🌱"},
  {id:"rev",rev:1,alien:"zug vun yut kub fup lud",s:"The pup and the cub run in the sun.",sp:"🐻☀️"}]},
 {id:"e",v:"e",name:"Short e",bn:"ছোট e: /e/ আওয়াজ",col:"#9b6bff",lessons:[
  {id:"et",rime:"et",w:"net🥅 jet✈️ wet💧 pet🐾 vet🩺 get~🫴",s:"My pet got wet.",sp:"🐾💧"},
  {id:"en",rime:"en",w:"hen🐔 pen🖊️ ten🔟 men👬",s:"The hen has ten eggs.",sp:"🐔🔟"},
  {id:"ed",rime:"ed",w:"bed🛏️ red🔴 fed~🍼 led~💡 wed~💒",s:"The bed is red.",sp:"🛏️🔴"},
  {id:"eg",rime:"eg",w:"leg🦵 peg🧷 keg🛢️ beg~🙏",s:"The hen has a red leg.",sp:"🐔🦵"},
  {id:"rev",rev:1,alien:"zet ven yed jeg bep lem",s:"Ten red hens get in a big net.",sp:"🐔🥅"}]},
 {id:"mix",v:"a",name:"All short vowels",bn:"সব ছোট স্বর একসাথে",col:"#ff7a3d",lessons:[
  {id:"rev",rev:1,all:1,alien:"zat vip yog kub jet fen",s:"A cat, a pig, a dog, a bug and a hen sit in the sun.",sp:"🐱🐷🐶🐛🐔"}]},
 {id:"dg",name:"Two letters, one sound",bn:"দুই অক্ষর, এক আওয়াজ",col:"#00a6c8",lessons:[
  {id:"sh",dg:"sh",ex:"ship",w:"ship🚢 shop🏪 fish🐟 dish🍽️ cash💵 shed🏚️ wish~🌠",s:"A fish is on the ship.",sp:"🐟🚢"},
  {id:"ch",dg:"ch",ex:"chip",w:"chip🍟 chick🐥 chop🪓 chat~💬 rich~💰",s:"The chick has a chip.",sp:"🐥🍟"},
  {id:"th",dg:"th",ex:"bath",w:"bath🛀 math➕ path🛤️ thin~🥢 with~🤝",s:"Beth is in the bath.",sp:"🛀"},
  {id:"ck",dg:"ck",ex:"duck",w:"duck🦆 sock🧦 rock🪨 lock🔒 neck🧣 back~🔙",s:"The duck has a sock.",sp:"🦆🧦"},
  {id:"ng",dg:"ng",ex:"ring",w:"ring💍 king👑 sing🎤 song🎵 bang💥 long~📏",s:"The king has a ring.",sp:"👑💍"},
  {id:"rev",rev:1,alien:"shap chim thog zick yong shub",s:"The duck and the fish sing on the ship.",sp:"🦆🐟🚢"}]},
 {id:"sp",name:"Special families",bn:"বিশেষ ফ্যামিলি",col:"#e0489a",lessons:[
  {id:"ill",rime:"ill",chunk:1,w:"hill⛰️ pill💊 mill🏭 fill~🫗 will~📜",s:"Jill ran up the hill.",sp:"⛰️"},
  {id:"ell",rime:"ell",chunk:1,w:"bell🔔 shell🐚 well🪣 yell📣 tell~🗣️ sell~🛒",s:"The bell fell in the well.",sp:"🔔"},
  {id:"all",rime:"all",chunk:1,note:"Here a says /aw/!",w:"ball⚽ wall🧱 tall🦒 fall🍂 call📞 hall🏛️",s:"The ball is on the wall.",sp:"⚽🧱"},
  {id:"ind",rime:"ind",chunk:1,note:"Here i says its name!",w:"find🔍 blind🦯 mind~🧠 kind~💖 bind~📎",s:"Find the kind cat.",sp:"🔍🐱"},
  {id:"old",rime:"old",chunk:1,note:"Here o says its name!",w:"cold🥶 gold🥇 fold🗞️ hold~🤲 sold~🧾 bold~🅱️",s:"The gold is cold.",sp:"🥇🥶"},
  {id:"ost",rime:"ost",chunk:1,note:"Here o says its name!",w:"post📮 ghost👻 host🤵 most~💯",s:"The ghost is at the post.",sp:"👻📮"},
  {id:"rev",rev:1,alien:"zill vell nall jind vold zost",s:"The kind ghost has a cold gold ball.",sp:"👻🥇⚽"}]}];
/* how a rime sounds when blended: real words where they exist, otherwise IPA for the neural voice ("ph:") */
/* every rime is voiced from IPA so it keeps its full, stressed vowel (a word like "an" or "am" is otherwise read weakly, /ən/) */
const RD_RSAY={at:"pw:ˈæt",an:"pw:ˈæn",am:"pw:ˈæm",ap:"pw:ˈæp",ad:"pw:ˈæd",ag:"pw:ˈæɡ",it:"pw:ˈɪt",in:"pw:ˈɪn",ip:"pw:ˈɪp",ig:"pw:ˈɪɡ",ix:"pw:ˈɪks",id:"pw:ˈɪd",
 ot:"pw:ˈɑt",op:"pw:ˈɑp",og:"pw:ˈɑɡ",ox:"pw:ˈɑks",ob:"pw:ˈɑb",ug:"pw:ˈʌɡ",un:"pw:ˈʌn",ut:"pw:ˈʌt",ub:"pw:ˈʌb",up:"pw:ˈʌp",ud:"pw:ˈʌd",
 et:"pw:ˈɛt",en:"pw:ˈɛn",ed:"pw:ˈɛd",eg:"pw:ˈɛɡ",ill:"pw:ˈɪl",ell:"pw:ˈɛl",all:"pw:ˈɔl",ind:"pw:ˈaɪnd",old:"pw:ˈoʊld",ost:"pw:ˈoʊst"};
/* what a device voice says if a chunk clip is missing */
if(typeof PHFB!=="undefined")Object.entries(RD_RSAY).forEach(([k,v])=>{PHFB[v]=k;});
const RD_SAY={slide:"Slide to sound it out!",newWord:"Now, sound out this new word!",meet:"Meet the family!",dg:"Two letters, one sound!",blend:"Let's blend!",read:"Read the words.",pick:"Read it. Which picture?",build:"Build the word.",
 alien:"Real word or alien word?",sent:"Read the sentence.",done:"Great reading!",review:"Let's review!",again:"Let's try again!"};
const RD_TEAMS=["sh","ch","th","ck","ng","ll","ss","gh","wh"];
/* lessons as one list, with the words parsed: "cat🐱" -> {w:"cat", p:"🐱"} */
const RD_L=[];RD_UNITS.forEach((u,ui)=>u.lessons.forEach((l,li)=>{
 const words=(l.w||"").split(/\s+/).filter(Boolean).map(t=>{const m=t.match(/^([A-Za-z]+)(~?)(@?)(.*)$/);return {w:m[1].toLowerCase(),name:m[1],abs:!!m[2],p:m[3]?RD_SVG[m[4]]||"":m[4]||""};});
 RD_L.push(Object.assign({},l,{u,ui,li,key:u.id+"-"+l.id,words,idx:RD_L.length}));}));
const rdLesson=k=>RD_L.find(l=>l.key===k);
const rdUnitWords=L=>RD_L.filter(x=>!x.rev&&(L.all?["a","i","o","u","e"].includes(x.u.id):x.u===L.u)).flatMap(x=>x.words);
const rdWordsOf=L=>L.rev?rdUnitWords(L):L.words;
const rdLabel=L=>L.rev?"★":L.dg?L.dg:"-"+L.rime;
/* onset + rime: "c" + "at" = "cat" (the way teachers read a word family aloud) */
const RD_VIPA={a:"æ",e:"ɛ",i:"ɪ",o:"ɑ",u:"ʌ"};
const RD_CIPA={b:"b",c:"k",k:"k",ck:"k",d:"d",f:"f",g:"ɡ",h:"h",j:"ʤ",l:"l",ll:"l",m:"m",n:"n",p:"p",r:"ɹ",s:"s",ss:"s",t:"t",v:"v",w:"w",x:"ks",y:"j",z:"z",sh:"ʃ",ch:"ʧ",th:"θ",ng:"ŋ"};
const rdLessonOf=x=>RD_L.find(l=>!l.rev&&l.words.includes(x));
function rdOnsetRime(x,L){const ps=rdSplit(x.w,L);let i=ps.findIndex(p=>p.chunk||/^[aeiou]/.test(p.g));if(i<0)i=ps.length;return {on:ps.slice(0,i),rm:ps.slice(i)};}
function rdRimeSay(rm){if(!rm.length)return null;if(rm.length===1&&rm[0].chunk)return RD_RSAY[rm[0].g]||null;const g=rm.map(p=>p.g).join("");if(RD_RSAY[g])return RD_RSAY[g];
 const v=RD_VIPA[rm[0].g],cs=rm.slice(1).map(p=>RD_CIPA[p.g]);return v&&!cs.some(c=>c==null)?"pw:ˈ"+v+cs.join(""):null;}
function rdEq(x,L){L=L&&!L.rev?L:rdLessonOf(x)||L;const {on,rm}=rdOnsetRime(x,L),rs=rdRimeSay(rm);
 if(!on.length||!rs)return {eq:false,list:[...rdSplit(x.w,L).map(p=>rdSound(p,L)),x.w],n:rdSplit(x.w,L).length};
 return {eq:true,on:on.map(p=>p.g).join(""),rm:rm.map(p=>p.g).join(""),list:[...on.map(p=>rdSound(p,L)),rs,x.w],n:on.length};}
/* which part to light while the list plays: onset sounds, then the rime, then the whole word */
const rdPartAt=(e,j)=>j===e.list.length-1?"w":e.eq?(j<e.n?"on":"rm"):"on";
function READ_TEXTS(){const out=[...Object.values(RD_SAY),"Yay! You did it!"];
 RD_L.forEach(L=>{L.words.forEach(x=>{out.push(x.w,"sl:"+x.w);const e=rdEq(x,L);if(e.eq)out.push(e.list[e.list.length-2]);});if(L.rime&&RD_RSAY[L.rime])out.push(RD_RSAY[L.rime]);if(L.ex)out.push(L.ex);out.push(L.s);rdSentWords(L.s).forEach(w=>out.push(rdWordSay(w)));});
 return [...new Set(out)];}
const rdPic=x=>x.p&&!x.abs;
const rdSentWords=s=>s.split(/\s+/).map(w=>w.replace(/[^A-Za-z']/g,"")).filter(Boolean);
const rdWordSay=w=>w.toLowerCase()==="a"?"ph:ə":w;
/* letters / letter teams of a word, with the sound each one makes */
function rdSplit(w,L){
 const plain=s=>{const out=[];for(let i=0;i<s.length;){const two=s.slice(i,i+2);if(RD_TEAMS.includes(two)){out.push({g:two});i+=2;}else{out.push({g:s[i]});i++;}}return out;};
 if(L&&L.chunk&&L.rime&&w.endsWith(L.rime))return [...plain(w.slice(0,-L.rime.length)),{g:L.rime,chunk:1}];
 const parts=plain(w);if(L&&L.rime&&!L.chunk&&w.endsWith(L.rime)){let n=0;for(let i=parts.length-1;i>=0;i--){n+=parts[i].g.length;parts[i].rime=1;if(n>=L.rime.length)break;}}
 return parts;}
function rdSound(p,L){if(p.chunk)return RD_RSAY[p.g]||p.g;if(p.g.length===1)return LSOUND[p.g]||p.g;if(p.g==="gh")return LSOUND.g;return (typeof DIG!=="undefined"&&DIG[p.g])||LSOUND[p.g[0]];}
/* progress + spaced review (Leitner boxes) */
const RD_GAP=[1,2,4,7,14,30];
const rdDay=()=>Math.floor(Date.now()/864e5);
function RDST(){const P=LPST();const r=P.rd||(P.rd={});r.l=r.l||{};r.w=r.w||{};return r;}
const rdStars=L=>RDST().l[L.key]||0;
const rdUnitDone=u=>RD_L.filter(L=>L.u===u).every(L=>rdStars(L)>0);
const rdUnitStickers=()=>RD_UNITS.filter(rdUnitDone).length;
const rdOpen=L=>L.idx===0||rdStars(RD_L[L.idx-1])>=2;
const rdNextL=()=>RD_L.find(L=>!rdStars(L))||RD_L[RD_L.length-1];
const rdPics=()=>RD_L.filter(L=>rdStars(L)).flatMap(L=>L.words).filter(rdPic);
function rdDue(){const R=RDST(),d=rdDay(),pic={};RD_L.forEach(L=>L.words.forEach(x=>{if(rdPic(x))pic[x.w]=x;}));return Object.keys(R.w).filter(w=>R.w[w].d<=d&&pic[w]).map(w=>pic[w]);}
function rdMark(w,ok){const R=RDST(),c=R.w[w]||{b:0,d:0};c.b=ok?Math.min(RD_GAP.length-1,c.b+1):0;c.d=rdDay()+RD_GAP[ok?c.b:0];R.w[w]=c;}
/* ---------- the check games ---------- */
function rdPickRound(x,pool){const others=lpShuffle(pool.filter(y=>rdPic(y)&&y.w!==x.w&&y.p!==x.p)).slice(0,2);return {t:"pick",x,opts:lpShuffle([x,...others])};}
function rdBuildRound(x,L,pool){const parts=rdSplit(x.w,L);let mi=0;
 if(L.dg)mi=Math.max(0,parts.findIndex(p=>p.g===L.dg));else if(L.chunk)mi=parts.findIndex(p=>p.chunk);
 const miss=parts[mi].g;let alt;
 if(L.dg)alt=["sh","ch","th","ck","ng"].filter(g=>g!==miss);else if(L.chunk)alt=["ill","ell","all","ind","old","ost"].filter(g=>g!==miss);
 else alt=[...new Set(pool.map(y=>rdSplit(y.w,L)[0].g).filter(g=>g!==miss&&g.length===1).concat(["b","c","d","f","h","m","p","s","t"]))].filter(g=>g!==miss);
 return {t:"build",x,parts,mi,opts:lpShuffle([miss,...lpShuffle(alt).slice(0,2)])};}
function rdMakePlay(L){const pics=L.words.filter(rdPic),pool=[...pics,...rdPics()],uniq=[];pool.forEach(y=>{if(!uniq.find(z=>z.w===y.w))uniq.push(y);});
 const src=pics.length>=2?pics:[...pics,...lpShuffle(uniq.filter(y=>!pics.includes(y)))].slice(0,3);const fill=uniq.length>=3?uniq:[...uniq,...RD_L.flatMap(l=>l.words).filter(rdPic)];
 const t=lpShuffle(src),bt=lpShuffle(L.words.filter(x=>rdPic(x)&&x.w!==L.rime)),rounds=[];
 for(let i=0;i<4;i++){const x=t[i%t.length];rounds.push(i%2===1&&bt.length?rdBuildRound(bt[(i>>1)%bt.length],L,fill):rdPickRound(x,fill));}return rounds;}
function rdMakeReview(words,n){const pool=RD_L.flatMap(l=>l.words).filter(rdPic);return lpShuffle(words.filter(rdPic)).slice(0,n).map(x=>rdPickRound(x,pool));}
function rdMakeAlien(L){const real=lpShuffle(rdWordsOf(L).map(x=>x.w)).slice(0,3),al=lpShuffle(L.alien.split(" ")).slice(0,3);return lpShuffle([...real.map(w=>({w,real:true})),...al.map(w=>({w,real:false}))]);}
/* ---------- screens ---------- */
const rdTiles=(parts,L,cls,lit)=>`<div class="rd-tiles ${cls||""}">${parts.map((p,i)=>`<button class="rd-tile ${p.rime||p.chunk?"rm":""} ${p.g.length>1?"team":""} ${lit&&lit.includes(i)?"lit":""}" data-act="rdTile" data-i="${i}" style="--c:${L.u.col}"><b>${esc(p.g)}</b><i class="rd-sb ${p.g.length>1?"dash":"dot"}"></i></button>`).join("")}</div>`;
const rdWordHTML=(x,L)=>{const ps=rdSplit(x.w,L);return ps.map(p=>`<span class="${p.rime||p.chunk||(L.dg&&p.g===L.dg)?"rm":""}">${esc(p.g)}</span>`).join("");};
function viewRead(A,P){
 if(A.scr==="rd"){const R=RDST(),due=rdDue().length,next=rdNextL(),tot=RD_L.length,done=RD_L.filter(L=>rdStars(L)).length;
  return `<main class="view palsview lp-run lp-wide rd-home">${lpTop("palsHome","📖 Read words",`<span class="lp-stars">⭐ <b>${RD_L.reduce((a,L)=>a+rdStars(L),0)}</b></span>`)}
   <div class="rd-hero"><span class="rd-herochar">${lpChar(next.u.v||"a","",true)}</span><div class="grow"><b>${done}/${tot} lessons</b><span class="tiny bn">শব্দ ভেঙে আওয়াজ বলো, জোড়া দাও, তারপর পড়ো!</span>
    <button class="btn bk-candy" data-act="rdOpen" data-k="${next.key}">▶ ${next.rev?"Review "+esc(next.u.name):esc(next.u.name)+" · "+esc(rdLabel(next))}</button></div></div>
   ${due?`<button class="rd-daily" data-act="rdDaily"><span>🔁</span><span class="grow"><b>Review ${due} word${due>1?"s":""}</b><span class="tiny bn">আগের শব্দ আবার পড়ো, যাতে ভুলে না যাও</span></span><span class="sc-go">➜</span></button>`:""}
   ${RD_UNITS.map(u=>{const ls=RD_L.filter(L=>L.u===u),n=ls.filter(L=>rdStars(L)).length,open=rdOpen(ls[0]);
    return `<section class="rd-unit ${open?"":"locked"}" style="--c:${u.col}"><div class="rd-uhead"><span class="rd-uic">${u.v&&u.id!=="mix"?lpChar(u.v):u.id==="dg"?"<b>sh</b>":u.id==="mix"?"<b>a e i o u</b>":"<b>✨</b>"}</span><div class="grow"><b>${esc(u.name)}</b><span class="tiny bn">${u.bn}</span></div><span class="rd-uprog">${n}/${ls.length}</span></div>
     <div class="rd-path">${ls.map(L=>{const s=rdStars(L),o=rdOpen(L),cur=L===next;return `<button class="rd-node ${s?"done":cur?"now":o?"open":"lock"} ${L.rev?"rev":""}" data-act="rdOpen" data-k="${L.key}" ${o?"":"aria-disabled=\"true\""}><b>${esc(rdLabel(L))}</b><i>${s?"⭐".repeat(s):o?"":"🔒"}</i></button>`;}).join("")}</div></section>`;}).join("")}</main>`;}
 if(A.scr==="rdv"){const Q=A.q,r=Q.rounds[Math.min(Q.i,Q.rounds.length-1)];
  if(Q.i>=Q.rounds.length)return `<main class="view palsview lp-run">${lpTop("palsRead","🔁 Review")}<div class="lp-won"><h1 class="lp-wtitle">Well done! 🎉</h1><p class="lp-bigstars">${"⭐".repeat(Math.max(1,Math.round(3*Q.ok/Q.rounds.length)))}</p><p class="bn">${Q.ok}/${Q.rounds.length} ঠিক। কঠিন শব্দগুলো কাল আবার আসবে।</p></div><button class="btn good wide" data-act="palsRead">📖 Read words</button></main>`;
  return `<main class="view palsview lp-run">${lpTop("palsRead","🔁 Review",lpDots(Q.rounds.length,Q.i))}${rdPickHTML(r,Q)}</main>`;}
 if(A.scr!=="rdl")return "";
 const Q=A.q,L=rdLesson(Q.k),step=Q.steps[Q.s],title=L.rev?`★ ${L.u.name}`:L.dg?`${L.dg} · one sound`:`-${L.rime} family`;
 const top=lpTop("palsRead",esc(title),lpDots(Q.steps.length,Q.s));
 if(step==="warm"||step==="mix"){const r=Q.rounds[Math.min(Q.i,Q.rounds.length-1)];return `<main class="view palsview lp-run rd-l">${top}<p class="rd-cap">${step==="warm"?"🔁 Quick review":"Read and pick"}</p>${rdPickHTML(r,Q)}</main>`;}
 if(step==="meet"){const note=L.note||(L.dg?`${L.dg}: two letters, one sound!`:`${L.u.v} says /${L.u.v}/`);
  return `<main class="view palsview lp-run rd-l">${top}
   <div class="rd-meet"><span class="rd-friend">${lpChar(rdFriend(L),"",true)}</span><span class="lp-bubble left">${esc(note)}</span></div>
   ${rdTiles(rdMeetParts(L),L,"big"+(Q.blended?" blended":""),Q.lit)}
   <p class="rd-fam" style="--c:${L.u.col}">${L.dg?`<b>${L.dg}</b> as in <b>${esc(L.ex)}</b>`:`the <b>-${L.rime}</b> family`}</p>
   <div class="row center lp-ctl"><button class="btn bk-candy" data-act="rdMeetPlay">🔊 Blend it</button><button class="btn good" data-act="rdNext">Next ➜</button></div></main>`;}
 if(step==="blend"){const x=Q.bw[Q.i],parts=rdSplit(x.w,L),prev=Q.i?rdSplit(Q.bw[Q.i-1].w,L):null,lit=Q.lit||[];
  return `<main class="view palsview lp-run rd-l">${top}<p class="rd-cap">${Q.i?"Now, sound out this new word!":"Slide to sound it out!"} <small class="bn">${Q.i?"নতুন অক্ষরটা দেখো, তারপর আবার টেনে পড়ো":"বোতামটা টেনে নাও, প্রতিটা আওয়াজ শোনো"}</small></p>
   <div class="rd-sl ${Q.blended?"done":""}" style="--c:${L.u.col};--n:${parts.length}">
    <div class="rd-slw">${parts.map((p,i)=>`<span class="rd-sll ${lit.includes(i)?"lit":""} ${prev&&(!prev[i]||prev[i].g!==p.g)?"new":""} ${p.rime||p.chunk?"rm":""}" data-i="${i}">${esc(p.g)}</span>`).join("")}</div>
    <div class="rd-trk" id="rd-trk">${parts.map((p,i)=>`<span class="rd-cell"><i class="rd-bead ${rdLong(p)?"long":"dot"} ${/^[aeiou]/.test(p.g)?"vw":""} ${lit.includes(i)?"lit":""}" data-i="${i}"></i></span>`).join("")}
     <button class="rd-knob ${Q.blended?"end":""}" id="rd-knob" style="left:${Q.blended?100:Q.kx||0}%" aria-label="Slide">${lpChar(rdFriend(L),"",true)}</button></div></div>
   <div class="rd-reveal ${Q.blended?"on":""}">${Q.blended?`<span class="rd-rpic">${x.p||"⭐"}</span><b>${rdWordHTML(x,L)}</b>`:`<span class="rd-hint">👆 ➜</span>`}</div>
   <div class="row center lp-ctl">${Q.blended?`<button class="btn ghost" data-act="rdSlideAgain">↺ Again</button><button class="btn good" data-act="rdBlendNext">${Q.i+1<Q.bw.length?"Next word ➜":"Next ➜"}</button>`:`<button class="btn ghost" data-act="rdBlend">👀 Show me</button>`}</div></main>`;}
 if(step==="read"){const ws=L.rev?Q.rw:L.words,cw=ws[Q.cw||0],e=rdEq(cw,L);
  return `<main class="view palsview lp-run rd-l">${top}<p class="rd-cap">Read the words! <small class="bn">নিজে পড়ো, তারপর চাপ দিয়ে মিলিয়ে নাও</small></p>
   <div class="rd-eqbar" style="--c:${L.u.col}">${e.eq?`<span class="rd-eqt on ${Q.part==="on"?"lit":""}">${esc(e.on)}</span><i>+</i><span class="rd-eqt rm ${Q.part==="rm"?"lit":""}">${esc(e.rm)}</span><i>=</i>`:""}<span class="rd-eqw ${Q.part==="w"?"lit":""}"><b>${rdWordHTML(cw,rdLessonOf(cw)||L)}</b>${cw.p?`<em>${cw.p}</em>`:""}</span></div>
   <div class="rd-list" style="--c:${L.u.col}">${ws.map((x,i)=>`<button class="rd-w ${Q.heard.includes(i)?"heard":""} ${(Q.cw||0)===i&&Q.part?"hl":""}" data-act="rdSayW" data-i="${i}"><span class="rd-wp">${x.p||""}</span><b>${rdWordHTML(x,rdLesson(Q.k).rev?RD_L.find(l=>l.words.includes(x)):L)}</b></button>`).join("")}</div>
   <div class="row center lp-ctl"><button class="btn bk-candy" data-act="rdReadAll">🔊 Read all</button><button class="btn good" data-act="rdNext" ${Q.heard.length>=ws.length||Q.all?"":"disabled"}>Next ➜</button></div></main>`;}
 if(step==="play"){const r=Q.rounds[Math.min(Q.i,Q.rounds.length-1)];
  if(r.t==="pick")return `<main class="view palsview lp-run rd-l">${top}<p class="rd-cap">Read it. Which picture? <small class="bn">পড়ো, তারপর ঠিক ছবি বাছো</small></p>${rdPickHTML(r,Q)}</main>`;
  return `<main class="view palsview lp-run rd-l">${top}<p class="rd-cap">Build the word! <small class="bn">শোনো, তারপর ফাঁকা ঘর পূরণ করো</small></p>
   <button class="lp-bpic ${Q.got?"win":""}" data-act="rdSayX"><span>${r.x.p}</span><i>${IC.speak}</i></button>
   <div class="rd-tiles big">${r.parts.map((p,i)=>`<span class="rd-tile ${i===r.mi&&!Q.got?"gap":""} ${p.rime||p.chunk?"rm":""}" style="--c:${L.u.col}"><b>${i===r.mi&&!Q.got?"?":esc(p.g)}</b></span>`).join("")}</div>
   <div class="rd-opts">${r.opts.map(g=>`<button class="rd-opt ${Q.miss===g?"miss":""} ${Q.got&&g===r.parts[r.mi].g?"ok":""}" data-act="rdBuild" data-g="${esc(g)}">${esc(g)}</button>`).join("")}</div></main>`;}
 if(step==="alien"){const r=Q.al[Math.min(Q.i,Q.al.length-1)];
  return `<main class="view palsview lp-run rd-l">${top}<p class="rd-cap">Real word or alien word? <small class="bn">আসল শব্দ, না কি এলিয়েনের বানানো শব্দ?</small></p>
   <div class="rd-alien ${Q.res||""}"><b>${esc(r.w)}</b></div>
   <div class="rd-opts two"><button class="rd-opt big ${Q.pickd==="real"?Q.res:""}" data-act="rdAlien" data-v="real">🏠<span>Real</span></button><button class="rd-opt big ${Q.pickd==="alien"?Q.res:""}" data-act="rdAlien" data-v="alien">👽<span>Alien</span></button></div></main>`;}
 if(step==="sent"){const ws=rdSentWords(L.s);
  return `<main class="view palsview lp-run rd-l">${top}<p class="rd-cap">Read the sentence! <small class="bn">নিজে পড়ো, তারপর শুনে মিলিয়ে নাও</small></p>
   <div class="rd-scene" style="--c:${L.u.col}"><span>${L.sp}</span></div>
   <div class="rd-sent">${L.s.split(/\s+/).map((w,i)=>`<button class="rd-sw ${Q.hl===i?"hl":""}" data-act="rdSayS" data-i="${i}">${esc(w)}</button>`).join(" ")}</div>
   <div class="row center lp-ctl"><button class="btn bk-candy" data-act="rdReadS">🔊 Read to me</button><button class="btn good" data-act="rdNext">Finish ➜</button></div></main>`;}
 if(step==="done"){const s=Q.stars,nx=RD_L[L.idx+1];
  return `<main class="view palsview lp-run rd-l">${lpTop("palsRead",esc(title))}
   <div class="lp-won"><h1 class="lp-wtitle">${s>=2?"Great reading! 🎉":"Good try! 💪"}</h1><div class="rd-friend big">${lpChar(L.u.v||"a","yum",true)}</div><p class="lp-bigstars">${"⭐".repeat(s)}${"☆".repeat(3-s)}</p>
    <p class="bn">${s>=2?`তুমি ${rdWordsOf(L).length}টা শব্দ পড়তে পারো!`:"আরেকবার খেললে ⭐⭐ পাবে, তারপর পরের লেসন খুলবে।"}</p></div>
   ${s>=2&&nx?`<button class="btn good wide" data-act="rdOpen" data-k="${nx.key}">Next: ${esc(nx.rev?"Review "+nx.u.name:rdLabel(nx))} ➜</button>`:""}
   ${s<2?`<button class="btn good wide" data-act="rdOpen" data-k="${L.key}">${RD_SAY.again.replace("!","")} ↺</button>`:""}
   <button class="linkbtn" data-act="palsRead">📖 All lessons</button></main>`;}
 return "";
}
function rdPickHTML(r,Q){return `<div class="rd-word big"><b>${esc(r.x.w)}</b>${Q.got?`<button class="lp-round sm" data-act="rdSayX" aria-label="Listen">${IC.speak}</button>`:""}</div>
 <div class="rd-pics">${r.opts.map(o=>`<button class="rd-pic ${Q.miss===o.w?"miss":""} ${Q.got&&o.w===r.x.w?"ok":""}" data-act="rdPick" data-w="${esc(o.w)}"><span>${o.p}</span></button>`).join("")}</div>`;}
/* ---------- actions ---------- */
function rdStart(L){const R=RDST(),due=rdDue().filter(x=>!L.words.find(y=>y.w===x.w));
 const steps=L.rev?["mix","read","alien","sent","done"]:[...(due.length>=2&&!L.rev?["warm"]:[]),"meet","blend","read","play","sent","done"];
 const Q={k:L.key,steps,s:0,i:0,ok:0,tries:0,heard:[],lit:[],miss:null,got:false,blended:false};
 if(steps[0]==="warm")Q.rounds=rdMakeReview(due,3);
 Q.bw=L.words.slice().sort((a,b)=>(rdPic(b)?1:0)-(rdPic(a)?1:0)).slice(0,L.rev?0:4);
 if(L.rev){Q.rounds=rdMakeReview(rdUnitWords(L),5);Q.rw=lpShuffle(rdUnitWords(L)).slice(0,8);Q.al=rdMakeAlien(L);}
 else Q.play=rdMakePlay(L);
 return Q;}
function rdWarm(L){try{const ws=L.rev?rdUnitWords(L):L.words,set=new Set();ws.forEach(x=>{set.add(x.w);const e=rdEq(x,L);if(e.eq)set.add(e.list[e.list.length-2]);});set.add(L.s);
 if(L.rime&&RD_RSAY[L.rime])set.add(RD_RSAY[L.rime]);set.forEach(s=>{if(TTS.clip(s))fetch((window.AUDIO_BASE||"a/")+akey(s)+".mp3").catch(()=>{});});}catch(e){}}
function rdEnter(){const A=APP.pals,Q=A.q,L=rdLesson(Q.k),st=Q.steps[Q.s];if(Q.s===0)rdWarm(L);if(st==="blend")rdSlideReset();Q.i=0;Q.miss=null;Q.got=false;Q.blended=false;Q.lit=[];Q.hl=-1;Q.res="";Q.pickd="";
 if(st==="play")Q.rounds=Q.play;
 if(st==="mix")Q.rounds=rdMakeReview(rdUnitWords(L),5);
 A.k=Date.now();render();window.scrollTo(0,0);
 const say={warm:RD_SAY.review,mix:RD_SAY.pick,meet:L.dg?RD_SAY.dg:RD_SAY.meet,blend:RD_SAY.slide,read:RD_SAY.read,alien:RD_SAY.alien,sent:RD_SAY.sent}[st];
 if(st==="play"){setTimeout(()=>rdRoundSay(),300);return;}
 if(say)setTimeout(()=>{if(APP.pals?.q===Q){if(st==="meet")lpPlay([say,...rdMeetList(L)]);else lpSay(say);}},300);}
const rdMeetParts=L=>L.dg?[{g:L.dg}]:L.chunk?[{g:L.rime,chunk:1}]:rdSplit(L.rime).map(p=>Object.assign(p,{rime:1}));
const rdFriend=L=>L.u.v&&L.u.id!=="mix"?L.u.v:L.dg?L.dg[0]:L.rime?L.rime[0]:"a";
function rdMeetList(L){if(L.dg)return [DIG[L.dg]||LSOUND[L.dg[0]],L.ex];if(L.chunk)return [RD_RSAY[L.rime],L.words[0].w];return [...rdSplit(L.rime).map(p=>rdSound(p,L)),RD_RSAY[L.rime]||L.rime];}
function rdRoundSay(){const A=APP.pals,Q=A.q,r=Q.rounds&&Q.rounds[Q.i];if(!r)return;if(r.t==="pick")lpSay(RD_SAY.pick);else lpPlay([RD_SAY.build,r.x.w]);}
function rdAfterRound(ok){const A=APP.pals,Q=A.q;if(ok)Q.ok++;Q.tries++;
 setTimeout(()=>{if(APP.pals?.q!==Q)return;Q.i++;Q.miss=null;Q.got=false;
  if(Q.i>=Q.rounds.length){if(A.scr==="rdv"){A.k=Date.now();render();SND.play("done");confetti(50);lpSay(RD_SAY.done);return;}rdStep();return;}
  A.k=Date.now();render();rdRoundSay();},1200);}
function rdStep(){const A=APP.pals,Q=A.q,L=rdLesson(Q.k);Q.s++;
 if(Q.steps[Q.s]==="done"){const n=Q.playN||1,okN=Q.playOk||0;let s=L.rev?(Q.alOk>=5&&Q.mixOk>=4?3:Q.alOk>=4&&Q.mixOk>=3?2:1):(okN>=4?3:okN>=3?2:1);
  Q.stars=s;const R=RDST();R.l[L.key]=Math.max(R.l[L.key]||0,s);if(!L.rev)L.words.forEach(x=>{if(rdPic(x)&&!R.w[x.w])R.w[x.w]={b:0,d:rdDay()+1};});
  addXP(s*2);Store.save();SND.play(s>=2?"done":"ok");if(s>=2)confetti(80);setTimeout(()=>APP.pals?.q===Q&&lpPlay(s>=2?[RD_SAY.done]:[RD_SAY.again]),400);}
 rdEnter();}
/* ---------- the sound slide: drag the friend under the word; each sound plays as it is reached,
   then the word is said slowly and then normally (continuous blending) ---------- */
const RD_CONT=new Set(["a","e","i","o","u","m","n","s","f","l","r","v","z","w","y","sh","th","ng","ll","ss","ff","h"]);
const rdLong=p=>p.chunk||RD_CONT.has(p.g);
const RDS={drag:false,done:false,played:[],q:[],busy:false,auto:0};
function rdSlideReset(){const Q=APP.pals&&APP.pals.q;cancelAnimationFrame(RDS.auto);Object.assign(RDS,{drag:false,done:false,played:[],q:[],busy:false,auto:0});if(Q){Q.kx=0;Q.lit=[];Q.blended=false;}}
function rdSlideCur(){const A=APP.pals;if(!A||A.scr!=="rdl"||!A.q)return null;const Q=A.q;if(Q.steps[Q.s]!=="blend")return null;const L=rdLesson(Q.k),x=Q.bw[Q.i];return {Q,L,x,parts:rdSplit(x.w,L)};}
function rdDrain(){if(RDS.busy)return;const s=RDS.q.shift();if(!s){if(RDS.done)rdSlideFinish();return;}RDS.busy=true;TTS.play([s],1).then(()=>{RDS.busy=false;rdDrain();});}
function rdSlideTo(pct){const c=rdSlideCur();if(!c||RDS.done)return;const trk=document.getElementById("rd-trk"),kb=document.getElementById("rd-knob");if(!trk||!kb)return;
 pct=Math.max(c.Q.kx||0,Math.min(100,pct));c.Q.kx=pct;kb.style.left=pct+"%";const r=trk.getBoundingClientRect(),x=r.left+r.width*pct/100;
 trk.querySelectorAll(".rd-bead").forEach(b=>{const i=+b.dataset.i,br=b.getBoundingClientRect();if(x>=br.left+Math.min(br.width*.4,10)&&!RDS.played.includes(i)){RDS.played.push(i);c.Q.lit=RDS.played.slice();
  b.classList.add("lit");const l=document.querySelector(`.rd-sll[data-i="${i}"]`);l&&l.classList.add("lit");RDS.q.push(rdSound(c.parts[i],c.L));rdDrain();}});
 if(pct>=97&&RDS.played.length>=c.parts.length){RDS.done=true;RDS.drag=false;kb.style.left="100%";rdDrain();}}
function rdSlideFinish(){const c=rdSlideCur();if(!c||RDS.fin===c.x)return;RDS.fin=c.x;const Q=c.Q;
 setTimeout(()=>{if(rdSlideCur()?.x!==c.x)return;TTS.play(["sl:"+c.x.w,c.x.w],1,i=>{if(i===1&&rdSlideCur()?.x===c.x){Q.blended=true;render();SND.play("pair");}});RDS.fin=null;},150);}
function rdSlideAuto(){const t0=performance.now(),dur=2600;const step=now=>{const p=Math.min(100,(now-t0)/dur*100);rdSlideTo(p);if(p<100&&!RDS.done)RDS.auto=requestAnimationFrame(step);};RDS.auto=requestAnimationFrame(step);}
function rdSlidePt(e){const trk=document.getElementById("rd-trk");if(!trk)return 0;const r=trk.getBoundingClientRect();return (e.clientX-r.left)/r.width*100;}
if(typeof document!=="undefined"){
 document.addEventListener("pointerdown",e=>{if(!e.target.closest||!e.target.closest("#rd-trk"))return;const c=rdSlideCur();if(!c||RDS.done)return;const p=rdSlidePt(e);if(Math.abs(p-(c.Q.kx||0))>22&&!e.target.closest("#rd-knob"))return;
  e.preventDefault();cancelAnimationFrame(RDS.auto);RDS.drag=true;rdSlideTo(p);},{passive:false});
 document.addEventListener("pointermove",e=>{if(RDS.drag)rdSlideTo(rdSlidePt(e));});
 document.addEventListener("pointerup",()=>{RDS.drag=false;});document.addEventListener("pointercancel",()=>{RDS.drag=false;});}
const RD_ACT={
 palsRead(){lpGo("rd");},
 rdOpen(el){const L=rdLesson(el.dataset.k);if(!L)return;if(!rdOpen(L)){SND.play("no");toast("আগের লেসনে ⭐⭐ পেলে এটা খুলবে 🔒");return;}APP.pals.q=rdStart(L);APP.pals.scr="rdl";TTS.stop();LP_MUSIC.stop();rdEnter();},
 rdDaily(){const due=rdDue();if(!due.length)return;const pool=RD_L.flatMap(l=>l.words).filter(rdPic);APP.pals.q={rounds:lpShuffle(due).slice(0,6).map(x=>rdPickRound(x,pool)),i:0,ok:0,daily:1};lpGo("rdv");setTimeout(()=>lpSay(RD_SAY.review),300);},
 rdNext(){rdStep();},
 rdTile(el){const A=APP.pals,Q=A.q;if(!Q||A.scr!=="rdl")return;const L=rdLesson(Q.k),st=Q.steps[Q.s];if(st!=="meet"&&st!=="blend")return;
  const parts=st==="meet"?rdMeetParts(L):rdSplit(Q.bw[Q.i].w,L);const i=+el.dataset.i,p=parts[i];if(!p)return;
  if(!Q.lit.includes(i))Q.lit.push(i);render();lpPlay([rdSound(p,L)]);},
 rdMeetPlay(){const A=APP.pals,Q=A.q,L=rdLesson(Q.k),n=rdMeetParts(L).length;Q.blended=false;Q.lit=[];render();
  TTS.play(rdMeetList(L),1,i=>{if(APP.pals?.q!==Q||i<0)return;if(i<n)Q.lit=[...Array(i+1).keys()];else Q.blended=true;render();});},
 rdBlend(){rdSlideReset();render();rdSlideAuto();},
 rdSlideAgain(){rdSlideReset();render();},
 rdBlendNext(){const A=APP.pals,Q=A.q;if(Q.i+1<Q.bw.length){Q.i++;rdSlideReset();A.k=Date.now();render();lpSay(RD_SAY.newWord);}else rdStep();},
 rdSayW(el){const A=APP.pals,Q=A.q,L=rdLesson(Q.k),ws=L.rev?Q.rw:L.words,i=+el.dataset.i,e=rdEq(ws[i],L);if(!Q.heard.includes(i))Q.heard.push(i);Q.cw=i;Q.part="";render();
  TTS.play(e.list,1,j=>{if(APP.pals?.q!==Q||Q.cw!==i)return;Q.part=j<0?(Q.part==="w"?"w":""):rdPartAt(e,j);render();if(j===e.list.length-1)SND.play("pair");});},
 rdReadAll(){const A=APP.pals,Q=A.q,L=rdLesson(Q.k),ws=L.rev?Q.rw:L.words;Q.all=true;const map=[],all=[];
  ws.forEach((x,i)=>{const e=rdEq(x,L);e.list.forEach((s,j)=>{all.push(s);map.push([i,rdPartAt(e,j)]);});});
  TTS.play(all,1,j=>{if(APP.pals?.q!==Q)return;if(j<0){Q.part="";render();return;}const [i,p]=map[j];Q.cw=i;Q.part=p;if(!Q.heard.includes(i))Q.heard.push(i);render();});},
 rdSayX(){const Q=APP.pals.q,r=Q.rounds[Math.min(Q.i,Q.rounds.length-1)];lpSay(r.x.w);},
 rdPick(el){const A=APP.pals,Q=A.q,r=Q.rounds[Q.i];if(!r||Q.got)return;const w=el.dataset.w,first=Q.miss===null;
  if(w===r.x.w){Q.got=true;SND.play("ok");render();lpSay(r.x.w);const st=A.scr==="rdl"?Q.steps[Q.s]:"rdv";
   if(st==="play"){Q.playN=(Q.playN||0)+1;if(first)Q.playOk=(Q.playOk||0)+1;}if(st==="mix"&&first)Q.mixOk=(Q.mixOk||0)+1;
   if(st==="warm"||st==="mix"||st==="rdv")rdMark(r.x.w,first);rdAfterRound(first);}
  else{Q.miss=w;SND.play("no");render();if(A.scr==="rdv"||Q.steps[Q.s]==="warm")rdMark(r.x.w,false);}},
 rdBuild(el){const A=APP.pals,Q=A.q,r=Q.rounds[Q.i];if(!r||Q.got)return;const g=el.dataset.g,first=Q.miss===null;
  if(g===r.parts[r.mi].g){Q.got=true;SND.play("ok");render();lpSay(r.x.w);Q.playN=(Q.playN||0)+1;if(first)Q.playOk=(Q.playOk||0)+1;rdAfterRound(first);}
  else{Q.miss=g;SND.play("no");render();lpPlay([rdSound({g},rdLesson(Q.k))]);}},
 rdAlien(el){const A=APP.pals,Q=A.q,r=Q.al[Q.i];if(!r||Q.res)return;const v=el.dataset.v,ok=(v==="real")===r.real;Q.pickd=v;Q.res=ok?"ok":"miss";if(ok)Q.alOk=(Q.alOk||0)+1;
  SND.play(ok?"ok":"no");render();if(r.real)lpSay(r.w);
  setTimeout(()=>{if(APP.pals?.q!==Q)return;Q.i++;Q.res="";Q.pickd="";if(Q.i>=Q.al.length){rdStep();return;}A.k=Date.now();render();},1100);},
 rdSayS(el){const Q=APP.pals.q,L=rdLesson(Q.k),w=L.s.split(/\s+/)[+el.dataset.i]||"";Q.hl=+el.dataset.i;render();lpSay(rdWordSay(w.replace(/[^A-Za-z']/g,"")));},
 rdReadS(){const A=APP.pals,Q=A.q,L=rdLesson(Q.k),words=L.s.split(/\s+/);const lens=words.map(w=>w.length+1),tot=lens.reduce((a,b)=>a+b,0);
  lpSay(L.s);const tick=()=>{if(APP.pals?.q!==Q||A.scr!=="rdl")return;const a=TTS.el,on=document.documentElement.classList.contains("is-speaking");
   if(!on){if(Q.hl!==-1){Q.hl=-1;render();}return;}
   if(a&&a.duration&&isFinite(a.duration)){const f=a.currentTime/a.duration*tot;let c=0,i=0;for(;i<lens.length;i++){c+=lens[i];if(c>=f)break;}if(Q.hl!==i){Q.hl=Math.min(i,words.length-1);render();}}
   requestAnimationFrame(tick);};setTimeout(tick,150);}
};
Object.assign(PALS_ACT,RD_ACT);
