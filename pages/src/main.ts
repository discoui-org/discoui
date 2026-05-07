/**
 * DiscoUI Lumia Portal - Professional Controller
 */

const heroDemo = document.getElementById('heroDemo') as HTMLIFrameElement;
const sandboxFrame = document.getElementById('sandboxFrame') as HTMLIFrameElement;
const discoDevice = document.getElementById('disco-device') as HTMLElement;
const toggleFullscreen = document.getElementById('toggleFullscreen');
const openSandboxBtn = document.getElementById('openSandbox');
const closeSandboxBtn = document.getElementById('closeSandbox');
const sandboxBar = document.getElementById('sandboxBar');
const runSandboxBtn = document.getElementById('runSandbox');

// --- Emulator Logic ---

function resize() {
  if (document.body.classList.contains('fullscreen-mode')) return;
  const scale = Math.min(window.innerWidth / 600, window.innerHeight / 1100, 0.85);
  discoDevice.style.transform = `translate(-50%, -50%) scale(${scale})`;
  discoDevice.style.left = '50%';
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

    // Find the active page (Pivot, Single, or generic Page)
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
  if (label) label.textContent = isFullscreen ? 'Exit' : 'Fullscreen';
  if (!isFullscreen) resize();
});

openSandboxBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  sandboxBar?.classList.add('open');
});

closeSandboxBtn?.addEventListener('click', async () => {
  sandboxBar?.classList.remove('open');
  
  if (discoDevice.classList.contains('sandbox-active')) {
    // 1. Trigger BACK exit animation in Sandbox page
    await triggerFrameAnimation(sandboxFrame, 'animate-out', 'back');
    
    // 2. Switch back to Hero Demo
    discoDevice.classList.remove('sandbox-active');
    
    // 3. Trigger BACK entrance animation in Hero Demo page
    await triggerFrameAnimation(heroDemo, 'animate-in', 'back');
  }
});

// --- Sandbox Injection ---

const htmlEditor = document.getElementById('htmlEditor') as HTMLTextAreaElement;
const jsEditor = document.getElementById('jsEditor') as HTMLTextAreaElement;

const runCode = async () => {
  const html = htmlEditor.value;
  const js = jsEditor.value;
  
  const blob = new Blob([`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="${location.origin}/discoui/discoui.css">
        <style>
          body { margin: 0; background: #000; color: #fff; overflow: hidden; height: 100vh; font-family: "Segoe UI", sans-serif; }
          * { box-sizing: border-box; }
        </style>
      </head>
      <body>
        ${html}
        <script type="module">
          import { DiscoApp } from '${location.origin}/discoui/discoui.mjs';
          
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

          ${js}
        </script>
      </body>
    </html>
  `], { type: 'text/html' });

  if (!discoDevice.classList.contains('sandbox-active')) {
    // 1. Trigger FORWARD exit animation in Hero Demo
    await triggerFrameAnimation(heroDemo, 'animate-out', 'forward');
    
    // 2. Prepare Sandbox Iframe
    const blobUrl = URL.createObjectURL(blob);
    
    // 3. Wait for Sandbox to load and then trigger entrance
    sandboxFrame.onload = async () => {
      discoDevice.classList.add('sandbox-active');
      // 4. Trigger FORWARD entrance animation in Sandbox page
      await triggerFrameAnimation(sandboxFrame, 'animate-in', 'forward');
      sandboxFrame.onload = null;
    };

    sandboxFrame.src = blobUrl;
  } else {
    // Already active: Trigger forward transition sequence
    await triggerFrameAnimation(sandboxFrame, 'animate-out', 'forward');
    sandboxFrame.src = URL.createObjectURL(blob);
    sandboxFrame.onload = async () => {
      await triggerFrameAnimation(sandboxFrame, 'animate-in', 'forward');
      sandboxFrame.onload = null;
    };
  }
};

runSandboxBtn?.addEventListener('click', runCode);
