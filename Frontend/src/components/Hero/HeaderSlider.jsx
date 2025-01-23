import apartment1 from "../../assets/apartment1.jpg";
import apartment2 from "../../assets/apartment2.jpg";
import apartment3 from "../../assets/apartment3.webp";
import apartment4 from "../../assets/apartment4.jpg";
import apartment5 from "../../assets/apartment5.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderSlider = () => {
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

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img
            src={apartment1}
            alt="apartment"
            className="h-[400px] w-full object-cover mx-auto"
          />
        </div>
        <div>
          <img
            src={apartment2}
            alt="apartment"
            className="h-[400px] w-full object-cover mx-auto"
          />
        </div>
        <div>
          <img
            src={apartment3}
            alt="apartment"
            className="h-[400px] w-full object-cover mx-auto"
          />
        </div>
        <div>
          <img
            src={apartment4}
            alt="apartment"
            className="h-[400px] w-full object-cover mx-auto"
          />
        </div>
        <div>
          <img
            src={apartment5}
            alt="apartment"
            className="h-[400px] w-full object-cover mx-auto"
          />
        </div>
      </Slider>
    </div>
  );
};

export default HeaderSlider;

