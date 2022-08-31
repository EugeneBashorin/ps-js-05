import '../css/common.css';

const startBtn = document.querySelector('button[data-action="start"]');
const stopBtn = document.querySelector('button[data-action="stop"]');
const bodyEl = document.querySelector("body");
let timerId = null;

const changeBgColor = (element) => {
    element.style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
startBtn.addEventListener("click", (event) => {
    if(timerId){
        startBtn.disabled = false;
        return;
    }
        timerId = setInterval(() => changeBgColor(bodyEl), 1000);
        startBtn.disabled = true;
        stopBtn.disabled = false;
}); 
stopBtn.addEventListener("click", (event) => {
    if(timerId){
        clearInterval(timerId);
        stopBtn.disabled = true;
        timerId = null;
        startBtn.disabled = false;
        return;
    }
        stopBtn.disabled = false;    
}); 