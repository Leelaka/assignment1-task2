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
    results.addLayer(L.marker(data.results[i].latlng).bindPopup((data)));
  }
});

//ride arrive 

function ride(){
  var geojson = {"type": "FeatureCollection","features": [{"type": "Feature","properties": {},"geometry": {"type": "LineString","coordinates": 
  [[145.11980831623077,-37.82112439892273],[145.1197761297226,-37.82124304908757]]}}]};
  L.geoJSON(geojson).addTo(map);
  
  L.geoJSON(geojson, {
      pointToLayer: function(geoJsonPoint, latlng) {
          return L.marker(latlng, {
          });
      }
  }).addTo(map);
  iconMarker(-37.82124304908757, 145.1197761297226, carIcon);
  map.setView([-37.82124304908757, 145.1197761297226], 19);
}


//routing an arriving vehicle 

function reachingUser(){
  var geojson = {"type": "FeatureCollection","features": [{"type": "Feature","properties": {},"geometry": {"type": "LineString","coordinates": 
  [[145.1221203804016,-37.82712446818015],[145.1226568222046,-37.82426008918849],[145.1230001449585,-37.82224309289828],[145.12306451797485,-37.82193799622289],
  [145.1197385787964,-37.82161594836396],[145.11978149414062,-37.8212260990757]]}}]};

  L.geoJSON(geojson).addTo(map);
  
  L.geoJSON(geojson, {
      pointToLayer: function(geoJsonPoint, latlng) {
          return L.marker(latlng, {
          });
      }
  }).addTo(map);

  iconMarker(-37.82712579229413, 145.1221227273345, carIcon);
}

//geojson datacollected from http://geojson.io/ to make a route 
//routing from current location to destination "Aldi supermarket"
function supermarket(){
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

  //zoom to destination location and zoom out to preview the whole route
  setTimeout(zoom, 5000);
  map.setView([-37.829545968128905, 145.12106828391552], 15.7);
  timer();
function zoom(){
  map.setView([-37.824641447836726, 145.11838674545288], 15.407);
}

 function timedRefresh(timeoutPeriod) {
 setTimeout("location.reload(true);",timeoutPeriod);
}
window.onload = timedRefresh(40000);
}

function park(){
  var geojson = {"type": "FeatureCollection","features": [{"type": "Feature","properties": {},"geometry": {"type": "LineString","coordinates": 
  [[145.11982440948486,-37.82124304908757],[145.11967420578003,-37.82161594836396],[145.1192021369934,-37.82161594836396],[145.11892318725586,-37.82176849752494],
  [145.1190733909607,-37.822683785869515],[145.1189661026001,-37.82361601233024],[145.11853694915771,-37.82439568360031],[145.11812925338745,-37.824921109592964],
  [145.11804342269897,-37.82517534663354],[145.11827945709229,-37.825310939363725],[145.11845111846924,-37.825293990286085]]}},
  {"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [145.11838674545288,-37.825344837507345]}}]};
  
  L.geoJSON(geojson).addTo(map);
  
  L.geoJSON(geojson, {
      pointToLayer: function(geoJsonPoint, latlng) {
          return L.marker(latlng, {
          });
      }
  }).addTo(map);

  //zoom to destination location and zoom out to preview the whole route
  setTimeout(zoom, 5000);
    map.setView([-37.827005827470494, 145.11750698089597], 15.7);
    timer();
  function zoom(){
    map.setView([-37.82083624772829, 145.11939525604248], 15.407);
  }

   function timedRefresh(timeoutPeriod) {
   setTimeout("location.reload(true);",timeoutPeriod);
}
window.onload = timedRefresh(40000);

}
function university(){
  var geojson = {"type": "FeatureCollection","features": [{"type": "Feature","properties": {},"geometry": {"type": "LineString","coordinates": 
  [[145.11978149414062,-37.82114134895795],[145.11967420578003,-37.82168374803],[145.11915922164914,-37.82163289828632],[145.1189661026001,-37.82185324692257],
  [145.1190948486328,-37.82339566895674],[145.11868715286255,-37.8243617850207],[145.12239933013916,-37.82480246534096],[145.1225709915161,-37.82481941453149],
  [145.12224912643433,-37.826582109093216],[145.12179851531982,-37.828836262902634],[145.1207685470581,-37.834539134017554],[145.1201355457306,-37.83801317820647],
  [145.12011408805847,-37.83833515450536],[145.1201891899109,-37.838496142127774],[145.11987805366516,-37.838555453268526],[145.11146664619443,-37.83752173798802],
  [145.1107907295227,-37.83788608191213],[145.11070489883423,-37.83801317820647],[145.1109409332275,-37.838487669103785],[145.11046886444092,-37.84152942217482],
  [145.10986804962158,-37.8448421637273],[145.10892391204834,-37.8495441372684],[145.11508226394653,-37.84995078035298],[145.11491060256958,-37.84803614958466]]}},
  {"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [145.11497497558594,-37.84805309343781]}}]};

  L.geoJSON(geojson).addTo(map);
  
  L.geoJSON(geojson, {
      pointToLayer: function(geoJsonPoint, latlng) {
          return L.marker(latlng, {
          });
      }
  }).addTo(map);

  setTimeout(zoom, 5000);
    map.setView([-37.84805309343781, 145.11497497558594], 15.5);
    timer();
  function zoom(){
    map.setView([-37.83473402375476, 145.11823654174805], 13.7);
  } 

  function timedRefresh(timeoutPeriod) {
    setTimeout("location.reload(true);",timeoutPeriod);
  }
  window.onload = timedRefresh(40000);

}

//get elements 

var currentAddress = document.getElementById("currentAddress");
var destinationAddress = document.getElementById("destinationAddress");
//var button = document.getElementById("enter");
var input = document.querySelector("#enter");
//var textbox = document.getElementsByClassName("geocoder-control-input leaflet-bar");


//fake timer to connect the driver

function timer(){
  const startMin = 5;  //starting min
  let time = startMin * 5;
  //nearby = false;
  const countDown = document.getElementById('timer');  //get p element from html 
  
  setInterval(updateCountDown, 1000);
  
  function updateCountDown() {
    const min = Math.floor(time/60);
    let sec = time % 60;
  
    sec = sec < 10 ? '0' + sec : sec;
    //update html element with the timer
    countDown.innerHTML = "Your ride is arriving in "+`${min}:${sec}`;
    time--;
    time = time < 0 ? 0 : time;

    if (time < 15){
      countDown.innerHTML = "Your ride is nearby! "+`${min}:${sec}`;
      reachingUser();
    }
    if(time == 0){
      countDown.innerHTML = "Your ride has arrived!";
      map.setView([-37.82124304908757, 145.1197761297226], 19);
      ride();
    }
  }
}


// valicate the input box
function validateclick(){
    if(destinationAddress.value.toLowerCase() == 'supermarket'){
      alert('Finding a ride to '+destinationAddress.value);
      supermarket();
    }
    else if(destinationAddress.value.toLowerCase() == 'park'){
      alert('Finding a ride to '+destinationAddress.value);
      park();
    }
    else if(destinationAddress.value.toLowerCase() == 'university'){
      alert('Finding a ride to '+destinationAddress.value);
      university();
    }
    else if(destinationAddress.value.length == 0){
      alert('Add address to find a ride');
    }
    else {
      alert('Finding a ride to '+destinationAddress.value);
      timer();
    }
}

input.addEventListener("click", validateclick);




