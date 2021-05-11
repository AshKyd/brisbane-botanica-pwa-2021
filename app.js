const data = require("./sanitised.json");
mapboxgl.accessToken =
  "pk.eyJ1IjoiYXNoa3lkIiwiYSI6ImNsajB0NWMifQ.A8PtczW284fnWFD6dy3xLQ";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
});

// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  })
);

map.setStyle("mapbox://styles/mapbox/dark-v10");

const bounds = new mapboxgl.LngLatBounds();
data.features.forEach((feature) => {
  bounds.extend(feature.geometry.coordinates);
});
map.fitBounds(bounds, { padding: 100, animate: false });
map.on("load", function () {
  document.body.classList.add("ready");
  map.fitBounds(bounds, { padding: 40, duration: 1000 });
});

const contentBox = document.querySelector(".content");
const contentEl = document.querySelector(".content__el");
contentBox.querySelector("button").addEventListener("click", () => {
  contentBox.classList.add("closed");
  console.log("clickety");
});

data.features.forEach((artwork) => {
  var el = document.createElement("div");
  el.className = "marker";

  // make a marker for each feature and add to the map
  const marker = new mapboxgl.Marker()
    .setLngLat(artwork.geometry.coordinates)
    .addTo(map);

  marker.getElement().addEventListener("click", () => {
    contentBox.classList.remove("closed");
    const { artist, name, description, media, link } = artwork.properties;
    contentEl.innerHTML = [
      `<article class="artwork"><h2>${name}</h2>`,
      artist && `<p class="artwork__artist">By <strong>${artist}</strong></p>`,
      description && `<div class="artwork__description">${description}</div>`,
      media && `<p class="artwork__media">${media}</p>`,
      "</article>",
    ]
      .filter(Boolean)
      .join("");
  });
});
