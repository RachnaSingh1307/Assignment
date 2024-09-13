import React, { useEffect, useState } from "react";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaQuestionCircle,
  FaThLarge,
} from "react-icons/fa";

function GalleryWidget() {
  const [images, setImages] = useState([]); // Store Base64 images
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index for image display

  // Handle image selection and convert to Base64
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Get all selected files
    const fileReaders = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // Convert to Base64
        reader.onerror = reject;
        reader.readAsDataURL(file); // Read the file as a Data URL (Base64)
      });
    });

    // Wait for all files to be read as Base64
    Promise.all(fileReaders).then((newImages) => {
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages); // Append new Base64 images to the state
      localStorage.setItem("galleryImages", JSON.stringify(updatedImages)); // Save updated images to local storage
    });
  };

  // Load images from local storage when the component mounts
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("galleryImages"));
    if (storedImages) {
      setImages(storedImages); // Load Base64 images from local storage
    }
  }, []);

  // Function to show the next image
  const nextImage = () => {
    if (currentIndex + 1 < images.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to show the previous image
  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative bg-gray-800 text-white rounded-lg pl-11 pt-2 pr-2 shadow-lg">
      {/* Question Mark Icon in the Corner */}
      <div className="absolute top-2 left-2">
        <FaQuestionCircle
          size={24}
          style={{
            borderRadius: "50%",
            padding: "3px",
            background: "linear-gradient(to top, #131b24, #8e9096)",
          }}
        />
        <FaThLarge
          className="text-gray-400 mt-12"
          style={{ fontSize: "14px" }}
        />
      </div>

      {/* Gallery Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="bg-black px-4 py-1 rounded-lg">Gallery</h2>
        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button
            style={{
              boxShadow: "2px 2px 15px rgba(0, 0, 0, 10)",
            }}
            className="bg-gray-600 px-3 py-1 rounded-full"
            onClick={() => document.getElementById("imageInput").click()}
          >
            + Add Image {/* Add Button */}
          </button>

          <FaArrowCircleLeft
            className="icon-gradient"
            onClick={prevImage}
            disabled={currentIndex === 0}
          />
          <FaArrowCircleRight
            className="icon-gradient"
            onClick={nextImage}
            disabled={currentIndex + 1 >= images.length} // Disable if at the end
          />
        </div>
      </div>

      {/* Hidden input for image selection */}
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        style={{ display: "none" }}
        multiple // Allow multiple image selection
        onChange={handleImageChange}
      />

      {/* Image Display */}
      <div className="flex justify-center mt-4 pb-2">
        <div className="grid grid-cols-3 gap-4">
          {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
            <div key={index} className="w-30 h-30 bg-gray-700 rounded-lg m-1">
              <img
                src={image}
                alt={`Selected ${index}`}
                className="w-full h-full object-cover border rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GalleryWidget;
