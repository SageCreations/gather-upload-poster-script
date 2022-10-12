#! /bin/bash
node readCSV.js &
process_id=$!
wait $process_id
echo "csv-data.json created."
node changeBG.js &
process_id=$!
wait $process_id
echo "background image should of changed."