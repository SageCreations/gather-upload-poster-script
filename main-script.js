import { SPACE_ID, API_KEY, CSV_FILE } from "./config.js";
import { readCSV } from "./read-csv-file.js";
//import { uploadFiles } from "./upload-files-to-gather.js";
import { getMapData } from "./get-map-json-data.js";
import { setMapData } from "./set-map.js";
import fs from "fs";

// make this to where MAP_ID is what ever the map id is on the csv file
//const MAP_ID = "ArtGallery";



// STEP # 1
readCSV(CSV_FILE); // calls the function in ./read-csv-file.js

// makes an object out of the exported json file of the csv that was created by the readCSV function.
import csv_json_object from './csv-data.json' assert { type: "json" };


// STEP # 2
let map_id_array = [] // declares and initializes an empty map_id_array
// for loop that goes through the entire csv list
for (let i = 0; i < csv_json_object.length; i++) {

    // creates a obj variable based on the current object of the csv_array
    let obj = csv_json_object[i];

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
//console.log(map_id_array);

// STEP # 3
// traverse the map_id_array
for (var i in map_id_array) {
    // creates a json file for each the room's object data
    getMapData(API_KEY, SPACE_ID, map_id_array[i]);
}


// STEP # 4

for (var i in map_id_array) {

    var map_data = JSON.parse(
        fs.readFileSync(
            `./${encodeURIComponent(map_id_array[i])}-data.json`
        )
    );

    var obj = map_data.objects; // we are only wanting the objects of the room
    
    for (var j in csv_json_object) {
        
        var csv_obj = csv_json_object[j];
        
        
        if (csv_obj.MAP_ID == map_id_array[i]) {
            
            
    
            //console.log(map_id_array[i]);
            

            for (var k in obj) {
                
                if (obj[k].previewMessage == csv_obj.ID) {
                
                    //TODO: need to find a way to abstract this more (currently working)
                    if (obj[k]._name == "Bulletin (Video)") {
                        obj[k].properties.video = csv_obj.Video; 
                    } 

                    if (obj[k]._name == "face" || obj[k]._name == "not") {
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
    
    //console.log(obj);
    setMapData(SPACE_ID, map_id_array[i], API_KEY, obj);
}

