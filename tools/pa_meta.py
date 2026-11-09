# Measures how many times the sound occurs in each Phonicademy MP3 and where the first one ends,
# using plain loudness only (no speech recognition or AI). Writes pa-meta.json for build.js.
# Usage: python tools/pa_meta.py "<pack>/phonemes"
import sys, json, av, numpy as np
from pathlib import Path
src = Path(sys.argv[1]); out = {}
for f in sorted(src.glob("*.mp3")):
    c = av.open(str(f)); x = np.concatenate([fr.to_ndarray().mean(axis=0) for fr in c.decode(audio=0)]); sr = c.streams.audio[0].rate
    w = int(sr * 0.02); e = np.array([np.sqrt(np.mean(x[i:i + w] ** 2)) for i in range(0, len(x) - w, w)])
    on = e > e.max() * 0.15; segs = []; st = None
    for i, v in enumerate(on):
        if v and st is None: st = i
        if not v and st is not None:
            if i - st >= 2: segs.append([st * 0.02, i * 0.02])
            st = None
    if st is not None: segs.append([st * 0.02, len(on) * 0.02])
    m = []
    for s in segs:
        if m and s[0] - m[-1][1] < 0.08: m[-1][1] = s[1]
        else: m.append(s)
    # a long gap (>0.25 s) between groups marks a repeat; "qu" has two parts per repeat
    groups = []
    for s in m:
        if groups and s[0] - groups[-1][1] < 0.25: groups[-1][1] = s[1]
        else: groups.append(list(s))
    first_end = groups[0][1] + 0.12 if len(groups) > 1 else None
    out[f.stem] = {"reps": len(groups), "firstEnd": round(first_end, 2) if first_end else None, "dur": round(len(x) / sr, 2)}
Path("pa-meta.json").write_text(json.dumps(out, indent=1))
print(" ".join(f"{k}:{v['reps']}" for k, v in out.items()))
