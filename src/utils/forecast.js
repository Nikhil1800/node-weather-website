const request = require('request')

const forecast = (lat, long, callback) => {
    
    url = "http://api.weatherstack.com/current?access_key=c7c559223558e81c1e17cb538ad1026b&query="+lat+","+long

    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback({
                error: 'Unable to connect!'
            })
        } 
        else if(response.body.location.length == 0) {
            callback({
                error: 'No result found!'
            })
        } else {
            callback("", {
                location: response.body
            })
        }
    
    })

}

module.exports = forecast