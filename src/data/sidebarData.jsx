import { GoDotFill } from "react-icons/go";
import { MdFlight, MdOutlineReadMore, MdSearch } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { MdContentPasteSearch } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoIosStopwatch } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { FaHandsHelping } from "react-icons/fa";
import { BiSolidBookmarks } from "react-icons/bi";
import { MdPayments } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { MdSupervisedUserCircle } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { HiUsers } from "react-icons/hi";
import { MdAirplaneTicket } from "react-icons/md";
const pagePermissions = JSON.parse(localStorage.getItem("userData"))?.role
  ?.page_permission || {
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

export const sidebarLinks = [
  pagePermissions.dashboard && {
    title: "Dashboard",
    path: "/dashboard",
    icon: <RiDashboardFill />,
  },
  pagePermissions.flights && {
    // title: "Flights & Hotels",
    title: "Search",
    icon: <MdContentPasteSearch />,
    sublinks: [
      {
        title: "Search Flights",
        path: "/dashboard/search-flights",
        icon: <MdFlight />,
      },
      // {
      //   title: "Search Hotels",
      //   path: "/dashboard/search-hotels",
      //   icon: <GoDotFill />,
      // },
    ],
  },
  pagePermissions.bookings && {
    title: "Bookings",
    icon: <FaBusinessTime />,
    sublinks: [
      {
        title: "Flight Bookings",
        path: "/dashboard/flight-bookings",
        icon: <BiSolidBookmarks />,
      },
      // {
      //   title: "Hotel Bookings",
      //   path: "/dashboard/hotel-bookings",
      //   icon: <GoDotFill />,
      // },
    ],
  },
  // {
  //   title: "Credits",
  //   icon: <FaCreditCard />,
  //   sublinks: [
  //     {
  //       title: "Credit Topup",
  //       path: "/dashboard/credit-topup",
  //       icon: <GoDotFill />,
  //     },
  //     {
  //       title: "Add Credits",
  //       path: "/dashboard/add-credits",
  //       icon: <GoDotFill />,
  //     },
  //   ],
  // },
  pagePermissions.transactions && {
    // title: "Payments & Invoices",
    title: "Transactions",
    icon: <FaMoneyBill1Wave />,
    sublinks: [
      // {
      //   title: "Invoices",
      //   path: "/dashboard/invoices",
      //   icon: <GoDotFill />,
      // },
      // {
      //   title: "Create Transaction",
      //   path: "/dashboard/create-transaction",
      //   icon: <MdPayments/>,
      // },
      {
        title: "Transaction History",
        path: "/dashboard/transactions",
        icon: <MdOutlineHistory />,
      },
    ],
  },
  pagePermissions.administrators && {
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
  pagePermissions.tickets && {
    title: "Support",
    icon: <IoTicket />,
    sublinks: [
      {
        title: "Tickets",
        path: "/dashboard/view-tickets",
        icon: <IoTicket />,
      },
      // {
      //   title: "Create Ticket",
      //   path: "/dashboard/create-ticket",
      //   icon: < MdAirplaneTicket />,
      // },
    ],
  },
  pagePermissions.history && {
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
  // {
  //   title: "Help & Support",
  //   icon: <FaHandsHelping />,
  //   sublinks: [
  //     {
  //       title: "Support",
  //       path: "/dashboard/support",
  //       icon: <GoDotFill />,
  //     },
  //   ],
  // },
].filter(Boolean);
