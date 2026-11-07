"""Draws the app icon (teal tile, speech bubble with voice bars) into docs/."""
from PIL import Image, ImageDraw
def icon(n, path):
    S = n * 4
    im = Image.new("RGBA", (S, S), (13, 92, 85, 255))
    d = ImageDraw.Draw(im)
    m = S * .2
    top, bot = m * 1.05, S - m * 1.45
    d.rounded_rectangle([m, top, S - m, bot], radius=int(S * .13), fill=(241, 251, 247, 255))
    bw = S - 2 * m
    d.polygon([(m + bw * .2, bot - 2), (m + bw * .16, S - m * .8), (m + bw * .42, bot - 2)], fill=(241, 251, 247, 255))
    cx, cy = S / 2, (top + bot) / 2
    for i, h in enumerate([.10, .2, .14, .24, .12]):
        x = cx + (i - 2) * S * .085
        d.rounded_rectangle([x - S * .025, cy - S * h / 1.4, x + S * .025, cy + S * h / 1.4], radius=int(S * .025), fill=(13, 92, 85, 255))
    im.resize((n, n), Image.LANCZOS).save(path)
for n in (512, 192, 180):
    icon(n, f"docs/icon-{n}.png")
print("icons ok")
