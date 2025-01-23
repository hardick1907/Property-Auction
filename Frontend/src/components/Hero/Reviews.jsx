import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useUserStore } from "../../store/useUserStore";
import { useEffect, useState } from "react";

const Reviews = () => {
  const { allReviews } = useUserStore();
  const [reviews, setReviews] = useState([]);
  
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 1000,
    cssEase: "linear",
    arrows: false,
  };

  useEffect(() => {
    // Assuming `allReviews` is a function that fetches reviews
    const fetchReviews = async () => {
      const fetchedReviews = await allReviews();
      setReviews(fetchedReviews);
    };
    fetchReviews();
  }, [allReviews]);

  return (
    <div className="flex flex-col lg:flex-row gap-16 mt-16 px-16 justify-center items-center">
      {/* Left Section */}
      <div className="h-1/2 lg:h-[400px]">
        <h1 className="text-5xl font-bold text-primary-content">Reviews</h1>
        <h1 className="text-5xl font-bold text-primary mt-6">
          What They Are Saying About Our Services
        </h1>
        <p className="text-base-content mt-6">
          Integer ante tellus, bibendum eget ante ut, aliquet luctus quam.
          Integer eget ex
        </p>
      </div>

      {/* Right Section */}
      <div>
        <div className="slider-container w-[400px] lg:w-[600px] p-4">
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="chat chat-start">
                <div className="chat-bubble bg-accent text-accent-content shadow-lg">
                  {review.message}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
