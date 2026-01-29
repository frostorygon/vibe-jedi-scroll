# ✋ Jedi Scroll

> Control webpage scrolling with hand gestures using AI-powered hand tracking.

![Demo](https://img.shields.io/badge/Status-Proof%20of%20Concept-brightgreen)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Hands-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Features

- **🎥 Real-time Hand Tracking** - Uses MediaPipe Hands for accurate finger detection
- **👆 Visual Cursor** - Glowing cursor follows your index finger
- **📜 Gesture Scrolling** - Move hand to top/bottom of screen to scroll
- **🎨 Visual Feedback** - Gradient zones indicate active scroll areas
- **📦 Zero Dependencies** - Pure HTML/CSS/JS (CDN-loaded MediaPipe)

## 🎮 How It Works

1. **Allow camera access** when prompted
2. **Raise your hand** in front of the webcam
3. **Move your index finger**:
   - Top 20% of screen → Scroll UP ⬆️
   - Bottom 20% of screen → Scroll DOWN ⬇️
   - Center → No scrolling ✋

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands) | AI hand landmark detection |
| Vanilla JavaScript | Core logic |
| CSS3 | Styling & animations |

## 📁 Project Structure

```
vibe-jedi-scroll/
├── index.html      # Main HTML structure
├── css/
│   └── styles.css  # All styling
├── js/
│   └── app.js      # Hand tracking & scroll logic
└── README.md
```

## 🚀 Quick Start

### Option 1: Direct File
Simply open `index.html` in your browser.

### Option 2: Local Server
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

Then visit `http://localhost:8080`

## ⚙️ Configuration

Adjust these values in `js/app.js`:

```javascript
// Scroll zone thresholds (0-1 range)
const SCROLL_UP_THRESHOLD = 0.2;    // Top 20%
const SCROLL_DOWN_THRESHOLD = 0.8;  // Bottom 20%

// Scroll speed (pixels per frame)
const SCROLL_SPEED = 15;
```

## 🔧 Requirements

- Modern browser (Chrome, Firefox, Edge)
- Webcam
- HTTPS or localhost (required for camera access)

## 📄 License

MIT License - Feel free to use and modify!

---

Made with ✨ gesture magic
