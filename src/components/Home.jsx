import React from "react";
import Container from "./Container";
import NotVerified from "./user/NotVerified";
import TopRatedMovies from "./user/TopRatedMovies";
import RecommendedMovies from "./user/RecommendedMovies";
import AppSearchForm from "./form/AppSearchForm";
import {useNavigate} from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleSearchSubmit = (query) => {
    navigate("/movie/search?title=" + query);
  };
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container className="px-2 xl:p-0">
        <NotVerified />
        <div className="space-y-3 py-8">
        <div className="text-6xl font-bold text-center my-8 text-white">
           MovieMate
        </div>
        <AppSearchForm
                placeholder="search..."
                onSubmit={handleSearchSubmit}
              />
          <TopRatedMovies />
          <RecommendedMovies />
          
        </div>
      </Container>
    </div>
  );
}
