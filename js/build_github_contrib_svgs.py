import re
import sys
import urllib.request
from pathlib import Path

LIGHT_STYLE = """
<style>
  svg { width: 100%; height: auto; }
  rect[data-level="0"] { fill: #ebedf0; }
  rect[data-level="1"] { fill: #9be9a8; }
  rect[data-level="2"] { fill: #40c463; }
  rect[data-level="3"] { fill: #30a14e; }
  rect[data-level="4"] { fill: #216e39; }
  text { fill: #94a3b8; font-size: 10px; }
</style>
"""

DARK_STYLE = """
<style>
  svg { width: 100%; height: auto; }
  rect[data-level="0"] { fill: #161b22; }
  rect[data-level="1"] { fill: #0e4429; }
  rect[data-level="2"] { fill: #006d32; }
  rect[data-level="3"] { fill: #26a641; }
  rect[data-level="4"] { fill: #39d353; }
  text { fill: #94a3b8; font-size: 10px; }
</style>
"""

def fetch_html(url: str) -> str:
  req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
  with urllib.request.urlopen(req, timeout=30) as r:
    return r.read().decode("utf-8", errors="ignore")

def extract_svg(html: str) -> str:
  # Contributions endpoint trả về HTML snippet có chứa <svg>...</svg>
  m = re.search(r"(<svg[^>]*>.*?</svg>)", html, flags=re.DOTALL)
  if not m:
    raise RuntimeError("Không tìm thấy SVG contributions trong response.")
  return m.group(1)

def inject_style(svg: str, style: str) -> str:
  # Nhét style ngay sau thẻ <svg ...>
  svg = re.sub(r"(<svg[^>]*>)", r"\1" + style, svg, count=1, flags=re.DOTALL)
  # Xóa width/height cứng nếu có để responsive
  svg = re.sub(r'\s(width|height)="[^"]*"', "", svg)
  return svg

def main():
  if len(sys.argv) < 3:
    print("Usage: build_github_contrib_svgs.py <username> <out_dir>")
    sys.exit(1)

  username = sys.argv[1].strip()
  out_dir = Path(sys.argv[2].strip())
  out_dir.mkdir(parents=True, exist_ok=True)

  url = f"https://github.com/users/{username}/contributions"
  html = fetch_html(url)
  svg = extract_svg(html)

  (out_dir / "github-contrib-light.svg").write_text(inject_style(svg, LIGHT_STYLE), encoding="utf-8")
  (out_dir / "github-contrib-dark.svg").write_text(inject_style(svg, DARK_STYLE), encoding="utf-8")

  print("Generated:", out_dir / "github-contrib-light.svg", "and", out_dir / "github-contrib-dark.svg")

if __name__ == "__main__":
  main()
