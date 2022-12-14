import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";

import Gallery from "../../components/gallery/Gallery";
import Modal from "../../components/modal/Modal";

import { useGeneralContext } from "../../contexts/general-context/GeneralContext";

import { MdLocationOn } from "react-icons/md";

import "./SingleHotel.css";

const hotelImages = [
  "https://images.unsplash.com/photo-1565031491910-e57fac031c41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  "https://images.unsplash.com/photo-1554009975-d74653b879f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
  "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1630582837298-49d1927726e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
  "https://images.unsplash.com/photo-1462539405390-d0bdb635c7d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80",
  "https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
];

const SingleHotel = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const { dispatch, destination, price, dates, auth } = useGeneralContext();
  const [galleryIsOpen, setGalleryIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading } = useFetch(
    `http://localhost:8800/api/hotels/${hotelId}?city=${destination}&min=${price.minPrice}&max=${price.maxPrice}`
  );

  const days = () => {
    const milliseconds = Math.abs(
      dates.endDate.getTime() - dates.startDate.getTime()
    );
    return Math.ceil(milliseconds / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    dispatch({ type: "setPage", payload: "single-hotel" });
  });

  const identifyClasses = (idx) => {
    if (idx === 0) return "gallery__img0";
    if (idx === 1) return "gallery__img1";
  };

  const handleReserve = () => {
    if (!auth.user) return navigate("/login");

    setIsModalOpen(true);
  };

  return (
    <>
      {loading
        ? "LOADING"
        : data && (
            <div className="single-hotel">
              <div className="single-hotel__top">
                <div>
                  <h2 className="single-hotel__title">{data.name}</h2>
                  <p className="single-hotel__location">
                    <MdLocationOn className="icon icon--location" />
                    {data.address}, {data.city}
                  </p>
                  <p>{data.distance} m from center . Very Good</p>
                </div>
                <button className="btn btn--book">Book now</button>
              </div>
              <div className="single-hotel__gallery">
                {data.photos.length > 0
                  ? data.photos
                  : hotelImages
                      .filter((img, idx) => idx < 5)
                      .map((img, idx) => (
                        <img
                          onClick={() => setGalleryIsOpen(true)}
                          key={idx}
                          className={`${identifyClasses(
                            idx
                          )} single-hotel__gallery-img`}
                          src={img}
                          alt="hotel"
                        />
                      ))}
              </div>

              <div className="single-hotel__info">
                <div>
                  <h3 className="single-hotel__info-title">{data.title}</h3>
                  <p>{data.desc}</p>
                </div>
                <div className="single-hotel__info-box">
                  <div>
                    <h4 className="single-hotel__info-box-title">
                      Property Highlights
                    </h4>
                    <p>
                      Located in the heart of Dublin, this hotel has an
                      excellent location score of 9.3
                    </p>
                  </div>
                  <div>
                    <h4 className="single-hotel__info-box-title">
                      Breakfast Info
                    </h4>
                    <p>Full English/Irish, Vegetarian, Gluten-free, Buffet</p>
                  </div>
                  <p className="single-hotel__info-box-detail">
                    <span className="single-hotel__info-box-price">
                      ${days() * data.cheapestPrice}
                    </span>{" "}
                    (<span>{days()}</span> nights)
                  </p>
                  <button className="btn btn--reserve" onClick={handleReserve}>
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          )}

      {galleryIsOpen && (
        <Gallery images={hotelImages} setGalleryIsOpen={setGalleryIsOpen} />
      )}

      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} hotelId={hotelId} />
      )}
    </>
  );
};

export default SingleHotel;
