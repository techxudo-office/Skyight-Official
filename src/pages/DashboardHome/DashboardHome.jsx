import React, { useEffect } from "react";
import {
  DashboardCards,
  TableNew,
  Searchbar,
  Table,
} from "../../components/components";
import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { FaEye } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getFlightBookings,
  getRoutes,
} from "../../_core/features/bookingSlice";
import { IoIosAirplane } from "react-icons/io";
import dayjs from "dayjs";

const DashboardHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { flightBookings, isLoadingFlightBookings } = useSelector(
    (state) => state.booking
  );

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
          dots: false,
        },
      },
      {
        breakpoint: 480, // Mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
          dots: false,
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(getRoutes(userData?.token));
  }, [userData?.token, dispatch]);

  const columns = [
    {
      name: "ROUTE",
      selector: (row) => (
        <span className="flex items-center justify-center gap-2 text-sm text-text">
          {row.origin}
          <div className="flex items-center gap-1">
            <span className="h-0.5 w-3 bg-primary"></span>
            <IoIosAirplane className="text-lg text-primary" />
            <span className="h-0.5 w-3 bg-primary"></span>
          </div>
          {row.destination}
        </span>
      ),
      sortable: false,
      minwidth: "150px",
      center: "yes",
    },
    {
      name: "PNR",
      selector: (row) => row.booking_reference_id,
      sortable: false,
      minwidth: "150px",
      center: "yes",
    },
    {
      name: "TOTAL FARE",
      selector: (row) => row.total_fare,
      sortable: false,
      center: "yes",
    },
    {
      name: "STATUS",
      selector: (row) => row.booking_status,
      sortable: false,
      center: "yes",
    },
    {
      name: "CREATED AT",
      selector: (row) => dayjs(row.created_at).format("MMM-DD-YYYY"),
      sortable: false,
      center: "yes",
    },
    {
      name: "",
      selector: (row) => (
        <span
          className="text-lg cursor-pointer"
          onClick={() => {
            navigate("/dashboard/booking-details", {
              state: row,
            });
          }}>
          <FaEye title="View" className="text-green-500 " />
        </span>
      ),
      sortable: false,
      center: "yes",
    },
  ];
  useEffect(() => {
    if (userData?.user?.company_id) {
      dispatch(
        getFlightBookings({
          id: userData.user.company_id,
          token: userData.token,
        })
      );
    }
  }, [dispatch, userData?.user?.company_id]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full p-3">
        <h2 className="text-3xl font-semibold text-text mb-7">
          Featured Flights
        </h2>
        <div className="w-full overflow-x-hidden">
          {flightBookings?.length > 0 ? (
            <Slider {...settings} className="flex gap-3 ">
              {flightBookings.map((item, index) => (
                <DashboardCards key={index} index={index} data={item} />
              ))}
            </Slider>
          ) : (
            <div className="w-full text-center text-gray-500">
              No Featured Flights
            </div>
          )}
        </div>
      </div>
      <CardLayoutContainer removeBg={true} className={"mt-5"}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Flight Bookings"}
          className="flex items-center justify-between"></CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <Searchbar className={"mb-7"} />
          <Table
            pagination={true}
            columnsData={columns}
            tableData={flightBookings}
            progressPending={isLoadingFlightBookings}
            paginationTotalRows={flightBookings.length}
            paginationComponentOptions={{ noRowsPerPage: "10" }}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
      <div
        id="footer-container"
        className="flex items-center justify-center w-full p-3 pb-0 bg-white">
        <h2 className="mt-2 font-semibold text-center text-text text-md">
          © 2024 All rights reserved by SKYIGHT AIR & BOOKING SYSTEM
        </h2>
      </div>
    </div>
  );
};

export default DashboardHome;
