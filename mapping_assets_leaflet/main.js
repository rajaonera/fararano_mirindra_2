//initialize the map 

function init(){
    //const antananarivo = {longitude : 47.519,
    //                    latitude : 18.862}; 47.483553,-19.007601
    let zoom = 5;
    const map = L.map("map").setView([-19.007601, 47.483553], zoom);
    let tile = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 25,
        attribution: '© OpenTopoMap contributors'
    })
    tile.addTo(map);
    return map;
  };

let map_ = init();

//load the database

if (window.supabase) {console.log("supabase logged!")};

const supabaseUrl = 'https://rakfrxwkidutruudbfyk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJha2ZyeHdraWR1dHJ1dWRiZnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzM3MTQsImV4cCI6MjA0MTgwOTcxNH0.NeCSvgwdglKXkbJqsMSbwS8qXDLFm6MB12JQSgo-1Ws';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function fetch_data(tableName, query, myStyle) {
    const{data, error} = await supabase
        .from(tableName)
        .select(query);
    if (error){
        console.error(`error feching the data from ${data}`, error)
    }
    else {
        let prop = data.map(row => {
            let p = {...row};
            delete p.geojson;
            delete p.geometry;
        });
        
        let geojson = {
            type : "FeatureCollection",
            features : data.map(row => ({
                type : "Feature",
                properties : prop,
                geometry : JSON.parse(row.geojson)
            }))
        };
        function loader() {
            L.geoJSON(geojson, {
                style: myStyle
            }).addTo(map_);
        };
        loader();
    };
};

let myStyle = {
    "color": "#ff7800",
    "weight": 1,
    "opacity": 0.2
};

fetch_data(tableName = "regions_of_madagascar",
    query = "*", myStyle = myStyle
);

var layers = new L.LayerGroup();
console.log(layers);