import axios from "axios";
import fs from 'fs';

//const { SPACE_ID, API_KEY } = require("./config.js");
//const MAP_ID = "ArtGallery";


// axios get command, gets MAP_ID as a JSON Object Literal, 
// MAP_ID must be an existing room in an already exisiting space
export function getMapData(api_key, space_id, map_id) {
  axios
    .get(
      `https://api.gather.town/api/v2/spaces/${encodeURIComponent(
        space_id
      )}/maps/${encodeURIComponent(map_id)}`,
      {
        headers: {
          apiKey: api_key,
        },
      }
    )
    .then( (response) => fs.writeFile(
        `${encodeURIComponent(map_id)}-data.json`, 
        JSON.stringify(response.data, null, "\t"), 
        (err) => {
          // Error checking
          if (err) throw err;
          console.log(typeof response);
        }
      ) 
    )
    .catch(console.error);
}

  // TODO: gotta make it to where it pulls from the stored 
  //       MAP_IDs off of the csv reader file and export a 
  //       json file named after them as "{MAP_ID}-data.json"
