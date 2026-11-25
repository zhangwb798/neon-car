// Web fallback covers devices where iOS chooses a cached native launch snapshot.
(() => {
  const splash = document.getElementById('studioSplash');
  if (!splash) return;
  let timer;
  function dismiss() {
    splash.hidden = true;
    clearTimeout(timer);
    splash.removeEventListener('pointerdown', dismiss);
    document.removeEventListener('keydown', skip);
  }
  function skip(event) {
    if (event.key === 'Enter' || event.key === 'Escape' || event.key === ' ') {
      event.preventDefault();
      dismiss();
    }
  }
  splash.addEventListener('pointerdown', dismiss);
  document.addEventListener('keydown', skip);
  timer = setTimeout(dismiss, 2200);
})();
