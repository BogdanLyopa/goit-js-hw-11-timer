const refs = {
  days: document.querySelector('span[data-value=days]'),
  hours: document.querySelector('span[data-value=hours]'),
  mins: document.querySelector('span[data-value=mins]'),
  secs: document.querySelector('span[data-value=secs]'),
};
function updateClockFace(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}
class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.interval = null;
  }
  start() {
    const startTime = this.targetDate.getTime();
    this.interval = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;

      updateClockFace(deltaTime);
      if (deltaTime <= 0) {
        this.stop();
      }
    }, 1000);
  }
  stop() {
    {
      clearInterval(this.interval);
      refs.days.textContent = '0';
      refs.hours.textContent = '0';
      refs.mins.textContent = '0';
      refs.secs.textContent = '0';
    }
  }
}
function pad(value) {
  return String(value).padStart(2, '0');
}
const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Feb 10, 2021'),
});
timer.start();
