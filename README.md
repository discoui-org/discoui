<div align="center">
  <img src="assets/dui.svg" alt="DiscoUI logo" width="120" />
  <h1>DiscoUI Ecosystem</h1>
</div>

<p align="center">
  A high-performance, framework-agnostic UI library built with Vanilla JavaScript, Shadow DOM, and SCSS. This monorepo provides a production-ready implementation of Metro UI design principles for web and mobile applications.
</p>

Technical details regarding cross-framework synchronization and animation orchestration can be found in [ARCHITECTURE.md](./ARCHITECTURE.md).

## Packages

- **[@discoui/core](./packages/core)**: Core Web Components with zero dependencies.
- **[@discoui/capacitor](./packages/capacitor)**: Native bridge for Android and mobile platforms.
- **[@discoui/vue](./packages/vue)**: Official Vue 3 integration, composables, and type definitions.

## Monorepo Structure

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

## Getting Started

This project uses NPM Workspaces.

```bash
# Install all dependencies
npm install

# Build all packages
npm run build --workspaces

# Run a specific demo
npm run dev -w react-demo
```

## License

MIT © [discoui-org](https://github.com/discoui-org)
