const form = document.querySelector('form');
let forecast = document.getElementById('forecast');
let address = document.getElementById('address');
let input = document.getElementById('search');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(`/weather?location=${input.value}`)
    .then(res => res.json())
    .then(data => {
      if(data.err) {
        address.innerHTML = data.err;
      } 
      else {
        address.innerHTML = `Location: ${data.location}`;
        forecast.innerHTML = `Weather: ${data.forecast}`;
      }
    })
    .catch(err => console.log(err));
});