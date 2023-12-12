import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getPoster } from "../../utils/helper";
import GridContainer from "../GridContainer";

const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "..";
};

export default function MovieList({ title, movies = [] }) {
  if (!movies.length) return null;

  return (
    <div>
      {title ? (
        <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-5">
          {title}
        </h1>
      ) : null}
      <GridContainer>
        {movies.map((movie) => {
          return <ListItem key={movie} movies={movie} />;
        })}
      </GridContainer>
    </div>
  );
}

const ListItem = ({ movies }) => {
  const { movie, rating } = movies;
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
        src = {poster}
        alt={"Loading"}
        style={{ color: 'orange' }}
      />
      <h1
        className="text-lg dark:text-white text-secondary font-semibold"
      >   
        {movie}
      </h1>
      {rating? (
        <p className="text-highlight dark:text-highlight-dark flex items-center space-x-1">
          <span>{Math.round(rating)}</span>
          <AiFillStar />
        </p>
      ) : (
        <p className="text-highlight dark:text-highlight-dark"></p>
      )}
    </Link>
  );
};
