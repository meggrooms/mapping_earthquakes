// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
// MAPBOX SYLES: https://docs.mapbox.com/api/maps/styles/#mapbox-styles

//tile background of map
//might be v-11
let satelliteStreets  = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets  
};



// Create the map object with a center and zoom level.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [satelliteStreets]
});



// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);



// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/meggrooms/mapping_earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";


//create style for lines
let myStyle = {
  color: "blue",
  fillColor: 'yellow',
  weight: 1
};

//change d3 code & include L.geoJSON()
d3.json(torontoHoods).then(function(data) {
  console.log(data);
  //creating GeoJSON layer with retrieved data
  L.geoJSON(data,{
    style: myStyle,
    onEachFeature: function(feature, layer){
      layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
    }
  }).addTo(map);
})




