/*
const jsonData = require("./Output.json"); 

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

//const { parse } = require("csv-parse");





import fs from 'fs';
import csv from 'jquery-csv';
//import CSV_FILE from "./config.js";

//let csv_objects = [];
export function readCSV(CSV_FILE) {
    // this snippet here reads the csv file passed in from config and spits it as a json.
    fs.readFile(CSV_FILE, 'UTF-8', function (err, csv_file) {
        if (err) { console.log(err); }
        csv.toObjects(csv_file, {}, function (err, data) {
            if (err) { console.log(err); }
            fs.writeFile(
                "csv-data.json",
                JSON.stringify(data, null, "\t"),
                (err) => {
                    // Error checking
                    if (err) throw err;
                    console.log(data);
                }
            );
        });
    });

}





