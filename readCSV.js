const fs = require('fs');
const csv = require('jquery-csv');
const { CSV_FILE, BG_IMAGE } = require("./config.js");


// reads the csv file thats plugged into ./config.js and generates 
// a json file based off the spreadsheet.
fs.readFile(CSV_FILE, 'UTF-8', function (err, csv_file) {
    if (err) { console.log(err); }
    csv.toObjects(csv_file, {}, function (err, data) {
        if (err) { console.log(err); }
        data.push( 
            { 
                'BG_IMAGE': BG_IMAGE 
            } 
        );
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

