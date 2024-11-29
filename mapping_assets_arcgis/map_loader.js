require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
    "esri/widgets/Popup",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleFillSymbol",
    "esri/widgets/BasemapGallery",
     "esri/widgets/Expand"
  ], function(Map, MapView, GeoJSONLayer, Popup, SimpleRenderer, SimpleFillSymbol, BasemapGallery, Expand) {
    var map = new Map({
        basemap: "topo-vector"
      });
  
      // Crée la vue de la carte
      var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [46.172, -19.259], // Coordonnées initiales //46.172,-19.259
        zoom: 6
      });

      // Change basemap function
      document.getElementById("basemapSelect").addEventListener("change", function(event) {
      var basemap = event.target.value;
      map.basemap = basemap;
          });//end of the fonction in esri js
})
  ;