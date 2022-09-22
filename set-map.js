import axios from "axios";

//import { SPACE_ID, API_KEY } from "./config.js";
//const MAP_ID = "ArtGallery"



export function setMapData(space_id, map_id, api_key, changedObjects) { //changedObjects
    axios
        .post(
            `https://api.gather.town/api/v2/spaces/${encodeURIComponent(
                space_id
            )}/maps/${encodeURIComponent(map_id)}`,
            {
                
                content: {
                    objects: changedObjects
                },
            },
            {
                headers: {
                    apiKey: api_key,
                },
            }
        )
        .then((response) => console.log("Success: " + response.status)) 
        .catch(console.error);
}

//setMapData(SPACE_ID, MAP_ID, API_KEY);