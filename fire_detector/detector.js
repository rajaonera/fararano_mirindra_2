if (window.supabase) {console.log("supabase logged!")};

const supabaseUrl = 'https://rakfrxwkidutruudbfyk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJha2ZyeHdraWR1dHJ1dWRiZnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzM3MTQsImV4cCI6MjA0MTgwOTcxNH0.NeCSvgwdglKXkbJqsMSbwS8qXDLFm6MB12JQSgo-1Ws';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let today = new Date().toISOString().slice(0, 10);
//console.log(today);
//https://firms.modaps.eosdis.nasa.gov/api/country/csv/026e00e8242dcef6baf6607d16d166fd/MODIS_NRT/MDG/10/2024-11-16
//let url = `https://firms.modaps.eosdis.nasa.gov/api/country/csv/026e00e8242dcef6baf6607d16d166fd/MODIS_NRT/MDG/10/${today}`;

let url = "./16_novembre_modis.csv"
let modis;

async function first_db_writer(//columns,
    tablename) {
    let k = []
    const query = `CREATE TABLE IF NOT EXISTS ${tablename}(
    latitude varchar
    longitude varchar);`
    //columns.forEach(el => )
        const { error } = await supabase.rpc('execute_sql', { query: query });

        if (error) {
          console.error("Error creating table:", error);
        } else {
          console.log(`Table '${tableName}' ensured.`);
        }
}

async function supabase_writer(geojson, 
    tablename) {
    const rows = geojson.features.map(feature => ({
        latitude: feature.geometry.coordinates[1], // Extract latitude
        longitude: feature.geometry.coordinates[0], // Extract longitude
        ...feature.properties // Include all properties from the GeoJSON feature
      }));
      const { data, error } = await supabase.from(tablename).insert(rows);
      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data successfully inserted:", data);
      }
    
}

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

          //modis = geojson;
          //console.log(modis);
          //supabase_writer(geojson = geojson, tablename = "modis");
          

        },
        error: function(error) {
          console.error('Error while parsing:', error);
        }
      });
    /* 
    {
        "type": "FeatureCollection",
        "features" : [
        {
        "type" : "Feature",
        "geometry" :{"type" : "Point","coordinates" : [long , lat]},
        "properties": {"name": "Point 1","description": "This is the first point."}
        },
        {
        "type" : "Feature",
        "geometry" :{"type" : "Point","coordinates" : [long , lat]},
        "properties": {"name": "Point 1","description": "This is the second point."}
        },

    ]
    }
    */
    
};
//console.log(url);
//fire_fetcher_csv(url); fail
//first_db_writer("test_");
