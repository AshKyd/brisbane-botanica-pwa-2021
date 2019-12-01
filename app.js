const data = require('./sanitised.json');
mapboxgl.accessToken = 'pk.eyJ1IjoiYXNoa3lkIiwiYSI6ImNsajB0NWMifQ.A8PtczW284fnWFD6dy3xLQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9'
});

// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
}));

map.setStyle('mapbox://styles/mapbox/dark-v10');

const contentBox = document.querySelector('.content');
const contentEl = document.querySelector('.content__el');
contentBox.querySelector('button').addEventListener('click', () => {
  contentBox.classList.add('closed');
  console.log('clickety')
});

data.forEach(artwork => {
  var el = document.createElement('div');
  el.className = 'marker';
  el.style.backgroundImage = 'url("https://amsterdamlightfestival.com/storage/'+artwork.icon+'")';
  el.addEventListener('click', () => {
    contentBox.classList.remove('closed');
    contentEl.innerHTML = `
      <h2>${artwork.title}</h2>
      ${artwork.description}
    `;
  });

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat([artwork.location.lng, artwork.location.lat])
    .addTo(map);
});

navigator.serviceWorker.register('./service-worker.js');