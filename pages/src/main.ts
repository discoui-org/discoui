/**
 * DiscoUI Lumia Portal - Professional Controller
 * Borrows logic from examples/emulator/index.html
 */

const heroDemo = document.getElementById('heroDemo') as HTMLIFrameElement;
const discoDevice = document.getElementById('disco-device') as HTMLElement;
const toggleFullscreen = document.getElementById('toggleFullscreen');
const openSandboxBtn = document.getElementById('openSandbox');
const closeSandboxBtn = document.getElementById('closeSandbox');
const sandboxBar = document.getElementById('sandboxBar');
const codeEditor = document.getElementById('codeEditor') as HTMLTextAreaElement;
const runSandboxBtn = document.getElementById('runSandbox');

// --- Emulator Logic ---

function resize() {
  if (document.body.classList.contains('fullscreen-mode')) return;
  
  // Keep device in center and scale on window resize
  const scale = Math.min(window.innerWidth / 600, window.innerHeight / 1100, 0.85);
  discoDevice.style.transform = `translate(-50%, -50%) scale(${scale})`;
  discoDevice.style.left = '50%';
  discoDevice.style.top = '50%';
}

window.addEventListener('resize', resize);
resize();

// --- Hardware Button Interaction ---

document.querySelector('.back-hit')?.addEventListener('click', () => {
  (heroDemo.contentWindow as any)?.frame?.goBack();
});

document.querySelector('.home-hit')?.addEventListener('click', () => {
  const frame = (heroDemo.contentWindow as any)?.frame;
  const homePage = (heroDemo.contentWindow as any)?.homePage;
  if (frame && homePage) frame.navigate(homePage);
});

// --- UI Interactions ---

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

closeSandboxBtn?.addEventListener('click', () => {
  sandboxBar?.classList.remove('open');
});

// --- Sandbox Injection ---

const runCode = () => {
  const code = codeEditor.value;
  // We can either open a new window or use the hero iframe for sandbox tests.
  // For now, let's inject it into the hero iframe to see it live in the device.
  // But wait, the user might want a separate sandbox. 
  // Let's create a Blob and navigate the iframe to it.
  
  const blob = new Blob([`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="${location.origin}/discoui/discoui.css">
        <style>body { margin: 0; background: #000; color: #fff; overflow: hidden; height: 100vh; }</style>
      </head>
      <body>
        ${code}
        <script type="module">
          import { DiscoApp } from '${location.origin}/discoui/discoui.mjs';
           DiscoApp.ready(() => {
            const app = new DiscoApp();
            app.launch(document.body);
          });
        </script>
      </body>
    </html>
  `], { type: 'text/html' });
  
  heroDemo.src = URL.createObjectURL(blob);
};

runSandboxBtn?.addEventListener('click', runCode);
