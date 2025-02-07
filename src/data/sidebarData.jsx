import { GoDotFill } from "react-icons/go";
import { MdFlight } from "react-icons/md";
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
export const sidebarLinks = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <RiDashboardFill />,
  },
  {
    // title: "Flights & Hotels",
    title: "Search",
    icon: <MdContentPasteSearch />,
    sublinks: [
      {
        title: "Search Flights",
        path: "/dashboard/search-flights",
        icon: <MdFlight  />,
      },
      // {
      //   title: "Search Hotels",
      //   path: "/dashboard/search-hotels",
      //   icon: <GoDotFill />,
      // },
    ],
  },
  {
    title: "Bookings",
    icon: <FaBusinessTime />,
    sublinks: [
      {
        title: "Flight Bookings",
        path: "/dashboard/flight-bookings",
        icon: <BiSolidBookmarks  />,
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
  {
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
  // {
  //   title: "History",
  //   icon: <IoIosStopwatch />,
  //   sublinks: [
  //     {
  //       title: "Search History",
  //       path: "/dashboard/search-history",
  //       icon: <GoDotFill />,
  //     },
  //     // {
  //     //   title: "Transactions History",
  //     //   path: "/dashboard/transactions-history",
  //     //   icon: <GoDotFill />,
  //     // },
  //   ],
  // },
  {
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
        icon: < HiUsers />,
      },
    ],
  },
  {
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
];
