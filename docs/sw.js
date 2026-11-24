// Offline cache: the page itself is network-first (so a new version shows on the next open), falling back to cache when offline; media is cache-first.
const C="coach-1369bc318f",A="coach-audio-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./manifest.webmanifest","./icon-192.png"])).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==A).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  /* voice clips: keep the whole file (not a partial range) so it plays offline and on weak networks */
  if(u.origin===location.origin&&u.pathname.includes("/a/")&&u.pathname.endsWith(".mp3")){const key=u.origin+u.pathname;
    e.respondWith(caches.open(A).then(c=>c.match(key).then(m=>m||fetch(u.href).then(res=>{if(res.status===200)c.put(key,res.clone()).catch(()=>{});return res;}).catch(()=>fetch(r)))));return;}
  if(u.origin===location.origin&&((u.pathname.includes("/a/")||u.pathname.includes("/e/")||u.pathname.includes("/i/")||u.pathname.includes("/x/"))||r.url.includes("gstatic.com/firebasejs"))){e.respondWith(caches.open(A).then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res;}))));return;}
  if(r.mode==="navigate"){e.respondWith((async()=>{
    const cached=()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("./index.html")||caches.match("./"));
    try{const res=await Promise.race([fetch(r,{cache:"no-store"}),new Promise((_,no)=>setTimeout(()=>no(0),4000))]);
      if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>{c.put(r,cp.clone());c.put("./index.html",cp);});return res;}
      return (await cached())||res;}
    catch(err){return (await cached())||Response.error();}})());return;}
  e.respondWith(caches.match(r,{ignoreSearch:r.mode==="navigate"}).then(m=>{
    const net=fetch(r).then(res=>{if(res.ok&&(u.origin===location.origin||r.url.includes("fonts.g"))){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;})
      .catch(()=>m||(r.mode==="navigate"?caches.match("./index.html"):Response.error()));
    if(m){e.waitUntil(net.catch(()=>{}));return m;}return net;}));});
