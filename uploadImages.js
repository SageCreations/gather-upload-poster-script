const axios = require("axios");
const fs = require("fs");
const fsp = require('fs').promises
const { SPACE_ID } = require("./config.js");

uploadImage = async function (inFname) {
    let data = {};
    try {
        data = await fsp.readFile(inFname, async function (err, data) {
            if (err) {
                reject(err); // Fail if the file can't be read.
            }
        });
    } catch {
        console.log("Error reading " + inFname);
        return;
    }

    let posterPath = await axios
        .post(
            "https://gather.town/api/uploadImage",
            {
                bytes: data,
                spaceId: SPACE_ID,
            },
            { maxContentLength: Infinity, maxBodyLength: Infinity }
        )
        .then((res) => {
            console.log(inFname + " successfully uploaded");
            console.log(res.data);
            return res.data;
        })
        .catch((err) => { console.log("Error uploading " + inFname); return err });
    return posterPath;
};

var csv_json_object = JSON.parse(fs.readFileSync('./csv-data.json'));

//console.log(csv_json_object);


let imgUploadTest = async () => {
    for (var i in csv_json_object) {
        if (csv_json_object[i].Image != '') {

            var url = await uploadImage("./images/" + csv_json_object[i].Image);
            
            csv_json_object[i].Image = url;
            //console.log(csv_json_object[i]);

        }
    }

    fs.writeFile("./csv-data.json", JSON.stringify(csv_json_object, null, "\t"), function writeJSON(err) {
        if (err) return console.log(err);
        //console.log(JSON.stringify(csv_json_object));
        console.log('writing to ' + "./csv-data.json");
    });
}

imgUploadTest();






