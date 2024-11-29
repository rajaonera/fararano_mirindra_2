//https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/d5a1b4cbdcb790d6438a61e5b4240d18/fires_modis_24,fires_viirs_noaa20_24/triangle,triangle/4,2/240+40+40,250+200+50/?REQUEST=GetMap&WIDTH=1024&HEIGHT=512&BBOX=-180,-90,180,90

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/WFSLayer",
    "esri/layers/ogc/wfsUtils",
    "esri/widgets/Legend",
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2",
    "esri/layers/GeoJSONLayer",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleFillSymbol",
    "esri/widgets/ScaleBar",
    "esri/widgets/Measurement",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery"
  ], function (Map, MapView, WFSLayer, wfsUtils, Legend, supabase,GeoJSONLayer, SimpleRenderer, SimpleFillSymbol, ScaleBar,Measurement, Expand, BasemapGallery) {
    // Define FIRMS WFS layer
    /*
    const wfsLayer = new WFSLayer({
      //url: "https://firms.modaps.eosdis.nasa.gov/wfs/VIIRS_NRT?service=WFS",
      //url : "https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/d5a1b4cbdcb790d6438a61e5b4240d18/fires_modis_24,fires_viirs_noaa20_24/triangle,triangle/4,2/240+40+40,250+200+50/?REQUEST=GetMap&WIDTH=1024&HEIGHT=512&BBOX=-180,-90,180,90",
      url : "https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/Northern_and_Central_Africa/d5a1b4cbdcb790d6438a61e5b4240d18/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_snpp_24hrs&STARTINDEX=0&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=csv",
      //name: "VIIRS S-NPP", // Replace with the appropriate layer name
      version: "2.0.0", // Ensure the version matches the WFS service
      popupTemplate: {
        title: "Fire Detection",
        content: `
          <b>Confidence:</b> {confidence}<br>
          <b>Brightness:</b> {brightness}<br>
          <b>Date:</b> {datetime}
        `
      }
    });
    */
    const supabaseUrl = 'https://rakfrxwkidutruudbfyk.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJha2ZyeHdraWR1dHJ1dWRiZnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzM3MTQsImV4cCI6MjA0MTgwOTcxNH0.NeCSvgwdglKXkbJqsMSbwS8qXDLFm6MB12JQSgo-1Ws';
    const supabase_ = supabase.createClient(supabaseUrl, supabaseKey);
   //let url = "https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/Southern_Africa/d5a1b4cbdcb790d6438a61e5b4240d18/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_snpp_24hrs&STARTINDEX=0&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=csv";
    const wfsLayer = new WFSLayer({
        //url: "https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/Northern_and_Central_Africa/d5a1b4cbdcb790d6438a61e5b4240d18/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_snpp_24hrs&STARTINDEX=0&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=csv", // url to your WFS endpoint
        url : "https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/Southern_Africa/d5a1b4cbdcb790d6438a61e5b4240d18/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_snpp_24hrs&STARTINDEX=0&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=csv",
        name: "fires_snpp_24hrs" // name of the FeatureType
      });
      //map.add(); // add the layer to the map
    
    const seven_days = new WFSLayer({
        url : "https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/Southern_Africa/d5a1b4cbdcb790d6438a61e5b4240d18/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_snpp_7days&STARTINDEX=0&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=csv",
        name : "fires_snpp_7days"
    });

    const modis_24hr = new WFSLayer({
        url : "https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/Southern_Africa/d5a1b4cbdcb790d6438a61e5b4240d18/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_modis_24hrs&STARTINDEX=0&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=csv",
        name : "fires_modis_24hrs"
    });

    const modis_7d = new WFSLayer({
        url : "https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/Southern_Africa/d5a1b4cbdcb790d6438a61e5b4240d18/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_modis_7days&STARTINDEX=0&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=csv",
        name : "fires_modis_7days"
    })
    // Filter by date: Include only records from November 2024
    /*
    const startDate = "2024-09-01T00:00:00";
    const endDate = "2024-11-30T23:59:59";
    wfsLayer.definitionExpression = `
      datetime >= DATE '${startDate}' AND datetime <= DATE '${endDate}'
    `;
    */
     // Add custom symbology (renderer)
     modis_24hr.renderer = {
        type: "simple",
        symbol: {
        type: "simple-marker", // Applies to point data
        color: "orange",
        size: 10,
        outline: {
            color: "black",
            width: 1
        }
        }
    };

    modis_7d.renderer = {
        type: "simple",
        symbol: {
        type: "simple-marker", // Applies to point data
        color: "yellow",
        size: 10,
        outline: {
            color: "black",
            width: 1
        }
        }
    };

    wfsLayer.renderer = {
        type: "simple",
        symbol: {
        type: "simple-marker", // Applies to point data
        color: "red",
        size: 8,
        outline: {
            color: "white",
            width: 1
        }
        }
    };

    seven_days.renderer = {
        type: "simple",
        symbol: {
        type: "simple-marker", // Applies to point data
        color: "orange",
        size: 10,
        outline: {
            color: "white",
            width: 1
        }
        }
    };
  
    // Create map and view
    const map = new Map({
      basemap: "topo-vector",
      layers: [wfsLayer, seven_days, modis_24hr, modis_7d]
    });
  
    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [47.949971,-22.151886], // Center the map (long, lat)
      zoom: 13
    });

    //LOAD THE POLYGONS
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
    
    async function load_test() {
        let l = await fetcher_2(tableName = "manakara_demo", query = "*");
        console.log(l);
        const blob = new Blob([JSON.stringify(l)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        var renderer = new SimpleRenderer({
            symbol: new SimpleFillSymbol({
              color: [0, 255, 0, 0.8], // Green with 50% opacity
              outline: {
                color: [0, 0, 0, 1], // Black outline
                width: 1
              }
            })
          });

        //console.log(url);
            
        const geojsonLayer = new GeoJSONLayer({
            url: url,
            renderer: renderer
            });
        map.add(geojsonLayer);
    };

    load_test();

      // Add a legend to the map
      /*
    const legend = new Legend({
    view: view,
    container: "legendDiv",// Attach the legend to the div
    style: "classic"
     });
     */
    const legend = new Expand({
        content: new Legend({
          view: view,
          //container : "legendDiv",
          style: "classic" // other styles include 'classic'
        }),
        view: view,
        expanded: true
      });

    // Add the legend to the bottom-right corner of the view
     view.ui.add(legend, "top-right");

    const scaleBar = new ScaleBar({
        view: view,
        unit: "dual" // Options: "metric", "non-metric", "dual"
      });
      view.ui.add(scaleBar, {
        position: "bottom-left" // Position on the map
      });
    /*
    const measurement = new Measurement({
    view: view,
    activeTool: "distance" // Options: "area", "distance", null
    });
    view.ui.add(measurement, {
    position: "top-left" // Position on the map
    });
    */
    const measurement = new Expand({
      content: new Measurement({
        view: view,
        activeTool: "distance" // Options: "area", "distance", null
        })
    });

    view.ui.add(measurement, {
      position: "top-left" // Position on the map
      });

     //basemap
    const basemapGallery = new Expand({
      content : new BasemapGallery({
          view: view,
          container: document.createElement("div")
        })
        });
    
    // Add the widget to the top-right corner of the view
    view.ui.add(basemapGallery, {
      position: "top-right"
    });
  
    // Handle WFS layer load
    wfsLayer.when(() => {
      console.log("FIRMS WFS Layer loaded with date filter applied.");
    });
  });
  