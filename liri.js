require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");

// this reads the initial command
var command = parseInt(process.argv[2]);

function introduction() {
    console.log("Welcome to LiriBot")
}
    
// primary function that runs all the commands based on user input
function runCommand() {
    switch (command){
        case "concert-this" : 
            runConcert();
            break;
        case "spotify-this-song" : 
            runMusic();
            break;
        case "movie-this" : 
            runMovie();
            break;
        case "do-what-it-says":
            runText();
            break;
        default :
            console.log ("not a recognized command");            
    }
    
}

function runConcert() {

}

function runMusic() {

}

function runMovie() {

}

function runText() {
    fs.readFile("best_things_ever.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
      
        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");
      
        // Loop Through the newly created output array
        for (var i = 0; i < output.length; i++) {
      
          // Print each element (item) of the array/
          console.log(output[i]);
        }
      });

}


