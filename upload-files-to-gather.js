// Written by npfoss @https://github.com/gathertown/api-examples/blob/main/auto-upload-poster-room.js

import axios from "axios";
import fs from "fs";
import {SPACE_ID} from "./config.js";

// takes local files, uploads them to Gather's storage
export const uploadFiles = async (filePaths) => {
	const posterLinks = (
		await Promise.all(
			filePaths.map(async (path) => {
				return {
					[path]: await new Promise((resolve, reject) =>
						fs.readFile(path, function (err, data) {
							if (err) reject(err); // Fail if the file can't be read.
							axios
								.post(
									"https://gather.town/api/uploadImage",
									// "http://localhost:3000/api/uploadImage",
									{
										bytes: data,
										spaceId: SPACE_ID,
									},
									{ maxContentLength: Infinity, maxBodyLength: Infinity }
								).catch(function (error) {
                                    if (error.response) {
                                      // The request was made and the server responded with a status code
                                      // that falls out of the range of 2xx
                                      console.log(error.response.data);
                                      console.log(error.response.status);
                                      console.log(error.response.headers);
                                    } else if (error.request) {
                                      // The request was made but no response was received
                                      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                                      // http.ClientRequest in node.js
                                      console.log(error.request);
                                    } else {
                                      // Something happened in setting up the request that triggered an Error
                                      console.log('Error', error.message);
                                    }
                                    console.log(error.config);
                                  })
								.then((res) => resolve(res.data));
						})
					)	,
				};
			})
		)
	).reduce((obj, item) => Object.assign(obj, item), {});
	// ^ sorry this is kind of spaghetti code, but the result is that posterLinks will have the form:
	// {
	//   filename1: "https://cdn.gather.town/uploadedPosterPath1",
	//   filename2: "https://cdn.gather.town/uploadedPosterPath2",
	//   filename3: "https://cdn.gather.town/uploadedPosterPath3",
	// }

	return posterLinks;
};



/*export function uploadFiles(path) {
    
        axios.post (
            "https://gather.town/api/uploadImage",
            // "http://localhost:3000/api/uploadImage",
            {
                bytes: data,
                spaceId: SPACE_ID,
            },
            { maxContentLength: Infinity, maxBodyLength: Infinity }
        ).then((response) => resolve(response.data));

}*/



// uploadFiles([
// 	"/home/npfoss/Downloads/poster1.jpg",
// 	"/home/npfoss/Downloads/poster2.jpg",
// ]).then(console.log);