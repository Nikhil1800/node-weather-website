const request = require('request')

const geocode = (address, callback) => {
    
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibmlraGlsMTA4MDAiLCJhIjoiY2t5YTAxM2ttMDBxczJ2cDhxYTNsNmFhYiJ9.mTapeUrznmlNRo6rXDAQpA&limit=1"

    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback({
                error: 'Unable to connect!'
            })
        } 
        else if(response.body.features.length == 0) {
            callback({
                error: 'No result found!'
            })
        } else {
            callback("", {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    
    })

}

module.exports = geocode