/* ================= Spelling & Phonics: a growing curriculum =================
   Add a level = add one object to SPELL (lv must be the next number). Words are [english, picture, bangla, sentence?].
   Optional per level: tip (Bangla hint), names:true (teach by letter names, for words that break the rules), types (game mix). */
const SPELL=[
 {lv:1,name:"2-letter words",bn:"২ অক্ষরের শব্দ",badge:"🐣",color:"#ff7eb0",words:[["up","⬆️","উপরে"],["on","💡","চালু"],["in","📦","ভেতরে"],["at","📍","এখানে"],["go","🚦","যাও"],["no","🙅","না"],["hi","👋","হাই"],["ox","🐂","ষাঁড়"],["me","🙋","আমি"],["we","👭","আমরা"]]},
 {lv:2,name:"3-letter words",bn:"৩ অক্ষরের শব্দ",badge:"🦊",color:"#ffa62b",words:[["cat","🐱","বিড়াল"],["dog","🐶","কুকুর"],["sun","☀️","সূর্য"],["pen","🖊️","কলম"],["bus","🚌","বাস"],["cup","☕","কাপ"],["hat","👒","টুপি"],["bed","🛏️","বিছানা"],["egg","🥚","ডিম"],["box","📦","বাক্স"],["pig","🐷","শূকর"],["ant","🐜","পিঁপড়া"],["fox","🦊","শিয়াল"],["cow","🐮","গরু"],["bag","👜","ব্যাগ"]]},
 {lv:3,name:"4-letter words",bn:"৪ অক্ষরের শব্দ",badge:"🦄",color:"#9b6bff",words:[["fish","🐟","মাছ"],["book","📖","বই"],["tree","🌳","গাছ"],["milk","🥛","দুধ"],["cake","🎂","কেক"],["ball","⚽","বল"],["duck","🦆","হাঁস"],["frog","🐸","ব্যাঙ"],["star","⭐","তারা"],["moon","🌙","চাঁদ"],["bird","🐦","পাখি"],["shoe","👟","জুতা"],["door","🚪","দরজা"],["kite","🪁","ঘুড়ি"],["rain","🌧️","বৃষ্টি"]]},
 {lv:4,name:"5-letter words",bn:"৫ অক্ষরের শব্দ",badge:"🐯",color:"#2fbf71",words:[["apple","🍎","আপেল"],["chair","🪑","চেয়ার"],["bread","🍞","রুটি"],["house","🏠","বাড়ি"],["water","💧","পানি"],["tiger","🐯","বাঘ"],["horse","🐴","ঘোড়া"],["green","🟢","সবুজ"],["plant","🪴","চারাগাছ"],["train","🚆","ট্রেন"],["smile","😊","হাসি"],["sheep","🐑","ভেড়া"],["clock","⏰","ঘড়ি"],["shirt","👕","শার্ট"],["juice","🧃","জুস"]]},
 {lv:5,name:"sh · ch · th sounds",bn:"দুই অক্ষর, এক আওয়াজ",tip:"দুটো অক্ষর মিলে একটা আওয়াজ: sh = শ, ch = চ, th = থ বা দ।",badge:"🐚",color:"#3aa7ff",words:[["ship","🚢","জাহাজ"],["shop","🏪","দোকান"],["shell","🐚","ঝিনুক"],["brush","🖌️","ব্রাশ"],["chick","🐥","মুরগির ছানা"],["cheese","🧀","পনির"],["lunch","🍱","দুপুরের খাবার"],["peach","🍑","পিচ ফল"],["watch","⌚","হাতঘড়ি"],["three","3️⃣","তিন"],["thumb","👍","বুড়ো আঙুল"],["teeth","🦷","দাঁত"],["bath","🛁","গোসল"],["path","🛤️","পথ"],["think","🤔","ভাবা"]]},
 {lv:6,name:"Magic e",bn:"শেষের e চুপ থাকে",tip:"শেষের e নিজে কথা বলে না, কিন্তু আগের স্বরকে নিজের নাম বলায়: kit → kite, cap → cape।",badge:"✨",color:"#ff9a3c",words:[["lake","🏞️","হ্রদ"],["gate","🚧","গেট"],["plane","✈️","বিমান"],["bike","🚲","সাইকেল"],["nine","9️⃣","নয়"],["five","5️⃣","পাঁচ"],["bone","🦴","হাড়"],["rose","🌹","গোলাপ"],["home","🏡","ঘর"],["cube","🧊","কিউব"],["flute","🪈","বাঁশি"],["slide","🛝","স্লাইড"],["smoke","💨","ধোঁয়া"],["globe","🌍","গ্লোব"],["grape","🍇","আঙুর"]]},
 {lv:7,name:"ee · oo · ai · oa",bn:"দুই স্বর, এক আওয়াজ",tip:"দুটো স্বর পাশাপাশি বসে একটা আওয়াজ করে: ee = ঈ, oo = উ, ai = এই, oa = ও।",badge:"🌈",color:"#9b6bff",words:[["bee","🐝","মৌমাছি"],["feet","🦶","পা"],["seed","🌱","বীজ"],["queen","👸","রানী"],["boot","🥾","বুট"],["spoon","🥄","চামচ"],["food","🍲","খাবার"],["snail","🐌","শামুক"],["paint","🎨","রং"],["mail","📬","চিঠি"],["boat","⛵","নৌকা"],["goat","🐐","ছাগল"],["coat","🧥","কোট"],["soap","🧼","সাবান"],["road","🛣️","রাস্তা"]]},
 {lv:8,name:"6-letter words",bn:"দুই ভাগের শব্দ (syllables)",tip:"লম্বা শব্দ দুই ভাগে বলো: rab-bit, pen-cil, gar-den। তারপর একসাথে!",badge:"🦁",color:"#ff6b5c",words:[["flower","🌸","ফুল"],["orange","🍊","কমলা"],["banana","🍌","কলা"],["rabbit","🐰","খরগোশ"],["monkey","🐒","বানর"],["pencil","✏️","পেনসিল"],["window","🪟","জানালা"],["garden","🌷","বাগান"],["school","🏫","স্কুল"],["bottle","🍼","বোতল"],["mother","👩","মা"],["father","👨","বাবা"],["sister","👧","বোন"],["yellow","💛","হলুদ"],["purple","💜","বেগুনি"]]},
 {lv:9,name:"Tricky words",bn:"যেভাবে লেখা, সেভাবে পড়া হয় না",tip:"এই শব্দগুলো নিয়ম মানে না, তাই অক্ষরের নাম ধরে মনে রাখো। বারবার দেখো আর বলো!",names:true,badge:"🧩",color:"#20b2b0",words:[["said","💬","বলেছিল"],["they","👫","তারা"],["have","🤲","আছে"],["come","👋","এসো"],["some","🍪","কিছু"],["there","👉","সেখানে"],["where","❓","কোথায়"],["what","🧐","কী"],["who","🙋","কে"],["could","🤷","পারত"],["friend","🤝","বন্ধু"],["people","👥","মানুষ"],["again","🔁","আবার"],["laugh","😂","হাসা"],["eight","8️⃣","আট"]]},
 {lv:10,name:"Big words",bn:"বড় শব্দ, ভাগ করে বলো",tip:"বড় শব্দ ছোট ছোট ভাগে বলো: el-e-phant, but-ter-fly। তারপর একসাথে!",badge:"🏆",color:"#e8590c",words:[["elephant","🐘","হাতি"],["umbrella","☂️","ছাতা"],["chocolate","🍫","চকলেট"],["butterfly","🦋","প্রজাপতি"],["computer","💻","কম্পিউটার"],["teacher","🧑‍🏫","শিক্ষক"],["kitchen","🍳","রান্নাঘর"],["airplane","🛫","উড়োজাহাজ"],["hospital","🏥","হাসপাতাল"],["dinosaur","🦕","ডাইনোসর"],["birthday","🎉","জন্মদিন"],["vegetable","🥕","সবজি"],["sandwich","🥪","স্যান্ডউইচ"],["football","🏈","ফুটবল"],["strawberry","🍓","স্ট্রবেরি"]]},
 {lv:11,name:"Everyday words",bn:"রোজকার শব্দ",badge:"🏡",color:"#36c46f",words:[["today","📅","আজ"],["happy","😀","খুশি"],["family","👪","পরিবার"],["money","💰","টাকা"],["phone","📱","ফোন"],["light","💡","আলো"],["night","🌃","রাত"],["sleep","😴","ঘুম"],["drink","🥤","পান করা"],["write","✍️","লেখা"],["play","🧸","খেলা"],["help","🆘","সাহায্য"],["clean","🧹","পরিষ্কার"],["music","🎵","গান"],["morning","🌅","সকাল"]]},
 {lv:12,name:"Spell in sentences",bn:"বাক্যের ভেতরে বানান",tip:"শব্দটা বাক্যের ভেতরে বসাও। আগে পুরো বাক্য শোনো!",badge:"📝",color:"#7b5cff",types:["sent","sent","hear","sent","say"],words:[
   ["because","❔","কারণ","I smile because I am happy."],["little","🐭","ছোট","The little mouse is in the box."],["under","⬇️","নিচে","The cat is under the bed."],
   ["after","⏭️","পরে","We play after school."],["before","⏮️","আগে","Wash your hands before you eat."],["always","♾️","সবসময়","I always help my mother."],
   ["every","📆","প্রতি","I read a book every day."],["never","🚫","কখনো না","I never tell a lie."],["other","👯","অন্য","Where is the other shoe?"],
   ["about","📚","সম্পর্কে","This book is about a big lion."],["over","🌉","উপর দিয়ে","The bird flies over the tree."],["many","🔢","অনেক","I have many friends."],
   ["first","🥇","প্রথম","She was first in the race."],["very","💯","খুব","The cake is very sweet."],["thank","🙏","ধন্যবাদ","Thank you for the gift."]]}
];
/* letter names, letter sounds, and sounds of letter teams */
const LETTER={a:"ay",b:"bee",c:"see",d:"dee",e:"ee",f:"ef",g:"jee",h:"aitch",i:"eye",j:"jay",k:"kay",l:"el",m:"em",n:"en",o:"oh",p:"pee",q:"cue",r:"ar",s:"ess",t:"tee",u:"you",v:"vee",w:"double you",x:"ex",y:"why",z:"zee"};
/* real phonics sounds: "ph:<IPA>" clips are rendered straight from IPA by the neural voice; PHFB is what a device voice says if a clip is missing */
const PHS={a:["æ","ah"],b:["bə","buh"],c:["kə","kuh"],d:["də","duh"],e:["ɛ","eh"],f:["fff","fff"],g:["ɡə","guh"],h:["hə","huh"],i:["ɪ","ih"],j:["ʤə","juh"],k:["kə","kuh"],l:["lll","lll"],m:["mmm","mmm"],n:["nnn","nnn"],o:["ɒ","o"],p:["pə","puh"],q:["kwə","kwuh"],r:["ɹə","ruh"],s:["sss","sss"],t:["tə","tuh"],u:["ʌ","uh"],v:["vvv","vvv"],w:["wə","wuh"],x:["ks","ks"],y:["jə","yuh"],z:["zzz","zzz"],
  sh:["ʃʃʃ","shh"],ch:["ʧə","chuh"],tch:["ʧə","chuh"],th:["θθθ","th"],ck:["kə","kuh"],ng:["ŋ","ng"],wh:["wə","wuh"],ph:["ff","fff"],qu:["kwə","kwuh"],igh:["aɪ","eye"],ie:["aɪ","eye"],
  ee:["iː","ee"],ea:["iː","ee"],oo:["uː","oo"],ai:["eɪ","ay"],ay:["eɪ","ay"],oa:["oʊ","oh"],ow:["oʊ","oh"],ou:["aʊ","ow"],ar:["ɑɹ","ar"],or:["ɔɹ","or"],er:["ɜɹ","er"],ir:["ɜɹ","er"],ur:["ɜɹ","er"],
  oor:["ɔɹ","or"],ui:["uː","oo"],nk:["ŋk","nk"],oi:["ɔɪ","oy"],oy:["ɔɪ","oy"],aw:["ɔ","aw"],au:["ɔ","aw"],ear:["ɪɹ","ear"],air:["ɛɹ","air"],ure:["jʊɹ","your"]};
const PHFB={};const ph=k=>{const p=PHS[k];if(!p)return k;PHFB["ph:"+p[0]]=p[1];return "ph:"+p[0];};
/* letters covered by the Phonicademy recordings use them; the rest keep the generated sounds for now */
const LSOUND={};"abcdefghijklmnopqrstuvwxyz".split("").forEach(c=>{if(PA.has(c)){LSOUND[c]="pa:"+c;PHFB["pa:"+c]=PHS[c][1];}else LSOUND[c]=ph(c);});
/* letter teams: Phonicademy recordings where the pack has them (key -> pack sound), generated sound otherwise */
const PA_DIG={ui:"oo",sh:"sh",ch:"ch",tch:"ch",th:"th",ng:"ng",nk:"nk",wh:"w",ph:"f",qu:"q",ck:"k",ai:"ai",ay:"ai",ee:"ee",ea:"ee",igh:"igh",ie:"igh",oa:"oa",ow:"oa",ou:"ow",oo:"oo",oor:"or",ar:"ar",or:"or",er:"ur",ir:"ur",ur:"ur",oi:"oi",oy:"oi",aw:"aw",au:"aw",ear:"ear",air:"air",ure:"ure"};
const DIG={};Object.keys(PA_DIG).forEach(k=>{const p=PA_DIG[k];if(PA.has(p)){DIG[k]="pa:"+p;PHFB["pa:"+p]=PHFB["pa:"+p]||(PHS[k]||PHS[p]||[0,k])[1];}else DIG[k]=ph(k);});
/* words where a team makes its other sound */
const SP_THV=new Set(["they","there","mother","father","feather","the","this","that","with","then","them","brother","other","weather"]);
const SP_OWAU=new Set(["cow","flower","down","brown","how","now","town","owl","clown","crown","towel"]);
const SP_OOB=new Set(["book","look","foot","good","cook","wood","hook","took"]);
const SP_UE=new Set(["cube","tube","mule","cute","huge","use","fuse"]);
const paOr=(name,fallback)=>PA.has(name)?"pa:"+name:fallback;
["ll","ss","ff","tt","pp","bb","dd","rr","nn","mm","gg","zz"].forEach(k=>DIG[k]=LSOUND[k[0]]);
const ABC_ART={igloo:'<svg class="vart" viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="86" rx="40" ry="5" fill="#0002"/><path d="M10 84 A40 40 0 0 1 90 84Z" fill="#eaf6ff" stroke="#9cc9ea" stroke-width="2"/><path d="M14 70h72M20 57h60M30 45h40M38 84V70M62 84V70M30 70V57M50 70V57M70 70V57M40 57V45M60 57V45" stroke="#9cc9ea" stroke-width="2"/><path d="M38 84V70a12 12 0 0 1 24 0v14Z" fill="#3a6f9a"/></svg>',
  zoo:'<svg class="vart" viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="90" rx="42" ry="4" fill="#0002"/><rect x="10" y="30" width="10" height="58" rx="3" fill="#8a5a2b"/><rect x="80" y="30" width="10" height="58" rx="3" fill="#8a5a2b"/><path d="M8 34 Q50 4 92 34" fill="none" stroke="#2fbf71" stroke-width="9" stroke-linecap="round"/><rect x="28" y="20" width="44" height="20" rx="5" fill="#ffd36b" stroke="#c98a1a" stroke-width="2"/><text x="50" y="35" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="15" fill="#7a3d0a">ZOO</text><path d="M24 88V50M32 88V50M40 88V50M60 88V50M68 88V50M76 88V50" stroke="#555" stroke-width="2.5"/><circle cx="50" cy="64" r="9" fill="#ffb547"/><circle cx="46" cy="62" r="1.6" fill="#333"/><circle cx="54" cy="62" r="1.6" fill="#333"/><path d="M46 68q4 3 8 0" stroke="#333" stroke-width="1.6" fill="none"/><path d="M42 57l-3-6M58 57l3-6" stroke="#c97a1a" stroke-width="3" stroke-linecap="round"/></svg>'};
const ABC=[["a","apple","🍎"],["b","ball","⚽"],["c","cat","🐱"],["d","dog","🐶"],["e","elephant","🐘"],["f","fish","🐟"],["g","girl","👧"],["h","hat","👒"],["i","igloo",ABC_ART.igloo],["j","juice","🧃"],["k","kangaroo","🦘"],["l","lion","🦁"],["m","monkey","🐒"],["n","nose","👃"],["o","octopus","🐙"],["p","pig","🐷"],["q","queen","👸"],["r","ring","💍"],["s","sun","☀️"],["t","train","🚆"],["u","umbrella","☂️"],["v","van","🚐"],["w","watch","⌚"],["x","box","📦"],["y","yo-yo","🪀"],["z","zoo",ABC_ART.zoo]];
const LCOL=["#ff5c8a","#ff9a3c","#2fbf71","#3a9bff","#9b6bff","#ff6b5c"];
const SPELL_TEXTS=()=>{const out=[];SPELL.forEach(L=>L.words.forEach(w=>{out.push(w[0]);if(w[3])out.push(w[3]);}));out.push(...Object.values(LETTER),...Object.values(LSOUND),...Object.values(DIG));ABC.forEach(([c,w])=>out.push(w));return [...new Set(out)];};

/* split a word into sound chunks: sh·i·p, c·a·k(e), b·oa·t */
function spChunks(w,names){
  if(names)return w.split("").map((c,k)=>({s:k,n:1,say:LETTER[c]||c}));
  const out=[];let k=0;const magic=/[aeiou][^aeiou]e$/.test(w)&&w.length>=4;
  while(k<w.length){
    if(magic&&k===w.length-1){out.push({s:k,n:1,say:"",silent:true});k++;continue;}
    let hit=null;for(const d of Object.keys(DIG).sort((a,b)=>b.length-a.length)){if(w.startsWith(d,k)){hit=d;break;}}
    if(hit){let say=DIG[hit];
      if(hit==="th"&&SP_THV.has(w))say=paOr("thv",say);
      if(hit==="ow"&&SP_OWAU.has(w))say=paOr("ow",DIG.ou);
      if(hit==="oo"&&SP_OOB.has(w))say=paOr("oob",say);
      out.push({s:k,n:hit.length,say});k+=hit.length;continue;}
    const c=w[k];const longV=magic&&k===w.length-3&&"aeiou".includes(c);
    let say=longV?LETTER[c]:(LSOUND[c]||c);
    if(longV){const lv={a:"ai",e:"ee",i:"igh",o:"oa"}[c];if(lv)say=paOr(lv,say);}   // magic e: the vowel says its long sound
    if(longV&&c==="u")say=SP_UE.has(w)?paOr("ue",say):paOr("oo",say);   // cube says "you", flute says "oo"
    out.push({s:k,n:1,say,long:longV});k++;
  }
  return out;
}
function SP(){const s=S.spell||(S.spell={lv:{},w:{},stars:0,badges:[]});s.recent=s.recent||[];s.said=s.said||0;SPELL.forEach(L=>{s.lv[L.lv]=s.lv[L.lv]||{learned:[],games:0,quiz:false};});return s;}
function spLevel(n){return SPELL.find(x=>x.lv===n);}
function spLvOf(word){const L=SPELL.find(L=>L.words.some(w=>w[0]===word));return L?L.lv:1;}
function spWordRec(word){const L=SPELL.find(L=>L.words.some(w=>w[0]===word));return L&&L.words.find(w=>w[0]===word);}
function spUnlocked(n){return n===1||!!(SP().lv[n-1]&&SP().lv[n-1].quiz);}
function spAcc(){const r=SP().recent;if(r.length<6)return .75;return r.reduce((a,b)=>a+b,0)/r.length;}
function spNext(n){
  const L=spLevel(n),st=SP().lv[n],N=L.words.length,batches=Math.ceil(N/5),k=st.learned.length;
  if(st.games<Math.floor(k/5)||(k===N&&st.games<batches))return {t:"game",batch:st.games};
  if(k<N)return {t:"learn",i:k};
  if(!st.quiz)return {t:"quiz"};
  return {t:"done"};
}
function spShuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
/* game mix grows with the level and adapts to how the child is doing */
function spTypesFor(n){
  const L=spLevel(n),acc=spAcc(),mic=HEAR.avail();
  let t=L.types?L.types.slice():n===1?["pic","word","miss"]:n===2?["pic","word","miss","build"]:n===3?["build","miss","pic","word","hear"]:["build","hear","miss","fix","build","hear"];
  if(acc<.6)t=t.concat(n>=3?["pic","word"]:["pic"]);          // finding it hard: more picture/recognition rounds
  if(acc>.85&&n>=3)t=t.filter(x=>x!=="pic"&&x!=="word").concat(["hear"]);  // doing great: more spelling from memory
  if(mic&&n>=2&&!t.includes("say"))t.push("say");
  if(!mic)t=t.filter(x=>x!=="say");
  if(!L.words[0][3])t=t.filter(x=>x!=="sent");
  return t.length?t:["build"];
}
function spRounds(words){
  let last="";return spShuffle(words).map((w,k)=>{const n=spLvOf(w[0]),types=spTypesFor(n);let t=types[(k+Math.floor(Math.random()*types.length))%types.length];if(t===last&&types.length>1)t=types[(types.indexOf(t)+1)%types.length];last=t;return spMakeRound(n,w,t);});
}
function spMisspell(w){
  const out=new Set(),V="aeiou";let guard=0;
  while(out.size<2&&guard++<40){const a=w.split(""),k=Math.floor(Math.random()*a.length),m=Math.floor(Math.random()*4);
    if(m===0&&k<a.length-1)[a[k],a[k+1]]=[a[k+1],a[k]];else if(m===1&&a.length>2)a.splice(k,1);else if(m===2)a.splice(k,0,a[k]);
    else{const vs=a.map((c,i)=>V.includes(c)?i:-1).filter(i=>i>=0);if(vs.length){const i=vs[Math.floor(Math.random()*vs.length)];a[i]=V.replace(a[i],"")[Math.floor(Math.random()*4)];}}
    const s=a.join("");if(s!==w)out.add(s);}
  return [...out];
}
function spMakeRound(n,w,t){
  const L=spLevel(n),acc=spAcc(),others=spShuffle(L.words.filter(x=>x[0]!==w[0])).slice(0,2);
  const r={t,w,tries:0,wrong:[]};
  if(t==="pic"||t==="word")r.opts=spShuffle([w,...others]);
  if(t==="fix")r.opts=spShuffle([w[0],...spMisspell(w[0])]);
  if(t==="miss"){const gaps=n>=6&&acc>.8&&w[0].length>4?2:1;r.gaps=spShuffle(w[0].split("").map((_,i)=>i)).slice(0,gaps).sort((a,b)=>a-b);r.gap=r.gaps[0];r.filled=[];const right=w[0][r.gap];const pool=spShuffle("abcdefghijklmnoprstuwy".split("").filter(c=>c!==right)).slice(0,2);r.opts=spShuffle([right,...pool]);}
  if(t==="build"||t==="hear"||t==="sent"){let extra=n>=3?2:1;if(acc>.85)extra++;if(acc<.6)extra=Math.max(0,extra-1);if(w[0].length>=8)extra=Math.min(extra,1);
    const pool=spShuffle("abcdefghiklmnoprstuw".split("").filter(c=>!w[0].includes(c))).slice(0,extra);r.tiles=spShuffle([...w[0].split(""),...pool]);r.sel=[];}
  return r;
}
function spStartGame(n,kind,words){APP.spell={scr:"game",lv:n,kind,rounds:spRounds(words),i:0,stars:0,k:Date.now()};render();spSayRound();}
function spGo(n){
  const nx=spNext(n);
  if(nx.t==="learn"){APP.spell={scr:"learn",lv:n,i:nx.i,k:Date.now()};render();spAnimate();return;}
  if(nx.t==="game"){const L=spLevel(n),ws=L.words.slice(nx.batch*5,nx.batch*5+5);APP.spell={scr:"intro",lv:n,next:()=>spStartGame(n,"game",ws),k:Date.now(),title:"Game time!",sub:"৫টা নতুন শব্দ শিখেছ! এবার একটা মজার খেলা 🎮"};render();SND.play("done");return;}
  if(nx.t==="quiz"){APP.spell={scr:"intro",lv:n,next:()=>spStartGame(n,"quiz",spLevel(n).words),k:Date.now(),title:"Revision time!",sub:"সব শব্দ একবার করে দেখি, তারপর নতুন লেভেল খুলবে! 🔓"};render();SND.play("done");return;}
  APP.spell={scr:"home",k:Date.now()};render();
}
const spWait=ms=>new Promise(r=>setTimeout(r,ms));
const spSay=(t,rate)=>Promise.race([TTS.say(t,rate),spWait(1600)]);
/* sounds mode: highlight each sound chunk while it plays, then blend slowly, then the whole word.
   names mode: highlight each letter while its name plays (c-a-t), then the word. */
async function spAnimate(mode){
  const sp=APP.spell;if(!sp||sp.scr!=="learn")return;const tok=sp.k=Date.now();
  const L=spLevel(sp.lv),w=L.words[sp.i][0];mode=mode||(L.names?"name":APP.spMode||"name");sp.mode=mode;
  const box=document.querySelector(".sp-card .sp-letters");if(!box)return;
  const els=()=>[...document.querySelectorAll(".sp-card .sp-letters .spl")];
  const fresh=!els().some(e=>e.classList.contains("on"));
  box.classList.remove("whole");els().forEach(e=>e.classList.remove("hl"));
  document.querySelectorAll(".sp-modes button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===mode));
  await spWait(fresh?450:150);
  for(const ch of spChunks(w,mode==="name")){
    if(!APP.spell||APP.spell.k!==tok)return;
    const grp=els().slice(ch.s,ch.s+ch.n);grp.forEach(e=>{e.classList.add("on","hl");if(ch.silent)e.classList.add("silent");});SND.play("pop");
    if(ch.say)await spSay(ch.say);else await spWait(500);
    await spWait(160);grp.forEach(e=>e.classList.remove("hl"));
  }
  if(!APP.spell||APP.spell.k!==tok)return;
  els().forEach(e=>e.classList.add("on","hl"));
  if(mode==="sound"){await spSay(w,.7);await spWait(200);}
  if(!APP.spell||APP.spell.k!==tok)return;
  els().forEach(e=>e.classList.remove("hl"));box.classList.add("whole");
  await spSay(w);
}
function spSayRound(){const sp=APP.spell;if(!sp||sp.scr!=="game")return;const r=sp.rounds[sp.i];if(!r)return;
  if(["word","hear","build","say"].includes(r.t))setTimeout(()=>{if(APP.spell===sp&&sp.rounds[sp.i]===r)TTS.say(r.w[0]);},380);
  if(r.t==="sent")setTimeout(()=>{if(APP.spell===sp&&sp.rounds[sp.i]===r)TTS.say(r.w[3]);},380);}
function spRecent(ok){const s=SP();s.recent.push(ok?1:0);if(s.recent.length>20)s.recent.shift();}
function spRight(el){
  const sp=APP.spell,r=sp.rounds[sp.i],s=SP(),w=r.w[0];
  const rec=s.w[w]||(s.w[w]={ok:0,bad:0});rec.ok++;rec.last=today();
  if(!r.tries){sp.stars++;s.stars++;spRecent(true);}
  r.done=true;SND.play("ok");TTS.say(r.t==="sent"?r.w[3]:w);render();kidBurst(el||document.querySelector(".sp-right"));
  Store.save();setTimeout(()=>{if(APP.spell===sp&&sp.rounds[sp.i]===r)spAdvance();},r.t==="sent"?2200:1300);
}
function spWrong(el){
  const sp=APP.spell,r=sp.rounds[sp.i],s=SP(),w=r.w[0];
  if(!r.tries)spRecent(false);r.tries++;const rec=s.w[w]||(s.w[w]={ok:0,bad:0});rec.bad++;SND.play("no");
  if(!r.requeued){r.requeued=true;sp.rounds.push(spMakeRound(spLvOf(w),r.w,r.t));}
  if(el&&el.animate)el.animate([{transform:"none"},{transform:"translateX(-9px) rotate(-4deg)"},{transform:"translateX(9px) rotate(4deg)"},{transform:"translateX(-5px)"},{transform:"none"}],{duration:420});
  Store.save();
}
function spAdvance(){
  const sp=APP.spell;sp.i++;
  if(sp.i<sp.rounds.length){render();spSayRound();return;}
  const s=SP(),st=s.lv[sp.lv];
  if(sp.kind==="game")st.games++;
  let badge=null;
  if(sp.kind==="quiz"){st.quiz=true;st.doneAt=today();const L=spLevel(sp.lv);if(!s.badges.includes(sp.lv)){s.badges.push(sp.lv);badge=L;}addXP(15);}
  else addXP(sp.kind==="game"?5:3);
  if(sp.kind==="daily")s.dailyAt=today();
  Store.save();APP.spell={scr:"result",lv:sp.lv,kind:sp.kind,stars:sp.stars,total:new Set(sp.rounds.map(r=>r.w[0])).size,badge,k:Date.now()};render();
  SND.play("done");confetti(badge?120:60);
}
/* daily review: words learned before, the ones with mistakes or not seen for a while first */
function spReviewWords(max=8){
  const s=SP(),all=[];SPELL.forEach(L=>s.lv[L.lv].learned.forEach(w=>{const rec=spWordRec(w);if(rec)all.push(rec);}));
  const score=w=>{const r=s.w[w[0]]||{ok:0,bad:0};return (r.bad*3)-(r.ok)+(r.last&&r.last!==today()?2:0)+Math.random()*2;};
  return all.sort((a,b)=>score(b)-score(a)).slice(0,max);
}
/* pronunciation: the child says the word, the browser's speech recognition checks it */
function spListen(word,done){
  let fin=false,best=0,heard="";
  HEAR.start(word,{onInterim:b=>{const sc=wordMatch(word,b.text).score;if(sc>=best){best=sc;heard=b.text;}if(best>=.6&&!fin){fin=true;HEAR.stop();done(true,heard,null);}},
    onDone:(err,b)=>{if(fin)return;fin=true;if(b&&b.text){heard=heard||b.text;best=Math.max(best,wordMatch(word,b.text).score);}done(best>=.6,heard,best?null:err);}});
}
function spSaidOk(w){const s=SP(),rec=s.w[w]||(s.w[w]={ok:0,bad:0});rec.said=(rec.said||0)+1;s.said++;}

/* ---- views ---- */
function spPic(em,cls=""){return `<span class="sp-pic ${cls}">${em}</span>`;}
function spLetters(w,show){return `<div class="sp-letters" style="--n:${w.length}">${w.split("").map((c,k)=>`<span class="spl ${show?"on":""}" style="--lc:${LCOL[k%LCOL.length]};--k:${k}">${c.toUpperCase()}</span>`).join("")}</div>`;}
function spTiles(r,w){return `<div class="sp-slots ${r.done?"sp-right":""}" style="--n:${w[0].length}">${w[0].split("").map((c,k)=>`<span class="sp-slot ${r.sel[k]!=null?"full":""}" style="--lc:${LCOL[k%LCOL.length]}">${r.sel[k]!=null?r.tiles[r.sel[k]].toUpperCase():""}</span>`).join("")}</div><div class="sp-tiles">${r.tiles.map((c,ti)=>`<button class="sp-tile ${r.sel.includes(ti)?"used":""}" data-act="spellTile" data-i="${ti}" ${r.sel.includes(ti)||r.done?"disabled":""}>${c.toUpperCase()}</button>`).join("")}</div>`;}
function viewSpell(){
  const sp=APP.spell,s=SP(),name=esc(myName());
  const bar=(back)=>`<div class="sptop"><button class="icon-btn" data-act="${back}" aria-label="Back">${back==="spellClose"?IC.close:IC.back}</button><span class="sp-stars">⭐ <b>${s.stars}</b></span></div>`;
  if(sp.scr==="home"){
    const cur=SPELL.find(L=>spUnlocked(L.lv)&&!s.lv[L.lv].quiz)||SPELL[SPELL.length-1];
    const lv=SPELL.map(L=>{const st=s.lv[L.lv],N=L.words.length,k=st.learned.length,open=spUnlocked(L.lv),done=st.quiz;
      const p=Math.round((k+st.games+(done?1:0))/(N+Math.ceil(N/5)+1)*100);
      return `<div class="sp-level ${open?"":"locked"} ${done?"done":""} ${L===cur?"cur":""}" style="--lc:${L.color}" ${L===cur?'id="sp-cur"':""}>
        <div class="sp-lvtop"><span class="sp-lvbadge">${open?L.badge:"🔒"}</span><div class="grow"><span class="sp-lvk">LEVEL ${L.lv}${L===cur&&!done?" · NOW":""}</span><b>${esc(L.name)}</b><span class="tiny bn muted">${esc(L.bn)} · ${k}/${N} শব্দ${done?" · ✅ শেষ":""}</span></div></div>
        ${open?`<div class="sp-prog"><i style="width:${p}%"></i></div>
        <div class="sp-lvbtns"><button class="btn" data-act="spellLevel" data-n="${L.lv}" style="--c:${L.color}">${done?"আবার খেলো":k?"চালিয়ে যাও":"শুরু করো"}</button>${k>=3?`<button class="btn ghost" data-act="spellRevise" data-n="${L.lv}">↻ Revise</button>`:""}</div>`:`<p class="tiny muted bn">আগের লেভেল শেষ করলে খুলবে</p>`}</div>`;}).join("");
    const tricky=Object.entries(s.w).filter(([w,r])=>r.bad>0).sort((a,b)=>b[1].bad-a[1].bad).slice(0,8);
    const learned=SPELL.reduce((a,L)=>a+s.lv[L.lv].learned.length,0),ok=Object.values(s.w).reduce((a,r)=>a+r.ok,0),bad=Object.values(s.w).reduce((a,r)=>a+r.bad,0);
    const doneLv=SPELL.filter(L=>s.lv[L.lv].quiz).length,rev=learned>=4;
    return `<main class="view spellview">${bar("spellClose")}
      <div class="sp-hero"><span class="sp-heroem">🔤</span><h1>${name}'s Spelling</h1><p class="muted bn">শোনো, দেখো, বলো, বানাও!</p></div>
      <div class="sp-statrow four"><div><b>${learned}</b><span>শেখা শব্দ</span></div><div><b>${ok}</b><span>ঠিক উত্তর</span></div><div><b>${s.said}</b><span>🎤 বলেছে</span></div><div><b>${doneLv}/${SPELL.length}</b><span>লেভেল শেষ</span></div></div>
      ${rev?`<button class="sp-daily ${s.dailyAt===today()?"done":""}" data-act="spellDaily"><span class="sp-dem">${s.dailyAt===today()?"✅":"🔁"}</span><span class="grow"><b>Daily review</b><span class="tiny bn">${s.dailyAt===today()?"আজকের রিভিশন শেষ! চাইলে আবার খেলো":"আগে শেখা ৮টা শব্দ আবার খেলো"}</span></span><span>➜</span></button>`:""}
      <div class="sp-badges">${SPELL.map(L=>`<span class="sp-badge ${s.badges.includes(L.lv)?"got":""}" title="${esc(L.name)}">${L.badge}</span>`).join("")}</div>
      <details class="sp-abc" ${learned<3?"open":""}><summary><span class="sp-abcic">🔠</span><span class="grow"><b>ABC sounds</b><span class="tiny bn muted">চাপো: অক্ষর ১ বার → আওয়াজ ৩ বার → শব্দ</span></span><span class="sp-chev" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span></summary>
        <div class="sp-abcgrid">${ABC.map(([c,w,em],k)=>`<button class="sp-abct" data-act="spellAbc" data-c="${c}" style="--lc:${LCOL[k%LCOL.length]};--k:${k}" aria-label="${c.toUpperCase()} for ${w}"><span class="ab-l"><b>${c.toUpperCase()}</b><i>${c}</i></span><span class="ab-pic">${em}</span><span class="ab-w">${w}</span><span class="ab-wave"><i></i><i></i><i></i></span></button>`).join("")}</div></details>
      ${lv}
      ${tricky.length?`<div class="card"><h3 class="bn">আরেকটু অনুশীলন</h3><div class="revchips">${tricky.map(([w])=>`<button class="revchip" data-act="say" data-t="${esc(w)}">${IC.speak}<span>${esc(w)}</span></button>`).join("")}</div></div>`:""}
      <p class="tiny muted center bn">লেভেল শেষ হলে পরেরটা খুলবে। নতুন লেভেল আসতেই থাকবে!</p></main>`;
  }
  const L=spLevel(sp.lv);
  if(sp.scr==="learn"){
    const w=L.words[sp.i],inBatch=sp.i%5,mode=sp.mode||(L.names?"name":APP.spMode||"name");
    return `<main class="view spellview sp-run">${bar("spellHome")}
      <div class="sp-dots">${[0,1,2,3,4].filter(d=>Math.floor(sp.i/5)*5+d<L.words.length).map(d=>`<i class="${d<inBatch?"done":d===inBatch?"on":""}"></i>`).join("")}</div>
      <div class="sp-card" style="--lc:${L.color}" data-key="w${sp.i}"><span class="sp-newtag">LEVEL ${L.lv} · NEW WORD</span>${spPic(w[1],"big")}${spLetters(w[0])}<span class="bn muted">${esc(w[2])}</span>
        ${w[3]?`<button class="sp-sent" data-act="say" data-t="${esc(w[3])}">${IC.speak}<span>${esc(w[3]).replace(new RegExp("\\b("+w[0]+")\\b","i"),"<b>$1</b>")}</span></button>`:""}
        <div class="sp-modes" role="group"><button data-act="spellReplay" data-m="sound" aria-pressed="${mode==="sound"}">🔊 Sounds</button><button data-act="spellReplay" data-m="name" aria-pressed="${mode==="name"}">🔤 Letters</button></div>
        <div class="row center"><button class="sp-round" data-act="say" data-t="${esc(w[0])}" aria-label="Listen">${IC.speak}</button><button class="sp-round slow" data-act="saySlow" data-t="${esc(w[0])}" aria-label="Slow">🐢</button>${HEAR.avail()?`<button class="sp-round mic ${sp.listen?"on":""}" data-act="spellSayLearn" aria-label="Say it">${sp.listen?WAVE:IC.mic}</button>`:""}</div>
        ${sp.said!=null?`<p class="sp-said ${sp.said?"ok":""}">${sp.said?"দারুণ উচ্চারণ! ⭐":"প্রায় হয়েছে! আবার বলো: "+esc(w[0])}</p>`:HEAR.avail()?`<p class="tiny muted bn">🎤 চেপে শব্দটা জোরে বলো</p>`:""}
        ${L.tip&&inBatch<2?`<p class="sp-tip">💡 ${esc(L.tip)}</p>`:""}</div>
      <div class="sp-foot"><button class="btn good wide" data-act="spellLearned">${inBatch===4||sp.i===L.words.length-1?"খেলতে চলো! 🎮":"পরের শব্দ ➜"}</button></div></main>`;
  }
  if(sp.scr==="intro")return `<main class="view spellview sp-run"><div class="sp-intro"><span class="sp-introem">${sp.title.startsWith("Game")?"🎮":"🧠"}</span><h1>${sp.title}</h1><p class="bn">${sp.sub}</p><button class="btn good wide" data-act="spellIntroGo">Let's play!</button><button class="linkbtn" data-act="spellHome">পরে খেলব</button></div></main>`;
  if(sp.scr==="game"){
    const r=sp.rounds[sp.i],w=r.w;let q="",body="";
    const total=sp.rounds.length;
    const opt=(v,label,cls)=>`<button class="sp-opt ${cls} ${r.done&&v===w[0]?"sp-right":""}" data-act="spellPick" data-v="${esc(v)}" ${r.wrong.includes(v)||r.done?"disabled":""}>${label}</button>`;
    if(r.t==="pic"){q="ছবির নামটা কোনটা?";body=`${spPic(w[1],"mid")}<div class="sp-opts">${r.opts.map(o=>opt(o[0],o[0].toUpperCase(),"word")).join("")}</div>`;}
    if(r.t==="word"){q="শোনো, তারপর ছবিটা বেছে নাও";body=`<button class="sp-wordbig" data-act="say" data-t="${esc(w[0])}">${IC.speak}<span>${w[0].toUpperCase()}</span></button><div class="sp-opts pics">${r.opts.map(o=>opt(o[0],o[1],"pic")).join("")}</div>`;}
    if(r.t==="fix"){q="কোন বানানটা ঠিক?";body=`${spPic(w[1],"mid")}<button class="sp-hear" data-act="say" data-t="${esc(w[0])}">${IC.speak} শোনো</button><div class="sp-opts col">${r.opts.map(o=>opt(o,o,"word lower")).join("")}</div>`;}
    if(r.t==="miss"){const gaps=r.gaps||[r.gap];q=gaps.length>1?"কোন অক্ষরগুলো নেই?":"কোন অক্ষরটা নেই?";
      body=`${spPic(w[1],"mid")}<div class="sp-letters show" style="--n:${w[0].length}">${w[0].split("").map((c,k)=>gaps.includes(k)&&!(r.filled||[]).includes(k)&&!r.done?`<span class="spl on gap ${k===r.gap?"now":""}" style="--lc:#c8d0cc">?</span>`:`<span class="spl on ${gaps.includes(k)?"sp-right":""}" style="--lc:${LCOL[k%LCOL.length]}">${c.toUpperCase()}</span>`).join("")}</div><button class="sp-hear" data-act="say" data-t="${esc(w[0])}">${IC.speak} শোনো</button><div class="sp-opts">${r.opts.map(c=>`<button class="sp-opt letter" data-act="spellMiss" data-v="${c}" ${r.wrong.includes(c)||r.done?"disabled":""}>${c.toUpperCase()}</button>`).join("")}</div>`;}
    if(r.t==="build"){q="অক্ষর সাজিয়ে শব্দ বানাও";body=`${spPic(w[1],"mid")}${spTiles(r,w)}<button class="sp-hear" data-act="say" data-t="${esc(w[0])}">${IC.speak} শোনো</button>`;}
    if(r.t==="hear"){q="শোনো, তারপর বানান করো";body=`${r.done?spPic(w[1],"mid"):`<button class="sp-bigear" data-act="say" data-t="${esc(w[0])}" aria-label="Listen">${IC.speak}</button>`}<button class="sp-hear" data-act="saySlow" data-t="${esc(w[0])}">🐢 আস্তে শোনো</button>${spTiles(r,w)}`;}
    if(r.t==="sent"){q="বাক্যের খালি জায়গায় শব্দটা বানাও";const parts=w[3].split(new RegExp("\\b"+w[0]+"\\b","i"));
      body=`${spPic(w[1],"mid")}<button class="sp-sent big" data-act="say" data-t="${esc(w[3])}">${IC.speak}<span>${esc(parts[0])}<b class="blank">${r.done?esc(w[0]):"_".repeat(w[0].length)}</b>${esc(parts.slice(1).join(w[0]))}</span></button>${spTiles(r,w)}`;}
    if(r.t==="say"){q="শব্দটা জোরে বলো";body=`${spPic(w[1],"mid")}${spLetters(w[0],true)}<button class="sp-hear" data-act="say" data-t="${esc(w[0])}">${IC.speak} আগে শোনো</button><button class="micbig ${r.listen?"on":""}" data-act="spellSay" aria-label="Speak">${r.listen?WAVE:IC.mic}</button><p class="tiny muted">${r.listen?"শুনছি… বলো":r.heard?`শুনলাম: “${esc(r.heard)}”`:"মাইক চেপে বলো"}</p>${r.tries&&!r.done?`<button class="linkbtn" data-act="spellSkipSay">পরে বলব ➜</button>`:""}`;}
    return `<main class="view spellview sp-run">${bar("spellHome")}<div class="sp-gamebar"><span class="sp-gtag">${sp.kind==="quiz"?"🧠 Revision":sp.kind==="revise"||sp.kind==="daily"?"↻ Review":"🎮 Game"}</span><div class="pbar"><i style="width:${Math.round((sp.i+(r.done?1:0))/total*100)}%"></i></div><span class="sp-gst">⭐ ${sp.stars}</span></div>
      <div class="sp-game" data-key="r${sp.i}"><p class="sp-q">${q}</p>${body}${r.tries&&!r.done&&r.t!=="say"?`<p class="sp-try">আবার চেষ্টা করো, তুমি পারবে! 💪</p>`:""}</div></main>`;
  }
  if(sp.scr==="result"){
    const b=sp.badge,next=spNext(sp.lv),nextLv=b&&spLevel(sp.lv+1);
    const toHome=sp.kind==="revise"||sp.kind==="daily"||next.t==="done";
    return `<main class="view spellview sp-run"><div class="sp-result">${b?`<div class="sp-bigbadge" style="--lc:${b.color}">${b.badge}</div><h1>New badge!</h1><p class="bn">${esc(b.name)} শেষ! দারুণ, ${name}! 🎉${nextLv?` এবার Level ${nextLv.lv}: ${esc(nextLv.name)} খুলে গেছে!`:" এখনকার সব লেভেল শেষ! নতুন লেভেল আসছে 🏆"}</p>`
      :`<div class="sp-resem">${sp.stars>=sp.total?"🏆":"🌟"}</div><h1>${["Great job!","Super star!","You did it!","Amazing!"][Math.floor(Math.random()*4)]}</h1><p class="bn">${sp.total}টা শব্দ খেললে।</p>`}
      <div class="sp-earn">${Array.from({length:Math.min(sp.stars,10)},(_,k)=>`<span style="--k:${k}">⭐</span>`).join("")}</div><p class="small muted">+${sp.stars} star</p>
      ${nextLv?`<button class="btn good wide" data-act="spellLevel" data-n="${nextLv.lv}">Level ${nextLv.lv} শুরু করো ➜</button><button class="linkbtn" data-act="spellHome">সব লেভেল দেখো</button>`
       :`<button class="btn good wide" data-act="${toHome?"spellHome":"spellLevel"}" data-n="${sp.lv}">${toHome?"ঠিক আছে":"চালিয়ে যাও ➜"}</button>`}</div></main>`;
  }
  return "";
}
/* ---- actions ---- */
const SPELL_ACT={
 spellOpen(){SP();APP.spell={scr:"home",k:Date.now()};render();window.scrollTo(0,0);setTimeout(()=>{const c=document.getElementById("sp-cur");if(c&&SP().lv[1].learned.length)c.scrollIntoView({block:"center",behavior:"smooth"});},450);},
 spellClose(){TTS.stop();HEAR.stop();APP.spell=null;render();},
 spellHome(){TTS.stop();HEAR.stop();APP.spell={scr:"home",k:Date.now()};render();window.scrollTo(0,0);setTimeout(()=>{const c=document.getElementById("sp-cur");c&&c.scrollIntoView({block:"center",behavior:"smooth"});},300);},
 spellLevel(el){const n=+el.dataset.n;if(!spLevel(n))return;if(!spUnlocked(n)){toast("আগের লেভেল শেষ করো 🔒");return;}const nx=spNext(n);if(nx.t==="done"){spStartGame(n,"revise",spShuffle(spLevel(n).words).slice(0,10));return;}spGo(n);},
 spellRevise(el){const n=+el.dataset.n,s=SP(),ws=s.lv[n].learned.map(spWordRec).filter(Boolean);const pick=ws.filter(w=>(s.w[w[0]]||{}).bad).concat(spShuffle(ws)).filter((w,i,a)=>a.indexOf(w)===i).slice(0,8);spStartGame(n,"revise",pick);},
 spellDaily(){const ws=spReviewWords(8);if(!ws.length)return;spStartGame(spLvOf(ws[0][0]),"daily",ws);},
 spellReplay(el){const m=el&&el.dataset&&el.dataset.m;if(m)APP.spMode=m;spAnimate(m);},
 spellLearned(){const sp=APP.spell,L=spLevel(sp.lv),st=SP().lv[sp.lv],w=L.words[sp.i][0];TTS.stop();HEAR.stop();if(!st.learned.includes(w))st.learned.push(w);Store.save();spGo(sp.lv);},
 spellIntroGo(){const f=APP.spell.next;f&&f();},
 spellPick(el){const r=APP.spell.rounds[APP.spell.i];if(r.done)return;const v=el.dataset.v;if(v===r.w[0])spRight(el);else{r.wrong.push(v);spWrong(el);render();if(r.t==="fix")TTS.say(r.w[0]);}},
 spellMiss(el){const sp=APP.spell,r=sp.rounds[sp.i];if(r.done)return;const v=el.dataset.v,w=r.w[0];
   if(v===w[r.gap]){r.filled=(r.filled||[]).concat(r.gap);TTS.say(LETTER[v]||v);const left=(r.gaps||[r.gap]).filter(g=>!r.filled.includes(g));
     if(!left.length){spRight(document.querySelector(".sp-letters .gap"));return;}
     r.gap=left[0];r.wrong=[];const pool=spShuffle("abcdefghijklmnoprstuwy".split("").filter(c=>c!==w[r.gap])).slice(0,2);r.opts=spShuffle([w[r.gap],...pool]);SND.play("ok");render();}
   else{r.wrong.push(v);spWrong(el);render();}},
 spellTile(el){const sp=APP.spell,r=sp.rounds[sp.i];if(r.done)return;const ti=+el.dataset.i,need=r.w[0][r.sel.length];
   if(r.tiles[ti]!==need){spWrong(el);TTS.say(LSOUND[need]||need);return;}
   const from=el.getBoundingClientRect();r.sel.push(ti);TTS.say(LETTER[need]||need);render();
   const slot=document.querySelectorAll(".sp-slot")[r.sel.length-1];flyTile(from,slot);
   if(r.sel.length===r.w[0].length)setTimeout(()=>spRight(document.querySelector(".sp-slots")),350);},
 spellSay(){const sp=APP.spell,r=sp.rounds[sp.i];if(r.done)return;
   if(r.listen){HEAR.stop();r.listen=false;render();return;}
   r.listen=true;r.heard="";render();
   spListen(r.w[0],(ok,heard,err)=>{if(APP.spell!==sp||sp.rounds[sp.i]!==r)return;r.listen=false;r.heard=heard;
     if(ok){spSaidOk(r.w[0]);spRight(document.querySelector(".sp-game .sp-letters"));}
     else{if(err&&err!=="no-speech"&&err!=="aborted")toast(hearErr(err));spWrong(document.querySelector(".micbig"));render();}});},
 spellSkipSay(){const sp=APP.spell,r=sp.rounds[sp.i];HEAR.stop();r.done=true;spAdvance();},
 spellSayLearn(){const sp=APP.spell;if(sp.listen){HEAR.stop();sp.listen=false;render();return;}
   const w=spLevel(sp.lv).words[sp.i][0];sp.listen=true;sp.said=null;TTS.stop();render();
   spListen(w,(ok,heard,err)=>{if(APP.spell!==sp)return;sp.listen=false;sp.said=ok;
     if(ok){const s=SP(),rec=s.w[w]||(s.w[w]={ok:0,bad:0});if(!rec.said){s.stars++;}spSaidOk(w);Store.save();SND.play("ok");render();kidBurst(document.querySelector(".sp-card .sp-letters"));}
     else{if(err&&err!=="no-speech"&&err!=="aborted")toast(hearErr(err));SND.play("no");render();}});},
 async spellAbc(el){const c=el.dataset.c,a=ABC.find(x=>x[0]===c);if(!a)return;
   document.querySelectorAll(".sp-abct.hl").forEach(x=>x.classList.remove("hl"));el.classList.add("hl");
   if(el.animate)el.animate([{transform:"scale(1)"},{transform:"scale(1.15) rotate(-4deg)"},{transform:"scale(1)"}],{duration:450,easing:"cubic-bezier(.3,1.5,.5,1)"});
   const tok=SPELL_ACT._abc=Date.now();TTS.stop();
   const step=(cls)=>{el.classList.remove("s-name","s-sound","s-word");if(cls)el.classList.add(cls);};
   step("s-name");await spSay(LETTER[c]);if(SPELL_ACT._abc!==tok)return;await spWait(350);
   step("s-sound");for(let n=0;n<3;n++){if(SPELL_ACT._abc!==tok)return;el.style.setProperty("--beat",n);el.classList.remove("beat");void el.offsetWidth;el.classList.add("beat");await spSay(LSOUND[c]);await spWait(280);}
   step("s-word");for(let n=0;n<2;n++){if(SPELL_ACT._abc!==tok)return;await spSay(a[1]);await spWait(300);}
   if(SPELL_ACT._abc===tok){step();el.classList.remove("hl");}}
};
