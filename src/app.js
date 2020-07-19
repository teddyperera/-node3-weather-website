const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config 
const viewsPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Teddy Perera'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Teddy Perera'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Teddy Perera',
        message: 'This page provides most frequent questions and answeres regarding the weather app'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Provide a location first'
        })
    } else {
        geocode(req.query.location, ({ features }) => {
            weather(features[0].center[1], features[0].center[0], ({ data }) => {
                return res.send({
                    message: 'Lat and Long for ' + features[0].place_name + ' is Lat: ' + features[0].center[1] + ' Long: ' + features[0].center[0] + 'It is curruntly ' + data[0].temp + ' degrees out. There is a ' + data[0].precip + '% chance of rain.'
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Teddy Perera',
        error: 'Your help page is not here'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Teddy Perera',
        error: 'My 404 page'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

