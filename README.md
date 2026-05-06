# DiscoUI Ecosystem

A modern, framework-agnostic UI library built with Vanilla JavaScript, Shadow DOM, and SCSS.

### ✨ Highlights
- **Full Framework Sync**: Perfectly synchronized animation engine for both Vanilla JS and framework-cached environments (Vue, React).
- **Metro-Grade Motion**: Battle-tested staggering and transition logic that respects layout cycles and DOM boundaries.
- **Production Ready**: Optimized for performance with built-in "Layout Breath" and "Boundary Piercer" technologies.

For deep technical insights on how we solved complex cross-framework animation challenges, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## 🚀 Packages

- **[@discoui/core](./packages/core)**: The engine of everything. Web Components with zero dependencies.
- **[@discoui/capacitor](./packages/capacitor)**: Native bridge for Android/iOS apps.
- **[@discoui/react](./packages/react)**: Official React wrappers for better DX in React apps.
- **[@discoui/vue](./packages/vue)**: Official Vue 3 integration and composables.

## 🛠️ Monorepo Structure

```text
.
├── packages/
│   ├── core/       # Vanilla Web Components
│   ├── capacitor/  # Capacitor Plugin
│   ├── react/      # React Wrappers (@lit/react)
│   └── vue/        # Vue 3 Integration
├── examples/
│   ├── react-demo/ # React demo application
│   └── vue-demo/   # Vue 3 demo application
└── package.json    # Workspace configuration
```

## 🏗️ Getting Started

This project uses NPM Workspaces.

```bash
# Install all dependencies
npm install

# Build all packages
npm run build --workspaces

# Run a specific demo
npm run dev -w react-demo
```

## 📜 License

MIT © [discoui-org](https://github.com/discoui-org)
