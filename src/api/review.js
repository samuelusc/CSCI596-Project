import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addReview = async (movieId, reviewData) => {
  const token = getToken();
  try {
    const { data } = await client.post(`/user/update-movie-ratings`, {movie:movieId ,...reviewData}, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getReviewByMovie = async (movieId) => {
  console.log(movieId);
  try {
    const { data } = await client(`/review/get-reviews-by-movie/${movieId}`);
    console.log(Math.round(data.data[0].AvgRating));
    return Math.round(data.data[0].AvgRating);
  } catch (error) {
    return catchError(error);
  }
};


