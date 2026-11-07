/* ================= warm-up illustrations: animated SVG faces, one per mouth exercise ================= */
function warmArt(i){
  const A=(attr,values,dur,extra="")=>`<animate attributeName="${attr}" values="${values}" dur="${dur}" repeatCount="indefinite" ${extra}/>`;
  const T=(type,values,dur,extra="")=>`<animateTransform attributeName="transform" type="${type}" values="${values}" dur="${dur}" repeatCount="indefinite" ${extra}/>`;
  const face=(inner,cheeks=true)=>`<svg class="wart" viewBox="0 0 200 200" role="img" aria-hidden="true">
   <circle cx="100" cy="104" r="78" class="w-skin"/>
   <path d="M30 92 Q34 30 100 26 Q166 30 170 92 Q160 58 100 52 Q40 58 30 92Z" class="w-hair"/>
   <circle cx="72" cy="96" r="6.5" class="w-eye"/><circle cx="128" cy="96" r="6.5" class="w-eye"/>
   <path d="M62 82 Q72 76 82 81" class="w-brow"/><path d="M118 81 Q128 76 138 82" class="w-brow"/>
   ${cheeks?`<ellipse cx="58" cy="122" rx="11" ry="6" class="w-blush"/><ellipse cx="142" cy="122" rx="11" ry="6" class="w-blush"/>`:""}
   ${inner}</svg>`;
  const lbl=(x,y,t,cls="")=>`<text x="${x}" y="${y}" class="w-lbl ${cls}">${t}</text>`;
  switch(i){
   case 0: return face(`<ellipse cx="100" cy="140" rx="17" ry="5" class="w-mouth">${A("ry","4;24;24;4;4","3s","keyTimes=\"0;.35;.6;.9;1\"")}</ellipse>
     <ellipse cx="100" cy="150" rx="10" ry="4" class="w-tongue">${A("cy","142;156;156;142;142","3s","keyTimes=\"0;.35;.6;.9;1\"")}</ellipse>
     <path d="M168 120 v40 M160 150 l8 10 8-10" class="w-arrow"/>`);
   case 1: return face(`<g>${T("translate","0 0;1.6 -1;-1.6 1;1 1;0 0",".16s")}<ellipse cx="100" cy="140" rx="20" ry="7" class="w-lip"/><path d="M82 140 Q100 136 118 140" class="w-line"/></g>
     <g class="w-waves"><path d="M128 132 q6 8 0 16"/><path d="M138 126 q10 14 0 28"/>${A("opacity","0;1;0","0.8s")}</g>${lbl(150,118,"brrr")}`);
   case 2: return face(`<path class="w-mouth" d="M76 134 Q100 158 124 134 Q100 144 76 134 Z">${A("d","M76 134 Q100 158 124 134 Q100 144 76 134 Z;M76 134 Q100 158 124 134 Q100 144 76 134 Z;M91 138 Q100 150 109 138 Q100 126 91 138 Z;M91 138 Q100 150 109 138 Q100 126 91 138 Z;M76 134 Q100 158 124 134 Q100 144 76 134 Z","2.4s","keyTimes=\"0;.35;.5;.85;1\"")}</path>
     ${lbl(148,124,"eee","w-a")}${lbl(148,124,"ooo","w-alt")}`);
   case 3: return face(`<path d="M80 140 Q100 146 120 140" class="w-line w-thick"/>
     <circle r="7" class="w-bulge"><animateMotion dur="2.4s" repeatCount="indefinite" path="M100 124 A20 14 0 1 1 99.9 124"/></circle>
     <path d="M140 116 a26 26 0 1 1 -10 -16" class="w-arrow"/><path d="M127 96 l4 6 6 -3" class="w-arrow"/>`);
   case 4: return face(`<path d="M84 140 Q100 144 116 140" class="w-line w-thick"/>
     <circle cx="62" cy="134" r="12" class="w-bulge">${A("r","2;13;13;2;2;2","3s","keyTimes=\"0;.15;.4;.5;.9;1\"")}</circle>
     <circle cx="138" cy="134" r="12" class="w-bulge">${A("r","2;2;2;13;13;2","3s","keyTimes=\"0;.5;.55;.65;.9;1\"")}</circle>
     ${lbl(26,176,"left")}${lbl(150,176,"right")}`,false);
   case 5: return face(`<ellipse cx="100" cy="138" rx="18" ry="13" class="w-mouth"/>
     <rect x="89" y="132" width="22" height="34" rx="11" class="w-tongue">${A("y","134;150;118;150;134","3.6s")}${A("height","20;40;30;40;20","3.6s")}</rect>
     <path d="M170 118 v-16 M164 108 l6 -7 6 7 M170 150 v16 M164 160 l6 7 6 -7" class="w-arrow"/>`);
   case 6: return face(`<ellipse cx="100" cy="140" rx="20" ry="12" class="w-mouth"/><rect x="84" y="128" width="32" height="7" rx="2" class="w-teeth"/>
     <ellipse cx="100" cy="138" rx="12" ry="5" class="w-tongue"/>
     <g class="w-air"><path d="M124 136 h18 M124 142 h26 M124 148 h16">${A("stroke-dashoffset","40;0","0.9s")}</path></g>${lbl(150,124,"th")}`);
   case 7: return face(`<g>${A("opacity","1;1;0;0;1","3s","keyTimes=\"0;.45;.5;.95;1\"")}<path d="M80 138 Q100 150 120 138" class="w-lip w-lipline"/><rect x="86" y="130" width="28" height="8" rx="2" class="w-teeth"/>${lbl(150,124,"v")}</g>
     <g opacity="0">${A("opacity","0;0;1;1;0","3s","keyTimes=\"0;.45;.5;.95;1\"")}<circle cx="100" cy="140" r="9" class="w-lip"/><circle cx="100" cy="140" r="4" class="w-mouth"/>${lbl(150,124,"w")}</g>`);
   case 8: return face(`<ellipse cx="100" cy="140" rx="16" ry="8" class="w-mouth">${A("ry","9;9;0.5;0.5;9","1.2s","keyTimes=\"0;.5;.6;.95;1\"")}</ellipse>
     ${lbl(140,118,"t!")}${lbl(150,140,"d!","w-alt")}${lbl(140,162,"k!")}`);
   case 9: return face(`<ellipse cx="100" cy="140" rx="16" ry="11" class="w-mouth"/><ellipse cx="100" cy="134" rx="11" ry="5" class="w-tongue">${A("cy","146;134;134;146","0.9s","keyTimes=\"0;.3;.6;1\"")}</ellipse>
     <g class="w-burst">${A("opacity","0;0;1;0","0.9s","keyTimes=\"0;.3;.4;1\"")}<path d="M134 120 l10 -8 M138 132 h14 M134 144 l10 8"/>${lbl(150,110,"click")}</g>`);
  }
  return "";
}
