import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../../../redux/slices/restaurantSlice";
import ExploreCard from "./exploreCard";
import "./exploreSection.css";

const ExploreSection = ({ collectionName }) => {
  const dispatch = useDispatch();
  const { restaurants, status, error } = useSelector(
    (state) => state.restaurants
  );

  const [page, setPage] = useState(1); // Start from page 1
  const [allRestaurants, setAllRestaurants] = useState([]); // To keep track of all loaded restaurants

  // Function to fetch more restaurants
  const loadMoreRestaurants = () => {
    if (status !== "loading") {
      dispatch(fetchRestaurants({ page, limit: 10, countryCode: 1 })).then(
        (newRestaurants) => {
          setAllRestaurants((prevRestaurants) => [
            ...prevRestaurants,
            ...newRestaurants.payload,
          ]);
        }
      );
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.innerHeight + window.scrollY;
      if (currentScroll + 100 >= scrollHeight) {
        // Buffer for scroll trigger
        loadMoreRestaurants();
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, status]);

  useEffect(() => {
    loadMoreRestaurants(); // Load initial restaurants
  }, []);

  if (status === "loading" && allRestaurants.length === 0)
    return <p>Loading...</p>;
  if (status === "failed") return <p>{error}</p>;

  return (
    <div className="max-width explore-section">
      <div className="collection-title">{collectionName}</div>
      <div className="explore-grid">
        {allRestaurants.map((restaurant, index) => (
          <ExploreCard
            key={restaurant["Restaurant ID"]}
            unique_id={restaurant["Restaurant ID"]}
            restaurant={restaurant}
            restaurants={allRestaurants} // Pass the entire list to ExploreCard
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreSection;
