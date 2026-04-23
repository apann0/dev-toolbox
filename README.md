# ⚡ Dev Toolbox

**A free, offline-ready collection of essential developer utilities — all in a single HTML page.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-brightgreen?style=flat-square)

---

## 🛠️ Included Tools

| Tool | Description |
|------|-------------|
| 📦 **JSON Formatter** | Format, validate & minify JSON data |
| 🔐 **Base64 Encode/Decode** | Convert text to and from Base64 encoding |
| 🆔 **UUID Generator** | Generate single or bulk random UUIDs (v4) |
| 🎨 **Color Converter** | Convert between HEX, RGB, and HSL color formats |
| 🔗 **URL Encode/Decode** | Encode or decode URL components |
| ⏰ **Timestamp Converter** | Convert Unix timestamps to human-readable dates |
| 🔑 **Hash Generator** | Generate SHA-1, SHA-256, SHA-512 hashes (Web Crypto API) |
| 📝 **Lorem Ipsum Generator** | Generate placeholder text (words, sentences, or paragraphs) |

## ✨ Features

- 🚀 **Zero Dependencies** — Pure HTML, CSS, and JavaScript
- 🌐 **Works Offline** — Just open `index.html` in any browser
- 🔒 **100% Client-Side** — No data ever leaves your browser
- 🎯 **Instant Search** — Filter tools with the search bar
- 📋 **One-Click Copy** — Copy results to clipboard instantly
- 📱 **Responsive** — Works on desktop, tablet, and mobile
- 🌙 **Dark Theme** — Easy on the eyes with a premium dark UI

## 🚀 Quick Start

### Just Open It
```bash
git clone https://github.com/YOUR_USERNAME/dev-toolbox.git
open dev-toolbox/index.html
# Windows: start dev-toolbox\index.html
```

### Or Use GitHub Pages
1. Push to GitHub
2. Go to **Settings → Pages → Deploy from main branch**
3. Visit `https://YOUR_USERNAME.github.io/dev-toolbox/`

## 📁 Project Structure

```
dev-toolbox/
├── index.html    # Main app — complete single-page application
├── style.css     # Premium dark theme with animations
├── script.js     # All 8 tools logic — no dependencies
├── README.md     # This file
├── LICENSE       # MIT License
└── .gitignore    # Git ignore rules
```

## 🔒 Privacy

**All processing happens in your browser.** No data is sent to any server. The Hash Generator uses the native [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) — no external libraries.

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/new-tool`)
3. Commit your changes (`git commit -m 'Add new tool'`)
4. Push to the branch (`git push origin feature/new-tool`)
5. Open a Pull Request

### Adding a New Tool

Add an entry to the `tools` array in `script.js`:
```javascript
{
  id: 'mytool',
  icon: '🔧',
  name: 'My Tool',
  desc: 'What it does',
  tag: 'category',
  render: () => `<div class="tool-row">...</div>`
}
```

Then add the handler function to the `window.T` object.

## 📄 License

MIT License — free for personal and commercial use. See [LICENSE](LICENSE).

---

<p align="center">
  Made with ♥ for developers everywhere
</p>
