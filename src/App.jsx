import React, { useState, useRef, useEffect } from "react";
import Header from "./Components/Header/Header";
import FoodItem from "./Components/FoodItem/FoodItem";
// import "../src/app.css";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import staticMenu from "./Data/Data";

function App() {
  // State variables
  const [menu, setMenu] = useState(staticMenu); // Use static data
  const [previewImage, setPreviewImage] = useState(null); // Holds the image for the full-screen modal preview
  const foodItemRefs = useRef([]); // References to food items for scroll animations

  // Scroll animations using IntersectionObserver
  useEffect(() => {
    // Initially hide all food items
    foodItemRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.add("hidden");
      }
    });

    // Set up the observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("hidden"); // Reveal the item
            entry.target.classList.add("visible"); // Add animation class
          }
        });
      },
      { threshold: 0.1 } // Trigger the animation when 10% of the element is visible
    );

    // Attach observer to each food item
    foodItemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Cleanup observer on component unmount
    return () => {
      foodItemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [menu]);

  // Function to close the modal by clearing the preview image state
  const closeModal = () => setPreviewImage(null);

  return (
    <>
      <Header />
      {/* Display the list of food items */}
      <div className="foods-container">
        {menu.map(({ id, title, img, price, description }, index) => (
          <div
            key={id}
            className="food-item"
            ref={(el) => (foodItemRefs.current[index] = el)} // Assign a unique reference for animations
          >
            <FoodItemWithToggle
              foodName={title}
              foodImage={img}
              foodPrice={typeof price === "number" ? price : parseFloat(price)}
              foodDesc={description}
              id={id} // Pass the food item's ID to the component
              isOwner={false} // No owner-related features in the static version
            />
          </div>
        ))}
      </div>

      {/* Full-screen image modal */}
      {previewImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img
              src={previewImage}
              alt="Full Preview"
              className="modal-image"
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

function FoodItemWithToggle({ foodName, foodImage, foodPrice, foodDesc, id }) {
  const [showFullDescription, setShowFullDescription] = useState(false); // Toggles the display of the full description
  const [imageLoaded, setImageLoaded] = useState(false); // Tracks the loading state of the image
  const [isModalOpen, setIsModalOpen] = useState(false); // Toggles the image modal

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev); // Toggle description visibility
  };

  const openModal = () => setIsModalOpen(true); // Open the image modal
  const closeModal = () => setIsModalOpen(false); // Close the image modal

  const isLongDescription = foodDesc.length > 290; // Check if the description exceeds 290 characters
  const displayedDescription = showFullDescription
    ? foodDesc
    : `${foodDesc.substring(0, 290)}...`; // Truncate if necessary

  return (
    <div className="food-item">
      <h3>{foodName}</h3>
      <div className="image-wrapper" onClick={openModal}>
        {!imageLoaded && <div className="placeholder">Loading...</div>}{" "}
        <img
          src={foodImage}
          alt={`${foodName}`}
          className={`food-image ${imageLoaded ? "loaded" : "loading"}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)} // Mark image as loaded
        />
      </div>
      <p className="food-price">ETB {foodPrice.toFixed(2)}</p>
      <p className="description">
        {isLongDescription ? displayedDescription : foodDesc}
      </p>
      {isLongDescription && (
        <button onClick={toggleDescription} className="toggle-desc-button">
          {showFullDescription ? "Show Less" : "See More Details"}
        </button>
      )}

      {/* Modal for the full image preview */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img src={foodImage} alt="Full Preview" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
