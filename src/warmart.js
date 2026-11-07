/* ================= warm-up illustrations: realistic 3D faces (Fluent emoji) + animated guides ================= */
function warmArt(i){
  const svg=inner=>`<svg class="wov" viewBox="0 0 200 200" aria-hidden="true">${inner}</svg>`;
  const lbl=(x,y,t,cls="")=>`<text x="${x}" y="${y}" class="w-lbl ${cls}">${t}</text>`;
  const two=(a,b,cls,ov="")=>`<div class="wface ${cls}" role="img" aria-hidden="true"><span class="wa">${a}</span><span class="wb">${b}</span>${ov}</div>`;
  const one=(a,cls,ov="")=>`<div class="wface ${cls}" role="img" aria-hidden="true"><span class="wa solo">${a}</span>${ov}</div>`;
  switch(i){
   case 0: return two("😐","😮","slow",svg(`<path d="M182 70 v60 M174 80 l8 -10 8 10 M174 120 l8 10 8 -10" class="w-arrow"/>`));
   case 1: return one("😗","shake",svg(`<g class="w-waves blink"><path d="M150 96 q8 12 0 24"/><path d="M164 88 q14 20 0 40"/></g>${lbl(150,72,"brrr")}`));
   case 2: return two("😁","😗","swap",svg(`${lbl(156,40,"eee","w-a")}${lbl(156,40,"ooo","w-alt")}`));
   case 3: return one("😋","",svg(`<g class="spin"><path d="M100 18 a82 82 0 1 1 -58 24" class="w-arrow"/><path d="M36 34 l6 10 10 -4" class="w-arrow"/></g>`));
   case 4: return two("😏","😏","swap mirror",svg(`${lbl(8,190,"left","w-a")}${lbl(150,190,"right","w-alt")}`));
   case 5: return one("😛","bob",svg(`<path d="M186 60 v-24 M178 46 l8 -10 8 10 M186 140 v24 M178 154 l8 10 8 -10" class="w-arrow"/>`));
   case 6: return one("😛","",svg(`<g class="w-air"><path d="M150 120 h30 M150 130 h42 M150 140 h26"/></g>${lbl(160,96,"th")}`));
   case 7: return two("😬","😗","swap",svg(`${lbl(166,44,"v","w-a")}${lbl(166,44,"w","w-alt")}`));
   case 8: return two("😀","😐","snap",svg(`${lbl(160,50,"t!")}${lbl(170,104,"d!")}${lbl(160,158,"k!")}`));
   case 9: return two("😙","😮","snap",svg(`<g class="w-burst blink"><path d="M150 62 l14 -12 M156 84 h20 M150 106 l14 12"/></g>${lbl(140,44,"click")}`));
  }
  return "";
}
