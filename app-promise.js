//importamos la librería yargs para caputar información por consola
const yargs = require('yargs')
const axios = require('axios')

//Configuramos la entrada por consola
/**
 * 
 *Options: podemos configurar las opciones que puede ingresar por consola y si los
 *         argumentos son requeridos o no y los diferentes alias. recibe un objeto  
 * 	nombre:{
        demand:true, //Obligatorio
        alias:'address',//Alias
        describe:'Address to fetch weather for',//Descripcion
        string:true//Tipo de lo que se va a esperar
    }
 *help: Habilitamos -h flag
 *alias: le podemos cambiar el nombre renombrando
 *argv: Para que posamos capturar los valores
 */
const argv = yargs.options({
		a:{
			demand:true,
			alias:'address',
			describe:'Address to fetch weather for',
			string:true
		}
	})
	.help()
	.alias('help', 'h')
	.argv

let encodedAddress = encodeURIComponent(argv.address)
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get( geocodeUrl )
.then( ( response ) => {

	if( response.data.status === 'ZERO_RESULTS'  || response.data.status === 'OVER_QUERY_LIMIT' ){
		throw new Error ('Unable to find that address.')
	}
	let lat = response.data.results[0].geometry.location.lat
	let lng = response.data.results[0].geometry.location.lng
	weatherUrl = `https://api.darksky.net/forecast/94a5a4fffdc56684d95e97085f8c718f/${lat},${lng}`
	return axios.get( weatherUrl )
	.then( ( response ) => {
		let temperature = response.data.currently.temperature
		let apparentTemperature = response.data.currently.apparentTemperature
		console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}` )
	})
}).catch( ( e )  => {
	console.log('Unable to find that address.')
})