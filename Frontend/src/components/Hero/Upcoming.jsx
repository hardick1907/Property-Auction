import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAdminStore } from "../../store/useAdminStore";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        scale: "2",
        backgroundColor: "#181a2a",
        borderRadius: "50%",
        paddingTop: "1.6px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        scale: "2",
        backgroundColor: "#181a2a",
        borderRadius: "50%",
        paddingTop: "1.6px",
      }}
      onClick={onClick}
    />
  );
}

const Upcoming = () => {
  const { isLoading, properties, getAllProperties } = useAdminStore();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProperties();
  }, [getAllProperties]);

  useEffect(() => {
    const today = new Date();
    const activeProperties = properties.filter((property) => {
      const startDate = new Date(property.startDate);
      return startDate > today;
    });
    
    setFilteredProperties(activeProperties);
  }, [properties]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/auctions/${propertyId}`);
  };

  return (
    <div className="flex flex-1 flex-col p-4 lg:px-10 mt-16">
      {/* Header */}
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold text-primary text-center">
          Upcoming Auction
        </h1>
      </div>

      <div className="flex justify-center">
        <p className="text-center p-3 text-base-content">
          Integer ante tellus, bibendum eget ante ut, aliquet luctus quam.
          Integer eget ex hendrerit mattis mauris.
          <br />
          Vestibulum ante ipsum primis in faucibus orci luctus et.
        </p>
      </div>

      {/* Slider */}
      <div className="slider-container mt-16 px-14">
        <Slider {...settings}>
          {filteredProperties.map((property, idx) => (
            <div key={idx} className="px-4">
              <div className="card image-full h-64 w-full text-base-content relative">
                <figure className="h-full w-full">
                  <img
                    src={property.propertyImage}
                    alt="Property"
                    className="h-full w-full object-cover"
                  />
                </figure>
                <div className="card-body absolute inset-0 flex flex-col justify-between bg-black bg-opacity-20">
                  <div>
                    <h2 className="card-title text-white">{property.title}</h2>
                    <p className="text-white">{property.address}</p>
                  </div>
                  <div className="card-actions justify-end">
                  <button
                  onClick={() => handleViewDetails(property._id)}
                  className="btn btn-primary"
                  >
                    View
                  </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Upcoming;
