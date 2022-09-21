# STATUS OF PROJECT: Script is still not done
# Gathertown link-data uploader

## Disclaimer: I have never used javascript before so most of the coding style is just copied from online snippets and what I saw from npfoss's api-example on github. I will try to alleviate this for future programmers by commenting heavily in every file.
- TODO: link api-example.git here

### - There will be a GUI version of this script so all the user needed stuff on the script stuff can just be PnP, otherwise the user needed stuff will be needed in the config.js file.

## Stuff Needed By The User:
- gathertown space_id link ().
  - TODO: paste instructions on how to procure the link
- API key from gathertown.
  - TODO: paste instructions on how to procure the api_key
- A CSV file that is compliant with the above or test.csv examples. 
  - You can make a google spreadsheet and then download as csv file - easiest way
- User needs to go to each object they want data uploaded to and put a corresponding ID number in the "Preview Message" spot in gathertown.

## What the Script Does:

### Step 1:

- reads the csv file and creats a json array out of it.

### Step 2:

- Step through the csv-json array and store all the room_id/map_id in an array without repeating IDs.

### Step 3:

- Run the get-map-data script via for-loop based on ength of the map_id array.
- This script gets the data from the room that it is inserted and spits out a json file corresponding to each room that is called.

### Step 4:

- triple nested for loop checking for objects from the room data and the csv data, matches ID numbers and proceeds to plugin links into objects.
  - User will need to go in the room and set the ID number in an objects "preview message" manually, (script at end will replace all preview messages with button prompt message).
  
### Step 5: 

- this script only runs if the user hits the finalize button or runs the finalize script, its just to replace all the preview messages with button prompts for gathertown users, DO NOT RUN IF YOU ARE NOT DONE UPLOADING FILES VIA SCRIPTS.

## CSV file format:
### MAP_ID, ID, Title, Authors, PDF, Image, Video, Summary

Example: ArtGallery,1001,Why Gundams Are Cool,Edward Cruz|(if more than 1 just add '|' between names)|(another fake name)|(another),stored-online-link-of-pdf,stored-online-linkof-image,stored-online-video-link,"Gundams are just cool in my opinion, thanks for coming to my TED Talk in advance."

check the test.csv file for a working example, the above might be outdated.


# remember to actually read through this all and simplyfy it heavily
