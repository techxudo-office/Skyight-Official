import React, { useEffect } from "react";
import Slider from "react-slick";
import { DashboardCards } from "../../components/components";

const DashboardHome = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
  };
  return (
    <>
      <div className="w-[80vw]">
        <Slider {...settings}>
          {Array.from({ length: 10 }).map((_, index) => (
            <DashboardCards key={index} index={index} />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default DashboardHome;
