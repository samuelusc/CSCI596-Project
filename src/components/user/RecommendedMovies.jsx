import React, { useState, useEffect } from "react";

import { getRecommendedMovies} from "../../api/movie";
import { useNotification } from "../../hooks";
import GridContainer from "../GridContainer";
import MovieList from "./MovieList";

export default function RecommendedMovies() {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMovies = async (signal) => {
    const movies = await getRecommendedMovies();
    console.log(movies);
    setMovies([...movies]);
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchMovies(ac.signal);
    return () => {
      ac.abort();
    };
  }, []);

  return <MovieList movies={movies} title="You may also like" />;
}
