import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Submit from "./Submit";

const createArray = (count) => {
  return new Array(count).fill("");
};

const ratings = createArray(5);
export default function RatingForm({ busy, initialState, onSubmit }) {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");

  const handleMouseEnter = (index) => {
    const ratings = createArray(index + 1);
    setSelectedRatings([...ratings]);
  };

  const handleSubmit = () => {
    if (!selectedRatings.length) return;
    const data = {
      rating: selectedRatings.length,
    };

    onSubmit(data);
  };

  useEffect(() => {
    if (initialState) {
      setContent(initialState.content);
      setSelectedRatings(createArray(initialState.rating));
    }
  }, [initialState]);

  return (
    <div>
      <div className="p-5 dark:bg-primary bg-white rounded space-y-3">
        <div className="text-highlight dark:text-highlight-dark flex items-center relative">
          <StarsOutlined ratings={ratings} onMouseEnter={handleMouseEnter} />
          <div className="flex items-center absolute top-1/2 -translate-y-1/2">
            <StarsFilled
              ratings={selectedRatings}
              onMouseEnter={handleMouseEnter}
            />
          </div>
        </div>
        <Submit busy={busy} onClick={handleSubmit} value="Rate This Movie" />
      </div>
    </div>
  );
}

const StarsOutlined = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <AiOutlineStar
        onMouseEnter={() => onMouseEnter(index)}
        className="cursor-pointer"
        key={index}
        size={24}
      />
    );
  });
};

const StarsFilled = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <AiFillStar
        onMouseEnter={() => onMouseEnter(index)}
        className="cursor-pointer"
        key={index}
        size={24}
      />
    );
  });
};
