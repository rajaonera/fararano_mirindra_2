require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
    "esri/widgets/Popup",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleFillSymbol",
    "esri/widgets/BasemapGallery",
     "esri/widgets/Expand",
     "esri/layers/FeatureLayer",
     "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
  ], function(Map, MapView, GeoJSONLayer, Popup, SimpleRenderer, SimpleFillSymbol, BasemapGallery, Expand, FeatureLayer, supabase) {

    const map = document.querySelector("arcgis-map");

    //points_fire_renderer
    let fire_rend = {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
          size: 2,
          color: "red",
          outline: {  // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: "black"
          }
        }
      };

      /*
    const layer = new FeatureLayer({
        // URL to the service
        url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Satellite_VIIRS_Thermal_Hotspots_and_Fire_Activity/FeatureServer",
        renderer : fire_rend
      });

      //add layer to map
    map.addLayer(layer);
    */

    const supabaseUrl = 'https://rakfrxwkidutruudbfyk.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJha2ZyeHdraWR1dHJ1dWRiZnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzM3MTQsImV4cCI6MjA0MTgwOTcxNH0.NeCSvgwdglKXkbJqsMSbwS8qXDLFm6MB12JQSgo-1Ws';
    const supabase_ = supabase.createClient(supabaseUrl, supabaseKey);

    
    async function fetcher(tableName, query) {
      const {data, error} = await supabase_
      .from(tableName)
      .select(query);
      if (error){
        console.error(`error feching the data from ${data}`, error)
        }
      else {
        let prop = data.map(row => {
          let p = {...row};
          delete p.geojson;
          //delete p.geometry;
      });
      
      let geojson = {
          type : "FeatureCollection",
          features : data.map(row => ({
              type : "Feature",
              properties : prop,
              geometry : JSON.parse(row.geojson)
          }))
      };
      //let t = `${geojson}`;
      return console.log(geojson);
      //return t;
      };
      
    };

    async function fetcher_2(tableName, query) {
      const { data, error } = await supabase_
    .from(tableName)
    .select(query);

  if (error) {
    console.error(`Error fetching the data from ${tableName}`, error);
    return null; // Return null or handle error accordingly
  } else {
    let geojson = {
      type: "FeatureCollection",
      features: data.map(row => {
        // Construct the properties for each feature without the `geojson` key
        let properties = { ...row };
        delete properties.geojson;

        return {
          type: "Feature",
          properties: properties,
          geometry: JSON.parse(row.geojson)
        };
      })
    };
    return geojson; // Return the geojson object
  }
    };

    //fetcher(tableName = "regions_of_madagascar", query = "*");

    var renderer = new SimpleRenderer({
      symbol: new SimpleFillSymbol({
        color: [0, 255, 0, 0.5], // Green with 50% opacity
        outline: {
          color: [0, 0, 0, 1], // Black outline
          width: 1
        }
      })
    });

    //console.log(l);
    //console.log(fetcher(tableName = "regions_of_madagascar", query = "*"));
    async function load_test() {
      let l = await fetcher_2(tableName = "regions_of_madagascar", query = "*");
      console.log(l);
      const blob = new Blob([JSON.stringify(l)], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      console.log(url);
       
    const geojsonLayer = new GeoJSONLayer({
      url: url,
      renderer: renderer
    });
      
    //const geojsonLayer = new GeoJSONLayer({url});
    map.addLayer(geojsonLayer);
    };

    load_test();

    const layer = new FeatureLayer({
      // URL to the service
      url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Satellite_VIIRS_Thermal_Hotspots_and_Fire_Activity/FeatureServer",
      renderer : fire_rend
    });

    //add layer to map
    map.addLayer(layer);
    

    //console.log(fetcher(tableName = "regions_of_madagascar", query = "*"));

    //if (supabase){console.log("test pass!")};
        
})
  ;