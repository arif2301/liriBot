// LIRIBOT
// initiating all the packages
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require ("moment");

// this reads the initial command
var command = process.argv[2];
var subject = process.argv.slice(3).join("+");

// the 3 api calls require search variable in different ways, so they are declared here
// and not in the function
var movieName = subject.split("+");
var songName = process.argv.slice(3).join(" ");
var artistName = process.argv.slice(3).join(" ");

//console.log ("movie name " + movieName);

// general welcome banner
function introduction() {
    console.log("**************    Welcome to LiriBot   ***************");
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
    console.log ("You have chosen to look for a Concert");
    // api call for bands in town
    axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp").then(
    function(response) {
        console.log("You want to go to a concert for the artist : " + artistName);
        console.log("Name of the Venue : " + response.data[0].venue.name);
        console.log("Venue location : " + response.data[0].venue.city + " , " + response.data[0].venue.country);
        
        var date = moment(response.data[0].datetime).format("MMM Do YYYY");   
        console.log("Date of the Event : " + date);
        //Date of the Event (use moment to format this as "MM/DD/YYYY")
        })
    .catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log ("error 1 : The request was made and the server responded with a status code")
        } else if (error.request) {
            // The request was made but no response was receive
            console.log ("error 2 : The request was made but no response was received, Sorry try again")
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log ("error 3 : Sorry " + artistName + " currently has no upcoming concerts.")
        }
        console.log(error.config);
    });
};

function runMusic() {
    // intro and variables
    console.log ("You have chosen to look for a Song");
    var spotify = new Spotify(keys.spotify);
    // actual search query for spotify
    spotify.search({ type: 'track', query: ("'" + songName + "'" ) })
    .then(function(response) {
            console.log ("Name of the Song: " + response.tracks.items[0].name); 
            console.log ("Name of the Artist: " + response.tracks.items[0].album.artists[0].name); 
            console.log ("Name of the Album: " + response.tracks.items[0].album.name);
            console.log ("Link to a sample of the song: ");
            console.log (response.tracks.items[0].external_urls);
        
    })
    
    // if search results in an undefined value, we will out put the song 'the sign'
    .catch(function(err) {
        spotify.search({ type: 'track', query: ("'the sign Ace of base '" ) })
        .then(function(response) {
            console.log ("Sorry Spotify had no results for "+ songName + ". So here another song");
            console.log ("Name of the Song: " + response.tracks.items[0].name); 
            console.log ("Name of the Artist: " + response.tracks.items[0].album.artists[0].name); 
            console.log ("Name of the Album: " + response.tracks.items[0].album.name);
            console.log ("Link to a sample of the song: ");
            console.log (response.tracks.items[0].external_urls);
        })
    });
};

function runMovie() {
    console.log ("You have chosen to look for a movie");

    // if user does not enter a movie, we will select Mr. Nobody for them
    if (process.argv[3] == null){
        console.log("You didn't select a movie so we selected one for you");
        movieName = "Mr Nobody";
    }

    axios.get("http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy").then(
    function(response) {
        console.log("Title of the movie : " + response.data.Title);
        console.log("IMDB Rating of the movie : " + response.data.imdbRating);
        //i was unsuccessful is making the rotten tomatoes 
        //console.log("Rotten Tomatoes Rating of the movie :" + response.data.Ratings{2});
        console.log("Country where the movie was produced : " + response.data.Country);
        console.log("Language of the movie : " + response.data.Language);
        console.log("Plot of the movie : " + response.data.Plot);
        console.log("Actors in the movie : " + response.data.Actors);
    })
    .catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log ("error 1 : The request was made and the server responded with a status code")
        } else if (error.request) {
            // The request was made but no response was receive
            console.log ("error 2 : The request was made but no response was received, Sorry try again")
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log ("error 3 : Sorry your search query was invalid, try again.")
        }
        console.log(error.config);
    });
};

function runText() {
    console.log ("You have asked LiriBot to read a text file");
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
      
        // Breaking  the string down 
        var output = data.split(",");
        command = output [0];
        subject = (output[1]).trim();

        // running throught the options again, the global variable used to store user input from the terminal is redefined here to read info from the random.txt file
        switch (command){
            case "concert-this" : 
                artistName = subject;
                runConcert();
                break;
            case "spotify-this-song" : 
                songName = subject;
                runMusic();
                break;
            case "movie-this" : 
                movieName = subject;
                runMovie();
                break;
            default :
                console.log ("not a recognized command");            
        }       
    });
}
introduction();
runCommand(command);


