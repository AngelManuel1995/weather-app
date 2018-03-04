const request = require('request')

let getWeather = ( latitud, longitude, callback) =>{
    request({
        url:`https://api.darksky.net/forecast/94a5a4fffdc56684d95e97085f8c718f/${latitud},${longitude}`,
        json:true
    }, ( error, response, body ) =>{
        if( !error && response.statusCode === 200){
            callback(undefined, {
                temperature:body.currently.temperature,
                apparentTemperature:body.currently.apparentTemperature
            })
        }else{
            callback('Unable to fetch weather.')
        }
    })
}

module.exports = {
    getWeather
}