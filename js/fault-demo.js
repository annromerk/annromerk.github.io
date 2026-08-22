// Hero fault-interlock demo. Same lockout-until-Reset pattern as the
// Pi Pico trainer and ladder logic simulator, shrunk into one clickable widget.

(function () {
  const demo = document.getElementById('fault-demo');
  if (!demo) return;

  const jamBtn = document.getElementById('fault-demo-jam');
  const resetBtn = document.getElementById('fault-demo-reset');
  const statusText = document.getElementById('fault-demo-text');

  jamBtn.addEventListener('click', () => {
    demo.classList.add('fault-demo--tripped');
    statusText.textContent = 'FAULT — LOCKED OUT';
    jamBtn.disabled = true;
    resetBtn.disabled = false;
  });

  resetBtn.addEventListener('click', () => {
    demo.classList.remove('fault-demo--tripped');
    statusText.textContent = 'SYSTEM READY';
    jamBtn.disabled = false;
    resetBtn.disabled = true;
  });
})();
