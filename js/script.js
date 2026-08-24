document.getElementById('year').textContent = new Date().getFullYear();

const hmiClock = document.getElementById('hmi-clock');
if (hmiClock) {
  const updateClock = () => {
    hmiClock.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
  };
  updateClock();
  setInterval(updateClock, 1000);
}
