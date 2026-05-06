# DiscoUI Architecture

This document outlines the core architectural decisions and mechanisms that drive the DiscoUI animation engine and component lifecycle, ensuring a consistent "Metro" UI experience across various environments, including Vanilla JS and framework-cached environments like Vue.

## 1. The Boundary Piercer (Light & Shadow DOM Synchronization)

### The Challenge
Web Components utilize Shadow DOM for encapsulation. However, frameworks like Vue often provide children via Light DOM (slots). Traditional `shadowRoot.querySelectorAll` calls fail to see these Light DOM children, leading to "blindness" in the orchestration motor where staggered animations would only play for shadow-rendered items, ignoring framework-rendered content.

### The Solution
We implemented a universal interface called `getAnimationTargets()` on container components like `DiscoListView`. This method bridges the gap by explicitly collecting:
1.  **Shadow DOM Items**: Elements rendered internally via templates.
2.  **Light DOM Items**: Elements distributed via slots (common in Vue/React).

Page components (`DiscoSinglePage`, `DiscoPivotPage`) now use this interface to identify all animatable children, ensuring that staggered entrance and exit animations are perfectly synchronized across all DOM boundaries.

## 2. The Layout Breath (rAF Synchronization)

### The Challenge
In framework-cached environments (like Vue's component caching), elements often transition from a `hidden` state to visible. If the animation motor attempts to measure dimensions (`getBoundingClientRect`) immediately after unhiding, the browser may return `0x0` because a layout pass hasn't occurred yet. This causes the "Viewport Filter" to skip animations, resulting in static content.

### The Solution
We introduced a mandatory **Layout Yield** (The "Layout Breath") within the animation motor. By awaiting a `requestAnimationFrame` before any visibility measurements:
```javascript
await new Promise(resolve => requestAnimationFrame(resolve));
```
We force the engine to wait for the browser's next layout cycle. This guarantees that elements have their final dimensions before the engine decides whether to stagger them or skip them based on viewport visibility.

## 3. Orchestrator Guard (Autonomous vs. Page-Driven Motion)

### The Challenge
DiscoUI components are designed to be both "Standalone" (self-animating when added to DOM) and "Orchestrated" (driven by a parent Page component). Without coordination, this leads to "Double Animation" bugs where both the component and the page try to trigger the same entrance sequence simultaneously.

### The Solution
We implemented a **Orchestrator Guard** within the `_handleLateArrivals` logic. Components detect if their parent page is currently in a transition state (`animating-in`, `animating-out`, or `data-animating`).
-   **If Orchestrated**: The component remains silent and lets the Page motor drive the motion.
-   **If Standalone**: The component plays its own entrance animation, ensuring it works even outside of a formal navigation frame.

This ensures a "Single Source of Truth" for every animation frame, maintaining premium performance and visual stability.
