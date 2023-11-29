# CSCI596-Project

**Team members:** Jialiang Wang, shengyi Liu, Zitong Li, Zoey Zhang, Guodong Sun, Xinru Hong
**Set-up:** Oct. 10, 2023

👉🏽 For this project, we will be using:

- [Final project description](https://github.com/samuelusc/CSCI596-Project/blob/main/Final.pdf)
- [Google Document](https://docs.google.com/document/d/1RiSPeehtdKsfRRoqi4PO4-cUTPvHlyLx88id9U7Svas)

## Databases and Movie Detail API

### Database used

MongoDB

### Things Stored in Database

* User information
* Movie reviews
* Pre-trained result for movie recommendation

### Movie Detail API:

Request movie details (movie title, movie overview, movie poster, etc.) from [TMDB](https://www.themoviedb.org/).

#### Example Response

```json
{
  adult: false,
  backdrop_path: '/bckxSN9ueOgm0gJpVJmPQrecWul.jpg',
  genre_ids: [ 28, 12, 14 ],
  id: 572802,
  original_language: 'en',
  original_title: 'Aquaman and the Lost Kingdom',
  overview: "Black Manta, still driven by the need to avenge his father's death and wielding the power of the mythic Black Trident, will stop at nothing to take Aquaman down once and for all. To defeat him, Aquaman must turn to his imprisoned brother Orm, the former King of Atlantis, to forge an unlikely alliance in order to save the world from irreversible destruction.",
  popularity: 253.712,
  poster_path: '/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg',
  release_date: '2023-12-20',
  title: 'Aquaman and the Lost Kingdom',
  video: false,
  vote_average: 0,
  vote_count: 0
}
```
