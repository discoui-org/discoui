# Getting Started

DiscoUI is a **Mobile Shell SDK** for building high-performance Metro-inspired applications. It is designed as a modular ecosystem that synchronizes native hardware events with a framework-native development experience.

## The Golden Path: Full Mobile Stack

This approach combines the core engine, the Vue integration, and the Capacitor bridge for a complete mobile application shell.

### 1. Installation

```bash
npm install @discoui/core @discoui/vue @discoui/capacitor
```

### 2. Integrated App Architecture

The three packages work in tandem to provide a cohesive mobile experience:
- **`@discoui/core`**: The rendering engine and high-performance animation motor.
- **`@discoui/vue`**:
    - **First-class Wrappers**: Vue-native components with full prop/event mapping.
    - **Two-way Binding**: Direct `v-model` support for sliders, switches, and inputs.
    - **IntelliSense**: Comprehensive TypeScript definitions for a seamless IDE experience.
- **`@discoui/capacitor`**: Bridges hardware events (Back button, Haptics) directly to the UI navigation stack and lifecycle.

### 3. Quick Start (Vue 3 + Capacitor)

Initialize the app in your entry point:

```typescript
import { DiscoApp } from '@discoui/core';
import '@discoui/core/dist/discoui.css';

DiscoApp.ready(() => {
  const app = new DiscoApp({ splash: 'auto' });
  app.launch(document.getElementById('appFrame'));
});
```

### 4. IDE Support (Volar/VS Code)

To enable IntelliSense and prop validation for all DiscoUI components, add the following to your `env.d.ts` or `discoui.d.ts`:

```typescript
import '@discoui/vue/src/global.d.ts';
```

---

## Alternative: Web-Only Path

For projects that only require web components without native mobile features or Vue-specific DX:

### 1. Installation

```bash
npm install @discoui/core
```

### 2. Usage

Refer to the [Component Gallery](./components/index.md) for vanilla JS usage.

---

## Next Steps

- [Architecture Reference](../ARCHITECTURE.md)
- [Component Gallery](./components/index.md)
- [Theming Guide](./theming.md)