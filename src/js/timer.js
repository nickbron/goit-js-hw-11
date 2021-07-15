import Swal from 'sweetalert2';
import '../sass/main.scss';

let varDate;
let timeInterval;

const refs = {
  dateInput: document.getElementById('date-selector'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
};

refs.startBtn.classList.add('disableButton');
refs.dateInput.addEventListener('input', updateValue);
refs.startBtn.addEventListener('click', startTimer);

resetTimer();

function resetTimer() {
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.mins.textContent = '00';
  refs.secs.textContent = '00';
  clearInterval(timeInterval);
}

function updateValue(e) {
  resetTimer();

  varDate = new Date(e.target.value);

  if (varDate <= new Date()) {
    refs.startBtn.classList.add('disableButton');

    Swal.fire({
      title: 'Error!',
      text: 'Please choose a date in the future',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  } else {
    refs.startBtn.classList.remove('disableButton');
  }
}

function startTimer(e) {
  resetTimer();
  timeInterval = setInterval(() => {
    let ms = varDate.getTime() - new Date().getTime();

    if (ms < 0) {
      resetTimer();
      return;
    }

    refs.days.textContent = pad(convertMs(ms).days);
    refs.hours.textContent = pad(convertMs(ms).hours);
    refs.mins.textContent = pad(convertMs(ms).minutes);
    refs.secs.textContent = pad(convertMs(ms).seconds);
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
