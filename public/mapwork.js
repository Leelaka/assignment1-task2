//default map view point to Boxhill Australia
var map = L.map('map').setView([-37.824921109592964, 145.11815071105954], 15.2);
//adding openstreetmap layer titles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//function to add points 

function mapMarker(latitude, longtitude){
  var marker = L.marker([latitude, longtitude]).addTo(map);
  return marker;
}

// map points 

mapMarker(-37.821098, 145.119812).bindPopup("<b>Hello!</b><br /> This is my current location."); //boxhill central Australia Current location
  //icon of a top view car 
var carIcon = L.icon({
    iconUrl: 'car.png',
    iconSize: [30, 32], // size of the icon
    iconAnchor: [15, 16], // point of the icon which will correspond to marker's location
});

//function to place icons 

function iconMarker(latitude, longtitude, icon){
  var marker = L.marker([latitude, longtitude], {icon: icon}).addTo(map);
  return marker;
}

iconMarker(-37.82129771, 145.12320915, carIcon); //station st boxhill
iconMarker(-37.82053439, 145.11915813, carIcon); //cambridge st boxhill
iconMarker(-37.81736464, 145.12664686, carIcon); //court st boxhill


//add
//search function for the map by name and address
var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();


var searchControl = L.esri.Geocoding.geosearch({
  providers: [
    arcgisOnline,
    L.esri.Geocoding.mapServiceProvider({
      label: 'States and Counties',
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
      layers: [2, 3],
      searchFields: ['NAME', 'STATE_NAME'],
    })
  ]
  
}).addTo(map);

//mark the location found 

var results = L.layerGroup().addTo(map);

searchControl.on('results', function (data) {
  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng));
  }
});

//connect input box to search




//get elements 

var currentAddress = document.getElementById("currentAddress");
var destinationAddress = document.getElementById("destinationAddress");
//var button = document.getElementById("enter");
var button = document.querySelector("#enter");
//var textbox = document.getElementsByClassName("geocoder-control-input leaflet-bar");


//alert 
button.addEventListener("click", function(){
  istimer = false;
  if(destinationAddress.value.length == 0){
      alert('Add address to find a ride');
  }
  else if(destinationAddress.value == 'aldi'){
    alert('Finding a ride to '+destinationAddress.value);
    //geojson datacollected from http://geojson.io/ to make a route 
    var geojson = {"type": "FeatureCollection","features": [{"type": "Feature","properties": {},"geometry": {"type": "LineString","coordinates": 
    [[145.11982440948486,-37.82114134895795],[145.1197063922882,-37.82163289828632],[145.11915922164914,-37.82159899843773],[145.11899828910825,-37.82178544741225],
    [145.11897683143616,-37.82192104637061],[145.11911630630493,-37.82266683618851],[145.11908411979675,-37.823226173606415],[145.11886954307556,-37.82388720327145],
    [145.11870861053467,-37.8242431398695],[145.11838674545288,-37.824641447836726],[145.11815071105954,-37.824921109592964],[145.11804342269897,-37.82519229573844],
    [145.11849403381348,-37.825293990286085],[145.11954545974731,-37.82535331204082],[145.1206612586975,-37.8255058534769],[145.12224912643433,-37.82568381808715],
    [145.1217555999756,-37.828531193483755],[145.12158393859863,-37.82971756747228],[145.12102603912354,-37.82965824922588],[145.12106895446777,-37.82954808664175]]}},
    {"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [145.12106828391552,-37.829545968128905]}}]};
    
    L.geoJSON(geojson).addTo(map);
    
    L.geoJSON(geojson, {
        pointToLayer: function(geoJsonPoint, latlng) {
            return L.marker(latlng, {
            });
        }
    }).addTo(map);
  } 
  else if(destinationAddress.value.length > 0){
    alert('Finding a ride to '+destinationAddress.value);
    istimer = true;
  }
  else {
      alert('Finding a ride to '+destinationAddress.value);
      istimer = true;
  }
});
      



//fake timer to connect the driver



