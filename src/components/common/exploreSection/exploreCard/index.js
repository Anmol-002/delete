import React from "react";
import "./exploreCard.css";
import { Link } from "react-router-dom";
const ExploreCard = ({ unique_id, restaurant, restaurants }) => {
  const name = restaurant["Restaurant Name"];
  let coverImg = restaurant["featured_image"];

  // If the current restaurant doesn't have an image, pick a random restaurant with a featured image
  if (!coverImg) {
    const availableImages = restaurants
      .map((rest) => rest["featured_image"])
      .filter((img) => img); // Filter out empty images
    if (availableImages.length > 0) {
      coverImg =
        availableImages[Math.floor(Math.random() * availableImages.length)];
    }
  }

  const rating = restaurant["Aggregate rating"];
  const approxPrice = restaurant["Average Cost for two"];

  return (
    <Link to={`/restaurant/${unique_id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="explore-card cur-po">
      <div className="explore-card-cover">
        {coverImg ? (
          <img src={coverImg} alt={name} className="explore-card-image" />
        ) : (
          <div className="placeholder">Image Not Available</div>
        )}
      </div>
      <div className="res-row">
        <div className="res-name">{name}</div>
        {rating && (
          <div className="res-rating absolute-center">
            {rating} <i className="fi fi-rr-star absolute-center"></i>
          </div>
        )}
      </div>
      <div className="res-row">
        {approxPrice ? (
          <div className="res-price"> ₹{approxPrice} for two</div>
        ) : (
          <div className="res-price"> Price not available</div>
        )}
      </div>
    </Link>
  );
};

export default ExploreCard;
