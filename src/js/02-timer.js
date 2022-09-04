import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

const startTimerBtn = document.querySelector('button[data-start]');
startTimerBtn.disabled = true;

const timeNow = new Date()
const refs = {
    daysData: document.querySelector('span[data-days]'),
    daysHours: document.querySelector('span[data-hours]'),
    daysMinutes: document.querySelector('span[data-minutes]'),
    daysSeconds: document.querySelector('span[data-seconds]'),
}
let tempTimerData = {};
let chosenDate = null;
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(intervalId){
            startTimerBtn.disabled = true;
            return;
        }
        if(selectedDates[0] <= timeNow){
            startTimerBtn.disabled = true;
            Notify.failure("Please choose a date in the future");
        }else{
            startTimerBtn.disabled = false;
            chosenDate = selectedDates[0];
     }
  }
};
flatpickr("#datetime-picker", options);

startTimerBtn.addEventListener("click", () => {
    let timerData = Number.parseInt(Date.parse(chosenDate)) - Number.parseInt(Date.parse(timeNow));
    
    if(intervalId){
        startTimerBtn.disabled = true;
        return;
    }
    intervalId = setInterval(() => {
        if(timerData >= 1000){
            timerData -= 1000;

            tempTimerData = convertMs(timerData);

            const {daysData, daysHours, daysMinutes, daysSeconds} = refs;
            daysData.textContent = addLeadingZero(tempTimerData.days);
            daysHours.textContent = addLeadingZero(tempTimerData.hours);
            daysMinutes.textContent = addLeadingZero(tempTimerData.minutes);
            daysSeconds.textContent = addLeadingZero(tempTimerData.seconds);

            startTimerBtn.disabled = true;
        }
      }, 1000);
});

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

  function addLeadingZero(value){
    let temp = value.toString();
    if(temp.length > 1){
         return temp;
     }
     return temp.padStart(2,"0")
  }