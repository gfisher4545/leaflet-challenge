const map_url= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

const API_KEY = "pk.eyJ1IjoiZ2Zpc2hlcjQ1NDUiLCJhIjoiY2tidHBxZmxkMGNhOTJxcXY1ZGU3emhnbyJ9.X5wW5LncrN8_jQOzN2whxw";
 

d3.json(map_url, function(response) {
  console.log(response)
  createFeatures(response.features);

});

function createFeatures (earthquakeData) {

  function onEachFeature (feature, layer) {
    layer.bindPopup("Location:"+feature.properties.place + "<br> Magnitude: "+feature.properties.mag+"<br> Time: "+new Date(feature.properties.time));
  }
 

  var earthquakes = L.geoJSON(earthquakeData,{ onEachFeature: onEachFeature});

  createMap(earthquakes)

    
};




function createMap (earthquakes) {

      var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        id: "mapbox.satellite",
        accessToken: API_KEY
      });
    
      var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',      maxZoom: 18,
        id: 'mapbox/light-v10',
        accessToken: API_KEY
      });
  
      var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',      maxZoom: 18,
        id: 'mapbox/dark-v10',
        accessToken: API_KEY
      });
    
      
      var baseMaps = {
        "Satellite": satellite,
        "Lightmap": lightmap,
        "Darkmap": darkmap
      };
    
     
      var overlayMaps = {
        Earthquakes: earthquakes
      };
    
     
      var myMap = L.map("map", {
        center: [0,0],
        zoom: 3,
        layers: [lightmap, earthquakes]
      })
      
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
  }












