#!/bin/bash
node readCSV.js &
process_id=$!
wait $process_id
echo "readCSV.js completed"
node getMapData.js &
process_id=$!
wait $process_id
echo "getMapData.js completed"
node setMapData.js &
process_id=$!
wait $process_id
echo "setMapData.js completed"
echo "Exit status: $?"
