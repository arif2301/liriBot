
// initiating all the packages
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");

// this reads the initial command
var command = 
process.argv[2];
var subject = process.argv.slice(3).join("+");
// slice(3).join + " "
// var term = process.argv.slice(3).join(" ");
console.log (command);
console.log (subject);
var movieName = subject.split("+");
console.log (movieName);


function introduction() {
    console.log("Welcome to LiriBot");
}
    
// primary function that runs all the commands based on user input
function runCommand(command) {
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
    
};

function runConcert() {

};

function runMusic() {

};

function runMovie() {
    axios.get("http://www.omdbapi.com/?t="+subject+"&y=&plot=short&apikey=trilogy").then(
    function(response) {
        console.log("The movie's rating is: " + response.data.imdbRating);
        console.log("Title of the movie " + response.data.Title);
        console.log("IMDB Rating of the movie " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating of the movie" + response.data.Ratings);
        console.log("Country where the movie was produced" + response.data.Country);
        console.log("Language of the movie" + response.data.Language);
        console.log("Plot of the movie" + response.data.Plot);
        console.log("Actors in the movie" + response.data.Actors);
    })
    .catch(function(error) {
        if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
        } else if (error.request) {
        // The request was made but no response was receive
        console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        }
        console.log(error.config);
    });
   //Title of the movie. - response.data.Title
   // Year the movie came out.- response.data.Year
   // IMDB Rating of the movie.- response.data.imdbRating
   // Rotten Tomatoes Rating of the movie.- response.data.Ratings[{"Rotten Tomatoes"}]
   // Country where the movie was produced.- response.data.Country
   // Language of the movie.- response.data.Language
   // Plot of the movie.- response.data.Plot
   // Actors in the movie.- response.data.Actors

};

function runText() {
    fs.readFile("best_things_ever.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
      
        // Breaking  the string down 
        var output = data.split(",");
        command = output [0];
        subject = output [1];

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
            default :
                console.log ("not a recognized command");            
        }       
    });
}

runCommand(command)


