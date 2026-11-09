/* ================= Phonicademy phonics sounds (licensed, credited in Me → Credits) =================
   The original MP3s are built into the app as one encoded bundle (docs/x/ps.bin), never as standalone files.
   Play a sound with TTS.say("pa:<name>"), e.g. "pa:a". Letter names and example words stay separate clips. */
const PA_INDEX=/*__PA_INDEX__*/{};
const PA={
 urls:{},loading:null,
 has(n){return !!PA_INDEX.files&&!!PA_INDEX.files[n];},
 load(){
  if(this.loading)return this.loading;
  this.loading=fetch((window.AUDIO_BASE?window.AUDIO_BASE.replace(/a\/$/,""):"")+"x/ps.bin?v="+(PA_INDEX.v||"")).then(r=>{if(!r.ok)throw 0;return r.arrayBuffer();}).then(buf=>{
    const b=new Uint8Array(buf),k=PA_INDEX.k||[];for(let i=0;i<b.length;i++)b[i]^=k[i%k.length];
    for(const [n,[o,l]] of Object.entries(PA_INDEX.files))this.urls[n]=URL.createObjectURL(new Blob([b.slice(o,o+l)],{type:"audio/mpeg"}));
    return this.urls;}).catch(()=>{this.loading=null;return {};});
  return this.loading;
 },
 end(n){const f=PA_INDEX.files&&PA_INDEX.files[n];return f&&f[2]||0;},
 async url(n){if(this.urls[n])return this.urls[n];await this.load();return this.urls[n]||null;}
};
if(PA_INDEX.files)setTimeout(()=>{if(!ENV.claude)PA.load();},3000);
