import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getPoster } from "../../utils/helper";
import GridContainer from "../GridContainer";

export default function SearchResult({movies = []}) {
  return (
    <div>
      <GridContainer>
        {movies.map((movie) => {
          return <ListItem key={movie} movie={movie} />;
        })}
      </GridContainer>
    </div>
  );
}

const ListItem = ({ movie }) => {
  const [poster, setPoster] = useState(null);
  useEffect(() => {
    const fetchMoviePoster = async () => {
      const apiKey = '45985d74';
      const year = '';
      const url = encodeURI(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}&y=${year}&plot=full`);

      try {
        const response = await fetch(url);
        const json = await response.json();
        setPoster(json.Poster);
      } catch (error) {
        console.error('Error fetching poster:', error);
      }
    };

    fetchMoviePoster();
  }, [movie]);
  return (
    <Link to={"/movie/" + movie}>
      <img
        className="aspect-video object-cover w-full"
        src={poster}
        alt={"Loading"}
        style={{ color: 'orange' }}
      />
      <h1
        className="text-lg dark:text-white text-secondary font-semibold"
        title={movie}
      >
        {movie}
      </h1>
    </Link>
  );
};
