const axios = require('axios');
const fs = require('fs');
const { SPACE_ID, API_KEY } = require("./config.js");



function setMapData(map_id, changedObjects) { //changedObjects
    axios
        .post(
            `https://api.gather.town/api/v2/spaces/${encodeURIComponent(
                SPACE_ID
            )}/maps/${encodeURIComponent(map_id)}`,
            {

                content: {
                    objects: changedObjects
                },
            },
            {
                headers: {
                    apiKey: API_KEY,
                },
            }
        )
        .then((response) => console.log("Success: " + response.status))
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


// STEP # 4

// loop through map_id_array
for (var i in map_id_array) {

    // create json object based off the current map-data in the loop
    var map_data = JSON.parse(
        fs.readFileSync(
            `./${encodeURIComponent(map_id_array[i])}-data.json`
        )
    );

    
    var obj = map_data.objects; // we are only wanting the objects of the room

    // loop through the objects of the csv json object
    for (var j in csv_json_object) {

        var csv_obj = csv_json_object[j]; // make an obj of the current json obj of the loop, (just make  it look nicer)

        // if csv obj's map_id matches the current iteration of the map_id_array
        if (csv_obj.MAP_ID == map_id_array[i]) {

            // then loop through the objects of the map-data object
            for (var k in obj) {

                // TODO: subject to change, need to coordinate with art 
                //       team on how to make objects for posters.
                // Current way is by adding an id number to multiple 
                // objects in the preview message.
                // This is so we can know which object is which 
                // since each poster will have multiple objects to interact with.
                if (obj[k].previewMessage == csv_obj.ID) {

                    //TODO: need to find a way to abstract this more (currently working)
                    // checks to see what type of object it is and place 
                    // the corresponding link it can use.
                    if (obj[k]._name == "Bulletin (Video)") {
                        obj[k].properties.video = csv_obj.Video;
                    }

                    if (obj[k]._name == "sideview" || obj[k]._name == "not" || obj[k]._name == "face" || obj[k]._name == "untitled") {
                        obj[k].properties.url = csv_obj.PDF;
                    }



                    // JSON data name = Gathertown ui label
                    // properties.video = video link
                    // properties.url = pdf link
                    // normal = Object Image (when the player is not in range)
                    // highlighted = active image (what displays when a player is in interact range)
                    // properties.blurb = caption (only available for images)
                    // preview = idk



                }
            }
        }

    }

    // calls the set map data function per iteration of the map_id_array
    setMapData(map_id_array[i], obj); // passes in the obj of the map_data json with edits if any were made
}
