#! /bin/bash

node changeBG.js &
process_id=$!
wait $process_id
echo "background image should of changed."