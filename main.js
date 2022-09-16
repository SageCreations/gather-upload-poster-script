const jsonData = require("./Output.json"); 

function get_video_stuff_test_func(data) {
    for (var i in data.objects) {
        
        if (data.objects[i]._name == "Bulletin (Video)") {
            console.log("X: " + data.objects[i].x + "\tY: " + data.objects[i].y)
        }
        
    }
}

get_video_stuff_test_func(jsonData)

// this currently works, it reads for specific object name and prints the x,y to console
// TODO: abstract this so it goes through each MAP_ID listed from the csv
// TODO: make js file that reads the user imported csv file, store the csv into a json format
// making the csv in a json format will make it easier to manipulate the data