import React from "react";
import "./FoodItem.css";
const FoodItem = ({ foodImage, foodName, foodPrice, foodDesc }) => {
  const price =
    typeof foodPrice === "number" ? foodPrice : parseFloat(foodPrice);

  return (
    <div className="single-food">
      <div className="img">
        <img src={foodImage} alt={foodName} />
      </div>
      <div className="title-price">
        <h3>{foodName}</h3>
        {price && !isNaN(price) && <p>${price.toFixed(2)}</p>}
      </div>
      <div className="food-desc">{foodDesc}</div>
    </div>
  );
};

export default FoodItem;
