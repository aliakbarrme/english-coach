/* ================= account: Google sign-in + Firestore sync (web app only; local-first) ================= */
const FB_CONF={apiKey:"AIzaSyDrZYHIpXYKQo5Xa0KpcJUGwCp_j5ddtLw",authDomain:"bolo-english-24438.firebaseapp.com",projectId:"bolo-english-24438",
  storageBucket:"bolo-english-24438.firebasestorage.app",messagingSenderId:"226486160021",appId:"1:226486160021:web:037ed5d63778d2b705299c"};
const FBV="10.12.2";
function authErr(e){const c=(e&&e.code)||"";
  if(/popup-closed|cancelled-popup/.test(c))return "লগইন বাতিল হয়েছে।";
  if(/network/.test(c))return "ইন্টারনেট নেই, পরে আবার চেষ্টা করো।";
  if(/unauthorized-domain/.test(c))return "এই ঠিকানা থেকে লগইন চালু নেই।";
  return "লগইন হয়নি ("+(c||"error")+")।";}
const CLOUD={
 user:null,busy:false,err:null,last:null,api:null,timer:null,
 avail(){return !ENV.claude&&(location.protocol==="https:"||/^(localhost|127\.0\.0\.1)$/.test(location.hostname));},
 async load(){
  if(this.api)return this.api;
  const b=`https://www.gstatic.com/firebasejs/${FBV}/`;
  const [app,auth,fs]=await Promise.all([import(b+"firebase-app.js"),import(b+"firebase-auth.js"),import(b+"firebase-firestore-lite.js")]);
  const a=app.initializeApp(FB_CONF),au=auth.getAuth(a),db=fs.getFirestore(a);
  this.api={auth,fs,au,db};this.ready=new Promise(res=>this._ready=res);
  auth.getRedirectResult(au).catch(e=>{this.err=authErr(e);render();});
  auth.onAuthStateChanged(au,u=>this.onUser(u));
  return this.api;
 },
 async signIn(){
  this.err=null;this.busy=true;render();
  try{const {auth,au}=await this.load();const p=new auth.GoogleAuthProvider();p.setCustomParameters({prompt:"select_account"});
   UI.set("acct","pending");
   try{await auth.signInWithPopup(au,p);}
   catch(e){if(/popup-blocked|operation-not-supported|web-storage-unsupported/.test(e.code||""))await auth.signInWithRedirect(au,p);else throw e;}
  }catch(e){this.err=authErr(e);if(!this.user)UI.set("acct","");}
  this.busy=false;render();
 },
 async signOut(){const {auth,au}=await this.load();await auth.signOut(au);this.user=null;UI.set("acct","");toast("লগআউট হয়েছে। অগ্রগতি এই ডিভাইসেও রাখা আছে।");render();},
 async onUser(u){
  const was=this.user&&this.user.uid;
  this.user=u?{uid:u.uid,email:u.email,name:u.displayName,photo:u.photoURL}:null;
  UI.set("acct",u?"1":"");
  if(u&&u.uid!==was){await this.claimDevice(u.uid);await this.pull();if(LG.fresh){LG.fresh=false;LG.ok=null;await afterLogin();toast("☁️ "+(u.email||"")+" দিয়ে লগইন হয়েছে");}}
  if(this._ready){this._ready();this._ready=null;}
  render();
 },
 /* data on this device belongs to one account: if a different account signs in, wipe it first so nothing leaks across accounts */
 async claimDevice(uid){
  const owner=UI.get("owner");
  if(owner&&owner!==uid){
   try{Object.keys(localStorage).filter(k=>k.startsWith("aec4:")&&!/^aec4:(theme|rail|qopen|owner|acct)$/.test(k)).forEach(k=>localStorage.removeItem(k));sessionStorage.removeItem("aec4:here");}catch(e){}
   PROFILES=[];PID=null;S=defaultState();CUSTOM={};MARKS={};L=null;APP.picker=false;APP.story=APP.cards=APP.chat=APP.warm=null;
  }
  UI.set("owner",uid);
 },
 ref(...p){const {fs,db}=this.api;return fs.doc(db,"users",this.user.uid,...p);},
 localPack(pid){
  if(pid===PID)return {state:clone(S),units:clone(CUSTOM),marks:clone(MARKS)};
  return {state:Store.lsGet("p:"+pid+":state")||null,units:Store.lsGet("p:"+pid+":units")||{},marks:Store.lsGet("p:"+pid+":marks")||{}};
 },
 async pushProfile(pid){const d=this.localPack(pid);if(!d.state)return;await this.api.fs.setDoc(this.ref("p",pid),{...d,updated:d.state.updatedAt||Date.now()});},
 async pushRoot(){await this.api.fs.setDoc(this.ref(),{profiles:clone(PROFILES),email:this.user.email||"",updated:Date.now()});},
 async pull(){
  if(!this.user)return;this.busy=true;this.err=null;render();
  try{
   const {fs}=this.api,root=await fs.getDoc(this.ref()),remote=root.exists()?root.data():null;
   if(!remote||!(remote.profiles||[]).length){for(const p of PROFILES)await this.pushProfile(p.id);if(PROFILES.length)await this.pushRoot();}
   else{
    const byId=new Map(PROFILES.map(p=>[p.id,p]));
    for(const rp of remote.profiles){
     const snap=await fs.getDoc(this.ref("p",rp.id)),rd=snap.exists()?snap.data():null;
     const ls=rp.id===PID?S:Store.lsGet("p:"+rp.id+":state"),lu=(ls&&ls.updatedAt)||0,ru=(rd&&rd.updated)||0;
     if(rd&&(!byId.has(rp.id)||ru>lu)){Store.lsSet("p:"+rp.id+":state",rd.state);Store.lsSet("p:"+rp.id+":units",rd.units||{});Store.lsSet("p:"+rp.id+":marks",rd.marks||{});byId.set(rp.id,{...(byId.get(rp.id)||{}),...rp});}
     else if(byId.has(rp.id))await this.pushProfile(rp.id);
    }
    for(const p of PROFILES)if(!remote.profiles.some(r=>r.id===p.id))await this.pushProfile(p.id);
    PROFILES=[...byId.values()];Store.lsSet("profiles",PROFILES);await this.pushRoot();
    if(PID&&prof())await Store.load();
   }
   this.last=Date.now();
  }catch(e){this.err="Sync হয়নি ("+((e&&e.code)||"error")+")।";}
  this.busy=false;render();
 },
 queue(){if(!this.user||!this.api)return;clearTimeout(this.timer);this.timer=setTimeout(()=>this.syncNow(true),2000);},
 async syncNow(quiet){
  if(!this.user)return;
  try{if(PID)await this.pushProfile(PID);await this.pushRoot();this.last=Date.now();this.err=null;if(!quiet){toast("☁️ Sync হয়েছে");render();}}
  catch(e){this.err="Sync হয়নি ("+((e&&e.code)||"error")+")।";if(!quiet)render();}
 },
 async removeProfile(id){if(!this.user)return;try{await this.api.fs.deleteDoc(this.ref("p",id));await this.pushRoot();}catch(e){}}
};
const GLOGO='<svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
function gBtn(label,cls=""){return `<button class="gbtn ${cls}" data-act="googleSignIn" ${CLOUD.busy?"disabled":""}>${GLOGO}<span>${CLOUD.busy?"অপেক্ষা করো…":label}</span></button>`;}
function acctCard(){
  if(!CLOUD.avail())return "";
  const u=CLOUD.user;
  if(u)return `<div class="card acct"><div class="row"><span class="av">${u.photo?`<img src="${esc(u.photo)}" alt="" referrerpolicy="no-referrer">`:"☁️"}</span><div class="grow"><b>${esc(u.name||"Google account")}</b><span class="tiny muted">${esc(u.email||"")}</span></div><span class="chip okchip">Synced</span></div>
    <p class="small muted">এই Gmail দিয়ে যেকোনো ডিভাইসে লগইন করলে সব প্রোফাইলের অগ্রগতি পাবে।${CLOUD.last?` শেষ sync: ${new Date(CLOUD.last).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}`:""}</p>
    ${CLOUD.err?`<p class="warnbox small">${esc(CLOUD.err)}</p>`:""}
    <div class="row"><button class="btn sm" data-act="syncNow" ${CLOUD.busy?"disabled":""}>${CLOUD.busy?"Sync হচ্ছে…":"এখনই sync"}</button><button class="btn sm ghost" data-act="googleSignOut">লগআউট</button></div></div>`;
  return `<div class="card acct"><h3>অ্যাকাউন্ট</h3><p class="small muted">Gmail দিয়ে লগইন করো: ফোন, ল্যাপটপ, যেকোনো ডিভাইসে একই অগ্রগতি থাকবে। লগইন ছাড়াও অ্যাপ চলে।</p>
    ${CLOUD.err?`<p class="warnbox small">${esc(CLOUD.err)}</p>`:""}${gBtn("Continue with Google","wide")}</div>`;
}
