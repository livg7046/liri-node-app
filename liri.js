require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var action = process.argv[2];
var myInput = input();
var Twitter = require('twitter');
var twitterClient = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotifyClient = new Spotify(keys.spotify);



switch (action) {
    case 'mytweets':
        myTweets();
        break;
    case 'spotify-this-song':
        mySpotify(myInput);
        break;
    case 'movie-this':
        myMovie(myInput);
        break;
    case 'do-what-it-says':
        random();
        break;
};

function myTweets() {
    var params = {
        screen_name: 'livg7046',
        count: 20
    };
    //console.log("this is where my tweets will be");
    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response){
    // console.log(tweets);
    //     console.log(response.statusCode);
    //     console.log(error);
    //    console.log(tweets);
       for(var i=0; i<tweets.length; i++) {
           console.log(tweets[i].text);
       }
    });
    
};


function input() {

    var nodeArgs = process.argv;
    var userRequest = "";
    
    for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
        
            userRequest = userRequest + "+" + nodeArgs[i];
        
            }
        
            else {
        
            userRequest += nodeArgs[i];
        
            }
        }
    return userRequest
};

function mySpotify(song) {
    
    console.log('here');
    if (song == null) {
        song = 'The Sign';
    }
    var param = {
         type: 'track', query: song 
    } 
    spotifyClient.search(param, function(error, response) {
            console.log('Artist: ' + response.tracks.items[0].artists[0].name);
            console.log('Song: ' +response.tracks.items[0].name);
            console.log('Preview Link: ' + response.tracks.items[0].preview_url);
            console.log('Album: ' + response.tracks.items[0].album.name);   
    })
};



function myMovie(movie) {
    console.log(movie);
      if (movie == "") {
            console.log("No movie idea? Here is a movie you can watch...I hear it's on Netflix!")
            movie = 'Mr. Nobody';
            console.log(movie)
        } 
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  
    
    request(queryUrl, function(error, response, body) {
        //console.log(JSON.parse(body));
        if (!error && response.statusCode === 200) {
            
            var jsonBody = JSON.parse(body);
            // console.log(jsonBody);
            console.log("Movie Title: " + jsonBody.Title);
            console.log("Release Year: " + jsonBody.Year);
            console.log("IMDB Rating: " + jsonBody.imdbRating);
            console.log("Rotten Tomatoes Rating: " + jsonBody.Year);
            console.log("Country: " + jsonBody.Country);
            console.log("Language: " + jsonBody.Language);
            console.log("Plot: " + jsonBody.Plot);
            console.log("Actors: " +jsonBody.Actors);
        }
    })
    

};

//   * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
