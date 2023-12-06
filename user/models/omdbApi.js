const fetch = require('node-fetch');

const apiKey = '45985d74'; // Replace with your actual OMDb API key
var title = 'Aquaman';
var year = '2018';
const url = encodeURI(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}&y=${year}&plot=full`);

fetch(url)
    .then(res => res.json())
    .then(json => {
        if (json.Response === 'True') {
            var movie = {
                title: json.Title,
                year: json.Year,
                description: json.Plot,
                poster: json.Poster,
                rating: json.imdbRating,
                director: json.Director,
                writer: json.Writer,
                cast: json.Actors,
                genre: json.Genre
            };
            console.log(movie);
        } else {
            console.log(json.Error);
        }
    })
    .catch(err => console.error('Error:', err));
