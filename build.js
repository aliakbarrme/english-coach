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
{ const SP = {}; new Function("S", fs.readFileSync(path.join(root, "src", "spell.js"), "utf8").split("/* ================= Spelling Fun")[0].replace(/document\.addEventListener[\s\S]*$/, "") + ";S.DECKS=DECKS;")(SP);
  for (const d of SP.DECKS) for (const l of d.lessons) for (const it of l.items) texts.add(it[0]); }
{ const ph = fs.readFileSync(path.join(root, "src", "phonics.js"), "utf8");
  const T = new Function("const PA={has:()=>false};" + ph + ";return SPELL_TEXTS();")(); T.forEach(t => texts.add(String(t).replace(/\s+/g, " ").trim())); }
// ---- the private book (../book-verify/book.json, never in this repo): its words need voice clips ----
const BOOK_FILE = path.join(root, "..", "book-verify", "book.json");
const BOOK_DATA = fs.existsSync(BOOK_FILE) ? JSON.parse(fs.readFileSync(BOOK_FILE, "utf8")) : null;
{ const bk = fs.readFileSync(path.join(root, "src", "book.js"), "utf8").replace(/^document\.addEventListener.*$/m, "");
  new Function(bk + ";return BOOK_TEXTS();")().forEach(t => texts.add(t));
  /* book words/sentences get clips too, but their list is written next to the private book, not into this public repo */
  if (BOOK_DATA) { const bt = new Set(), add = s => { s = String(s || "").replace(/\s+/g, " ").trim(); if (s.length > 1) bt.add(s); };
    const lat = s => /[A-Za-z]/.test(s) && !/[\u0980-\u09FF]/.test(s);
    for (const l of BOOK_DATA.levels) for (const c of l.chapters) {
      (c.items || []).forEach(x => add(x.en)); if (c.mixed) c.mixed.rows.flat().forEach(add);
      for (const s of c.sections || []) for (const cd of s.cards || []) add(cd.replace(/\s*[(\[].*$/, "").replace(/\s+[\u0980-\u09FF].*$/, ""));
      for (const b of c.blocks || []) {
        if (b.t === "p" && lat(b.text) && !/_{3,}/.test(b.text)) add(b.text.replace(/^[-•*]\s*|^\d+\.\s*|^[a-h]\)\s*/, "").replace(/^"|"$/g, ""));
        if (b.t === "table") { const ec = b.cols.findIndex(h => /english|example|v1/i.test(h)); b.rows.forEach(r => add((r[ec >= 0 ? ec : 0] || "").replace(/\s*\(.*?\)/g, ""))); } }
      for (const q of c.bq || []) add(/_{3,}/.test(q.q) ? q.q.replace(/_{3,}/, q.ans) : q.ans); }
    const bm = {}; for (const s of bt) bm[akey(s)] = s;
    fs.writeFileSync(path.join(root, "..", "book-verify", "tts_book.json"), JSON.stringify(bm)); } }
// ---- encrypted book bundle for the web app: docs/x/bk.bin (opened only with a key that comes from the book itself) ----
let BOOK_V = "";
if (BOOK_DATA) { const crypto = require("crypto"), zlib = require("zlib");
  const keyStr = BOOK_DATA.levels[0].chapters[0].items.map(x => x.en + ":" + x.pr).join("|");
  const key = crypto.createHash("sha256").update("bolo-book|" + keyStr).digest();
  const plain = zlib.gzipSync(Buffer.from(JSON.stringify(BOOK_DATA), "utf8"));
  BOOK_V = crypto.createHash("sha1").update(plain).digest("hex").slice(0, 10);
  const iv = crypto.createHash("sha256").update("iv|" + BOOK_V).digest().subarray(0, 12);
  const c = crypto.createCipheriv("aes-256-gcm", key, iv), enc = Buffer.concat([c.update(plain), c.final(), c.getAuthTag()]);
  fs.mkdirSync(path.join(root, "docs", "x"), { recursive: true });
  fs.writeFileSync(path.join(root, "docs", "x", "bk.bin"), Buffer.concat([iv, enc])); }
const textMap = {}; for (const t of texts) textMap[akey(t)] = t;
fs.writeFileSync(path.join(root, "tts_texts.json"), JSON.stringify(textMap, null, 0));

const audioDir = path.join(root, "docs", "a");
const clips = fs.existsSync(audioDir) ? fs.readdirSync(audioDir).filter(f => f.endsWith(".mp3")).map(f => f.slice(0, -4)) : [];

const emoDir = path.join(root, "docs", "e");
const emojis = fs.existsSync(emoDir) ? fs.readdirSync(emoDir).filter(f => f.endsWith(".webp")).map(f => f.slice(0, -5)) : [];
const pageWith = (audio, emo = [], bookData = null) => src("app.html")
  .replace("/*__STYLE__*/", () => [src("style.css"), src("style-v6.css"), src("style-v7.css"), src("style-v8.css"), src("style-v9.css"), src("style-v10.css"), src("style-v11.css"), src("style-v12.css"), src("style-v13.css"), src("style-v14.css"), src("style-v15.css"), src("style-v16.css"), src("style-v17.css"), src("style-v18.css"), src("style-v19.css"), src("style-v20.css"), src("style-v21.css"), src("style-v22.css")].join("\n"))
  .replace("/*__VOICE__*/", () => src("voice.js").replace("/*__AUDIO__*/[]", JSON.stringify(audio)))
  .replace("/*__EXTRAS__*/", () => [src("extras.js").replace("/*__EMOJI__*/[]", JSON.stringify(emo)).replace("/*__ART__*/false", emo.length ? "true" : "false"), src("progress.js"), src("warmart.js"), src("cloud.js"), src("login.js"), src("flow.js"), src("spell.js"), src("phonicademy.js"), src("phonics.js"), src("book.js")].join("\n"))
  .replace("/*__MOTION__*/", () => src("motion.js"))
  .replace("/*__CONTENT__*/", () => content)
  .replace("/*__PA_INDEX__*/{}", () => (audio.length ? JSON.stringify(PA_INDEX) : "{}"))
  .replace("/*__WEB_URL__*/", () => WEB_URL)
  .replace("/*__BOOK_EMBED__*/null", () => (bookData ? JSON.stringify(bookData) : "null"))
  .replace('/*__BOOK_V__*/""', () => JSON.stringify(BOOK_V));
// ---- Phonicademy sounds: packed from the licensed pack (kept outside the repo) into one encoded bundle; never served as single MP3s ----
const PA_LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");   // all 26 letter sounds (approved after A, B, C review)
const PA_FILE = { q: "qu" };                           // letter -> file name in the pack
const PA_SRC = path.join(root, "..", "Phonics file", "pack", "phonemes");
const PA_OUT = path.join(root, "docs", "x"), PA_IDX = path.join(root, "pa-index.json");
let PA_INDEX = {};
if (fs.existsSync(PA_SRC)) {
  const key = [...require("crypto").createHash("sha256").update("bolo-english-pa").digest()].slice(0, 16);
  const parts = [], files = {}; let off = 0;
  const meta = fs.existsSync(path.join(root, "pa-meta.json")) ? JSON.parse(fs.readFileSync(path.join(root, "pa-meta.json"), "utf8")) : {};
  // files that already repeat the sound (b, c, qu…) are played only up to the end of the first sound, so one play = one sound
  // letter teams and vowel sounds from the same pack (key -> file name)
  Object.assign(PA_FILE, { sh: "sh", ch: "ch", th: "th", thv: "th-voiced", ng: "ng", nk: "nk", ai: "ai", ee: "ee", igh: "igh", oa: "oa", ue: "u-e", oo: "oo", oob: "oo-book", ar: "ar", or: "or", ur: "ur", ow: "ow", oi: "oi", aw: "aw", ear: "ear", air: "air", ure: "ure", zh: "zh" });
  for (const c of PA_LETTERS.concat(["sh", "ch", "th", "thv", "ng", "nk", "ai", "ee", "igh", "oa", "ue", "oo", "oob", "ar", "or", "ur", "ow", "oi", "aw", "ear", "air", "ure", "zh"])) { const nm = PA_FILE[c] || c, b = fs.readFileSync(path.join(PA_SRC, nm + ".mp3")); files[c] = [off, b.length, (meta[nm] && meta[nm].firstEnd) || 0]; parts.push(b); off += b.length; }
  const all = Buffer.concat(parts); for (let i = 0; i < all.length; i++) all[i] ^= key[i % key.length];
  fs.mkdirSync(PA_OUT, { recursive: true }); fs.writeFileSync(path.join(PA_OUT, "ps.bin"), all);
  PA_INDEX = { v: require("crypto").createHash("sha1").update(all).digest("hex").slice(0, 8), k: key, files };
  fs.writeFileSync(PA_IDX, JSON.stringify(PA_INDEX));
} else if (fs.existsSync(PA_IDX)) PA_INDEX = JSON.parse(fs.readFileSync(PA_IDX, "utf8"));
const page = pageWith([], [], BOOK_DATA);   // private artifact + local standalone only; the public PWA never contains the book
fs.writeFileSync(path.join(root, "..", "projects", "ali-english-coach.html"), page);

const head = (body, extra) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="author" content="Ali Akbar, BD Webhut">
<meta name="copyright" content="© 2026 Ali Akbar · BD Webhut. All rights reserved.">
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
<script>if("serviceWorker" in navigator){
  /* always look for a new version on open and when the app comes back to the front; when it arrives, refresh once (never in the middle of a lesson or game) */
  const had=!!navigator.serviceWorker.controller;let ready=false;
  navigator.serviceWorker.addEventListener("controllerchange",()=>{if(had)ready=true;});
  const busy=()=>{try{return (typeof L!=="undefined"&&L)||(typeof APP!=="undefined"&&APP.spell&&APP.spell.scr==="game")||(typeof APP!=="undefined"&&APP.book&&APP.book.scr==="ch")||(typeof APP!=="undefined"&&APP.warm);}catch(e){return false;}};
  setInterval(()=>{if(ready&&!busy()){ready=false;location.reload();}},1500);
  addEventListener("load",()=>navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).then(reg=>{
    const check=()=>reg.update().catch(()=>{});check();
    document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")check();});
  }).catch(()=>{}));
}</script>`);
fs.writeFileSync(path.join(docs, "index.html"), pwa);
fs.writeFileSync(path.join(docs, "manifest.webmanifest"), JSON.stringify({
  name: "Bolo English", short_name: "Bolo English", description: "Speak English every day - for the whole family", id: "./", start_url: "./", scope: "./", display: "standalone",
  background_color: "#eef2ef", theme_color: "#0d5c55",
  icons: [{ src: "icon-192.png", sizes: "192x192", type: "image/png" }, { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }]
}, null, 1));
const ver = require("crypto").createHash("sha1").update(pwa).digest("hex").slice(0, 10);
fs.writeFileSync(path.join(docs, "sw.js"), `// Offline cache: the page itself is network-first (so a new version shows on the next open), falling back to cache when offline; media is cache-first.
const C="coach-${ver}",A="coach-audio-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./manifest.webmanifest","./icon-192.png"])).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==A).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
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
`);
fs.writeFileSync(path.join(docs, ".nojekyll"), "");

// Syntax-check every inline script.
const scripts = [...page.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join("\n;\n");
new Function(scripts);
console.log("built", (Buffer.byteLength(pwa) / 1024).toFixed(0) + " KB", "units:", COURSE.units.length, "texts:", texts.size, "clips:", clips.length, "emoji:", emojis.length, "web:", WEB_URL || "(none)");
