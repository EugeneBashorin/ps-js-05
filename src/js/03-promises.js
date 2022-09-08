import { Notify } from 'notiflix/build/notiflix-notify-aio';

formData = document.querySelector(".form");

formData.addEventListener("submit", submitForm);

function submitForm(event){
  event.preventDefault();

  let delay = Number(document.querySelector('[name="delay"]').value);
  const step = Number(document.querySelector('[name="step"]').value);
  const amountData = Number(document.querySelector('[name="amount"]').value);

  for(let position = 1; position <= amountData; position +=1){
    createPromise({position, delay})
    .then(({position, delay}) => Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`))
    .catch(({position, delay}) => Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`))
    delay += step;
  }
}

function createPromise({position, delay}) {
      const shouldResolve = Math.random() > 0.3;

      return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          // Fulfill
        resolve({position, delay});
      }else{
          // Reject
        reject({position, delay});
      }  
    }, delay);
    
    })
}