// Builds the single-file app in three shapes:
//  - projects/ali-english-coach.html : body-only page for the claude.ai artifact (AI + cloud sync)
//  - dist/Ali-English-Coach.html     : full standalone page (desktop double-click)
//  - docs/                           : GitHub Pages PWA (index.html + manifest + service worker + icons)
const fs = require("fs"), path = require("path");
const root = __dirname, src = p => fs.readFileSync(path.join(root, "src", p), "utf8");
const cfg = fs.existsSync(path.join(root, "config.json")) ? JSON.parse(fs.readFileSync(path.join(root, "config.json"), "utf8")) : {};
const WEB_URL = cfg.webUrl || "";
const content = ["content-warmup.js", "content-family.js", "content-client.js", "content-everyday.js"].map(src).join("\n");
const page = src("app.html")
  .replace("/*__STYLE__*/", () => src("style.css"))
  .replace("/*__MOTION__*/", () => src("motion.js"))
  .replace("/*__CONTENT__*/", () => content)
  .replace("/*__WEB_URL__*/", () => WEB_URL);

fs.writeFileSync(path.join(root, "..", "projects", "ali-english-coach.html"), page);

const head = (extra) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#eef2ef" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0b1312" media="(prefers-color-scheme: dark)">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="English Coach">
${extra}
</head>
<body>
${page}
</body>
</html>
`;
const dataManifest = encodeURIComponent(JSON.stringify({ name: "Ali's English Coach", short_name: "English Coach", display: "standalone", background_color: "#eef2ef", theme_color: "#0d5c55", start_url: "." }));
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
const standalone = head(`<link rel="manifest" href="data:application/manifest+json,${dataManifest}">`);
fs.writeFileSync(path.join(root, "dist", "Ali-English-Coach.html"), standalone);

// GitHub Pages / PWA build
const docs = path.join(root, "docs");
fs.mkdirSync(docs, { recursive: true });
const pwa = head(`<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="icon-180.png">
<script>if("serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));</script>`);
fs.writeFileSync(path.join(docs, "index.html"), pwa);
fs.writeFileSync(path.join(docs, "manifest.webmanifest"), JSON.stringify({
  name: "Ali's English Coach", short_name: "English Coach", id: "./", start_url: "./", scope: "./", display: "standalone",
  background_color: "#eef2ef", theme_color: "#0d5c55",
  icons: [{ src: "icon-192.png", sizes: "192x192", type: "image/png" }, { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }]
}, null, 1));
const ver = require("crypto").createHash("sha1").update(pwa).digest("hex").slice(0, 10);
fs.writeFileSync(path.join(docs, "sw.js"), `// Offline cache: network-first for the page (always fresh when online), cache fallback offline.
const C="coach-${ver}";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./manifest.webmanifest","./icon-192.png"])).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
  e.respondWith(fetch(r).then(res=>{if(res.ok&&(new URL(r.url).origin===location.origin||r.url.includes("fonts.g"))){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;})
   .catch(()=>caches.match(r).then(m=>m||(r.mode==="navigate"?caches.match("./index.html"):Response.error()))));});
`);
fs.writeFileSync(path.join(docs, ".nojekyll"), "");

// Syntax-check every inline script.
const scripts = [...page.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join("\n;\n");
new Function(scripts);
console.log("built", (Buffer.byteLength(standalone) / 1024).toFixed(0) + " KB", "units:", (content.match(/\{id:"[fce]\d"/g) || []).length, "web:", WEB_URL || "(none)");
