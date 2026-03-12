from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parent.parent
WEB_DIR = ROOT / "web"
LOGO_PATH = WEB_DIR / "logo.png"
OUT_PATH = WEB_DIR / "readme-hero.png"

WIDTH = 1600
HEIGHT = 720


def pick_font(size: int, bold: bool = False, mono: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = []
    if mono:
        candidates = [
            "C:/Windows/Fonts/consolab.ttf",
            "C:/Windows/Fonts/consola.ttf",
        ]
    elif bold:
        candidates = [
            "C:/Windows/Fonts/bahnschrift.ttf",
            "C:/Windows/Fonts/segoeuib.ttf",
            "C:/Windows/Fonts/arialbd.ttf",
        ]
    else:
        candidates = [
            "C:/Windows/Fonts/segoeui.ttf",
            "C:/Windows/Fonts/arial.ttf",
        ]

    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def vertical_gradient(width: int, height: int, top: tuple[int, int, int], bottom: tuple[int, int, int]) -> Image.Image:
    gradient = Image.new("RGBA", (width, height))
    px = gradient.load()
    for y in range(height):
        t = y / max(height - 1, 1)
        r = int(top[0] * (1 - t) + bottom[0] * t)
        g = int(top[1] * (1 - t) + bottom[1] * t)
        b = int(top[2] * (1 - t) + bottom[2] * t)
        for x in range(width):
            px[x, y] = (r, g, b, 255)
    return gradient


def add_glow(base: Image.Image, bbox: tuple[int, int, int, int], color: tuple[int, int, int, int], blur: int) -> None:
    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    draw.ellipse(bbox, fill=color)
    glow = glow.filter(ImageFilter.GaussianBlur(blur))
    base.alpha_composite(glow)


def draw_grid(base: Image.Image) -> None:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    grid_color = (84, 153, 214, 34)
    node_color = (133, 222, 255, 70)

    spacing = 72
    for x in range(0, WIDTH, spacing):
        draw.line((x, 0, x, HEIGHT), fill=grid_color, width=1)
    for y in range(0, HEIGHT, spacing):
        draw.line((0, y, WIDTH, y), fill=grid_color, width=1)

    circuits = [
        [(80, 560), (310, 560), (310, 440), (430, 440)],
        [(1120, 88), (1360, 88), (1360, 196), (1500, 196)],
        [(1160, 612), (1360, 612), (1360, 500), (1510, 500)],
        [(910, 160), (980, 160), (980, 280), (1120, 280)],
    ]
    for path in circuits:
        draw.line(path, fill=(110, 210, 255, 54), width=3)
        for x, y in path:
            draw.ellipse((x - 7, y - 7, x + 7, y + 7), fill=node_color)

    overlay = overlay.filter(ImageFilter.GaussianBlur(0.4))
    base.alpha_composite(overlay)


def text_size(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0], box[3] - box[1]


def draw_text_with_shadow(draw: ImageDraw.ImageDraw, pos: tuple[int, int], text: str, font: ImageFont.ImageFont, fill: tuple[int, int, int], shadow: tuple[int, int, int, int]) -> None:
    x, y = pos
    draw.text((x + 4, y + 5), text, font=font, fill=shadow)
    draw.text((x, y), text, font=font, fill=fill)


def draw_chip(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, font: ImageFont.ImageFont, fill: tuple[int, int, int], outline: tuple[int, int, int]) -> int:
    x, y = xy
    pad_x = 22
    pad_y = 14
    tw, th = text_size(draw, text, font)
    box = (x, y, x + tw + pad_x * 2, y + th + pad_y * 2)
    draw.rounded_rectangle(box, radius=22, fill=(8, 24, 42, 200), outline=outline, width=2)
    draw.text((x + pad_x, y + pad_y - 1), text, font=font, fill=fill)
    return box[2]


def draw_wrapped_text(draw: ImageDraw.ImageDraw, x: int, y: int, text: str, font: ImageFont.ImageFont, fill: tuple[int, int, int], max_width: int, line_gap: int = 8) -> int:
    words = text.split()
    lines: list[str] = []
    current = ""

    for word in words:
        candidate = word if not current else f"{current} {word}"
        width, _ = text_size(draw, candidate, font)
        if width <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)

    _, line_height = text_size(draw, "Ag", font)
    cursor_y = y
    for line in lines:
        draw.text((x, cursor_y), line, font=font, fill=fill)
        cursor_y += line_height + line_gap
    return cursor_y


def main() -> None:
    base = vertical_gradient(WIDTH, HEIGHT, (4, 15, 31), (8, 32, 60))
    add_glow(base, (-180, 120, 540, 780), (15, 137, 255, 75), 110)
    add_glow(base, (960, -140, 1640, 400), (35, 168, 255, 42), 120)
    draw_grid(base)

    panel = Image.new("RGBA", base.size, (0, 0, 0, 0))
    pdraw = ImageDraw.Draw(panel)
    pdraw.rounded_rectangle((62, 74, 612, 646), radius=48, fill=(8, 22, 40, 166), outline=(105, 185, 255, 88), width=2)
    pdraw.rounded_rectangle((92, 104, 582, 616), radius=42, outline=(164, 223, 255, 52), width=2)
    panel = panel.filter(ImageFilter.GaussianBlur(0.6))
    base.alpha_composite(panel)

    logo = Image.open(LOGO_PATH).convert("RGBA")
    logo = logo.resize((430, 430), Image.Resampling.LANCZOS)

    shadow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.ellipse((124, 148, 534, 558), fill=(72, 196, 255, 72))
    shadow = shadow.filter(ImageFilter.GaussianBlur(50))
    base.alpha_composite(shadow)

    logo_shadow = Image.new("RGBA", logo.size, (0, 0, 0, 0))
    logo_shadow.alpha_composite(logo)
    logo_shadow = logo_shadow.filter(ImageFilter.GaussianBlur(10))
    base.alpha_composite(logo_shadow, (118, 126))
    base.alpha_composite(logo, (112, 120))

    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    odraw.arc((54, 86, 620, 650), start=230, end=318, fill=(164, 223, 255, 128), width=6)
    odraw.arc((44, 74, 632, 664), start=36, end=128, fill=(72, 196, 255, 112), width=6)
    odraw.line((654, 362, 1500, 362), fill=(92, 200, 255, 120), width=2)
    odraw.line((654, 370, 1430, 370), fill=(255, 255, 255, 42), width=1)
    base.alpha_composite(overlay)

    draw = ImageDraw.Draw(base)
    eyebrow_font = pick_font(28, mono=True)
    title_font = pick_font(94, bold=True)
    subtitle_font = pick_font(30, bold=False)
    chip_font = pick_font(26, bold=True)
    small_font = pick_font(24, mono=True)

    draw.text((684, 126), "ARMORED CIRCUITRY FOR OPENCLAW", font=eyebrow_font, fill=(126, 212, 255))

    draw_text_with_shadow(draw, (676, 168), "OPENCLAW", title_font, (238, 248, 255), (0, 0, 0, 110))
    draw_text_with_shadow(draw, (676, 272), "GUARD", title_font, (88, 196, 255), (0, 0, 0, 120))

    subtitle = "Security presets, agent Markdown assets, and Git-powered recovery."
    draw_wrapped_text(draw, 682, 404, subtitle, subtitle_font, (207, 226, 242), max_width=760)

    chip_outline = (84, 191, 255)
    chip_fill = (234, 247, 255)
    x = 682
    y = 486
    x = draw_chip(draw, (x, y), "SECURITY PRESETS", chip_font, chip_fill, chip_outline) + 18
    x = draw_chip(draw, (x, y), "AGENT MARKDOWN", chip_font, chip_fill, chip_outline) + 18
    draw_chip(draw, (x, y), "GIT SYNC + RESTORE", chip_font, chip_fill, chip_outline)

    draw.text((684, 594), "Built with armor and a revive path.", font=small_font, fill=(148, 196, 224))

    final = base.convert("RGB")
    final.save(OUT_PATH, format="PNG", optimize=True)
    print(f"Generated {OUT_PATH}")


if __name__ == "__main__":
    main()
