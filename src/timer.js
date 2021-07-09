import Swal from 'sweetalert2';
import './sass/main.scss';

let varDate;
const refs = {
  dateInput:  document.getElementById("date-selector"),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
};


refs.dateInput.addEventListener("input", updateValue);
refs.startBtn.addEventListener("click", startTimer);
refs.startBtn.classList.add("disableButton");

function updateValue(e) {
    refs.startBtn.classList.add("disableButton");
    varDate = new Date(e.target.value);
    if (varDate <= new Date()) {
        Swal.fire({
            title: 'Error!',
            text: 'Please choose a date in the future',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
    else { refs.startBtn.classList.remove("disableButton");}
}

function startTimer(e) {
      setInterval(() => {
    let ms = varDate.getTime() - new Date().getTime();
          console.log(convertMs(ms));
          refs.days.textContent = convertMs(ms).days;
          refs.hours.textContent = convertMs(ms).hours;
          refs.mins.textContent = convertMs(ms).minutes;
           refs.secs.textContent = convertMs(ms).seconds;
    }, 1000);
    
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



