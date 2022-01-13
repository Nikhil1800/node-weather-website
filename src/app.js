const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../public/templates/partials')

app.use(express.static(publicDirectoryPath))
app.set('views', path.join(publicDirectoryPath, 'templates'));
app.set('view engine', 'hbs')

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nikhil Bachhav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nikhil Bachhav'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Nikhil Bachhav'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send('Error: You must provide a adddress.')
    }
    const location = req.query.address

    if(location) {
    
        geocode(location, (error, {latitude, longitude, location} = {}) => {
    
            if(error) {
                return res.send(error)
            }
            
            forecast(latitude, longitude, (error, forecastResponse) => {
        
                if(error) {
                    return res.send(error)
                }
        
                //res.send(location+". Latitude is " + latitude + ". Longitude is " + longitude)
                res.send({
                    temperature: forecastResponse.location.current.temperature,
                    forecast: forecastResponse.location.current.weather_descriptions[0],
                    location: forecastResponse.location.location.name
                })
            })
        })
        
    
    } else{
        res.send("Please provide valid address!")
    }
    
})


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send('Error: You must provide a search term.')
    }
    res.send({
        forecast: 15,
        location: 'Nashik'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nikhil Bachhav',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nikhil Bachhav',
        errorMessage: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})