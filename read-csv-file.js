import fs from 'fs';
import csv from 'jquery-csv';
//import CSV_FILE from "./config.js";

//let csv_objects = [];
export function readCSV(CSV_FILE) {
    return new Promise((resolve, reject) => {
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
                        //console.log(data);
                    }
                )
            });
        })
    });


    // this snippet here reads the csv file passed in from config and spits it out as a json.
    


    //console.log(typeof JSON.parse(fs.readFileSync('csv-data.json')));
}




