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
     "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2",
     "esri/config"
  ], function(Map, MapView, GeoJSONLayer, Popup, SimpleRenderer, SimpleFillSymbol, BasemapGallery, Expand, FeatureLayer, supabase, esriConfig) {
    esriConfig.request.corsEnabledServers = esriConfig.request.corsEnabledServers || [];
  
  // Add the server to the list
    esriConfig.request.corsEnabledServers.push("https://cdn.arcgis.com");
    
    
    //load the map
    //const map = document.querySelector("arcgis-map");
    var map = new Map({
      basemap: "topo-vector"
    });

    // Crée la vue de la carte
    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [46.172, -19.259], // Coordonnées initiales //46.172,-19.259
      zoom: 18
    });

    //credentials from supabase
    const supabaseUrl = 'https://rakfrxwkidutruudbfyk.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJha2ZyeHdraWR1dHJ1dWRiZnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzM3MTQsImV4cCI6MjA0MTgwOTcxNH0.NeCSvgwdglKXkbJqsMSbwS8qXDLFm6MB12JQSgo-1Ws';
    const supabase_ = supabase.createClient(supabaseUrl, supabaseKey);

    //async function for loading the table from supabase
    /*
        for the function below, 
        it is solely for geojson
    */
    async function fetcher_geojson(tableName, query) {
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

    //async function for loading table from supabase
    async function fectch_table(tableName, query) {
        const { data, error } = await supabase_
                .from(tableName)
                .select(query);
        if (error) {
            console.error(`Error fetching the data from ${tableName}`, error);
            return null; // Return null or handle error accordingly
            }
        else{
            //const result = JSON.stringify(data, null, 2);
            let result = data.map(row => {
                let props = {...row}
                return {
                    parcels : props
                }
            })
            return result;
        }
    }

    //try loading the data
    async function load_table () {
        let d = await fectch_table(tableName = 'for_demo_pbi', query = '*');
        //let res = document.getElementById('test');
        console.log(d);
        //res = d;
        return d;
    };

    load_table();
    //console.log(s);
    //let d =  fectch_table(tableName = 'for_demo_pbi', query = '*');
    //console.log(d);

  });