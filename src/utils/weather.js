const request = require('request')

const weather = (lat = 0, long = 0, callback) => {

    const url = 'https://api.weatherbit.io/v2.0/current?&lat=' + lat + '&lon=' + long + '&key=eb8b70a7a5b84a0abeb3ad7572f1ffff&units=M'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            console.log('Unable to connect to the weather service')
        } else if (body.error) {
            console.log('Unable to find location')
        } else {
            callback(body)

        }

    })
}

module.exports = weather