#!/bin/bash


echo "readCSV.js started"
node readCSV.js &
process_id=$!
wait $process_id
echo "readCSV.js completed."


echo "uploadImages.js started"
node uploadImages.js &
process_id=$!
wait $process_id
echo "uploadImages.js completed and csv-data.json updated."


echo "getMapData.js started"
node getMapData.js &
process_id=$!
wait $process_id
echo "getMapData.js completed."


echo "setMapData.js started"
node setMapData.js &
process_id=$!
wait $process_id
echo "setMapData.js completed."

echo "Exit status: $?"
