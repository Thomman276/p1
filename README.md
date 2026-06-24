# 🌌 AuraTask - Premium Glassmorphic Task Manager

AuraTask is a minimalist, premium task manager application built using HTML5, CSS3, and modern client-side JavaScript. It features an interactive dark mode layout with glowing gradient background blobs, glassmorphic panels, real-time statistics tracking, and fluid micro-animations.

---

## ✨ Features

- **Fluent Glassmorphism**: Stunning visual layout incorporating ambient lighting, radial glowing spheres, frosted-glass panels (`backdrop-filter`), and subtle border reflections.
- **Smart Task Management**:
  - **Quick Add**: Insert tasks via the add button or by pressing `Enter`.
  - **Animated Completion Toggle**: Tap checkboxes to instantly mark tasks complete with custom checkmarks, strikethrough effects, and opacity changes.
  - **Smooth Deletions**: Click the trash icon to slide tasks out horizontally before they collapse and fade from the document flow.
- **Progress Tracker & Stats**: Real-time stats counting tasks completed vs. total. A visual percentage progress bar transitions dynamically.
- **Instant Persistence**: Leverages standard browser `localStorage` to keep tasks safe across page reloads.
- **Micro-interactions & UX**:
  - Empty-state graphics display when list is empty.
  - Input field input validation shake effect on submit failures.
  - Full screen responsiveness on mobile, tablet, and desktop viewports.

---

## 📂 File Architecture

The project directory consists of the following clean structure:

```
p1/
├── index.html   # Main structural content & SEO configurations
├── styles.css   # Core styling, layouts, animations, and variables
├── index.js     # State management, local storage, and DOM manipulation
└── README.md    # Documentation (this file)
```

- **[index.html](index.html)**: Declares markup with custom inline SVG icons, semantic tags, viewport scaling, Google Fonts integration, and accessibility descriptors.
- **[styles.css](styles.css)**: Holds all variables, layout layouts, `@keyframes` instructions, and element-specific themes.
- **[index.js](index.js)**: Runs all application functions, DOM binding, list rendering, delete transitions, and storage persistence.

---

## 🚀 Getting Started

1. Clone or download this repository locally:
   ```bash
   git clone https://github.com/Thomman276/p1.git
   ```
2. Open the project folder.
3. Open the `index.html` file in any modern web browser (Chrome, Firefox, Safari, Edge) to run the application immediately. No build step or local web server is strictly required!

---

## 🛠️ Built With

- **HTML5**: Structured markup.
- **CSS3 (Custom Properties & Keyframes)**: Advanced responsive styling and custom animations.
- **JavaScript (Vanilla ES6)**: Event-driven logic and Storage APIs.

---

## 🔗 Repository Links

- **GitHub Repository**: [Thomman276/p1](https://github.com/Thomman276/p1)
