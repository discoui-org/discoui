<div align="center">
  <img src="assets/dui.svg" alt="DiscoUI logo" width="120" />
  <h1>DiscoUI Ecosystem</h1>
</div>

<p align="center">
  A high-performance <b>Mobile Metro UI Suite</b> built with Vanilla JavaScript, Shadow DOM, and SCSS. This monorepo provides a suite of mobile design components for creating native-looking mobile websites and applications. Includes official integration for Vue.
</p>

Technical details regarding cross-framework synchronization and animation orchestration can be found in [ARCHITECTURE.md](./ARCHITECTURE.md).

## Packages

- **[@discoui-org/core](./packages/core)**: Framework-agnostic engine and high-performance Web Components.
- **[@discoui-org/capacitor](./packages/capacitor)**: Native mobile bridge for hardware events and system integration.
- **[@discoui-org/vue](./packages/vue)**: Vue 3 SDK with `v-model` support, component wrappers, and full IntelliSense.

## Monorepo Structure

```text
.
├── packages/
│   ├── core/       # Vanilla Web Components
│   ├── capacitor/  # Capacitor Plugin
│   └── vue/        # Vue 3 Integration
├── examples/
│   ├── core-demo/  # Vanilla JS demo
│   ├── emulator/   # Portal/Emulator source
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
npm run dev -w core-demo
```

## License

MIT © [discoui-org](https://github.com/discoui-org)
