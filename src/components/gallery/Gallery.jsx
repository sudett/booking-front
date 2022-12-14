import React, { useState } from "react";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

import "./Gallery.css";

const Gallery = ({ images, setGalleryIsOpen }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(1);

  const moveLeft = () => {
    setPrevIdx(activeIdx);
    setActiveIdx((prevActiveIdx) =>
      prevActiveIdx === images.length - 1 ? 0 : prevActiveIdx + 1
    );
  };

  const moveRight = () => {
    setActiveIdx(prevIdx);
    setPrevIdx((prePrevIdx) =>
      prePrevIdx === 0 ? images.length - 1 : prePrevIdx - 1
    );
  };

  const identifyClasses = (idx) => {
    if (idx === activeIdx) return "gallery__img--active";
    if (idx === prevIdx) return "gallery__img--prev";
    return "gallery__img--next";
  };

  return (
    <div className="gallery">
      <IoCloseCircle
        onClick={() => setGalleryIsOpen(false)}
        className="btn--close"
      />
      <div className="gallery__container">
        <FaArrowAltCircleLeft onClick={moveLeft} className="btn--left" />
        {images.map((img, idx) => (
          <img
            key={idx}
            className={`${identifyClasses(idx)} gallery__img`}
            src={img}
            alt="hotel"
          />
        ))}
        <FaArrowAltCircleRight onClick={moveRight} className="btn--right" />
      </div>
    </div>
  );
};

export default Gallery;
