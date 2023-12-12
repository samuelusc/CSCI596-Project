import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const getMovies = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client(
      `/movie/movies?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getRecommendedMovies = async() => {
  const token = getToken();
  try {
    const { data } = await client(
      "/movie/recommended-movies",
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
      );
    const format_data = data[0].recommendedMovies.slice(0, 5).map(item => ({movie:item.Movie, rating: item.avgRating}));
    return format_data;
  } catch (error) {
    return catchError(error);
  }
}

export const getTopRatedMovies = async (type, signal) => {
  try {
    const { data } = await client("/movie/top-rated");
    const extractedData = data.map(item => ({ movie: item.Movie, rating: item.avgGrade }));
    const sortedData = extractedData.sort((a, b) => b.rating - a.rating);
    return sortedData;
  } catch (error) {
    return catchError(error);
  }
};

export const getSingleMovie = async (id) => {
  try {
    const { data } = await client("/movie/single/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getRelatedMovies = async (id) => {
  try {
    console.log(id);
    const { data } = await client("/movie/related/" + id);
    console.log(data);
    return data.map(item => ({ movie: item.SimilarMovie}));
  } catch (error) {
    return catchError(error);
  }
};

export const searchPublicMovies = async (title) => {
  try {
    const { data } = await client("/movie/search-public?partialTitle=" + title);
    return data.slice(0, 5).map(item => item.title);
  } catch (error) {
    return catchError(error);
  }
};
