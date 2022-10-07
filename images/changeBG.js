const axios = require('axios');
const fs = require('fs');
const { BG_IMAGE } = require("../config.js");
const fsp = require('fs').promises

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

let setMapData = async function (map_id, changedObjects) {
    axios.post(
        `https://api.gather.town/api/v2/spaces/${encodeURIComponent(
            SPACE_ID
        )}/maps/${encodeURIComponent(map_id)}`,
        {

            content: {
                backgroundImagePath: BG_IMAGE
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

let imgUploadTest = async () => {
    var url = await uploadImage("./images/normal/" + csv_json_object[i].NORMAL);
            
    await setMapData()
}

imgUploadTest();