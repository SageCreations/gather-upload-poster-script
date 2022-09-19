
const axios = require("axios");
const fs = require('fs')
const form = document.getElementById('form');



document.querySelectorAll(".drop-zone_input").forEach(InputElement => {
    const dropZoneElement = InputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", e => {
        InputElement.click();
    });

    dropZoneElement.addEventListener("change", e => {
        if (InputElement.files.length) {
            if (checkFile(InputElement.files[0].name)) {
                updateThumbnail(dropZoneElement, InputElement.files[0]);
                console.log(InputElement.files.length);
            }
        } else {
            console.log("this file will not be accepted")
            console.log(InputElement.files.length);
        }
    });

    dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone_over");
    });

    ["dragleave", "dragend"].forEach(type => {
        dropZoneElement.addEventListener(type, e => {
            dropZoneElement.classList.remove('drop-zone_over');
        });
    });

    dropZoneElement.addEventListener("drop", e => {
        e.preventDefault();
        console.log(e.dataTransfer.files);

        if (e.dataTransfer.files.length) {
            InputElement.files = e.dataTransfer.files;
            //console.log(typeof checkFile(e.dataTransfer.files[0].name))
            if (InputElement.files.length) {
                if (checkFile(e.dataTransfer.files[0].name)) {
                    InputElement.files = e.dataTransfer.files;
                    console.log("This file will be accepted");
                    updateThumbnail(dropZoneElement, InputElement.files[0]);
                    console.log(InputElement.files.length);
                }
            } else {
                InputElement.files = e.dataTransfer.files;
                console.log("this file will not be accepted")
                InputElement.files[0].push

                console.log(InputElement.files.length);
            }


            //maybe - if more than one csv dropped then create a single csv with all of them merged
        }

        dropZoneElement.classList.remove("drop-zone_over");
    });


});


// handles form submission button
form.addEventListener('submit', (event) => {
    event.preventDefault();
    var space_id = document.getElementById('SPACE_ID').value;
    var api_key = document.getElementById('API_KEY').value;
    console.log(space_id);
    console.log(api_key);
    getMapData(space_id, api_key);

});







function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone_thumb");

    console.log(file)

    // first time remove the prompt
    if (dropZoneElement.querySelector(".drop-zone_prompt")) {
        dropZoneElement.querySelector(".drop-zone_prompt").remove();
    }

    // first time there isnt one so we create it.
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone_thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;
}



function checkFile(selectedFile) {
    //selectedFile = document.getElementById('csvFileInput');

    switch ((selectedFile.match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
        case 'csv':
            console.log("this is a csv file");
            return true;
        default:
            /* Here notify user that this file extension is not suitable */

            console.log("this is not a csv");
            return false;
    }

}




function getMapData(SPACE_ID, API_KEY) {
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
  }

