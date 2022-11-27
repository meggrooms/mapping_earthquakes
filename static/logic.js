
// Add console.log to check to see if our code is working.
console.log("working");


// Create the map object with center and zoom level.
var map = L.map('mapid').setView([30, 30], 2);


let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


//Then we add our 'streets' tile layer to the map
streets.addTo(map);



// Accessing the airport GeoJSON URL
let airportData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-online/module_13/majorAirports.json"; 


// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
    console.log()
   console.log("end")

});
