const axios = require("axios");
const fs = require('fs')

const { SPACE_ID, API_KEY } = require("./config");
const MAP_ID = "ArtGallery";

// get console reading (might make this into a simple html page to do it all by a GUI)
// not being used yet.
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// axios get command, gets MAP_ID as a JSON Object Literal, 
// MAP_ID must be an existing room in an already exisiting space
axios
  .get(
    `https://api.gather.town/api/v2/spaces/${encodeURIComponent(
      SPACE_ID
    )}/maps/${encodeURIComponent(MAP_ID)}`,
    {
      headers: {
        apiKey: API_KEY,
      },
    }
  )
  .then( (response) => fs.writeFile(
      `${encodeURIComponent(MAP_ID)}-data.json`, 
      JSON.stringify(response.data, null, "\t"), 
      (err) => {
        // Error checking
        if (err) throw err;
        console.log(typeof response);
      }
    ) 
  )
  .catch(console.error);

  // TODO: gotta make it to where it pulls from the stored 
  //       MAP_IDs off of the csv reader file and export a 
  //       json file named after them as "{MAP_ID}-data.json"