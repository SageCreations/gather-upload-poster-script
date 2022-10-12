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
    BG_IMAGE: "", // can be left blank or put in the file path, the script will take care of uploading it.
  };  
  ```
  - then npm install
- A CSV file that is compliant with the section below. 
  - You can make a google spreadsheet and then download as csv file - easiest way
- User needs to go to each object they want data uploaded to and put a corresponding ID number in the "Preview Message" spot in gathertown. (SUBJECT TO CHANGE.)



## CSV file format:
### MAP_ID,ID,PDF,NORMAL,HIGHLIGHTED,VIDEO

Example: Room_id-from-gathertown,1001,selfHostedPreviewLinkOfPDF,localFileImagePathInNormalFolder,localFileImagePathInHighlightedFolder,videoLink

- For ID I personally used 1001 - 1033 for my needs, ID can be whatever esentially but the objects you are trying to upload to need to have a matching ID in their preview message.


## How To Run The Script:
1. Using a terminal that supports bash, go into the projects directory
```
chmod -x RunProgram.sh
```
2. Then run the sh file itself
```
bash RunProgram.sh
```



## What The Script Does:

### Step 1:

- reads the csv file and creats a json file out if it.

### Step 2:

- Uploads all the local image paths to gathertown online storage and replaces the local paths with the generated links in the csv-data.json that gets created.

### Step 3:

- Step through the csv-json array and store all the room_id/map_id in an array without repeating IDs.

### Step 4:

- Run the get-map-data script via for-loop based on length of the map_id array.
- This script gets the data from the room that it is inserted and spits out a json file corresponding to each room that is called.

### Step 5:

- triple nested for loop checking for objects from the room data and the csv data, matches ID numbers and proceeds to plugin links into objects.
  - User will need to go in the room and set the ID number in an objects "preview message" manually, (script at end will replace all preview messages with button prompt message). (THIS STEP IS SUBJECT TO CHANGE.)
  
### Step 6: 

- this part of the script only runs if the user runs the finalize script, its just to replace all the preview messages with button prompts for gathertown users, DO NOT RUN IF YOU ARE NOT DONE UPLOADING FILES VIA SCRIPTS.
(IF THIS FILE RUNS BEFORE FINISHING, YOU WILL NEED TO GO BACK AND MANUALLY READD THE IDs ON TO PROMPT MESSAGES.)


## Extra Scripts:

You will need [imageMagick](https://imagemagick.org/index.php) for the photo manipulation scripts

### convertImageSize.sh
This script grabs all the images in the ./images/original directory that end in png extension and changes them to a specified size.
- To change what file extension to find just change the ".png" in the 'for' loop line to your needs, Ex. .jpg, etc.
- To change the size you want the image to be resized at just change the 'width x height' portion after the -resize parameter
  - Ex. change to '124x72!' to '300x300!' and the image will scale to this size instead.
- This script uploads all the new images to the ./images/normal folder.
```
#! /bin/bash
for FILE in ./images/original/*.png; do
    #echo $FILE
    magick $FILE -resize '124x72!' "images/normal/$(basename $FILE .png)_displaySized.png"; 
done
```

### createHighlightedVersionFromNormal.sh
This script grabs all the images in the '.images/normal' folder and adds a yellow/gold border outline over normal thats 4x4px
- The for loop is the same as the previous script but directed to the 'normal' folder
- To edit the border size edit the '4x4' to what ever 'width x height' you need
- To edit the color of the border, edit the '#e1bd1e' to whatever hex color you need.
```
#! /bin/bash
for FILE in ./images/normal/*.png; do
    #echo $FILE
    magick $FILE -bordercolor "#e1bd1e" -border '4x4' "images/highlighted/$(basename $FILE .png)_highlighted.png"; 
done
```




# remember to actually read through this all and simplyfy it heavily
