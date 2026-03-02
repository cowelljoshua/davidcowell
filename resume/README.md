# David Cowell, PE — LaTeX Resume

## Quick Start

### Option 1: Overleaf (easiest, no install)
1. Go to [overleaf.com](https://www.overleaf.com/)
2. Create a new project → Upload Project
3. Upload `resume.tex`
4. Click **Recompile** — PDF is ready to download

### Option 2: Local Build (requires LaTeX)

**Install LaTeX:**
- Windows: [MiKTeX](https://miktex.org/download) or [TeX Live](https://tug.org/texlive/)
- Mac: `brew install --cask mactex`
- Linux: `sudo apt install texlive-full`

**Build the PDF:**
```bash
cd resume
pdflatex resume.tex
pdflatex resume.tex   # run twice for proper page references
```

### Option 3: Docker
```bash
docker run --rm -v $(pwd):/data blang/latex pdflatex resume.tex
```

## Required Packages
The template uses these LaTeX packages (auto-installed by MiKTeX, included in TeX Live full):
- `fontawesome5` — icons (phone, email, globe, map marker)
- `titlesec` — custom section styling
- `xcolor` — color definitions
- `hyperref` — clickable links
- `tabularx` — flexible tables
- `multicol` — two-column expertise list
- `fancyhdr` — custom footer
- `geometry` — page margins
- `enumitem` — list customization
- `microtype` — typography improvements

## Customization
- **Colors**: Edit the `\definecolor` block near the top
- **Margins**: Adjust the `geometry` package options
- **Font size**: Change `11pt` in `\documentclass` to `10pt` or `12pt`
- **Content**: Each section is clearly labeled with comments
