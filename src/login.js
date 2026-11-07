/* ================= login gate (web app): email/password + Google; logout returns here ================= */
const LG={tab:"login",err:null,ok:null,busy:false};
function authMsg(e){const c=(e&&e.code)||"";
  const m={"auth/invalid-email":"Email ঠিক নেই।","auth/missing-password":"Password লেখো।","auth/invalid-credential":"Email বা password ভুল।","auth/wrong-password":"Password ভুল।",
   "auth/user-not-found":"এই email-এ কোনো account নেই। Create Account করো।","auth/email-already-in-use":"এই email-এ আগেই account আছে। Login করো।",
   "auth/weak-password":"Password কমপক্ষে ৬ অক্ষরের হতে হবে।","auth/too-many-requests":"অনেকবার চেষ্টা হয়েছে, একটু পরে আবার করো।","auth/network-request-failed":"ইন্টারনেট নেই।",
   "auth/popup-closed-by-user":"লগইন বাতিল হয়েছে।","auth/cancelled-popup-request":"লগইন বাতিল হয়েছে।"};
  return m[c]||("লগইন হয়নি ("+(c||"error")+")।");}
function viewLogin(){
  const t=LG.tab, logo=document.querySelector(".bmark")?.innerHTML||"";
  const field=(id,label,type,ph,ac)=>`<label class="lg-field"><span>${label}</span><input id="${id}" type="${type}" placeholder="${ph}" autocomplete="${ac}" ${LG.busy?"disabled":""}></label>`;
  let form="";
  if(t==="login")form=`${field("lg-email","Email","email","you@example.com","email")}${field("lg-pass","Password","password","Your password","current-password")}
    <button class="lg-go" data-act="lgSubmit" ${LG.busy?"disabled":""}>${LG.busy?"Please wait…":"CONTINUE"} <span>›</span></button>
    <div class="lg-links"><button class="lg-link" data-act="lgTab" data-v="signup">Create Account</button><i>•</i><button class="lg-link" data-act="lgTab" data-v="reset">Forgot Password?</button></div>`;
  if(t==="signup")form=`${field("lg-name","Your name","text","e.g. Ali Akbar","name")}${field("lg-email","Email","email","you@example.com","email")}${field("lg-pass","Password","password","At least 6 characters","new-password")}
    <button class="lg-go" data-act="lgSubmit" ${LG.busy?"disabled":""}>${LG.busy?"Please wait…":"CREATE ACCOUNT"} <span>›</span></button>
    <div class="lg-links"><span class="muted small">Already have an account?</span><button class="lg-link" data-act="lgTab" data-v="login">Login</button></div>`;
  if(t==="reset")form=`<p class="small muted">Enter your email. We'll send a link to set a new password.</p>${field("lg-email","Email","email","you@example.com","email")}
    <button class="lg-go" data-act="lgSubmit" ${LG.busy?"disabled":""}>${LG.busy?"Please wait…":"SEND RESET LINK"} <span>›</span></button>
    <div class="lg-links"><button class="lg-link" data-act="lgTab" data-v="login">Back to Login</button></div>`;
  return `<main class="login"><div class="lg-brand"><span class="lg-logo">${logo}</span><span class="lg-name">Bolo English</span></div><p class="lg-tag">Speak English, every day</p>
   <div class="lg-card"><h1>${t==="signup"?"Create Account":t==="reset"?"Reset Password":"Account Login"}</h1>
    ${t!=="reset"?`<div class="lg-seg"><span class="lg-pill ${t==="signup"?"r":""}"></span><button data-act="lgTab" data-v="login" aria-pressed="${t==="login"}">Login</button><button data-act="lgTab" data-v="signup" aria-pressed="${t==="signup"}">Create Account</button></div>`:""}
    ${LG.err?`<p class="lg-err">${esc(LG.err)}</p>`:""}${LG.ok?`<p class="lg-ok">${esc(LG.ok)}</p>`:""}
    ${form}
    <div class="orline"><span>or</span></div>
    <button class="gbtn wide" data-act="lgGoogle" ${LG.busy?"disabled":""}>${GLOGO}<span>Continue with Google</span></button></div>
   <p class="lg-foot">© 2026 Ali Akbar · BD Webhut</p></main>`;
}
async function lgSubmit(){
  const v=id=>($("#"+id)?.value||"").trim(),email=v("lg-email"),pass=$("#lg-pass")?.value||"",name=v("lg-name");
  LG.err=LG.ok=null;
  if(!email){LG.err="Email লেখো।";render();return;}
  if(LG.tab!=="reset"&&!pass){LG.err="Password লেখো।";render();return;}
  if(LG.tab==="signup"&&!name){LG.err="তোমার নাম লেখো।";render();return;}
  LG.busy=true;LG.fresh=true;render();
  try{const {auth,au}=await CLOUD.load();
    if(LG.tab==="login")await auth.signInWithEmailAndPassword(au,email,pass);
    else if(LG.tab==="signup"){const c=await auth.createUserWithEmailAndPassword(au,email,pass);try{await auth.updateProfile(c.user,{displayName:name});CLOUD.user&&(CLOUD.user.name=name);}catch(e){}}
    else{await auth.sendPasswordResetEmail(au,email);LG.ok="Reset link পাঠানো হয়েছে। Email চেক করো (Spam ফোল্ডারও)।";LG.tab="login";}
  }catch(e){LG.err=authMsg(e);}
  LG.busy=false;render();
}
async function lgGoogle(){LG.err=null;LG.busy=true;LG.fresh=true;render();try{await CLOUD.signIn();if(CLOUD.err){LG.err=CLOUD.err;}}catch(e){LG.err=authMsg(e);}LG.busy=false;render();}
/* after sign-in: open the user's profile straight away (or onboarding if the account is new) */
async function afterLogin(){
  APP.welcome=false;APP.onb=null;
  if(PROFILES.length){const best=(PID&&prof())?PID:[...PROFILES].sort((a,b)=>(b.last||"").localeCompare(a.last||""))[0].id;await switchProfile(best);return;}
  APP.picker=false;APP.welcome=true;
}
async function logoutAll(){
  try{await CLOUD.syncNow(true);}catch(e){}
  try{const {auth,au}=await CLOUD.load();await auth.signOut(au);}catch(e){}
  try{Object.keys(localStorage).filter(k=>k.startsWith("aec4:")&&!/^aec4:(theme|rail|qopen)$/.test(k)).forEach(k=>localStorage.removeItem(k));sessionStorage.removeItem("aec4:here");}catch(e){}
  CLOUD.user=null;PROFILES=[];PID=null;S=defaultState();CUSTOM={};MARKS={};L=null;
  Object.assign(APP,{tab:"learn",picker:false,welcome:false,onb:null,story:null,cards:null,chat:null,warm:null,modal:null});
  LG.tab="login";LG.err=null;LG.ok="তুমি লগআউট হয়েছ।";LASTKEY=null;render();window.scrollTo(0,0);
}
