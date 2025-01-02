if (window.supabase) {console.log("supabase logged!")};

const supabaseUrl = 'https://rakfrxwkidutruudbfyk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJha2ZyeHdraWR1dHJ1dWRiZnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzM3MTQsImV4cCI6MjA0MTgwOTcxNH0.NeCSvgwdglKXkbJqsMSbwS8qXDLFm6MB12JQSgo-1Ws';
const supabase_ = window.supabase.createClient(supabaseUrl, supabaseKey);

async function fetch_data_raw(tableName, query, json_column, element) {
    const { data, error } = await supabase_
        .from(tableName)
        .select(query)
        //.contains(json_column, [element])
        .textSearch(json_column, element, {
            config: "english",
          })
    if (error) {
        console.error(`Error fetching the data from ${tableName}`, error);
        return null; // Return null or handle error accordingly
    }
    else{

        //console.log(data);
        return data;
    }
};


fetch_data_raw(tableName = "fm_table_first",
    query = "*",
    json_column = "speculation",
    element = 'option_1'
);


async function fetch_data_clean(tableName, query, json_column, element) {
    const { data, error } = await supabase_
        .from(tableName)
        .select(query)
        //.contains(json_column, [element])
        //.textSearch(json_column, element, {
        //    config: "english",
         // })
        .ilike(json_column, element)
    if (error) {
        console.error(`Error fetching the data from ${tableName}`, error);
        return null; // Return null or handle error accordingly
    }
    else{

        //console.log(data);
        return data;
    }
};

async function fetch_sum(tableName, query) {
    const { data, error } = await supabase_
    .from(tableName)
    .select(query)
    //.eq(eq_att, eq_value);
    if (error) {
        console.error(`Error fetching the data from ${tableName}`, error);
        return null; // Return null or handle error accordingly
      } 
    else {
        //const jsonData = JSON.stringify(data, null, 2);
        //console.log(Object.keys(jsonData[0]));
        //return jsonData;
        //console.log(data)
        //return data

        /*
        let rice = document.getElementById('rice');
        let maize = document.getElementById('maize')
        function summer_rice(data) {
            return data
            .reduce((sum, item) => sum + item.estimation_rice, 0)
        }
        function summer_maize(data) {
            return data
            .reduce((sum, item) => sum + item.estimation_maize, 0)
        }
        rice.textContent = summer_rice(data);
        maize.textContent = summer_maize(data);
        //here make all total for each crops
        */
        let rice = document.getElementById('rice');
        let maize = document.getElementById('maize');
        let cinnamon = document.getElementById('cinnamon');
        let ginger = document.getElementById('ginger');
        //add here if there is a new crop


        let props = data.map(row => {
            let properties = { ...row };
            return properties;
        });
        //console.log(maize);
        maize.textContent = props[0].estimation_maize;
        rice.textContent = props[0].estimation_rice;
        cinnamon.textContent = props[0].estimation_cannelle;
        ginger.textContent = props[0].estimation_ginger;



    };
};

fetch_sum(tableName = "fm_available_production",
    query = "*"
);

document.getElementById("bid").addEventListener('click', () => {
    const container = document.getElementById("iframe-container");
    container.src = "https://docs.google.com/forms/d/e/1FAIpQLSenvw7yEIAhICjvzzaxT9DGoipfVE5acYNFFQM9xog_ZNTZgg/viewform?usp=sf_link";
    container.className = "h-screen w-full"
    //besoins de consruire un survey et d'ecrie sous supabase
})


// Toggle mobile menu visibility
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});


async function filter_district(tableName, query) {
    const { data, error } = await supabase_
        .from(tableName)
        .select(query)
    if (error) {
        console.error(`Error fetching the data from ${tableName}`, error);
        return null; // Return null or handle error accordingly
    }
    else {
        //get all the district
        function getUniqueValues(data, key) {
            const uniqueSet = new Set(data.map(item => item[key]));
            return [...uniqueSet]; // Convert Set back to an array
        };

        // Function to populate the dropdown
        function populateDropdown(selectId, uniqueValues) {
            const selectElement = document.getElementById(selectId);
    
            uniqueValues.forEach(value => {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = value;
                selectElement.appendChild(option);
            });
                };
        
        const uniqueCategories = getUniqueValues(data, "district");
        populateDropdown("unique-options", uniqueCategories);
    };
};

filter_district(tableName = 'fm_points_district_v', query = '*');

//get the unique option for filter by district
let ops = document.getElementById('unique-options');

let rice = document.getElementById('rice');
let maize = document.getElementById('maize');
let cinnamon = document.getElementById('cinnamon');
let ginger = document.getElementById('ginger');

//add here if there is a new crop

async function fetch_to_sum(tableName, query,eq_att, eq_value) {
    const { data, error } = await supabase_
    .from(tableName)
    .select(query)
    .eq(eq_att, eq_value);
    if (error) {
        console.error(`Error fetching the data from ${tableName}`, error);
        return null; // Return null or handle error accordingly
      } 
    else {
        //const jsonData = JSON.stringify(data, null, 2);
        //console.log(Object.keys(jsonData[0]));
        //return jsonData;
        //console.log(data)
        return data

        //#####-----------#####\\
        //const result = document.getElementById("estimation");
        //let ops = document.getElementById('unique-options')
        //console.log(ops.value);

    };
};

ops.addEventListener('change', async function () {
    data = await fetch_to_sum(tableName = "fm_points_district_v", query = "*", eq_att = "district", eq_value = ops.value);
        //console.log(data);
        function summer(data) {
            return data
            .reduce((sum, item) => sum + item.estimation_rice, 0)
        };

        function sum_maize(data) {
            return data
            .reduce((sum, item) => sum + item.estimation_maize, 0)
        };

        function sum_t(data, col) {
            //this function works
            return data
            .reduce((sum, item) => sum + item[col], 0)
        };
        //console.log(summer(data));
    rice.textContent = summer(data);
    maize.textContent = sum_maize(data);
    cinnamon.textContent = sum_t(data, col = "estimation_cannelle");
    ginger.textContent = sum_t(data, col = "estimation_ginger");
    //add new crop here!!!!
    
    //console.log(ops.value);
    if (ops.value === "none") {
        fetch_sum(tableName = "fm_available_production",
            query = "*"
        );
    }
});





/*
// ###--- dat from https://www.alphavantage.co/ ---### \\
//limited to 25 calls per day - free
let api_k = 'W90O1M1W496BQK6D';
let url_coffee = `https://www.alphavantage.co/query?function=COFFEE&interval=monthly&apikey=${api_k}`;
let url_corn = `https://www.alphavantage.co/query?function=CORN&interval=monthly&apikey=${api_k}`;
async function comm_price(url) {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      };
    let json = await response.json();
    console.log(json);
    //console.log(json.);
    
};

comm_price(url_coffee);
comm_price(url_corn);

// ###--- ---------------------------------------- ---### \\
*/

//look at https://finance.yahoo.com/markets/commodities/ and use yfinance