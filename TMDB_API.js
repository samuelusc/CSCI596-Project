const fetch = require('node-fetch');

var name = 'Aquaman and the Lost Kingdom';
const url = encodeURI('https://api.themoviedb.org/3/search/movie?query=' + name);
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhkZTVlMjQ1N2UzMzkwMmJjMTNmNWNkZjRiOWExNyIsInN1YiI6IjY1NTUyODI0OTY1M2Y2MTNmODY0NTkyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aW2sSOeHiTIk6fA0tGiXzOgeRKJdY5q_vYMUeibTyiA'
    }
};

fetch(url, options)
    .then(res => res.json())
    .then(json => {
        // console.log(json.results[0]);
        var title = json.results[0].title;
        var overview = json.results[0].overview;
        const baseUrl = 'https://image.tmdb.org/t/p/original';
        var poster = json.results[0].poster_path;
        console.log('Title: ', title);
        console.log('Overview: ', overview);
        console.log('Poster: ', baseUrl + poster);
    })
    .catch(err => console.error('error:' + err));