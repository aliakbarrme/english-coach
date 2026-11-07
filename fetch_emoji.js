// Downloads Microsoft Fluent 3D emoji (MIT, via @lobehub/fluent-emoji-3d) for every emoji the app uses,
// into docs/e/<codepoints>.webp, so pictures look the same (realistic 3D) on every device and work offline.
const fs = require("fs"), path = require("path");
const root = __dirname, out = path.join(root, "docs", "e");
fs.mkdirSync(out, { recursive: true });
const text = fs.readdirSync(path.join(root, "src")).filter(f => /\.(js|html)$/.test(f) && !f.includes(".bak"))
  .map(f => fs.readFileSync(path.join(root, "src", f), "utf8")).join("\n");
const re = /\p{Extended_Pictographic}(?:️|⃣|\p{Emoji_Modifier}|‍\p{Extended_Pictographic}️?\p{Emoji_Modifier}?)*|[0-9]️⃣|\u{1F51F}/gu;
const set = new Set(text.match(re) || []);
const key = e => [...e].map(c => c.codePointAt(0).toString(16)).filter(h => h !== "fe0f").join("-");
const variants = e => { const all = [...e].map(c => c.codePointAt(0).toString(16)); return [...new Set([all.filter(h => h !== "fe0f").join("-"), all.join("-")])]; };
(async () => {
  let ok = 0, miss = [];
  for (const e of set) {
    const k = key(e), file = path.join(out, k + ".webp");
    if (fs.existsSync(file)) { ok++; continue; }
    let got = false;
    for (const v of variants(e)) {
      const r = await fetch(`https://cdn.jsdelivr.net/npm/@lobehub/fluent-emoji-3d@1.1.0/assets/${v}.webp`);
      if (r.ok) { fs.writeFileSync(file, Buffer.from(await r.arrayBuffer())); got = true; break; }
    }
    if (got) ok++; else miss.push(e + " " + k);
  }
  console.log("emoji:", set.size, "saved:", ok, "missing:", miss.join(", ") || "none");
})();
