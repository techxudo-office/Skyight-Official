import {
  MdFlight,
  MdOutlineReadMore,
  MdSearch,
  MdSupervisedUserCircle,
  MdContentPasteSearch,
  MdAdminPanelSettings,
  MdOutlineHistory,
} from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { useSelector } from "react-redux";
import { IoTicket } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { BiSolidBookmarks } from "react-icons/bi";
import { FaBusinessTime, FaMoneyBill1Wave } from "react-icons/fa6";
import { useEffect } from "react";

export const useSidebarLinks = () => {
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
  }, [userData]);

  const pagePermissions = userData?.user?.role?.page_permission || {
    dashboard: true,
    flights: true,
    bookings: true,
    credits: true,
    transactions: true,
    history: true,
    administrators: true,
    tickets: true,
    help_and_support: true,
  };

  return [
    userData?.user?.role?.page_permission.dashboard && {
      title: "Dashboard",
      path: "/dashboard",
      icon: <RiDashboardFill />,
    },
    userData?.user?.role?.page_permission.flights && {
      title: "Search",
      icon: <MdContentPasteSearch />,
      sublinks: [
        {
          title: "Search Flights",
          path: "/dashboard/search-flights",
          icon: <MdFlight />,
        },
      ],
    },
    userData?.user?.role?.page_permission.bookings && {
      title: "Bookings",
      icon: <FaBusinessTime />,
      sublinks: [
        {
          title: "Flight Bookings",
          path: "/dashboard/flight-bookings",
          icon: <BiSolidBookmarks />,
        },
      ],
    },
    userData?.user?.role?.page_permission.transactions && {
      title: "Transactions",
      icon: <FaMoneyBill1Wave />,
      sublinks: [
        {
          title: "Transaction History",
          path: "/dashboard/transactions",
          icon: <MdOutlineHistory />,
        },
      ],
    },
    userData?.user?.role?.page_permission.administrators && {
      title: "Administrator",
      icon: <MdAdminPanelSettings />,
      sublinks: [
        {
          title: "Roles",
          path: "/dashboard/roles",
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "Users",
          path: "/dashboard/users",
          icon: <HiUsers />,
        },
      ],
    },
    userData?.user?.role?.page_permission.tickets && {
      title: "Support",
      icon: <IoTicket />,
      sublinks: [
        {
          title: "Tickets",
          path: "/dashboard/view-tickets",
          icon: <IoTicket />,
        },
      ],
    },
    userData?.user?.role?.page_permission.history && {
      title: "History",
      icon: <IoTicket />,
      sublinks: [
        {
          title: "Search",
          path: "/dashboard/search-history",
          icon: <MdSearch />,
        },
        {
          title: "Booking",
          path: "/dashboard/booking-history",
          icon: <IoTicket />,
        },
        {
          title: "Order",
          path: "/dashboard/order-history",
          icon: <MdOutlineReadMore />,
        },
      ],
    },
  ].filter(Boolean);
};
