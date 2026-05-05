import { App, inject, reactive, markRaw } from 'vue';
import { DiscoApp } from '@discoui/core';

const DiscoAppSymbol = Symbol('DiscoApp');

export interface DiscoPluginOptions {
  config?: any;
}

export const DiscoPlugin = {
  install(app: App, options: DiscoPluginOptions = {}) {
    // Initialize DiscoApp
    const discoApp = new DiscoApp(options.config);
    
    // Provide it to the whole app
    // We use reactive to wrap the app instance, but markRaw to prevent Vue from deeply proxying the controller
    const state = reactive({
      instance: markRaw(discoApp),
      theme: discoApp.theme,
      accent: discoApp.accent,
    });

    // Watch for changes if needed or provide methods to update
    // Note: DiscoApp internally updates the documentElement attributes
    
    app.provide(DiscoAppSymbol, discoApp);
  }
};

export function useDiscoApp(): DiscoApp {
  const discoApp = inject<DiscoApp>(DiscoAppSymbol);
  if (!discoApp) {
    throw new Error('useDiscoApp must be used within a Vue app that has installed DiscoPlugin');
  }
  return discoApp;
}

/**
 * Helper to identify DiscoUI custom elements for Vite/Vue config.
 * Usage in vite.config.ts:
 * template: {
 *   compilerOptions: {
 *     isCustomElement: isDiscoElement
 *   }
 * }
 */
export const isDiscoElement = (tag: string) => tag.startsWith('disco-');

export * as DiscoCore from '@discoui/core';
