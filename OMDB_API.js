const fetch = require('node-fetch');

var title = 'Aquaman';
var year = '2018';
const url = encodeURI('http://www.omdbapi.com/?apikey=57e618fe&t=' + title + '&y=' + year + '&plot=full');

fetch(url).then(res => res.json()).then(json => {
    if (json.Response === 'True') {
        var movie = {};
        movie.title = json.Title;
        movie.year = json.Year;
        movie.description = json.Plot;
        movie.poster = json.Poster;
        movie.rating = json.imdbRating;
        movie.director = json.Director;
        movie.writer = json.Writer;
        movie.cast = json.Actors;
        movie.genre = json.Genre;
        console.log(movie);
    }
    else {
        console.log(json.Error);
    }
})