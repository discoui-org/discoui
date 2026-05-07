/**
 * DiscoUI Lumia Portal - Professional Controller
 */
import './style.css';

// --- UI Elements ---
const discoDevice = document.getElementById('disco-device') as HTMLElement;
const heroDemo = document.getElementById('heroDemo') as HTMLIFrameElement;
const sandboxFrame = document.getElementById('sandboxFrame') as HTMLIFrameElement;
const openSandboxBtn = document.getElementById('openSandbox');
const closeSandboxBtn = document.getElementById('closeSandbox');
const sandboxBar = document.getElementById('sandboxBar');
const runSandboxBtn = document.getElementById('runSandbox');
const toggleFullscreen = document.getElementById('toggleFullscreen');

// --- Emulator Logic ---
function resize() {
  if (!discoDevice || document.body.classList.contains('fullscreen-mode')) return;
  
  const isSandboxOpen = sandboxBar?.classList.contains('open');
  const availableWidth = isSandboxOpen ? window.innerWidth - 450 : window.innerWidth;
  const centerX = isSandboxOpen ? (window.innerWidth - 450) / 2 : window.innerWidth / 2;
  
  // Contain within available area, then scale down to 80%
  const baseScale = Math.min(availableWidth / 600, window.innerHeight / 1100);
  const scale = Math.min(baseScale * 0.8, 0.85); // A bit smaller than full contain

  discoDevice.style.transform = `translate(-50%, -50%) scale(${scale})`;
  discoDevice.style.left = `${centerX}px`;
  discoDevice.style.top = '50%';
}

window.addEventListener('resize', resize);
resize();

// --- Hardware Button Interaction ---
const getActiveFrame = () => {
  return discoDevice.classList.contains('sandbox-active') ? sandboxFrame : heroDemo;
};

document.querySelector('.back-hit')?.addEventListener('click', () => {
  const win = getActiveFrame().contentWindow as any;
  if (win?.frame?.goBack) win.frame.goBack();
});

document.querySelector('.home-hit')?.addEventListener('click', () => {
  const win = getActiveFrame().contentWindow as any;
  const frame = win?.frame;
  const homePage = win?.homePage;
  if (frame && homePage) frame.navigate(homePage);
});

// --- Animation Helpers ---
async function triggerFrameAnimation(iframe: HTMLIFrameElement, type: 'animate-in' | 'animate-out', direction: 'forward' | 'back' = 'forward') {
  try {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    const page = doc.querySelector('disco-pivot-page, disco-single-page, disco-page') as any;

    if (page) {
      if (type === 'animate-out' && page.animateOut) {
        await page.animateOut({ direction });
      } else if (type === 'animate-in' && page.animateIn) {
        await page.animateIn({ direction });
      }
    }
  } catch (e) {
    console.warn(`DiscoUI: Animation trigger failed for ${type}`, e);
    iframe.contentWindow?.postMessage({ type, direction }, '*');
  }
}

// --- UI Interactions ---
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = (btn as HTMLElement).dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`${tab}Tab`)?.classList.add('active');
  });
});

toggleFullscreen?.addEventListener('click', (e) => {
  e.preventDefault();
  const isFullscreen = document.body.classList.toggle('fullscreen-mode');
  const label = toggleFullscreen.querySelector('.charms-label');
  if (label) label.textContent = isFullscreen ? 'exit' : 'fullscreen';
  resize();
});

openSandboxBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  sandboxBar?.classList.add('open');
  resize();
});

closeSandboxBtn?.addEventListener('click', async () => {
  sandboxBar?.classList.remove('open');
  resize();
  if (discoDevice.classList.contains('sandbox-active')) {
    await triggerFrameAnimation(sandboxFrame, 'animate-out', 'back');
    discoDevice.classList.remove('sandbox-active');
    await triggerFrameAnimation(heroDemo, 'animate-in', 'back');
  }
});

// --- CodeMirror Editor Integration ---
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

const initialHtml = `<!-- DiscoUI UI Structure -->
<disco-frame>
  <disco-single-page app-title="SANDBOX">
    <disco-button id="helloBtn">Hello World</disco-button>
  </disco-single-page>
</disco-frame>`;

const initialJs = `// DiscoUI Application Logic
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
});`;

const htmlEditor = new EditorView({
  doc: initialHtml,
  extensions: [basicSetup, html(), vscodeDark, EditorView.lineWrapping],
  parent: document.getElementById('htmlEditorContainer')!
});

const jsEditor = new EditorView({
  doc: initialJs,
  extensions: [basicSetup, javascript(), vscodeDark, EditorView.lineWrapping],
  parent: document.getElementById('jsEditorContainer')!
});

const runCode = async () => {
  const htmlStr = htmlEditor.state.doc.toString();
  const jsStr = jsEditor.state.doc.toString();

  const discouiJsUrl = new URL('./discoui/packages/core/dist/discoui.mjs', window.location.href).href;
  const discouiCssUrl = new URL('./discoui/packages/core/dist/discoui.css', window.location.href).href;

  const blob = new Blob([`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="${discouiCssUrl}">
        <style>
          body { margin: 0; background: #000; color: #fff; overflow: hidden; height: 100vh; font-family: "Segoe UI", sans-serif; }
          * { box-sizing: border-box; }
        </style>
      </head>
      <body>
        ${htmlStr}
        <script type="module">
          import { DiscoApp } from '${discouiJsUrl}';
          
          window.addEventListener('message', async (event) => {
            const frame = document.querySelector('disco-frame');
            const type = event.data.type || event.data;
            const direction = event.data.direction || 'forward';

            if (type === 'animate-out') {
              const page = document.querySelector('disco-pivot-page, disco-single-page, disco-page');
              if (page && page.animateOut) {
                await page.animateOut({ direction });
              }
            }
          });

          ${jsStr}
        </script>
      </body>
    </html>
  `], { type: 'text/html' });

  if (!discoDevice.classList.contains('sandbox-active')) {
    await triggerFrameAnimation(heroDemo, 'animate-out', 'forward');
    const blobUrl = URL.createObjectURL(blob);
    sandboxFrame.onload = async () => {
      discoDevice.classList.add('sandbox-active');
      await triggerFrameAnimation(sandboxFrame, 'animate-in', 'forward');
      sandboxFrame.onload = null;
    };
    sandboxFrame.src = blobUrl;
  } else {
    await triggerFrameAnimation(sandboxFrame, 'animate-out', 'forward');
    sandboxFrame.src = URL.createObjectURL(blob);
    sandboxFrame.onload = async () => {
      await triggerFrameAnimation(sandboxFrame, 'animate-in', 'forward');
      sandboxFrame.onload = null;
    };
  }
};

// --- Scroll Interaction ---
const portalSection = document.querySelector('.portal-section');
if (portalSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.body.classList.add('portal-in-view');
      } else {
        document.body.classList.remove('portal-in-view');
      }
    });
  }, { threshold: 0.4 });
  observer.observe(portalSection);
}

// --- Sandbox Tile Interaction ---
const sandboxTile = document.getElementById('sandboxTile');
sandboxTile?.addEventListener('click', () => {
  const portal = document.querySelector('.portal-section');
  portal?.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    sandboxBar?.classList.add('open');
  }, 600);
});

const scrollToDocs = document.getElementById('scrollToDocs');
scrollToDocs?.addEventListener('click', () => {
  const portal = document.querySelector('.portal-section');
  portal?.scrollIntoView({ behavior: 'smooth' });
});

runSandboxBtn?.addEventListener('click', runCode);
