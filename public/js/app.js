const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent = 'Loading...'

  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then(({
      location,
      forecast,
      error
    }) => {
      if (error) {
        messageOne.textContent = 'Error: ' + error
        messageTwo.textContent = ''
      } else {
        messageOne.textContent = 'Location: ' + location
        messageTwo.textContent = 'Forecast: ' + forecast
      }
    })
  })
})