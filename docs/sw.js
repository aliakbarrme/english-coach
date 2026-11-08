// Offline cache: stale-while-revalidate (opens instantly from cache, updates in the background), cache-first for media.
const C="coach-af10633b8c",A="coach-audio-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./manifest.webmanifest","./icon-192.png"])).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==A).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(u.origin===location.origin&&((u.pathname.includes("/a/")||u.pathname.includes("/e/")||u.pathname.includes("/i/"))||r.url.includes("gstatic.com/firebasejs"))){e.respondWith(caches.open(A).then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res;}))));return;}
  e.respondWith(caches.match(r,{ignoreSearch:r.mode==="navigate"}).then(m=>{
    const net=fetch(r).then(res=>{if(res.ok&&(u.origin===location.origin||r.url.includes("fonts.g"))){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;})
      .catch(()=>m||(r.mode==="navigate"?caches.match("./index.html"):Response.error()));
    if(m){e.waitUntil(net.catch(()=>{}));return m;}return net;}));});
