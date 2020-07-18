const request = require('request')

const geocode = (address = '', callback) => {

    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidGhhcmluZHVkb28iLCJhIjoiY2tjZW41bDBhMDlzYjJxa2sxdGlvaWRzayJ9.A6DeZO2ygcR_K0IrbWyrlQ&limit=1'

    request({ url: mapboxUrl, json: true }, (error, { body }) => {

        if (error) {
            console.log('Unable to connect to the weather service')
        } else if (body.features.length < 1) {
            console.log('Unable to find location')
        } else {
            callback(body)
        }
    })
}

module.exports = geocode