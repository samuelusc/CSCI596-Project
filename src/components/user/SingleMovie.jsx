import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { convertReviewCount } from "../../utils/helper";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import AddRatingModal from "../models/AddRatingModal";
import RatingStar from "../RatingStar";
import RelatedMovies from "../RelatedMovies";
import { getReviewByMovie } from "../../api/review";


export default function SingleMovie() {
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [movie, setMovie] = useState({});
  const [rate, setRate] = useState({});
  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  const fecthRate = async () => {
    const rateVal = await getReviewByMovie(movieId);
    setRate(rateVal);
  }

  const fetchMovie = async () => {
    const apiKey = '45985d74';
    const year = '';
    const url = encodeURI(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movieId}&y=${year}&plot=full`);
    
    const response = await fetch(url);
    const json = await response.json();
    console.log(movieId)
    console.log(json)
      const movie = {
        title: json.Title,
        poster: json.Poster,
        storyLine: json.Plot,
        releaseDate: json.Released,
        director: json.Director,
        reviews: 1,
        writers: json.Writer,
        cast: json.Actors,
        genres: json.Genre,
      };

    setReady(true);
    setMovie(movie);
    console.log(movie)
  };

  const handleOnRateMovie = () => {
    if (!isLoggedIn) return navigate("/auth/signin");
    setShowRatingModal(true);
  };

  const hideRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviews: { ...reviews } });
  };

  useEffect(() => {
    if (movieId) fetchMovie();
    fecthRate();
  }, [movieId]);

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please wait
        </p>
      </div>
    );

  const {
   title,
        poster,
        storyLine,
        releaseDate,
        director, 
        reviews,
        writers,
        cast,
        genres,
  } = movie;

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2 ">
        
        <div className="flex justify-between">
          <h1 className="xl:text-4xl lg:text-3xl text-2xl  text-highlight dark:text-highlight-dark font-semibold py-3">
            {title}
          </h1>
          <div className="flex items-center justify-center">
          <img src={poster} className="max-w-md"></img>
        </div>
          <div className="flex flex-col items-end">
            <RatingStar rating={rate} />
            <CustomButtonLink
              label="Rate the movie"
              onClick={handleOnRateMovie}
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>
          <ListWithLabel label="Director:">
          <p className="text-highlight dark:text-highlight-dark hover:underline">
          {director}
          </p>
          </ListWithLabel>

          <ListWithLabel label="Writers:">
          <p className="text-highlight dark:text-highlight-dark hover:underline">
          {writers}
          </p>
          </ListWithLabel>

          <ListWithLabel label="Cast:">
          <p className="text-highlight dark:text-highlight-dark hover:underline">
          {cast}
          </p>
          </ListWithLabel>
          <ListWithLabel label="Release Date:">
          <p className="text-highlight dark:text-highlight-dark hover:underline">
          {releaseDate}
          </p>
          </ListWithLabel>

          <ListWithLabel label="Genre:">
          <p className="text-highlight dark:text-highlight-dark hover:underline">
          {genres}
          </p>
          </ListWithLabel>
          <RelatedMovies movieId={"The Sixth Sense"} />
        </div>
      </Container>
      <AddRatingModal
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
      
    </div>
  );
}

const ListWithLabel = ({ children, label }) => {
  return (
    <div className="flex space-x-2">
      <p className="text-light-subtle dark:text-dark-subtle font-semibold">
        {label}
      </p>
      {children}
    </div>
  );
};


