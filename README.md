# STATUS OF PROJECT: Script is still not done
# Gathertown link-data uploader

## Disclaimer: I have never used javascript before so most of the coding style is just copied from online snippets and what I saw from npfoss's api-example on github. I will try to alleviate this for future programmers by commenting heavily in every file.
- https://github.com/gathertown/api-examples
- https://gathertown.notion.site/Gather-HTTP-API-3bbf6c59325f40aca7ef5ce14c677444
---


## Stuff Needed By The User:

- API key from gathertown.
  - get an API key [here](https://app.gather.town/apikeys).
- install NodeJS and npm
  - Create a file called config.js that looks like this, but with your own data instead:
  ```
  module.exports = {
    SPACE_ID: "oFz81x6whatever\\SpaceName", // note the \, NOT / as is in the URL
    API_KEY: "YOUR KEY HERE",
    CSV_FILE: "./name-of-file-here.csv",
  };  
  ```
  - then npm install
- A CSV file that is compliant with the section below or test.csv examples. 
  - You can make a google spreadsheet and then download as csv file - easiest way
- User needs to go to each object they want data uploaded to and put a corresponding ID number in the "Preview Message" spot in gathertown. (SUBJECT TO CHANGE.)

## CSV file format:
### MAP_ID, ID, Title, Authors, PDF, Image, Video, Summary

Example: ArtGallery,1001,Why Gundams Are Cool,Edward Cruz|(if more than 1 just add '|' between names)|(another fake name)|(another),stored-online-link-of-pdf,stored-online-linkof-image,stored-online-video-link,"Gundams are just cool in my opinion, thanks for coming to my TED Talk in advance."

check the test.csv file for a working example, the above might be outdated.


## What the Script Does:

### Step 1:

- reads the csv file and creats a json file out if it.

### Step 2:

- Step through the csv-json array and store all the room_id/map_id in an array without repeating IDs.

### Step 3:

- Run the get-map-data script via for-loop based on length of the map_id array.
- This script gets the data from the room that it is inserted and spits out a json file corresponding to each room that is called.

### Step 4:

- triple nested for loop checking for objects from the room data and the csv data, matches ID numbers and proceeds to plugin links into objects.
  - User will need to go in the room and set the ID number in an objects "preview message" manually, (script at end will replace all preview messages with button prompt message). (THIS STEP IS SUBJECT TO CHANGE.)
  
### Step 5: 

- this part of the script only runs if the user runs the finalize script, its just to replace all the preview messages with button prompts for gathertown users, DO NOT RUN IF YOU ARE NOT DONE UPLOADING FILES VIA SCRIPTS.
(IF THIS FILE RUNS BEFORE FINISHING, YOU WILL NEED TO GO BACK AND MANUALLY READD THE IDs ON TO PROMPT MESSAGES.)



# remember to actually read through this all and simplyfy it heavily
