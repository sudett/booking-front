import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";

import Gallery from "../../components/gallery/Gallery";
import Modal from "../../components/modal/Modal";

import { useGeneralContext } from "../../contexts/general-context/GeneralContext";

import { MdLocationOn } from "react-icons/md";

import "./SingleHotel.css";

const hotelImages = [
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/343299148.jpg?k=7127b198ef04f693ace112d7f97b41277b41ab1d11f0fdba4bc8453bc6a900fa&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/124965989.jpg?k=1d2bcce6cb2b44d8c02aa0bcc00a3fd508101526c4ac075242ef48bf7e8d183c&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/407809978.jpg?k=ba211bb599c23f859091cff0ef710f4e8a909c48f1f81856d5b303e5cb70f1d9&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/40723751.jpg?k=abc3cfda67abbe544c3076d06ae6806182d467213b08c8910c7813e882385f64&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/219532111.jpg?k=776dad0bd6c695581d2ffe5aa3e7476df84c489ee5851e0065e91491a2ce3985&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/276434861.jpg?k=e30a0a752e167238d759a0224f01a276ba80fcfde3152e8cae458f1706163d4a&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/38670637.jpg?k=d55f2de332ba0ea6c539d7df365223d7df231e60f84ad16e736f558df03b2894&o=&hp=1",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/339449269.jpg?k=81d021cee00345f3dbdcb6850d796c6335810681e8c91949b2141b9cb4e68a75&o=&hp=1",
];

const SingleHotel = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const { dispatch, destination, price, dates, auth } = useGeneralContext();
  const [galleryIsOpen, setGalleryIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading } = useFetch(
    `https://magnificent-top-hat-bull.cyclic.app/api/hotels/${hotelId}?city=${destination}&min=${price.minPrice}&max=${price.maxPrice}`
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
