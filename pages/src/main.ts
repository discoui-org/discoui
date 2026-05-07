/**
 * DiscoUI Lumia Portal - Professional Controller
 */
import './style.css';
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

// --- Configuration & Constants ---
const CONFIG = {
  CORE_JS: new URL('./discoui/packages/core/dist/discoui.mjs', window.location.href).href,
  CORE_CSS: new URL('./discoui/packages/core/dist/discoui.css', window.location.href).href,
  VUE_JS: new URL('./discoui/packages/vue/dist/discoui-vue.mjs', window.location.href).href,
  VUE_LIB: 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
};

const TEMPLATES = {
  vanilla: {
    html: `<!-- DiscoUI UI Structure -->
<disco-frame>
  <disco-single-page app-title="SANDBOX">
    <disco-button id="helloBtn">Hello World</disco-button>
  </disco-single-page>
</disco-frame>`,
    js: `// DiscoUI Application Logic
const app = new DiscoApp({
  accent: '#008a00',
  theme: 'dark'
});
app.scale = 1.025;
app.launch(document.body);

const frame = document.querySelector('disco-frame');
const page = frame.querySelector('disco-single-page');
await frame.navigate(page);

const btn = document.getElementById('helloBtn');
btn?.addEventListener('click', () => {
  alert('DiscoUI: Interaction working!');
});`
  },
  vue: {
    html: `<!-- Vue Mount Point -->
<div id="app"></div>`,
    js: `import { createApp } from '${CONFIG.VUE_LIB}';
import { DiscoVue } from '${CONFIG.VUE_JS}';

const App = {
  template: \`
    <disco-frame>
      <disco-single-page app-title="VUE SANDBOX">
        <disco-button @click="handleClick">Vue Interaction</disco-button>
      </disco-single-page>
    </disco-frame>
  \`,
  setup() {
    const handleClick = () => alert('Hello from DiscoUI Vue!');
    return { handleClick };
  }
};

const app = createApp(App);
app.use(DiscoVue);
app.mount('#app');`
  }
};

// --- Background Manager ---
class BackgroundManager {
  private flowers = document.querySelectorAll('.bg-decoration');
  private container = document.querySelector('.scroll-container');
  private states: any[] = [];
  private timeout: any;

  constructor() {
    this.states = this.generateStates();
    this.init();
  }

  private generateStates() {
    const scaleSum = 2.0;
    const s1 = 0.7 + Math.random() * 0.6;
    const s2 = scaleSum - s1;
    const scales = [s1, s2];

    return Array.from(this.flowers).map((_, i) => {
      const isFirst = i === 0;
      return {
        p1: this.createRandomState(isFirst, scales[i], 1),
        p2: this.createRandomState(isFirst, scales[i], -1)
      };
    });
  }

  private createRandomState(isFirst: boolean, scale: number, rotDir: number) {
    return {
      x: isFirst ? -12 - Math.random() * 18 : 12 + Math.random() * 18,
      y: isFirst ? -12 - Math.random() * 18 : 12 + Math.random() * 18,
      scale: scale,
      rotationSpeed: (0.05 + Math.random() * 0.1) * rotDir
    };
  }

  private init() {
    this.container?.addEventListener('scroll', () => {
      this.update();
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.onScrollEnd(), 200);
    });
    window.addEventListener('resize', () => this.update());
    this.update();
  }

  private update() {
    if (!this.container) return;
    const scrollTop = (this.container as HTMLElement).scrollTop;
    const vh = window.innerHeight;
    const progress = Math.min(Math.max(scrollTop / vh, 0), 1);

    this.flowers.forEach((flower, i) => {
      const state = this.states[i];
      const x = state.p1.x + (state.p2.x - state.p1.x) * progress;
      const y = state.p1.y + (state.p2.y - state.p1.y) * progress;
      const scale = state.p1.scale + (state.p2.scale - state.p1.scale) * progress;
      const rotation = scrollTop * state.p1.rotationSpeed;
      (flower as HTMLElement).style.transform = `translate(calc(-50% + ${x}vmax), calc(-50% + ${y}vmax)) scale(${scale}) rotate(${rotation}deg)`;
    });
  }

  private onScrollEnd() {
    const scrollTop = (this.container as HTMLElement).scrollTop;
    const vh = window.innerHeight;
    if (scrollTop >= vh - 10) this.randomize(true);
    else if (scrollTop <= 10) this.randomize(false);
  }

  private randomize(isFirst: boolean) {
    const scaleSum = 2.0;
    const s1 = 0.7 + Math.random() * 0.6;
    const s2 = scaleSum - s1;
    const scales = [s1, s2];

    this.flowers.forEach((_, i) => {
      const flowerFirst = i === 0;
      const newState = this.createRandomState(flowerFirst, scales[i], flowerFirst ? 1 : -1);
      if (isFirst) this.states[i].p1 = newState;
      else this.states[i].p2 = newState;
    });
  }
}

// --- Emulator Manager ---
class EmulatorManager {
  private device = document.getElementById('disco-device')!;
  private heroDemo = document.getElementById('heroDemo') as HTMLIFrameElement;
  private sandboxFrame = document.getElementById('sandboxFrame') as HTMLIFrameElement;
  private sandboxBar = document.getElementById('sandboxBar');

  constructor() {
    this.init();
  }

  private init() {
    window.addEventListener('resize', () => this.resize());
    document.querySelector('.back-hit')?.addEventListener('click', () => this.hardwareBack());
    document.querySelector('.home-hit')?.addEventListener('click', () => this.hardwareHome());
    this.resize();
  }

  public resize() {
    if (!this.device || document.body.classList.contains('fullscreen-mode')) return;
    const isSandboxOpen = this.sandboxBar?.classList.contains('open');
    const availableWidth = isSandboxOpen ? window.innerWidth - 450 : window.innerWidth;
    const centerX = isSandboxOpen ? (window.innerWidth - 450) / 2 : window.innerWidth / 2;
    const scale = Math.min(Math.min(availableWidth / 600, window.innerHeight / 1100) * 0.8, 0.85);
    this.device.style.transform = `translate(-50%, -50%) scale(${scale})`;
    this.device.style.left = `${centerX}px`;
    this.device.style.top = '50%';
  }

  private getActiveFrame() {
    return this.device.classList.contains('sandbox-active') ? this.sandboxFrame : this.heroDemo;
  }

  private hardwareBack() {
    const win = this.getActiveFrame().contentWindow as any;
    if (win?.frame?.goBack) win.frame.goBack();
  }

  private hardwareHome() {
    const win = this.getActiveFrame().contentWindow as any;
    if (win?.frame && win?.homePage) win.frame.navigate(win.homePage);
  }

  public async triggerAnimation(iframe: HTMLIFrameElement, type: 'animate-in' | 'animate-out', direction: 'forward' | 'back' = 'forward') {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      const page = doc?.querySelector('disco-pivot-page, disco-single-page, disco-page') as any;
      if (page?.[type === 'animate-in' ? 'animateIn' : 'animateOut']) {
        await page[type === 'animate-in' ? 'animateIn' : 'animateOut']({ direction });
      }
    } catch (e) {
      iframe.contentWindow?.postMessage({ type, direction }, '*');
    }
  }

  public async setSandboxActive(active: boolean, blobUrl?: string) {
    if (active) {
      await this.triggerAnimation(this.heroDemo, 'animate-out', 'forward');
      this.sandboxFrame.onload = async () => {
        this.device.classList.add('sandbox-active');
        await this.triggerAnimation(this.sandboxFrame, 'animate-in', 'forward');
        this.sandboxFrame.onload = null;
      };
      this.sandboxFrame.src = blobUrl!;
    } else {
      await this.triggerAnimation(this.sandboxFrame, 'animate-out', 'back');
      this.device.classList.remove('sandbox-active');
      await this.triggerAnimation(this.heroDemo, 'animate-in', 'back');
    }
  }

  public async updateSandbox(blobUrl: string) {
    await this.triggerAnimation(this.sandboxFrame, 'animate-out', 'forward');
    this.sandboxFrame.src = blobUrl;
    this.sandboxFrame.onload = async () => {
      await this.triggerAnimation(this.sandboxFrame, 'animate-in', 'forward');
      this.sandboxFrame.onload = null;
    };
  }
}

// --- Sandbox Manager ---
class SandboxManager {
  private htmlEditor: EditorView;
  private jsEditor: EditorView;
  private modeSelect = document.getElementById('sandboxMode') as HTMLSelectElement;
  private emulator: EmulatorManager;

  constructor(emulator: EmulatorManager) {
    this.emulator = emulator;
    this.htmlEditor = this.createEditor('htmlEditorContainer', html(), TEMPLATES.vanilla.html);
    this.jsEditor = this.createEditor('jsEditorContainer', javascript(), TEMPLATES.vanilla.js);
    this.init();
  }

  private createEditor(id: string, lang: any, doc: string) {
    return new EditorView({
      doc,
      extensions: [basicSetup, lang, vscodeDark, EditorView.lineWrapping],
      parent: document.getElementById(id)!
    });
  }

  private init() {
    this.modeSelect.addEventListener('change', () => this.switchMode());
    document.getElementById('runSandbox')?.addEventListener('click', () => this.run());
    document.getElementById('openSandbox')?.addEventListener('click', () => {
      document.getElementById('sandboxBar')?.classList.add('open');
      this.emulator.resize();
    });
    document.getElementById('closeSandbox')?.addEventListener('click', () => {
      document.getElementById('sandboxBar')?.classList.remove('open');
      this.emulator.resize();
      if (document.getElementById('disco-device')?.classList.contains('sandbox-active')) {
        this.emulator.setSandboxActive(false);
      }
    });

    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = (btn as HTMLElement).dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`${tab}Tab`)?.classList.add('active');
      });
    });
  }

  private switchMode() {
    const mode = this.modeSelect.value as keyof typeof TEMPLATES;
    const template = TEMPLATES[mode];
    
    this.htmlEditor.dispatch({
      changes: { from: 0, to: this.htmlEditor.state.doc.length, insert: template.html }
    });
    this.jsEditor.dispatch({
      changes: { from: 0, to: this.jsEditor.state.doc.length, insert: template.js }
    });
  }

  private run() {
    const mode = this.modeSelect.value;
    const htmlStr = this.htmlEditor.state.doc.toString();
    const jsStr = this.jsEditor.state.doc.toString();

    let injection = '';
    if (mode === 'vue') {
      injection = `
        <script type="module">
          ${jsStr}
        </script>
      `;
    } else {
      injection = `
        <script type="module">
          import { DiscoApp } from '${CONFIG.CORE_JS}';
          ${jsStr}
        </script>
      `;
    }

    const blob = new Blob([`
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="${CONFIG.CORE_CSS}">
          <style>
            body { margin: 0; background: #000; color: #fff; overflow: hidden; height: 100vh; font-family: "Segoe UI", sans-serif; }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>
          ${htmlStr}
          ${injection}
          <script type="module">
            window.addEventListener('message', async (event) => {
              const type = event.data.type || event.data;
              const direction = event.data.direction || 'forward';
              if (type === 'animate-out') {
                const page = document.querySelector('disco-pivot-page, disco-single-page, disco-page');
                if (page && page.animateOut) await page.animateOut({ direction });
              }
            });
          </script>
        </body>
      </html>
    `], { type: 'text/html' });

    const blobUrl = URL.createObjectURL(blob);
    const device = document.getElementById('disco-device')!;
    if (!device.classList.contains('sandbox-active')) {
      this.emulator.setSandboxActive(true, blobUrl);
    } else {
      this.emulator.updateSandbox(blobUrl);
    }
  }
}

// --- Initialization ---
const emulator = new EmulatorManager();
new BackgroundManager();
new SandboxManager(emulator);

// Portal View Observer
const portalSection = document.querySelector('.portal-section');
if (portalSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => document.body.classList.toggle('portal-in-view', entry.isIntersecting));
  }, { threshold: 0.4 });
  observer.observe(portalSection);
}

// Misc interactions
document.getElementById('sandboxTile')?.addEventListener('click', () => {
  document.querySelector('.portal-section')?.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => document.getElementById('sandboxBar')?.classList.add('open'), 600);
});

document.getElementById('scrollToDocs')?.addEventListener('click', () => {
  document.querySelector('.portal-section')?.scrollIntoView({ behavior: 'smooth' });
});
