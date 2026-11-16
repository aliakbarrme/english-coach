// Fallbacks for older Android browser engines (Huawei Browser, old WebView, Chrome < 111).
// Appends blocks that only those engines read:
//   @supports not (color:color-mix(...))  -> every color-mix() replaced by a plain colour
//   @supports not (translate:0)           -> translate: becomes transform: translate()
//   @supports not (height:1dvh)           -> dvh / svh / lvh become vh
// Modern browsers skip these blocks, so nothing changes for them.
"use strict";

const NAMED = { white: [255, 255, 255, 1], black: [0, 0, 0, 1], transparent: [0, 0, 0, 0] };
function parseCol(s) {
  s = s.trim().toLowerCase();
  if (NAMED[s]) return NAMED[s];
  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) { let h = m[1]; if (h.length <= 4) h = [...h].map(c => c + c).join(""); const n = i => parseInt(h.slice(i, i + 2), 16); return [n(0), n(2), n(4), h.length === 8 ? n(6) / 255 : 1]; }
  m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) { const p = m[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat); return [p[0], p[1], p[2], p[3] == null ? 1 : p[3]]; }
  return null;
}
function splitTop(s, sep) {
  const out = []; let d = 0, cur = "";
  for (const ch of s) { if (ch === "(") d++; if (ch === ")") d--; if (ch === sep && d === 0) { out.push(cur); cur = ""; } else cur += ch; }
  out.push(cur); return out;
}
function mixArgs(args) {
  const parts = splitTop(args, ",").map(x => x.trim()); parts.shift();          // drop "in srgb"
  const pc = p => { const m = p.match(/^(.*?)\s+([\d.]+)%$/); return m ? [m[1].trim(), +m[2]] : [p.trim(), null]; };
  let [a, pa] = pc(parts[0] || "transparent"), [b, pb] = pc(parts[1] || "transparent");
  if (pa == null && pb == null) { pa = 50; pb = 50; } else if (pa == null) pa = 100 - pb; else if (pb == null) pb = 100 - pa;
  const A = parseCol(a), B = parseCol(b);
  if (A && B) {                                                                // both known: mix exactly
    const s = pa + pb || 1, wa = pa / s, wb = pb / s, al = A[3] * wa + B[3] * wb;
    const ch = i => (al ? Math.round((A[i] * A[3] * wa + B[i] * B[3] * wb) / al) : 0);
    return `rgba(${ch(0)},${ch(1)},${ch(2)},${+(al * Math.min(1, s / 100)).toFixed(3)})`;
  }
  return pa >= pb ? a : b;                                                     // a var() is involved: use the main colour
}
function noMix(v) {
  let out = v, guard = 0;
  while (out.includes("color-mix(") && guard++ < 80) {
    const i = out.lastIndexOf("color-mix("); let d = 0, j = i + 9;
    for (; j < out.length; j++) { if (out[j] === "(") d++; else if (out[j] === ")") { d--; if (d === 0) break; } }
    out = out.slice(0, i) + mixArgs(out.slice(i + 10, j)) + out.slice(j + 1);
  }
  return out;
}
/* a tiny CSS tree: rules, grouping at-rules (@media/@supports) and opaque blocks (@keyframes, @font-face) */
function parse(css, i = 0, stopAtClose = false) {
  const nodes = [];
  while (i < css.length) {
    let j = i; while (j < css.length && css[j] !== "{" && css[j] !== "}" && css[j] !== ";") j++;
    if (j >= css.length) break;
    if (css[j] === "}") { if (stopAtClose) return [nodes, j + 1]; i = j + 1; continue; }
    if (css[j] === ";") { i = j + 1; continue; }                                 // @import / @charset
    const pre = css.slice(i, j).trim();
    if (/^@(media|supports)/.test(pre)) { const [kids, nx] = parse(css, j + 1, true); nodes.push({ at: pre, kids }); i = nx; continue; }
    let d = 1, k = j + 1; for (; k < css.length && d; k++) { if (css[k] === "{") d++; else if (css[k] === "}") d--; }
    const body = css.slice(j + 1, k - 1);
    if (pre.startsWith("@")) nodes.push({ raw: pre, body }); else nodes.push({ sel: pre, body });
    i = k;
  }
  return [nodes, i];
}
const decls = body => splitTop(body, ";").map(s => s.trim()).filter(Boolean).map(s => { const c = s.indexOf(":"); return c < 0 ? null : [s.slice(0, c).trim(), s.slice(c + 1).trim()]; }).filter(Boolean);
function gen(nodes, fix) {
  let out = "";
  for (const n of nodes) {
    if (n.kids) { const inner = gen(n.kids, fix); if (inner) out += `${n.at}{${inner}}`; continue; }
    if (n.raw) { const r = fix.raw && fix.raw(n); if (r) out += r; continue; }
    const r = fix.rule(n.sel, decls(n.body)); if (r) out += `${n.sel}{${r}}`;
  }
  return out;
}
function compatCSS(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const [tree] = parse(css);
  const mix = gen(tree, {
    rule: (sel, ds) => ds.filter(([p, v]) => v.includes("color-mix(")).map(([p, v]) => `${p}:${noMix(v)}`).join(";"),
    raw: n => (/^@(-webkit-)?keyframes/.test(n.raw) && n.body.includes("color-mix(") ? `${n.raw}{${noMix(n.body)}}` : "")
  });
  const tr = gen(tree, {
    rule: (sel, ds) => {
      if (/^(from|to|[\d.%\s,]+)$/i.test(sel)) return "";
      const t = ds.find(([p]) => p === "translate"); if (!t || ds.some(([p]) => p === "transform")) return "";
      const v = splitTop(t[1].replace(/\s*!important/, ""), " ").filter(Boolean);
      return `transform:translate(${v.join(",")})`;
    }
  });
  const vh = gen(tree, {
    rule: (sel, ds) => ds.filter(([p, v]) => /\d(dvh|svh|lvh)\b/.test(v)).map(([p, v]) => `${p}:${v.replace(/(\d)(dvh|svh|lvh)\b/g, "$1vh")}`).join(";")
  });
  let add = "\n/* ===== fallbacks for older Android browsers (generated by compat-css.js) ===== */\n";
  if (mix) add += `@supports not (color:color-mix(in srgb,red,blue)){${mix}}\n`;
  if (tr) add += `@supports not (translate:0){${tr}}\n`;
  if (vh) add += `@supports not (height:1dvh){${vh}}\n`;
  return css + add;
}
module.exports = { compatCSS, noMix };
