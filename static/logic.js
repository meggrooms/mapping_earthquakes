// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
// MAPBOX SYLES: https://docs.mapbox.com/api/maps/styles/#mapbox-styles

let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Create a base layer that holds both maps.
let baseMaps = {
  Light: light,
  Dark: dark
};


// Create the map object with a center and zoom level.
let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 2,
  layers: [dark]
})



// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);



// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/meggrooms/Mapping_Earthquakes/main/torontoRoutes.json";




// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
  


function styleInfo(feature){
    return {
      color: "yellow",
      weight: 0.2
    }
  }

// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data,{
style: styleInfo, 
onEachFeature: function(feature,layer){
  layer.bindPopup(
    "Airline: " + feature.properties.airline + "<br>" + 
    "Destination: " + feature.properties.dst 
  )
}
}).addTo(map);
});



// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);