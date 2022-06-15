const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

	// Building a map
	buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 15,
		});
		// Adding tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '12',
		}).addTo(this.map)
		// Adding user location marker
		const marker = L.marker(this.coordinates)
		marker
		.addTo(this.map)
		.bindPopup('<p1><b>Your Location</b><br></p1>')
		.openPopup()
	},

	// Adding markers for nearby businesses
	// addMarkers() {
	// 	for (var i = 0; i < this.businesses.length; i++) {
	// 	this.markers = L.marker([
	// 		this.businesses[i].lat,
	// 		this.businesses[i].long,
	// 	])
	// 		.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
	// 		.addTo(this.map)
	// 	}
	// },
}



// Getting user's location data
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

// Calling functions when window loads
window.onload = async () => {
	const coords = await getCoords()
	myMap.coordinates = coords
	myMap.buildMap()
}

// Button event listeners
let resturantBtn = document.getElementById('resturantBtn')
	resturantBtn.addEventListener('click', async (e) => {
    
		if(resturantBtn.innerHTML === 'Show Resturants'){
			resturantBtn.innerHTML = 'Hide Resturants'
		} else {
			resturantBtn.innerHTML = 'Show Resturants'
		}
})

let coffeeBtn = document.getElementById('coffeeBtn')
	coffeeBtn.addEventListener('click', async (e) => {
   
		if(coffeeBtn.innerHTML === 'Show Coffee'){
			coffeeBtn.innerHTML = 'Hide Coffee'
		} else {
			coffeeBtn.innerHTML = 'Show Coffee'
		}
})

let hotelBtn = document.getElementById('hotelBtn')
	hotelBtn.addEventListener('click', async (e) => {
    
		if(hotelBtn.innerHTML === 'Show Hotels'){
			hotelBtn.innerHTML = 'Hide Hotels'
		} else {
			hotelBtn.innerHTML = 'Show Hotels'
		}
})

let marketBtn = document.getElementById('marketBtn')
	marketBtn.addEventListener('click', async (e) => {
  
		if(marketBtn.innerHTML === 'Show Markets'){
			marketBtn.innerHTML = 'Hide Markets'
		} else {
			marketBtn.innerHTML = 'Show Markets'
		}
})