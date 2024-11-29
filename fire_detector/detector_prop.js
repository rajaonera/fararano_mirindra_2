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
     "esri/symbols/SimpleMarkerSymbol"
  ], function(Map, MapView, GeoJSONLayer, Popup, SimpleRenderer, SimpleFillSymbol, BasemapGallery, Expand, FeatureLayer, supabase, SimpleMarkerSymbol) {
        //const map = document.querySelector("arcgis-map");
        //center="46.172, -19.259" zoom="6"
        const map = new Map({
            basemap: "streets-vector" // Set basemap
          });
    
          // Create a MapView instance
          //47.949971,-22.151886
          const view = new MapView({
            container: "viewDiv",
            map: map,
            center: [47.949971,-22.151886], // Longitude, Latitude
            zoom: 12
          });

        let today = new Date().toISOString().slice(0, 10);
        //console.log(today);
        //let url = `https://firms.modaps.eosdis.nasa.gov/api/country/csv/026e00e8242dcef6baf6607d16d166fd/MODIS_NRT/MDG/10/2024-11-16`
        let url_ = `https://firms.modaps.eosdis.nasa.gov/api/country/csv/7b174765807df610d512a3fd8b2596c6/MODIS_NRT/MDG/10/${today}`;
        let url = "./16_novembre_modis.csv"
        //let url = `https://firms.modaps.eosdis.nasa.gov/api/country/csv/7b174765807df610d512a3fd8b2596c6/VIIRS_SNPP_NRT/MDG/10/${today}`

        let lastRequestTime = 0; // Timestamp of the last request
        const RATE_LIMIT = 5000; // 5 seconds

        async function fire_fetcher_csv(url) {
            //const response = await fetch(url);
            //const csvText = await response.text();
            //console.log(csvText);
            // Split into rows
            //const rows = csvText.split('\n');
            //console.log(rows);
            
            // Split each row into columns (assuming a comma delimiter)
            //const data = rows.map(row => row.split(','));
        
            //console.log('Parsed CSV data:', data);
            //console.log(json);
            let geometry = []
            Papa.parse(url, {
                download: true,
                header: true, // Set to true if the CSV contains a header row
                skipEmptyLines: true, // Ignore empty rows
                complete: function(results) {
                //console.log('Parsed data:', results.data); // Array of row objects
                const columnNames = Object.keys(results.data[0]);
                //console.log(columnNames);
                results.data.forEach(element => {
                    //geometry.push({"type": "Point", "coordinates": [parseFloat(element.longitude), parseFloat(element.latitude)]})
                    //console.log(columnNames);
                    let prop = {}
                    columnNames.forEach(el => {
                        prop[el] = element[el]
                    });
                    //console.log(prop);

                    geometry.push(
                        {
                            "type" : "Feature",
                            "geometry": {"type": "Point", "coordinates": [parseFloat(element.longitude), parseFloat(element.latitude)]},
                            "properties" : prop
                        }
                    )
                });
            
                //console.log(geometry);

                let geojson = {"type": "FeatureCollection",
                    "features" : geometry
                };

                const blob = new Blob([JSON.stringify(geojson)], { type: "application/json" });
                const url_ = URL.createObjectURL(blob);
                //modis = geojson;
                console.log(url_);
                //supabase_writer(geojson = geojson, tablename = "modis");

                //you need to prepare the map
                
                const redDotSymbol = new SimpleMarkerSymbol({
                    color: "red",
                    size: "18px", // Diameter of the dot
                    outline: {
                      color: "white",
                      width: 3 // Thin white outline
                    }
                  });
            
                  // Define a SimpleRenderer using the red dot symbol
                  const renderer = new SimpleRenderer({
                    symbol: redDotSymbol
                  });

                const geojsonLayer = new GeoJSONLayer({
                    url: url_,
                    renderer: renderer
                  });

                map.add(geojsonLayer);
                //console.log(map);
                

                },
                error: function(error) {
                console.error('Error while parsing:', error);
                }
            });
            }

        async function makeApiRequest(action) {
        const now = Date.now();
        if (now - lastRequestTime < RATE_LIMIT) {
            console.log("Request blocked due to rate limit. Try again later.");
            return;
        }

        lastRequestTime = now; // Update the last request time

        try {
            console.log("Making API request...");
            // Replace with your API request logic
            //const response = await fetch("https://api.example.com/data");
            //const data = await response.json();
            //console.log("Response:", data);
            //fire_fetcher_csv();
            action;
        } catch (error) {
            console.error("Error with API request:", error);
        }
        };

        //makeApiRequest(fire_fetcher_csv(url));
        //makeApiRequest(fire_fetcher_csv(url_));
        fire_fetcher_csv(url_);
  });