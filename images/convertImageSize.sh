#! /bin/bash
for FILE in ./images/original/*.png; do
    #echo $FILE
    magick $FILE -resize '124x72!' "images/normal/$(basename $FILE .png)_displaySized.png"; 
done
