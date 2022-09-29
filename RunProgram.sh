#!/bin/bash
node readCSV.js &
process_id=$!
wait $process_id
echo "readCSV.js completed."
node uploadImages.js &
process_id=$!
wait $process_id
echo "uploadImages.js completed and csv-data.json updated."
node getMapData.js &
process_id=$!
wait $process_id
echo "getMapData.js completed."
node setMapData.js &
process_id=$!
wait $process_id
echo "setMapData.js completed."
echo "Exit status: $?"
