#! /bin/bash
for FILE in ./images/normal/*.png; do
    #echo $FILE
    magick $FILE -bordercolor "#e1bd1e" -border '4x4' "images/highlighted/$(basename $FILE .png)_highlighted.png"; 
done