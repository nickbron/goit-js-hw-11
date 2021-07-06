import './sass/main.scss';

const colors = [
'#FFFFFF',
'#2196F3',
'#4CAF50',
'#FF9800',
'#009688',
'#795548',
];

const refs = {
  body: document.body,
  startButton: document.querySelector('[data-action="start"]'),
  stopButton: document.querySelector('[data-action="stop"]'),
};

let timerId = null;
const intervalTime = 1000;

refs.startButton.addEventListener("click", onButtonStartClick);
refs.stopButton.addEventListener("click", onButtonStopClick);

function onButtonStartClick() {
   
    timerId=setInterval(() => {

        let i = randomIntegerFromInterval(0, colors.length - 1);
        refs.body.style.backgroundColor = colors[i];
    }, intervalTime);
    console.log(`Interval with id ${timerId}`);
    
}

function onButtonStopClick() {
    clearInterval(timerId);
    console.log(`Interval with id ${timerId} has stopped!`);
}

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

