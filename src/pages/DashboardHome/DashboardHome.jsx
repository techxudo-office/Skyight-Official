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
        <div className="hide-scrollbar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-x-scroll gap-6 gap-x-44">
          {flightsData.length > 0 &&
            flightsData.map((item, index) => (
              <DashboardCards key={index} index={index} data={item} />
            ))}
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
