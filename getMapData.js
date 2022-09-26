const axios = require('axios');
const fs = require('fs');
const { SPACE_ID, API_KEY } = require("./config.js");




function getMapData(map_id) {
    axios
        .get(
            `https://api.gather.town/api/v2/spaces/${encodeURIComponent(
                SPACE_ID
            )}/maps/${encodeURIComponent(map_id)}`,
            {
                headers: {
                    apiKey: API_KEY,
                },
            }
        )
        .then((response) => fs.writeFile(
            `${encodeURIComponent(map_id)}-data.json`,
            JSON.stringify(response.data, null, "\t"),
            (err) => {
                // Error checking
                if (err) throw err;
            }
        )
        )
        .catch(console.error);
}



// STEP # 1
var csv_json_object = JSON.parse(fs.readFileSync('./csv-data.json'));
console.log(csv_json_object);

// STEP # 2
var map_id_array = [] // declares and initializes an empty map_id_array

// for loop that goes through the entire csv list
for (var i = 0; i < csv_json_object.length; i++) {

    // creates a obj variable based on the current object of the csv_array
    var obj = csv_json_object[i];

    var check = false; //used for checking map_id repeats

    // checks to see if there even is map_id listed
    if (obj.MAP_ID !== null) {
        // loops through the map_id_array
        for (var j in map_id_array) {
            // check to see if the current obj.map_id is already in it.
            if (obj.MAP_ID == map_id_array[j]) {
                check = true; // check is now true if there is a repeated MAP_ID
                break; // get out of this current for loop.
            }
        }
        // if the for loop exits and check is still false... 
        if (check == false) {
            map_id_array.push(obj.MAP_ID); // ...add the map_id to the map_id_array.
        }
    }
}

// logs the map_id_array to the console
console.log(map_id_array);

// STEP # 3

// traverse the map_id_array
for (var i in map_id_array) {
    // creates a json file for each the room's object data
    getMapData(map_id_array[i]);
}


