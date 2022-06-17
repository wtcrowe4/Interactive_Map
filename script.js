const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

	// Building a map
	buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 13,
		});
		// Adding tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '12',
		}).addTo(this.map)
		// Adding user location marker
		const marker = L.marker(this.coordinates)//Custom Icon from assets here
		marker
		.addTo(this.map)
		.bindPopup('<p1><b>Your Location</b><br></p1>')
		.openPopup()
	},

	// Adding markers for nearby businesses
	addMarkers() {
		for (var i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
		}
	}

	// Removing markers 
	// removeMarkers() {
	// 	for (var i = 0; i < this.businesses.length; i++) {
	// 		this.markers = L.marker([
	// 			this.businesses[i].lat,
	// 			this.businesses[i].long,
	// 		])
			//.removeLayer(this.markers)

		//}
	//}	
	// var self = this
			// thi.map.eachLayer(function(layer) {
			// 	if (layer instanceof L.Marker)
			// 	{
			// 	self.map.removeLayer(layer)
			// 	}
			// })
}



// Getting user's location data
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

// Get foursquare businesses
async function getFoursquare(business) {
	const options = {
		method: 'GET',
		headers: {
		Accept: 'application/json',
		Authorization: 'fsq3l+99TDck7OkbBSwzrODjDD7PWdQnPKcUxg9sHJmIzS0='
		}
	}
	let limit = 10
	let lat = myMap.coordinates[0]
	let lon = myMap.coordinates[1]
	let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses
}
// Using foursquare data
function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}

// Calling functions when window loads
window.onload = async () => {
	const coords = await getCoords()
	myMap.coordinates = coords
	myMap.buildMap()
}

// Button event listeners
let restaurantBtn = document.getElementById('restaurantBtn')
	restaurantBtn.addEventListener('click', async (e) => {
		if(restaurantBtn.innerHTML === 'Show Restaurants'){
			restaurantBtn.innerHTML = 'Hide Restaurants'
			let data = await getFoursquare('restaurant')
			myMap.businesses = processBusinesses(data)
			myMap.addMarkers()
		} else {
			restaurantBtn.innerHTML = 'Show Restaurants'
			// Remove markers on hide click
			//L.marker.removeLayer()
			// var self = this
			// myMap.eachLayer(function(layer) {
			// 	if (layer instanceof L.Marker)
			// 	{
			// 	self.map.removeLayer(layer)
			// 	}
			// })
		}
})

let coffeeBtn = document.getElementById('coffeeBtn')
	coffeeBtn.addEventListener('click', async (e) => {
		if(coffeeBtn.innerHTML === 'Show Coffee'){
			coffeeBtn.innerHTML = 'Hide Coffee'
			let data = await getFoursquare('coffee')
			myMap.businesses = processBusinesses(data)
			myMap.addMarkers()
		} else {
			coffeeBtn.innerHTML = 'Show Coffee'
			// Remove markers 
		}
})

let hotelBtn = document.getElementById('hotelBtn')
	hotelBtn.addEventListener('click', async (e) => {
		if(hotelBtn.innerHTML === 'Show Hotels'){
			hotelBtn.innerHTML = 'Hide Hotels'
			let data = await getFoursquare('hotel')
			myMap.businesses = processBusinesses(data)
			myMap.addMarkers()
		} else {
			hotelBtn.innerHTML = 'Show Hotels'
			// Remove markers
		}
})

let groceryBtn = document.getElementById('groceryBtn')
	groceryBtn.addEventListener('click', async (e) => {
		if(groceryBtn.innerHTML === 'Show Grocery Stores'){
			groceryBtn.innerHTML = 'Hide Grocery Stores'
			let data = await getFoursquare('grocery')
			myMap.businesses = processBusinesses(data)
			myMap.addMarkers()
		} else {
			groceryBtn.innerHTML = 'Show Grocery Stores'
			// Remove markers
		}
})

