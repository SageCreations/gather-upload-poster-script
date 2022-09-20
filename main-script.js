import { SPACE_ID, API_KEY, CSV_FILE } from "./config.js";
import { readCSV } from "./read-csv-file.js";
//import { uploadFiles } from "./upload-files-to-gather.js";
import { getMapData } from "./get-map-json-data.js";


// make this to where MAP_ID is what ever the map id is on the csv file
//const MAP_ID = "ArtGallery";



// STEP # 1
readCSV(CSV_FILE);
 
function checkForRepeats(map) {
    //return  == map
}

import csv_json from './csv-data.json' assert { type: "json" };
let map_id_array = []
for (let i = 0; i < csv_json.length; i++) {
    let obj = csv_json[i];
    if (obj.MAP_ID !== null) {
        if (map_id_array.find(checkForRepeats(obj.MAP_ID)) !== null) {
            map_id_array.push(obj.MAP_ID);
        } 
    }
}

console.log(map_id_array);


for (var i =0; i < map_id_array.length; i++) {
    getMapData(API_KEY, SPACE_ID, map_id[i]);
}
/*
const jsonData = require("./Output.json"); 

// STEP # 2
function get_video_stuff_test_func(data) {
    for (var i in data.objects) {
        
        if (data.objects[i]._name == "Bulletin (Video)") {
            console.log("X: " + data.objects[i].x + "\tY: " + data.objects[i].y)
        }
        
    }
}

get_video_stuff_test_func(jsonData)
*/

// this currently works, it reads for specific object name and prints the x,y to console
// TODO: abstract this so it goes through each MAP_ID listed from the csv
// TODO: make js file that reads the user imported csv file, store the csv into a json format
// making the csv in a json format will make it easier to manipulate the data


// STEP # 3

//TODO: for some reason upload files gets compiles before the csv file 
//      is uploaded, try to make uploadFile function wait till after the csv 
//      creation is done. (might have to rewrite npfoss's spaghetti lol.)

//This step might need to combine step 4 and make it to where the local path in the csv gets replaced with the gathertown storage link.

//console.log(fileArray);
// CANNOT UPLOAD PDF, this only works with images, wait for confirmation on storage of files from Amy.

