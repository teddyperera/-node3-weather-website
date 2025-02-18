const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const messageData = document.querySelector('#data')
const messageError = document.querySelector('#error')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch('/weather?location=' + address.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageError.textContent = data.error
            } else {
                messageData.textContent = data.message
            }
        })
    })
})