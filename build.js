// Builds the single-file app in three shapes:
//  - projects/ali-english-coach.html : body-only page for the claude.ai artifact (AI + cloud sync; device voice)
//  - dist/Ali-English-Coach.html     : full standalone page (desktop double-click; device voice)
//  - docs/                           : GitHub Pages PWA (index.html + manifest + service worker + icons + neural voice clips in docs/a/)
// Also writes tts_texts.json (clip id -> sentence) for tools/kokoro/gen_audio.py.
const fs = require("fs"), path = require("path");
const root = __dirname, src = p => fs.readFileSync(path.join(root, "src", p), "utf8");
const cfg = fs.existsSync(path.join(root, "config.json")) ? JSON.parse(fs.readFileSync(path.join(root, "config.json"), "utf8")) : {};
const WEB_URL = cfg.webUrl || "";
const contentFiles = ["content-warmup.js", "content-kids.js", "content-family.js", "content-client.js", "content-everyday.js"];
const content = contentFiles.map(src).join("\n");

// ---- neural voice text list (must match voice.js: h32/akey/splitSentences and app fill() defaults) ----
function h32(s) { let h = 0x811c9dc5; const b = Buffer.from(s, "utf8"); for (const c of b) { h ^= c; h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, "0"); }
const akey = t => h32(String(t).replace(/\s+/g, " ").trim());
const splitSentences = t => String(t).split(/\n+/).flatMap(p => p.trim().split(/(?<=[.!?]["”]?)\s+/)).map(s => s.trim()).filter(Boolean);
const fillDef = s => String(s).replace(/\{d1\}/g, "sweetie").replace(/\{d2\}/g, "baby");
const COURSE = { units: [], warmup: {} };
new Function("COURSE", content)(COURSE);
const texts = new Set(["Hello! Let's practice English together."]);
for (const u of COURSE.units) {
  for (const l of u.lessons) for (const it of l.items) texts.add(fillDef(it[0]).replace(/\s+/g, " ").trim());
  if (u.story) splitSentences(fillDef(u.story.text)).forEach(x => texts.add(x));
}
for (const t of COURSE.warmup.twisters || []) texts.add(t.t.replace(/\s+/g, " ").trim());
for (const p of COURSE.warmup.passages || []) splitSentences(p.text).forEach(x => texts.add(x));
for (const x of COURSE.warmup.exercises || []) texts.add(("Next: " + x.name).replace(/\s+/g, " ").trim());
const textMap = {}; for (const t of texts) textMap[akey(t)] = t;
fs.writeFileSync(path.join(root, "tts_texts.json"), JSON.stringify(textMap, null, 0));

const audioDir = path.join(root, "docs", "a");
const clips = fs.existsSync(audioDir) ? fs.readdirSync(audioDir).filter(f => f.endsWith(".mp3")).map(f => f.slice(0, -4)) : [];

const emoDir = path.join(root, "docs", "e");
const emojis = fs.existsSync(emoDir) ? fs.readdirSync(emoDir).filter(f => f.endsWith(".webp")).map(f => f.slice(0, -5)) : [];
const pageWith = (audio, emo = []) => src("app.html")
  .replace("/*__STYLE__*/", () => [src("style.css"), src("style-v6.css"), src("style-v7.css"), src("style-v8.css"), src("style-v9.css"), src("style-v10.css"), src("style-v11.css"), src("style-v12.css"), src("style-v13.css"), src("style-v14.css")].join("\n"))
  .replace("/*__VOICE__*/", () => src("voice.js").replace("/*__AUDIO__*/[]", JSON.stringify(audio)))
  .replace("/*__EXTRAS__*/", () => [src("extras.js").replace("/*__EMOJI__*/[]", JSON.stringify(emo)).replace("/*__ART__*/false", emo.length ? "true" : "false"), src("progress.js"), src("warmart.js")].join("\n"))
  .replace("/*__MOTION__*/", () => src("motion.js"))
  .replace("/*__CONTENT__*/", () => content)
  .replace("/*__WEB_URL__*/", () => WEB_URL);
const page = pageWith([]);
fs.writeFileSync(path.join(root, "..", "projects", "ali-english-coach.html"), page);

const head = (body, extra) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="Bolo English: speak English every day, for the whole family. Kids learn with pictures and sound, adults practise work, family and everyday English.">
<style>html{background:#eef2ef}@media (prefers-color-scheme:dark){html{background:#0b1312}}</style>
<meta name="theme-color" content="#eef2ef" media="(prefers-color-scheme: light)">
<title>Bolo English</title>
<meta name="theme-color" content="#0b1312" media="(prefers-color-scheme: dark)">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Bolo English">
${extra}
</head>
<body>
${body}
</body>
</html>
`;
const dataManifest = encodeURIComponent(JSON.stringify({ name: "Bolo English", short_name: "Bolo English", display: "standalone", background_color: "#eef2ef", theme_color: "#0d5c55", start_url: "." }));
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
const standalone = head(page, `<link rel="manifest" href="data:application/manifest+json,${dataManifest}">`);
fs.writeFileSync(path.join(root, "dist", "Ali-English-Coach.html"), standalone);

// GitHub Pages / PWA build
const docs = path.join(root, "docs");
fs.mkdirSync(docs, { recursive: true });
const pwa = head(pageWith(clips, emojis), `<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="icon-180.png">
<script>if("serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));</script>`);
fs.writeFileSync(path.join(docs, "index.html"), pwa);
fs.writeFileSync(path.join(docs, "manifest.webmanifest"), JSON.stringify({
  name: "Bolo English", short_name: "Bolo English", description: "Speak English every day - for the whole family", id: "./", start_url: "./", scope: "./", display: "standalone",
  background_color: "#eef2ef", theme_color: "#0d5c55",
  icons: [{ src: "icon-192.png", sizes: "192x192", type: "image/png" }, { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }]
}, null, 1));
const ver = require("crypto").createHash("sha1").update(pwa).digest("hex").slice(0, 10);
fs.writeFileSync(path.join(docs, "sw.js"), `// Offline cache: stale-while-revalidate (opens instantly from cache, updates in the background), cache-first for media.
const C="coach-${ver}",A="coach-audio-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./manifest.webmanifest","./icon-192.png"])).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==A).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(u.origin===location.origin&&(u.pathname.includes("/a/")||u.pathname.includes("/e/")||u.pathname.includes("/i/"))){e.respondWith(caches.open(A).then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res;}))));return;}
  e.respondWith(caches.match(r,{ignoreSearch:r.mode==="navigate"}).then(m=>{
    const net=fetch(r).then(res=>{if(res.ok&&(u.origin===location.origin||r.url.includes("fonts.g"))){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;})
      .catch(()=>m||(r.mode==="navigate"?caches.match("./index.html"):Response.error()));
    if(m){e.waitUntil(net.catch(()=>{}));return m;}return net;}));});
`);
fs.writeFileSync(path.join(docs, ".nojekyll"), "");

// Syntax-check every inline script.
const scripts = [...page.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join("\n;\n");
new Function(scripts);
console.log("built", (Buffer.byteLength(pwa) / 1024).toFixed(0) + " KB", "units:", COURSE.units.length, "texts:", texts.size, "clips:", clips.length, "emoji:", emojis.length, "web:", WEB_URL || "(none)");
