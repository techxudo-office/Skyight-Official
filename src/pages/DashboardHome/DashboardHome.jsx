import React, { useEffect, useState } from "react";
import {
  DashboardCards,
  Table,
  SecondaryButton,
  ConfirmModal,
} from "../../components/components";
import { getRoutes, getFlightBookings } from "../../utils/api_handler";
import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import toast from "react-hot-toast";

import { FaEye } from "react-icons/fa";
import { HiReceiptRefund } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const DashboardHome = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 2500, // Adjust speed for smaller screens
          dots:false
        },
      },
      {
        breakpoint: 480, // Mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
          dots:false

        },
      },
    ],
  };
  

  const navigate = useNavigate();

  const [flightsData, setFlightsData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);

  const navigationHandler = () => {
    navigate("/dashboard/search-flights");
  };

  const getActiveRoutes = async () => {
    let response = await getRoutes();
    if (response.status) {
      setFlightsData(response.data.slice(0, 3));
    }
  };

  useEffect(() => {
    getActiveRoutes();
  }, []);

  const columnsData = [
    { columnName: "No.", fieldName: "no.", type: "no." },
    { columnName: "Origin", fieldName: "origin", type: "text" },
    { columnName: "Destination", fieldName: "destination", type: "text" },
    { columnName: "Total Fare", fieldName: "total_fare", type: "text" },
    { columnName: "Currency", fieldName: "currency", type: "text" },
    { columnName: "Status", fieldName: "booking_status", type: "status" },
    { columnName: "Created At", fieldName: "created_at", type: "text" },
  ];

  const gettingFlightBookings = async () => {
    const response = await getFlightBookings();
    if (response.status) {
      setBookingsData(response.data);
      console.log('bookking',response.data)
    }
  };

  useEffect(() => {
    gettingFlightBookings();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* <div className="w-[80vw]">
        <Slider {...settings}>
          {Array.from({ length: 10 }).map((_, index) => (
            <DashboardCards key={index} index={index} />
          ))}
        </Slider>
      </div> */}

      {/* Cards */}
      <div className="w-full p-3">
        <h2 className="text-3xl font-semibold text-text mb-7">
          Featured Flights
        </h2>
        <div className="w-full  overflow-x-hidden">
          
            <Slider {...settings}
              className=" flex gap-3 "
            >
              {flightsData.length > 0 &&
                flightsData.map((item, index) => (
                  <DashboardCards key={index} index={index} data={item} />
                ))}
            </Slider>
          
        </div>


      </div>
      {/* Flights */}
      <CardLayoutContainer removeBg={true} className={'mt-5'}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Flight Bookings"}
          className="flex justify-between items-center"
        >
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <Table
            columns={columnsData}
            data={bookingsData}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </div>
  );
};

export default DashboardHome;
